import { Message } from ".";
import Client from "../client";
import TribullePlayer from "./TribullePlayer";

/** Represents a message reported by the community platform. */
export default class TribulleMessage extends Message {
	author: TribullePlayer;

	/**
	 * @hidden
	 */
	constructor(client: Client, author: TribullePlayer, content: string) {
		super(client, author, content);
		this.author = author;
	}
}
