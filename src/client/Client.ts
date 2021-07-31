import fetch from "node-fetch";
import { EventEmitter } from "events";

import { ByteArray, Connection, SHAKikoo, ValueOf } from "../utils";
import { Room, RoomPlayer } from "../structures";
import { tribulle, identifiers, languages } from "../enums";
import PacketHandler from "./PacketHandler";
import ClientEvents from "./Events";
import TribullePacketHandler from "./TribullePacketHandler";
import OldPacketHandler from "./OldPacketHandler";

interface ClientOptions {
	/**
	 * Will try to auto reconnect when disconnected if set to true (Default: `true`)
	 */
	autoReconnect?: boolean;
	/**
	 * Which community to log in to ([language enum](/docs/api/globals#languages))
	 */
	language?: ValueOf<typeof languages>;
	/**
	 * The room where the client will be logged in (Default: `1`)
	 */
	loginRoom?: string;
}

interface RoomJoinOptions {
	/**
	 * Lets the server decide which room to join. (Default: `false`)
	 */
	auto?: boolean;
	/**
	 * The community of the room to join.
	 */
	language?: ValueOf<typeof languages>;
	/**
	 * The password of the room to join.
	 * If given, `language` and `auto` parameters are ignored.
	 */
	password?: string;
}

/**
 * Client interface for event intellisense support
 */
declare interface Client {
	/**
	 * Listens to a Client Event
	 */
	on<T extends keyof ClientEvents>(event: T, listener: ClientEvents[T]): this;
	/** @hidden */
	emit<T extends keyof ClientEvents>(event: T, ...args: Parameters<ClientEvents[T]>): boolean;
}

/**
 * Represents a client that connects to Transformice.
 *
 * @example
 * ```js
 * const { Client, enums } = require("transformice.js");
 *
 * const client = new Client("username", "password", {
 * 	language: enums.languages.en
 * });
 *
 * client.on("roomMessage", (message) => {
 * 	if (client.name === message.author.name) return;
 * 	client.sendRoomMessage(message.author.look);
 * });
 *
 * client.run("tfm_id", "token");
 * ```
 *
 * @noInheritDoc
 */
class Client extends EventEmitter {
	protected authServer!: number;
	protected ports!: number[];
	private host!: string;
	protected identificationKeys!: number[];
	protected messageKeys!: number[];
	private main!: Connection;
	protected bulle!: Connection;
	private loops: Partial<{ heartbeat: NodeJS.Timeout }>;
	private tribulleId: number;
	private password: string;
	protected autoReconnect: boolean;
	protected whoList: Record<number, string>;

	/**
	 * The online players when the bot log.
	 */
	onlinePlayers!: number;
	/**
	 * The client's room.
	 */
	room!: Room;
	/**
	 * The client's joined channels.
	 */
	channels: string[];
	/**
	 * The client's player.
	 */
	player!: RoomPlayer;
	/**
	 * The client's Id.
	 */
	playerId!: number;
	/**
	 * The client's name.
	 */
	name: string;
	/**
	 * The client's playing time.
	 */
	playingTime!: number;
	/**
	 * The connection time.
	 */
	connectionTime!: number;
	/**
	 * The client's community code.
	 */
	community!: number;
	/**
	 * The language suggested by the server.
	 */
	language!: ValueOf<typeof languages>;
	/**
	 * The room where the client will be logged in.
	 */
	loginRoom!: string;
	/**
	 * The client's temporary code.
	 */
	pcode!: number;

	constructor(name: string, password: string, options?: ClientOptions) {
		super();

		this.autoReconnect = options?.autoReconnect ?? true;
		this.language = options?.language || languages.en;
		this.loginRoom = options?.loginRoom || "1";
		this.whoList = {};
		this.channels = [];

		this.loops = {};
		this.tribulleId = 0;
		this.name = name;
		this.password = password;
	}

	/**
	 *  Wait for specific event to be emitted
	 */
	private waitFor<T extends keyof ClientEvents>(
		eventName: T,
		timeout?: number,
		condition?: (...args: Parameters<ClientEvents[T]>) => boolean
	): Promise<Parameters<ClientEvents[T]>>;
	private waitFor<T extends keyof ClientEvents>(
		eventName: T,
		condition?: (...args: Parameters<ClientEvents[T]>) => boolean,
		timeout?: number
	): Promise<Parameters<ClientEvents[T]>>;
	private waitFor<
		T extends keyof ClientEvents,
		Callback extends (...args: Parameters<ClientEvents[T]>) => boolean
	>(
		eventName: T,
		timeoutOrCondition: number | Callback = 5000,
		conditionOrTimeout?: Callback | number
	) {
		let timeout = 5000;
		let condition: Callback | undefined = undefined;
		if (typeof timeoutOrCondition === "number") timeout = timeoutOrCondition;
		else if (typeof timeoutOrCondition === "function") condition = timeoutOrCondition;
		if (typeof conditionOrTimeout === "number") timeout = conditionOrTimeout;
		else if (typeof conditionOrTimeout === "function") condition = conditionOrTimeout;

		return new Promise<Parameters<ClientEvents[T]>>((resolve, reject) => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const listener = (...args: any) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (!condition) resolve(args);
				else if (condition && condition(...args)) resolve(args);
			};

			this.once(eventName, listener);
			setTimeout(() => {
				this.removeListener(eventName, listener);
				reject(new Error("Timed out"));
			}, timeout);
		});
	}

	/**
	 * Handles the old packets and emits events.
	 */
	protected handleOldPacket(conn: Connection, ccc: number, data: string[]) {
		if (ccc in OldPacketHandler) OldPacketHandler[ccc].call(this, conn, ccc, data);
		this.emit("rawOldPacket", conn, ccc, data);
	}

	/**
	 * Handles the known packets and emits events.
	 */
	protected handlePacket(conn: Connection, packet: ByteArray) {
		const ccc = packet.readUnsignedShort();
		if (ccc in PacketHandler) PacketHandler[ccc].call(this, conn, packet);
		this.emit("rawPacket", conn, ccc, packet);
	}

	/**
	 * Handles the community platform packets and emits events.
	 */
	protected handleTribulle(code: number, packet: ByteArray) {
		if (code in TribullePacketHandler) TribullePacketHandler[code].call(this, packet);
		this.emit("rawTribulle", code, packet);
	}

	/**
	 * Sends a packet to the community platform (tribulle).
	 */
	private sendTribullePacket(code: number, packet: ByteArray) {
		this.tribulleId = (this.tribulleId % 0x100000000) + 1;
		const p = new ByteArray().writeShort(code).writeUnsignedInt(this.tribulleId);
		p.writeBytes(packet);
		this.main.send(identifiers.bulle, p);

		return this.tribulleId;
	}

	/**
	 * Sends a packet every 15 seconds to stay connected to the game.
	 */
	protected startHeartbeat() {
		this.main.send(identifiers.heartbeat, new ByteArray());
		this.loops.heartbeat = setInterval(() => {
			this.main.send(identifiers.heartbeat, new ByteArray());
			if (this.bulle && this.bulle.open)
				this.bulle.send(identifiers.heartbeat, new ByteArray());
		}, 1000 * 15);
	}

	private sendHandshake() {
		const p = new ByteArray();
		p.writeShort(666);
		this.main.send(identifiers.handshake, p);
	}

	protected setLanguage(code: ValueOf<typeof languages> = languages.en) {
		if (typeof code !== "string") code = languages.en;
		const p = new ByteArray().writeUTF(code);
		this.main.send(identifiers.language, p);
	}

	protected setSystemInfo(langue: string, sys: string, version: string) {
		const p = new ByteArray().writeUTF(langue).writeUTF(sys).writeUTF(version);
		this.main.send(identifiers.os, p.writeByte(0));
	}

	/**
	 * Get Transformice IP
	 */
	private async fetchIP() {
		const response = await fetch("https://api.tocuto.tk/tfm/get/ip");
		const result = await response.json();
		if (result.success) {
			if (!result.internal_error) {
				this.ports = result.server.ports;
				this.host = result.server.ip;
			} else {
				if (result.internal_error_step === 2)
					throw new Error("The game might be in maintenance mode.");
				throw new Error("An internal error occur: " + result.internal_error_step);
			}
		} else {
			throw new Error("Can't get the IP : " + result.error);
		}
	}

	/**
	 * Log in to the game.
	 */
	private login(name: string, password: string, room: string) {
		const p = new ByteArray().writeUTF(name).writeUTF(SHAKikoo(password));
		p.writeUTF("app:/TransformiceAIR.swf/[[DYNAMIC]]/2/[[DYNAMIC]]/4").writeUTF(room);
		p.writeInt(0).writeShort(18).writeByte(0).writeUTF("");
		this.main.send(identifiers.loginSend, p);
	}

	/**
	 * Connects and do handshake
	 */
	private connect() {
		if (this.main && this.main.open) return;
		this.main = new Connection();
		this.main.on("data", (conn: Connection, packet: ByteArray) => {
			this.handlePacket(conn, packet);
		});
		this.main.once("connect", async () => {
			this.emit("connect", this.main);
			this.sendHandshake();
			this.once("loginError", async (code) => {
				if (code === 1 && this.autoReconnect) {
					this.restart();
				}
			});
			try {
				await this.waitFor("loginReady");
				this.setLanguage(this.language);
				this.login(this.name, this.password, this.loginRoom);
			} catch (err) {
				this.main.emit("error", err);
			}
		});
		this.main.once("close", async () => {
			if (this.autoReconnect) {
				this.restart();
			}
		});
		this.main.on("error", async (err: Error) => {
			this.emit("connectionError", err);
			if (this.autoReconnect) {
				this.restart();
			}
		});
		let ports = this.ports;
		this.main.connect(this.host, ports[~~(Math.random() * ports.length)]);
	}

	/**
	 * Disconnects the client.
	 */
	disconnect() {
		clearInterval(this.loops.heartbeat as NodeJS.Timeout);
		if (this.main) {
			this.main.close();
			this.main.removeAllListeners();
		}
		if (this.bulle) {
			this.bulle.close();
			this.bulle.removeAllListeners();
		}
		this.emit("disconnect");
	}
	/**
	 * Starts the client.
	 */
	async run() {
		await this.fetchIP();
		this.connect();
	}

	/**
	 * Restart the client
	 */
	async restart() {
		this.emit("restart");
		this.disconnect();
		await new Promise((r) => setTimeout(r, 15 * 1000));
		this.connect();
	}

	/**
	 * Sends a message to tribe
	 */
	sendTribeMessage(message: string) {
		this.sendTribullePacket(tribulle.tribeSendMessage, new ByteArray().writeUTF(message));
	}

	/**
	 * Joins the tribe house.
	 */
	enterTribeHouse() {
		this.main.send(identifiers.enterTribeHouse, new ByteArray());
	}

	/**
	 * Load a lua script in the room.
	 */
	loadLua(script: string) {
		const length = Buffer.byteLength(script);
		const p = new ByteArray().writeUnsignedShort(length >> 8).writeUnsignedByte(length & 255);
		this.bulle.send(identifiers.loadLua, p);
	}

	/**
	 * Join to a chat channel
	 */
	joinChannel(channelName: string, permanent = true) {
		this.sendTribullePacket(
			tribulle.channelJoinRequest,
			new ByteArray().writeUTF(channelName).writeBoolean(permanent)
		);
	}

	/**
	 * Leave a chat channel
	 */
	leaveChannel(channelName: string) {
		this.sendTribullePacket(
			tribulle.channelLeaveRequest,
			new ByteArray().writeUTF(channelName)
		);
	}

	/**
	 * Request /who to a chat channel
	 */
	requestWho(channelName: string) {
		const fingerprint = this.sendTribullePacket(
			tribulle.channelWhoRequest,
			new ByteArray().writeUTF(channelName)
		);
		this.whoList[fingerprint] = channelName;
		return fingerprint;
	}

	/**
	 * Get player list inside a chat channel
	 */
	async getChannelPlayers(channelName: string) {
		const fingerPrint = this.requestWho(channelName);
		return (await this.waitFor("channelWho", (n, p, f) => f === fingerPrint))[1];
	}

	/**
	 * Sends a message to a chat channel
	 */
	sendChannelMessage(channelName: string, message: string) {
		this.sendTribullePacket(
			tribulle.channelSendMessage,
			new ByteArray().writeUTF(channelName).writeUTF(message)
		);
	}

	/**
	 * Sends a message to the client's room.
	 */
	sendRoomMessage(message: string) {
		this.bulle.send(identifiers.roomMessage, new ByteArray().writeUTF(message));
	}

	/**
	 * Sends a server command.
	 *
	 * @param message - The command message (without the `/`).
	 * @example
	 * ```js
	 * client.sendCommand('mod');
	 * ```
	 */
	sendCommand(message: string) {
		this.main.send(identifiers.command, new ByteArray().writeUTF(message));
	}

	/**
	 * Sends a request to the server to join a room with specific name.
	 */
	enterRoom(name: string, options: RoomJoinOptions) {
		if (options.password) {
			this.main.send(
				identifiers.roomPassworded,
				new ByteArray()
					.writeUTF(options.password)
					.writeUTF(name)
			);
		} else {
			this.main.send(
				identifiers.room,
				new ByteArray()
					.writeUTF(options.language ?? this.language)
					.writeUTF(name)
					.writeBoolean(options.auto ?? false)
			);
		}
	}

	/**
	 * Sends a whisper message to a player.
	 */
	sendWhisper(name: string, message: string) {
		this.sendTribullePacket(
			tribulle.whisperSend,
			new ByteArray().writeUTF(name.toLowerCase()).writeUTF(message)
		);
	}

	/**
	 * Request friend list.
	 */
	requestFriendList() {
		this.sendTribullePacket(28, new ByteArray());
	}

	/**
	 * Get friend list
	 */
	async getFriendList() {
		this.requestFriendList();
		return (await this.waitFor("friendList"))[0];
	}

	/**
	 * Add a player to friend list
	 */
	addFriend(name: string) {
		this.sendTribullePacket(tribulle.friendAddRequest, new ByteArray().writeUTF(name));
	}

	/**
	 * Add a player to friend list
	 */
	removeFriend(name: string) {
		this.sendTribullePacket(tribulle.friendRemoveRequest, new ByteArray().writeUTF(name));
	}

	/**
	 * Request tribe data
	 */
	requestTribe(includeDisconnectedMember = true) {
		this.sendTribullePacket(
			tribulle.tribeRequest,
			new ByteArray().writeBoolean(includeDisconnectedMember)
		);
	}

	/**
	 * Get tribe data
	 */
	async getTribe(includeDisconnectedMember = true) {
		this.requestTribe(includeDisconnectedMember);
		return (await this.waitFor("tribe"))[0];
	}

	/**
	 * Request profile
	 *
	 * Alias for: `client.sendCommand("profile")`
	 */
	requestProfile(username: string) {
		this.sendCommand(`profile ${username}`);
	}

	/**
	 * Get user profile
	 */
	async getProfile(username: string) {
		this.requestProfile(username);
		return (await this.waitFor("profile"))[0];
	}
}

export default Client;
