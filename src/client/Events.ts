import { Connection, ByteArray } from "../utils";
import {
	Channel,
	ChannelMessage,
	Friend,
	Member,
	Player,
	Profile,
	Room,
	RoomMessage,
	RoomPlayer,
	Tribe,
	TribulleMessage,
	TribullePlayer,
	WhisperMessage,
} from "../structures";
import { TFMConnectionError } from "./Errors";

interface ClientEvents {
	/* -------------------------------------------------------------------------- */
	/*                                   General                                  */
	/* -------------------------------------------------------------------------- */

	/**
	 * Emitted when a new old packet received.
	 */
	rawOldPacket: (connection: Connection, ccc: number, data: string[]) => void;
	/**
	 * Emitted when the client can login on the game.
	 */
	loginReady: () => void;
	/**
	 * Emitted when the client has logged in.
	 */
	login: (name: string, pcode: number) => void;
	/**
	 * Emitted when the client failed to log in.
	 */
	loginError: (code: number, error1: string, error2: string) => void;
	/**
	 * Emitted when connection to the main server failed.
	 */
	connectionError: (err: Error) => void;
	/**
	 * Emitted when connection to the game server (bulle) failed.
	 */
	bulleConnectionError: (err: Error) => void;
	/**
	 * Emitted when client is attempting to restart the connection
	 */
	restart: () => void;
	/**
	 * Emitted when the client is fully ready to function.
	 */
	ready: () => void;
	/**
	 * Emitted when a new packet received from main or bulle connection.
	 */
	rawPacket: (conn: Connection, ccc: number, packet: ByteArray) => void;
	/**
	 * Emitted when a new community platform packet received.
	 */
	rawTribulle: (code: number, packet: ByteArray) => void;
	/**
	 * Emitted when the client has disconnected.
	 */
	disconnect: (err?: TFMConnectionError) => void;
	/**
	 * Emitted when a connection with the main server is established.
	 */
	connect: (connection: Connection) => void;
	/**
	 * Emitted when a connection with the game server (bulle) is established.
	 */
	bulleConnect: (connection: Connection) => void;
	/**
	 * Emitted when the community platform (tribulle) is connected.
	 */
	tribulleConnect: () => void;
	/**
	 * Emitted when data received from /profile
	 */
	profile: (profile: Profile) => void;

	/* -------------------------------------------------------------------------- */
	/*                                    Room                                    */
	/* -------------------------------------------------------------------------- */

	/**
	 * Emitted when the client receives lua logs or errors from `#Lua` chat.
	 */
	luaLog: (log: string) => void;
	/**
	 * Emitted when a player sends a message in the room.
	 */
	roomMessage: (message: RoomMessage) => void;
	/**
	 * Emitted when the room is changed.
	 *
	 * @example
	 * ```js
	 * client.on('roomChange', (after, before) => {
	 * 	console.log('The room changed from '+before.name+' to '+after.name);
	 * })
	 * ```
	 */
	roomChange: (after: Room, before: Room) => void;
	/**
	 * Emitted when the room being attempted to enter needs a password.
	 */
	roomPassworded: (name: string) => void;
	/**
	 * Emitted when the room playerList is updated.
	 */
	roomPlayersUpdate: (after: RoomPlayer[], before: RoomPlayer[]) => void;
	/**
	 * Emitted when the room playerList is updated.
	 */
	roomPlayerUpdate: (after: RoomPlayer, before: RoomPlayer | undefined) => void;
	/**
	 * Emitted when a player left the room.
	 */
	roomPlayerLeave: (player: Player) => void;
	/**
	 * Emitted when a new player entered the room.
	 */
	roomPlayerEnter: (player: RoomPlayer) => void;
	/**
	 * Emitted when a player dies
	 */
	roomPlayerDie: (player: RoomPlayer) => void;
	/**
	 * Emitted when a player get the cheese
	 */
	roomPlayerGetCheese: (player: RoomPlayer) => void;
	/**
	 * Emitted when a player enters the hole
	 */
	roomPlayerEnterHole: (player: RoomPlayer, order: number, time: number) => void;

	/* -------------------------------------------------------------------------- */
	/*                                   Friend                                   */
	/* -------------------------------------------------------------------------- */

	/**
	 * Emitted when the client received the friend list
	 */
	friendList: (friends: Map<string, Friend>) => void;
	/**
	 * Emitted when friend state is changed (e.g. room, gender).
	 */
	friendUpdate: (friendNew: Friend, friendOld: Friend) => void;
	/**
	 * Emitted when a friend is added to friend list
	 */
	friendAdd: (friend: Friend) => void;
	/**
	 * Emitted when a friend is removed from friend list
	 */
	friendRemove: (friend: Friend) => void;
	/**
	 * Emitted when a friend is connected
	 */
	friendConnect: (friend: Friend) => void;
	/**
	 * Emitted when a friend is disconnected
	 */
	friendDisconnect: (friend: Friend) => void;

	/* -------------------------------------------------------------------------- */
	/*                                Chat Channel                                */
	/* -------------------------------------------------------------------------- */

	/**
	 * Emitted when received /who result
	 */
	channelWho: (channel: Channel, players: TribullePlayer[], fingerprint: number) => void;
	/**
	 * Emitted when client joined a chat channel
	 */
	channelJoin: (channel: Channel) => void;
	/**
	 * Emitted when client left a chat channel
	 */
	channelLeave: (channel: Channel) => void;
	/**
	 * Emitted when a message is sent to a channel
	 */
	channelMessage: (channelMessage: ChannelMessage) => void;

	/* -------------------------------------------------------------------------- */
	/*                                    Tribe                                   */
	/* -------------------------------------------------------------------------- */

	/**
	 * Emitted when a tribe member updated
	 */
	tribeMemberUpdate: (member: Member) => void;
	/**
	 * Emitted when a tribe message is received
	 */
	tribeMessage: (message: TribulleMessage) => void;
	/**
	 * Emitted when a tribe member connected
	 */
	tribeMemberConnect: (name: string) => void;
	/**
	 * Emitted when a tribe member disconnected
	 */
	tribeMemberDisconnect: (name: string) => void;
	/**
	 * Emitted when tribe information received
	 */
	tribe: (tribe: Tribe | null) => void;

	/**
	 * Emitted when a player sends a whisper message to the client.
	 */
	whisper: (message: WhisperMessage) => void;
}

export default ClientEvents;
