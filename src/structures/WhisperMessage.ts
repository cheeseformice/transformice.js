import { TribullePlayer, TribulleMessage } from ".";
import Client from "../client";
import { TribulleCommunity } from "../enums";

/** Represents a whisper message. */
export default class WhisperMessage extends TribulleMessage {
	/**
	 * The player name who sent to them.
	 */
	sentTo: TribullePlayer;
	community: TribulleCommunity;

	/**
	 * @hidden
	 */
	constructor(
		client: Client,
		author: TribullePlayer,
		community: TribulleCommunity,
		sentTo: TribullePlayer,
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
