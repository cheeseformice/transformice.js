import { ChatPlayer, Message } from ".";
import Client from "../client";
import { ChatCommunity } from "../enums";

/** Represents a whisper message. */
export default class WhisperMessage extends Message {
	/**
	 * The player name who sent to them.
	 */
	sentTo: ChatPlayer;
	community: ChatCommunity;

	/**
	 * @hidden
	 */
	constructor(
		client: Client,
		author: ChatPlayer,
		community: ChatCommunity,
		sentTo: ChatPlayer,
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
