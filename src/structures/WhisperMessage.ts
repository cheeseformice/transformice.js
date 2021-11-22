import { Message, Player } from ".";
import Client from "../client";
import { ChatCommunity } from "../enums";

/** Represents a whisper message. */
export default class WhisperMessage extends Message {
	/**
	 * The player name who sent to them.
	 */
	sentTo: string;
	community: ChatCommunity;

	/**
	 * @hidden
	 */
	constructor(
		client: Client,
		author: Player,
		community: ChatCommunity,
		sentTo: string,
		content: string
	) {
		super(client, author, content);
		this.sentTo = sentTo;
		this.community = community;
	}

	/**
	 * Reply the author with a whisper message
	 *
	 * @example
	 * ```js
	 * client.on('whisper', (message) => {
	 * 	if (client.name === message.author.name)
	 * 		return;
	 * 	message.reply('Hello');
	 * }
	 * ```
	 */
	reply(message: string) {
		this.client.sendWhisper(this.author.name, `${message}`);
	}
}
