import got from "got";
import { EventEmitter } from "events";

import { ByteArray, Connection, SHAKikoo } from "../utils";
import { Channel, Friend, Room, RoomPlayer } from "../structures";
import { TribulleIdentifier, BulleIdentifier, Language, GameCommunity } from "../enums";
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
	language?: Language;
	/**
	 * The room where the client will be logged in (Default: `1`)
	 */
	loginRoom?: string;
	/**
	 * The client intents.
	 */
	intents?: ClientIntentOptions;
}

interface RoomJoinOptions {
	/**
	 * Lets the server decide which room to join. (Default: `false`)
	 */
	auto?: boolean;
	/**
	 * The community of the room to join.
	 */
	language?: Language;
	/**
	 * The password of the room to join.
	 * If given, `language` and `auto` parameters are ignored.
	 */
	password?: string;
}

interface ClientIntentOptions {
	/**
	 * Tracks a friend list and emits related events. (Default `true`)
	 */
	friendList?: boolean;
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
	private loops: Partial<{ heartbeat: NodeJS.Timeout }>;
	private tribulleId: number;
	private password: string;
	protected autoReconnect: boolean;
	protected intents: ClientIntentOptions;
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
	channels: Map<string, Channel>;
	/**
	 * The client's friends.
	 */
	friends: Map<string, Friend>;
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
	community!: GameCommunity;
	/**
	 * The language suggested by the server.
	 */
	language!: Language;
	/**
	 * The room where the client will be logged in.
	 */
	loginRoom!: string;
	/**
	 * The client's temporary code.
	 */
	pcode!: number;
	/**
	 * The connection with the main server.
	 */
	main!: Connection;
	/**
	 * The connection with the game server (bulle).
	 */
	bulle!: Connection;

	constructor(name: string, password: string, options?: ClientOptions) {
		super();

		this.autoReconnect = options?.autoReconnect ?? true;
		this.language = options?.language || Language.en;
		this.loginRoom = options?.loginRoom || "1";
		this.intents = options?.intents || {};

		this.whoList = {};
		this.channels = new Map();
		this.friends = new Map();

		this.loops = {};
		this.tribulleId = 0;
		this.name = name;
		this.password = password;
	}

	/**
	 *  Wait for specific event to be emitted
	 */
	protected waitFor<T extends keyof ClientEvents>(
		eventName: T,
		timeout?: number,
		condition?: (...args: Parameters<ClientEvents[T]>) => boolean
	): Promise<Parameters<ClientEvents[T]>>;
	protected waitFor<T extends keyof ClientEvents>(
		eventName: T,
		condition?: (...args: Parameters<ClientEvents[T]>) => boolean,
		timeout?: number
	): Promise<Parameters<ClientEvents[T]>>;
	protected waitFor<
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
	protected handleTribulle(code: TribulleIdentifier, packet: ByteArray) {
		if (code in TribullePacketHandler) TribullePacketHandler[code].call(this, packet);
		this.emit("rawTribulle", code, packet);
	}

	/**
	 * Sends a packet to the community platform (tribulle).
	 */
	protected sendTribullePacket(code: TribulleIdentifier, packet?: ByteArray) {
		this.tribulleId = (this.tribulleId % 0x100000000) + 1;
		const p = new ByteArray().writeShort(code).writeUnsignedInt(this.tribulleId);
		if (packet) p.writeBytes(packet);
		this.main.send(BulleIdentifier.bulle, p);

		return this.tribulleId;
	}

	/**
	 * Sends a packet every 15 seconds to stay connected to the game.
	 */
	protected startHeartbeat() {
		this.main.send(BulleIdentifier.heartbeat, new ByteArray());
		this.loops.heartbeat = setInterval(() => {
			this.main.send(BulleIdentifier.heartbeat, new ByteArray());
			if (this.bulle && this.bulle.open)
				this.bulle.send(BulleIdentifier.heartbeat, new ByteArray());
		}, 1000 * 15);
	}

	private sendHandshake() {
		const p = new ByteArray();
		p.writeShort(666);
		this.main.send(BulleIdentifier.handshake, p);
	}

	protected setLanguage(code: Language = Language.en) {
		if (typeof code !== "string") code = Language.en;
		const p = new ByteArray().writeUTF(code);
		this.main.send(BulleIdentifier.language, p);
	}

	protected setSystemInfo(langue: string, sys: string, version: string) {
		const p = new ByteArray().writeUTF(langue).writeUTF(sys).writeUTF(version);
		this.main.send(BulleIdentifier.os, p.writeByte(0));
	}

	/**
	 * Get Transformice IP
	 */
	private async fetchIP() {
		const result = await got("https://api.tocuto.tk/tfm/get/ip").json() as
		{ success: false, error: string } | {
			success: true,
			internal_error: true,
			internal_error_step: number
		} | {
			success: true,
			internal_error?: false,
			server: {
				ip: string,
				ports: number[]
			}
		};
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
		this.main.send(BulleIdentifier.loginSend, p);
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
		this.sendTribullePacket(TribulleIdentifier.tribeSendMessage, new ByteArray().writeUTF(message));
	}

	/**
	 * Joins the tribe house.
	 */
	enterTribeHouse() {
		this.main.send(BulleIdentifier.enterTribeHouse, new ByteArray());
	}

	/**
	 * Load a lua script in the room.
	 */
	loadLua(script: string) {
		const length = Buffer.byteLength(script);
		const p = new ByteArray().writeUnsignedShort(length >> 8).writeUnsignedByte(length & 255);
		this.bulle.send(BulleIdentifier.loadLua, p);
	}

	/**
	 * Join to a chat channel
	 */
	joinChannel(channelName: string, permanent = true) {
		this.sendTribullePacket(
			TribulleIdentifier.channelJoinRequest,
			new ByteArray().writeUTF(channelName).writeBoolean(permanent)
		);
	}

	/**
	 * Leave a chat channel
	 */
	leaveChannel(channelName: string) {
		this.sendTribullePacket(
			TribulleIdentifier.channelLeaveRequest,
			new ByteArray().writeUTF(channelName)
		);
	}

	/**
	 * Request /who to a chat channel
	 */
	requestWho(channelName: string) {
		const fingerprint = this.sendTribullePacket(
			TribulleIdentifier.channelWhoRequest,
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
		return (await this.waitFor("channelWho", (_n, _p, f) => f === fingerPrint))[1];
	}

	/**
	 * Sends a message to a chat channel
	 */
	sendChannelMessage(channelName: string, message: string) {
		this.sendTribullePacket(
			TribulleIdentifier.channelSendMessage,
			new ByteArray().writeUTF(channelName).writeUTF(message)
		);
	}

	/**
	 * Sends a message to the client's room.
	 */
	sendRoomMessage(message: string) {
		this.bulle.send(BulleIdentifier.roomMessage, new ByteArray().writeUTF(message));
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
		this.main.send(BulleIdentifier.command, new ByteArray().writeUTF(message));
	}

	/**
	 * Sends a request to the server to join a room with specific name.
	 */
	enterRoom(name: string, options?: RoomJoinOptions) {
		if (options?.password) {
			this.main.send(
				BulleIdentifier.roomPassworded,
				new ByteArray()
					.writeUTF(options.password)
					.writeUTF(name)
			);
		} else {
			this.main.send(
				BulleIdentifier.room,
				new ByteArray()
					.writeUTF(options?.language ?? this.language)
					.writeUTF(name)
					.writeBoolean(options?.auto ?? false)
			);
		}
	}

	/**
	 * Sends a whisper message to a player.
	 */
	sendWhisper(name: string, message: string) {
		this.sendTribullePacket(
			TribulleIdentifier.whisperSend,
			new ByteArray().writeUTF(name.toLowerCase()).writeUTF(message)
		);
	}

	/**
	 * Open friend list.
	 */
	openFriendList() {
		this.sendTribullePacket(TribulleIdentifier.friendListOpenRequest);
	}

	/**
	 * Close friend list.
	 * @throws When intents.friendList is set.
	 */
	closeFriendList() {
		if (this.intents.friendList ?? true) {
			throw `Cannot close friend list when intents.friendList is set.`;
		}
		this.sendTribullePacket(TribulleIdentifier.friendListCloseRequest);
	}

	/**
	 * Get friend list.
	 */
	async getFriendList() {
		if (this.intents.friendList ?? true) {
			return this.friends;
		}
		this.openFriendList();
		const friendList = (await this.waitFor("friendList"))[0];
		this.closeFriendList();
		return friendList;
	}

	/**
	 * Add a player to friend list
	 */
	addFriend(name: string) {
		this.sendTribullePacket(TribulleIdentifier.friendAddRequest, new ByteArray().writeUTF(name));
	}

	/**
	 * Add a player to friend list
	 */
	removeFriend(name: string) {
		this.sendTribullePacket(TribulleIdentifier.friendRemoveRequest, new ByteArray().writeUTF(name));
	}

	/**
	 * Request tribe data
	 */
	requestTribe(includeDisconnectedMember = true) {
		this.sendTribullePacket(
			TribulleIdentifier.tribeRequest,
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
