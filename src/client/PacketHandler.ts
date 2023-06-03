import { BulleIdentifier, Language } from "../enums";
import Client from "./Client";
import { Room, RoomMessage, RoomPlayer, Profile } from "../structures";
import { ByteArray, Connection } from "../utils";
import { TFMConnectionError } from "./Errors";

/**
 * @hidden
 */
interface PacketHandlerIndex {
	[index: number]: (this: Client, conn: Connection, packet: ByteArray) => void;
}

/**
 * @hidden
 */
class PacketHandler {
	/* -------------------------------------------------------------------------- */
	/*                                   General                                  */
	/* -------------------------------------------------------------------------- */

	static [BulleIdentifier.oldPacket](this: Client, conn: Connection, packet: ByteArray) {
		const data = packet.readUTF().split(String.fromCharCode(1));
		const a = data.splice(0, 1)[0];
		const ccc = (a.charCodeAt(0) << 8) | a.charCodeAt(1);
		this.handleOldPacket(conn, ccc, data);
	}

	static [BulleIdentifier.handshakeOk](this: Client, _conn: Connection, packet: ByteArray) {
		this.onlinePlayers = packet.readUnsignedInt();
		packet.readUTF() as Language; // default language
		packet.readUTF(); // country;
		packet.readUnsignedInt(); // server auth key

		this.setSystemInfo("en", "Linux", "LNX 29,0,0,140");
		this.startHeartbeat();
	}

	static [BulleIdentifier.loginReady](this: Client) {
		this.emit("loginReady");
	}

	static [BulleIdentifier.fingerprint](this: Client, conn: Connection, packet: ByteArray) {
		conn.fingerprint = packet.readByte();
	}

	static [BulleIdentifier.bulle](this: Client, _conn: Connection, packet: ByteArray) {
		const code = packet.readUnsignedShort();
		this.handleTribulle(code, packet);
	}

	static [BulleIdentifier.bulleConnection](this: Client, _conn: Connection, packet: ByteArray) {
		const timestamp = packet.readUnsignedInt();
		const playerId = packet.readUnsignedInt();
		const pcode = packet.readUnsignedInt();
		const host = packet.readUTF();
		packet
			.readUTF()
			.split("-")
			.map((port) => ~~port); // port

		if (this.bulle && this.bulle.open) this.bulle.close();

		this.bulle = new Connection();
		this.bulle.on("error", async (err: Error) => {
			this.emit("bulleConnectionError", err);
			this.emit("disconnect", new TFMConnectionError("bulle", err.message));
			if (this.autoReconnect) {
				this.restart();
			}
		});
		this.bulle.on("data", (conn: Connection, packet: ByteArray) => {
			this.handlePacket(conn, packet);
		});
		this.bulle.once("connect", () => {
			this.emit("bulleConnect", this.bulle);
			this.bulle.send(
				BulleIdentifier.bulleConnection,
				new ByteArray()
					.writeUnsignedInt(timestamp)
					.writeUnsignedInt(playerId)
					.writeUnsignedInt(pcode)
			);
		});
		this.bulle.connect(host, this.ports[0]);
	}

	static [BulleIdentifier.profile](this: Client, _conn: Connection, packet: ByteArray) {
		this.emit("profile", new Profile(this).read(packet));
	}

	/* -------------------------------------------------------------------------- */
	/*                                Login Result                                */
	/* -------------------------------------------------------------------------- */

	static [BulleIdentifier.loggedIn](this: Client, _conn: Connection, packet: ByteArray) {
		this.playerId = packet.readUnsignedInt();
		this.name = packet.readUTF();
		this.playingTime = packet.readUnsignedInt();
		this.connectionTime = new Date().getTime();
		this.community = packet.readByte();
		this.pcode = packet.readUnsignedInt();
		this.emit("login", this.name, this.pcode);
	}

	static [BulleIdentifier.loginError](this: Client, _conn: Connection, packet: ByteArray) {
		this.emit("loginError", packet.readUnsignedByte(), packet.readUTF(), packet.readUTF());
	}

	/* -------------------------------------------------------------------------- */
	/*                                    Room                                    */
	/* -------------------------------------------------------------------------- */

	static [BulleIdentifier.luaChatLog](this: Client, _conn: Connection, packet: ByteArray) {
		this.emit("luaLog", packet.readUTF());
	}

	static [BulleIdentifier.roomMessage](this: Client, _conn: Connection, packet: ByteArray) {
		const player = this.room.getPlayer(packet.readUTF());
		if (!player) return;
		const content = packet.readUTF();
		const message = new RoomMessage(this, player, content);
		this.emit("roomMessage", message);
	}

	static [BulleIdentifier.roomChange](this: Client, _conn: Connection, packet: ByteArray) {
		const before = this.room;
		const isPublic = packet.readBoolean();
		const name = packet.readUTF();
		const language = packet.readUTF() as Language;
		this.room = new Room(this, isPublic, name, language);
		this.emit("roomChange", this.room, before);
	}

	static [BulleIdentifier.roomPassworded](this: Client, _conn: Connection, packet: ByteArray) {
		const name = packet.readUTF();
		this.emit("roomPassworded", name);
	}

	static [BulleIdentifier.roomPlayerList](this: Client, _conn: Connection, packet: ByteArray) {
		const before = this.room.playerList;
		this.room.playerList = [];
		const length = packet.readUnsignedShort();
		for (let i = 0; i < length; i++) {
			const player = new RoomPlayer(this).read(packet);
			this.room.playerList.push(player);
		}
		this.player = this.room.getPlayer(this.pcode) as RoomPlayer;
		this.emit("roomPlayersUpdate", this.room.playerList, before);
	}

	static [BulleIdentifier.roomPlayerEnter](this: Client, _conn: Connection, packet: ByteArray) {
		const player = new RoomPlayer(this).read(packet);
		if (this.room.getPlayer(player.pcode)) {
			this.room.updatePlayer(player);
			this.emit("roomPlayerUpdate", player, this.room.getPlayer(player.pcode));
		} else {
			this.room.addPlayer(player);
			this.emit("roomPlayerEnter", player);
		}
	}

	static [BulleIdentifier.roomPlayerWin](this: Client, _conn: Connection, packet: ByteArray) {
		packet.readByte();
		const player = this.room.getPlayer(packet.readInt());
		if (player) {
			player.score = packet.readShort();
			const order = packet.readByte();
			const time = packet.readShort() / 100;
			this.emit("roomPlayerEnterHole", player, order, time);
		}
	}

	static [BulleIdentifier.roomPlayerGetCheese](
		this: Client,
		_conn: Connection,
		packet: ByteArray
	) {
		const player = this.room.getPlayer(packet.readInt());
		if (player) {
			player.cheeses = packet.readByte();
			this.emit("roomPlayerGetCheese", player);
		}
	}
}

export default PacketHandler as unknown as PacketHandlerIndex;
