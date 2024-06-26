import { ByteArray } from "../utils";
import { Gender } from "../enums";
import Client from "../client";
import { Tribe, TribullePlayer } from ".";

/** Represents a tribe member */
export default class Member extends TribullePlayer {
	/**
	 * The member's tribe
	 */
	tribe!: Tribe;
	/**
	 * The member's id
	 */
	id!: number;
	/**
	 * The member's gender
	 */
	gender!: Gender;
	/**
	 * The player's last connection time
	 */
	lastConnection!: number;
	/**
	 * The rank id of the member
	 */
	rankId!: number;
	/**
	 * the Game ID the player is playing
	 */
	gameId!: number;
	/**
	 * The room name of the player (if they are online)
	 */
	roomName!: string;

	/**
	 * @hidden
	 */
	constructor(client: Client, member: Partial<Member> = {}) {
		super(client);
		Object.assign(this, member);
	}

	/**
	 * Returns member data from a packet
	 *
	 * @hidden
	 */
	read(packet: ByteArray) {
		this.id = packet.readInt();
		this.name = packet.readUTF();
		this.gender = packet.readByte();
		packet.readInt(); // ?
		this.lastConnection = packet.readInt();
		this.rankId = packet.readByte();
		this.gameId = packet.readInt();
		this.roomName = packet.readUTF();
		return this;
	}

	/**
	 * The rank of the member
	 */
	get rank() {
		return this.tribe.ranks[this.rankId];
	}

	/**
	 * If the player is connected
	 */
	get isConnected() {
		return this.gameId !== 1;
	}
}
