import Player from "./Player";
import Client from "../client";

/** Represents a player reported by the community platform. */
export default class ChatPlayer extends Player {
	/**
	 * The raw player's name, as directly reported by the community platform.
	 */
	chatName!: string;

	/**
	 * @hidden
	 */
	constructor(client: Client, name = "") {
		super(client);
		this.setCpName(name);
	}

	/**
	 * Sets the player's community platform name.
	 */
	protected setCpName(name: string) {
		// Convert name to be directly compatible with main/bulle format
		// E.g. player#0010 -> Player#0010
		this.name = name[0] ? (name[0].toUpperCase() + name.slice(1)) : name;
		this.chatName = name;
	}
}
