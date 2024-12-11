import net from "net";
import { EventEmitter } from "events";

import { ByteArray } from ".";
import { BulleIdentifier } from "../enums";

/**
 * Represents a client that connects to Transformice.
 */
export default class Connection extends EventEmitter {
	socket!: net.Socket;
	open: boolean;
	fingerprint: number;
	buffer: Buffer;
	length: number;

	/**
	 * Constructor.
	 * @example
	 * ```js
	 * const conn = new Connection(client, 'connectionName');
	 * ```
	 */
	constructor() {
		super();
		this.open = false;
		this.fingerprint = 0;
		this.buffer = Buffer.alloc(0);
		this.length = 0;
	}

	/**
	 * Connects the socket.
	 */
	connect(host: string, port: number) {
		this.socket = net.createConnection({ port, host }, () => {
			this.open = true;
			this.emit("connect");
		});

		this.socket.on("data", (data) => {
			this.buffer = Buffer.concat([this.buffer, data]);
			while (this.buffer.length > 0 && this.buffer.length >= this.length) {
				if (this.length === 0) {
					for (let i = 0; i < 5; i++) {
						const byte = this.buffer.subarray(0, 1)[0];
						this.buffer = this.buffer.subarray(1);
						this.length |= (byte & 127) << (i * 7);

						if (!(byte & 0x80)) break;
					}
				}

				if (this.buffer.length >= this.length) {
					this.emit("data", this, new ByteArray(this.buffer.subarray(0, this.length)));
					this.buffer = this.buffer.subarray(this.length);
					this.length = 0;
				}
			}
		});

		this.socket.once("close", () => {
			this.emit("error", new Error("Connection closed."));
			this.emit("close");
		});

		this.socket.on("error", (err: Error) => {
			this.emit("error", err);
		});
	}

	/**
	 * Sends a packet to the connection.
	 * @param {ByteArray} packet - The packet.
	 */
	send(
		identifier: BulleIdentifier,
		packet: ByteArray
	) {
		packet = new ByteArray().writeUnsignedShort(identifier).writeBytes(packet);
		const m = new ByteArray();
		let size = packet.length;
		let sizeType = size >>> 7;

		while (sizeType !== 0) {
			m.writeUnsignedByte((size & 0x7f) | 0x80);
			size = sizeType;
			sizeType >>>= 7;
		}
		m.writeUnsignedByte(size & 0x7f);
		m.writeByte(this.fingerprint);
		m.writeBytes(packet);
		this.socket.write(m.buffer);
		this.fingerprint = (this.fingerprint + 1) % 100;
	}

	/**
	 * Close the connection.
	 */
	close() {
		this.open = false;
		if (!this.socket.destroyed) {
			this.socket.removeAllListeners();
			this.socket.destroy();
		}
	}
}
