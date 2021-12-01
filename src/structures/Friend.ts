import Client from "../client";
import { Game, Gender } from "../enums";
import { ByteArray } from "../utils";
import TribullePlayer from "./TribullePlayer";

/** Represents a friend from the friend list */
export default class Friend extends TribullePlayer {
	/**
	 * The player's id
	 */
	id: number;
	/**
	 * The player's gender
	 */
	gender: Gender;
	/**
	 * If the player has an avatar
	 */
	hasAvatar: boolean;
	/**
	 * If the player is the soulmate of the client
	 */
	isSoulmate: boolean;
	/**
	 * If the player has added the client back
	 */
	hasAddedBack: boolean;
	/**
	 * If the player is connected
	 */
	isConnected: boolean;
	/**
	 * The game that the player is playing
	 */
	game: Game;
	/**
	 * The room name of the player (if they are online)
	 */
	roomName: string;
	/**
	 * The player's last connection time
	 */
	lastConnection: number;

	/**
	 * @hidden
	 */
	constructor(client: Client) {
		super(client);
		this.id = 0;
		this.gender = 0;
		this.hasAvatar = false;
		this.isSoulmate = false;
		this.hasAddedBack = false;
		this.isConnected = false;
		this.game = 0;
		this.roomName = "";
		this.lastConnection = 0;
	}

	/**
	 * Returns friend data from a packet
	 *
	 * @hidden
	 */
	read(packet: ByteArray, isSoulmate: boolean) {
		this.id = packet.readInt();
		this.setCpName(packet.readUTF());
		this.gender = packet.readByte();
		this.hasAvatar = packet.readInt() != 0;
		this.isSoulmate = isSoulmate;
		this.hasAddedBack = packet.readBoolean();
		this.isConnected = packet.readBoolean();
		this.game = packet.readInt();
		this.roomName = packet.readUTF();
		this.lastConnection = packet.readInt();
		return this;
	}

	/**
	 * The player's avatar url
	 */
	get avatar() {
		return "https://avatars.atelier801.com/" + (this.hasAvatar
			? `${this.id % 10000}/${this.id}.jpg`
			: "0/0.jpg");
	}
}
