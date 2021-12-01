import { Channel, TribullePlayer, TribulleMessage } from ".";
import Client from "../client";
import { TribulleCommunity } from "../enums";

/** Represents a Channel message. */
export default class ChannelMessage extends TribulleMessage {
	/**
	 * Community of the author that sends the message
	 */
	community: TribulleCommunity;
	/**
	 * The Channel the message is sent to
	 */
	channel: Channel;

	/**
	 * @hidden
	 */
	constructor(
		client: Client,
		author: TribullePlayer,
		content: string,
		community: TribulleCommunity,
		channel: Channel
	) {
		super(client, author, content);
		this.community = community;
		this.channel = channel;
	}

	/**
	 * Reply the author with a message.
	 *
	 * @example
	 * ```js
	 * client.on('channelMessage', (message) => {
	 * 	if (client.name === message.author.name)
	 * 		return;
	 * 	message.reply('Hello');
	 * }
	 * ```
	 */
	reply(message: string) {
		this.client.sendChannelMessage(this.channel.name, `@${this.author.name} ${message}`);
	}
}
