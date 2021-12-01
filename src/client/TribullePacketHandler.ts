import Client from "./Client";
import {
	Channel,
	ChannelMessage,
	TribullePlayer,
	Friend,
	Member,
	Tribe,
	WhisperMessage,
	TribulleMessage,
} from "../structures";
import { TribulleIdentifier } from "../enums";
import { ByteArray } from "../utils";

/**
 * @hidden
 */
interface TribullePacketIndex {
	[index: number]: (this: Client, packet: ByteArray) => void;
}

/**
 * @hidden
 */
class TribullePacketHandler {
	/* -------------------------------------------------------------------------- */
	/*                                   General                                  */
	/* -------------------------------------------------------------------------- */

	static [TribulleIdentifier.connect](this: Client) {
		if (this.intents.friendList ?? true) {
			this.openFriendList();
			// Try to prepare the friend list before the ready event
			this.waitFor("friendList").then(() => {
				this.emit("ready");
			}).catch(() => {
				this.emit("ready");
			});
		} else {
			this.emit("ready");
		}
		this.emit("tribulleConnect");
	}

	/* -------------------------------------------------------------------------- */
	/*                                   Whisper                                  */
	/* -------------------------------------------------------------------------- */

	static [TribulleIdentifier.whisperReceive](this: Client, packet: ByteArray) {
		const author = packet.readUTF();
		const community = packet.readUnsignedInt();
		const sentTo = packet.readUTF();
		const content = packet.readUTF();
		const message = new WhisperMessage(
			this,
			new TribullePlayer(this, author),
			community,
			new TribullePlayer(this, sentTo),
			content
		);
		this.emit("whisper", message);
	}

	/* -------------------------------------------------------------------------- */
	/*                                   Friend                                   */
	/* -------------------------------------------------------------------------- */

	static [TribulleIdentifier.friendList](this: Client, packet: ByteArray) {
		this.friends.clear();

		const soulmate = new Friend(this).read(packet, true); // soulmate
		const hasSoulmate = !(soulmate.id == 0 && soulmate.name == "");
		if (hasSoulmate) this.friends.set(soulmate.name, soulmate);
		let totalFriends = packet.readUnsignedShort();

		while (totalFriends--) {
			const friend = new Friend(this).read(packet, false);
			this.friends.set(friend.name, friend);
		}

		this.emit("friendList", this.friends);
	}

	static [TribulleIdentifier.friendUpdate](this: Client, packet: ByteArray) {
		const friendNew = new Friend(this).read(packet, false);
		const friendOld = this.friends.get(friendNew.name);
		if (!friendOld) return;

		// Not sent by the server, checked locally.
		friendNew.isSoulmate = friendOld.isSoulmate;

		this.friends.set(friendNew.name, friendNew);
		this.emit("friendUpdate", friendNew, friendOld);
	}

	static [TribulleIdentifier.friendAdd](this: Client, packet: ByteArray) {
		const friend = new Friend(this).read(packet, false);
		this.friends.set(friend.name, friend);
		this.emit("friendAdd", friend);
	}

	static [TribulleIdentifier.friendRemove](this: Client, packet: ByteArray) {
		const friend = ((id) => {
			for (const [_, val] of this.friends) {
				if (val.id === id) return val;
			}
		})(packet.readInt());
		if (!friend) return;

		this.friends.delete(friend.name);
		this.emit("friendRemove", friend);
	}

	static [TribulleIdentifier.friendConnect](this: Client, packet: ByteArray) {
		const friend = this.friends.get(packet.readUTF());
		if (!friend) return;
		this.emit("friendConnect", friend);
	}

	static [TribulleIdentifier.friendDisconnect](this: Client, packet: ByteArray) {
		const friend = this.friends.get(packet.readUTF());
		if (!friend) return;
		this.emit("friendDisconnect", friend);
	}

	/* -------------------------------------------------------------------------- */
	/*                                Chat Channel                                */
	/* -------------------------------------------------------------------------- */

	static [TribulleIdentifier.channelWho](this: Client, packet: ByteArray) {
		const fingerprint = packet.readUnsignedInt();
		packet.readUnsignedByte();
		const playerCount = packet.readUnsignedShort();
		const players: TribullePlayer[] = [];
		for (let i = 0; i < playerCount; i++) {
			players.push(new TribullePlayer(this, packet.readUTF()));
		}
		const channel = this.channels.get(this.whoList[fingerprint]);
		delete this.whoList[fingerprint];
		if (!channel) return;
		this.emit("channelWho", channel, players, fingerprint);
	}

	static [TribulleIdentifier.channelLeave](this: Client, packet: ByteArray) {
		const channel = this.channels.get(packet.readUTF());
		if (!channel) return;
		this.channels.delete(channel.name);
		this.emit("channelLeave", channel);
	}

	static [TribulleIdentifier.channelJoin](this: Client, packet: ByteArray) {
		const channel = new Channel(this, packet.readUTF());
		this.channels.set(channel.name, channel);
		this.emit("channelJoin", channel);
	}

	static [TribulleIdentifier.channelMessage](this: Client, packet: ByteArray) {
		const author = new TribullePlayer(this, packet.readUTF());
		const community = packet.readUnsignedInt();
		const channel = this.channels.get(packet.readUTF());
		const content = packet.readUTF();
		if (!channel) return;
		const message = new ChannelMessage(
			this,
			author,
			content,
			community,
			channel
		);
		this.emit("channelMessage", message);
	}

	/* -------------------------------------------------------------------------- */
	/*                                    Tribe                                   */
	/* -------------------------------------------------------------------------- */

	static [TribulleIdentifier.tribeMessage](this: Client, packet: ByteArray) {
		const author = new TribullePlayer(this, packet.readUTF());
		const message = new TribulleMessage(this, author, packet.readUTF());
		this.emit("tribeMessage", message);
	}

	static [TribulleIdentifier.tribeMemberUpdate](this: Client, packet: ByteArray) {
		this.emit("tribeMemberUpdate", new Member(this).read(packet));
	}

	static [TribulleIdentifier.tribeMemberConnect](this: Client, packet: ByteArray) {
		this.emit("tribeMemberConnect", packet.readUTF());
	}

	static [TribulleIdentifier.tribeMemberDisconnect](this: Client, packet: ByteArray) {
		this.emit("tribeMemberDisconnect", packet.readUTF());
	}

	static [TribulleIdentifier.tribeInitialReceive](this: Client, packet: ByteArray) {
		const result = packet.readByte();
		if (result == 17) {
			this.emit("tribe", null);
		}
	}

	static [TribulleIdentifier.tribeReceive](this: Client, packet: ByteArray) {
		this.emit("tribe", new Tribe(this).read(packet));
	}
}

export default (TribullePacketHandler as unknown) as TribullePacketIndex;
