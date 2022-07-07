import Client from "../client";
import ByteArray from "../utils/ByteArray";
import Player from "./Player";

/** Represents a player from the room. */
export default class RoomPlayer extends Player {
	/**
	 * The player's gender.
	 */
	gender: number;
	/**
	 * The current items and customisation of the player’s outfit as `1;0,0,0,0,0,0,0,0,0`.
	 */
	look: string;
	/**
	 * The player's temporary code.
	 */
	pcode: number;
	/**
	 * The player's title ID.
	 */
	title: number;
	/**
	 * How many stars in the title.
	 */
	titleStars: number;
	/**
	 * The number of cheeses that the player is carrying.
	 */
	cheeses: number;
	/**
	 * Whether or not the player is dead.
	 */
	isDead: boolean;
	/**
	 * Whether or not the player is shaman.
	 */
	isShaman: boolean;
	/**
	 * Whether or not the player is vampire.
	 */
	isVampire: boolean;
	/**
	 * The player's score.
	 */
	score: number;
	/**
	 * The player's mouse color.
	 */
	mouseColor: number;
	/**
	 * The player's name color, By default : `-1`.
	 */
	nameColor: number;
	/**
	 * The player's shaman color.
	 */
	shamanColor: number;
	/**
	 * Whether or not the player is facing right.
	 */
	facingRight: boolean;
	/**
	 * Whether or not the player is moving left.
	 */
	movingLeft: boolean;
	/**
	 * Whether or not the player is moving right.
	 */
	movingRight: boolean;
	/**
	 * The player’s X coordinate.
	 */
	x: number;
	/**
	 * The player’s Y coordinate.
	 */
	y: number;
	/**
	 * The player’s X velocity.
	 */
	vx: number;
	/**
	 * The player’s Y velocity.
	 */
	vy: number;
	/**
	 * Whether or not the player is in the air.
	 */
	isJumping: boolean;
	/**
	 * The player's current respawn ID.
	 */
	respawnId: number;

	/**
	 * Whether or not the player has a cheese.
	 */
	get hasCheese() {
		return this.cheeses > 0;
	}

	/**
	 * @hidden
	 */
	constructor(client: Client) {
		super(client);
		this.gender = 0;
		this.look = "";
		this.pcode = 0;
		this.title = 0;
		this.titleStars = 0;
		this.cheeses = 0;
		this.isDead = false;
		this.isShaman = false;
		this.isVampire = false;
		this.score = 0;
		this.mouseColor = 0;
		this.nameColor = -1;
		this.shamanColor = 0;
		this.facingRight = true;
		this.movingLeft = false;
		this.movingRight = false;

		this.x = 0;
		this.y = 0;
		this.vx = 0;
		this.vy = 0;
		this.isJumping = false;
		this.respawnId = 0;
	}

	/**
	 * Reads player data from a packet.
	 *
	 * @hidden
	 */
	read(packet: ByteArray) {
		this.name = packet.readUTF();
		this.pcode = packet.readInt();
		this.isShaman = packet.readBoolean();
		const deathNum = packet.readByte(); // Unsure what values above 1 mean
		this.isDead = deathNum > 0;
		this.score = packet.readShort();
		this.cheeses = packet.readByte();
		this.title = packet.readShort();
		this.titleStars = packet.readByte() - 1;
		this.gender = packet.readByte();

		packet.readUTF(); // Unknown string '0'
		this.look = packet.readUTF();
		packet.readBoolean(); // Unknown boolean
		this.mouseColor = packet.readInt();
		this.shamanColor = packet.readInt();
		packet.readUnsignedInt(); // Unknown int
		const color = packet.readInt();
		this.nameColor = color === 0xffffffff ? -1 : color;
		this.respawnId = packet.readUnsignedByte();

		return this;
	}
}
