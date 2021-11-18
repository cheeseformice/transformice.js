import Client from "./Client";
import { Connection } from "../utils";
import { OldIdentifier } from "../enums";

/**
 * @hidden
 */
interface OldPacketHandlerIndex {
	[index: number]: (this: Client, conn: Connection, ccc: number, data: string[]) => void;
}

/**
 * @hidden
 */
class OldPacketHandler {
	static [OldIdentifier.roomPlayerLeft](
		this: Client,
		_conn: Connection,
		_ccc: number,
		data: string[]
	) {
		const player = this.room.getPlayer(+data[0]);
		if (player) {
			this.room.removePlayer(+data[0]);
			this.emit("roomPlayerLeave", player);
		}
	}

	static [OldIdentifier.roomPlayerDie](
		this: Client,
		_conn: Connection,
		_ccc: number,
		data: string[]
	) {
		const player = this.room.getPlayer(+data[0]);
		if (player) {
			player.score = +data[2];
			player.isDead = true;
			this.emit("roomPlayerDie", player);
		}
	}
}

export default (OldPacketHandler as unknown) as OldPacketHandlerIndex;
