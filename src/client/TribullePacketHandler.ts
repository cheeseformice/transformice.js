import Client from "./Client";
import {
	Channel,
	ChannelMessage,
	Friend,
	Member,
	Message,
	Player,
	Tribe,
	WhisperMessage,
} from "../structures";
import { TribulleIdentifier } from "../enums";
import { ByteArray } from "../utils";

/**
 * @hidden
 */
interface TribullePacketIndex {
	[index: number]: (this: Client, packet: ByteArray) => void;
}

/**
 * @hidden
 */
class TribullePacketHandler {
	/* -------------------------------------------------------------------------- */
	/*                                   General                                  */
	/* -------------------------------------------------------------------------- */

	static [TribulleIdentifier.connect](this: Client) {
		this.emit("ready");
	}

	/* -------------------------------------------------------------------------- */
	/*                                   Whisper                                  */
	/* -------------------------------------------------------------------------- */

	static [TribulleIdentifier.whisperReceive](this: Client, packet: ByteArray) {
		const author = packet.readUTF();
		const community = packet.readUnsignedInt();
		const sentTo = packet.readUTF();
		const content = packet.readUTF();
		const message = new WhisperMessage(
			this,
			new Player(this, author),
			community,
			sentTo,
			content
		);
		this.emit("whisper", message);
	}

	/* -------------------------------------------------------------------------- */
	/*                                   Friend                                   */
	/* -------------------------------------------------------------------------- */

	static [TribulleIdentifier.friendList](this: Client, packet: ByteArray) {
		const friends = [];

		const soulmate = new Friend(this).read(packet, true); // soulmate
		const hasSoulmate = !(soulmate.id == 0 && soulmate.name == "");
		if (hasSoulmate) friends.push(soulmate);
		let totalFriends = packet.readUnsignedShort();

		while (totalFriends--) {
			friends.push(new Friend(this).read(packet, false));
		}
		this.emit("friendList", friends);
	}

	static [TribulleIdentifier.friendAdd](this: Client, packet: ByteArray) {
		this.emit("friendAdd", new Player(this, packet.readUTF()));
	}

	static [TribulleIdentifier.friendRemove](this: Client, packet: ByteArray) {
		this.emit("friendRemove", new Player(this, packet.readUTF()));
	}

	static [TribulleIdentifier.friendConnect](this: Client, packet: ByteArray) {
		this.emit("friendConnect", packet.readUTF());
	}

	static [TribulleIdentifier.friendDisconnect](this: Client, packet: ByteArray) {
		this.emit("friendDisconnect", packet.readUTF());
	}

	static [TribulleIdentifier.friendUpdate](this: Client, packet: ByteArray) {
		this.emit("friendUpdate", new Friend(this).read(packet, false));
	}

	/* -------------------------------------------------------------------------- */
	/*                                Chat Channel                                */
	/* -------------------------------------------------------------------------- */

	static [TribulleIdentifier.channelWho](this: Client, packet: ByteArray) {
		const fingerprint = packet.readUnsignedInt();
		packet.readUnsignedByte();
		const playerCount = packet.readUnsignedShort();
		const players: Player[] = [];
		for (let i = 0; i < playerCount; i++) {
			players.push(new Player(this, packet.readUTF()));
		}
		this.emit("channelWho", this.whoList[fingerprint], players, fingerprint);
	}

	static [TribulleIdentifier.channelLeave](this: Client, packet: ByteArray) {
		const channelName = packet.readUTF();
		const index = this.channels.findIndex((c) => c === channelName);
		if (index >= 0) this.channels.splice(index, 1);
		this.emit("channelLeave", channelName);
	}

	static [TribulleIdentifier.channelJoin](this: Client, packet: ByteArray) {
		const channelName = packet.readUTF();
		this.channels.push(channelName);
		this.emit("channelJoin", channelName);
	}

	static [TribulleIdentifier.channelMessage](this: Client, packet: ByteArray) {
		const author = new Player(this, packet.readUTF());
		const community = packet.readUnsignedInt();
		const channelName = packet.readUTF();
		const content = packet.readUTF();
		const message = new ChannelMessage(
			this,
			author,
			content,
			community,
			new Channel(this, channelName)
		);
		this.emit("channelMessage", message);
	}

	/* -------------------------------------------------------------------------- */
	/*                                    Tribe                                   */
	/* -------------------------------------------------------------------------- */

	static [TribulleIdentifier.tribeMessage](this: Client, packet: ByteArray) {
		const author = new Player(this, packet.readUTF());
		const message = new Message(this, author, packet.readUTF());
		this.emit("tribeMessage", message);
	}

	static [TribulleIdentifier.tribeMemberUpdate](this: Client, packet: ByteArray) {
		this.emit("tribeMemberUpdate", new Member(this).read(packet));
	}

	static [TribulleIdentifier.tribeMemberConnect](this: Client, packet: ByteArray) {
		this.emit("tribeMemberConnect", packet.readUTF());
	}

	static [TribulleIdentifier.tribeMemberDisconnect](this: Client, packet: ByteArray) {
		this.emit("tribeMemberDisconnect", packet.readUTF());
	}

	static [TribulleIdentifier.tribeInitialReceive](this: Client, packet: ByteArray) {
		const result = packet.readByte();
		if (result == 17) {
			this.emit("tribe", null);
		}
	}

	static [TribulleIdentifier.tribeReceive](this: Client, packet: ByteArray) {
		this.emit("tribe", new Tribe(this).read(packet));
	}
}

export default (TribullePacketHandler as unknown) as TribullePacketIndex;
