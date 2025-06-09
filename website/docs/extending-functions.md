---
id: extending-functions
title: Extending Client functionality
sidebar_label: Extending Client functionality
---

## Introduction

Behind the scenes, the client and the Transformice server communicate through [`ByteArray`](api/classes/ByteArray) packets, and store states about each other.

The Transformice.js bot API aims to abstract away these details in most cases, maintaining a minimal set of events, structures, and functions that are commonly used and are cruicial to keep the bot running. However, you will soon notice that a lot of other features are not implemented.

By manipulating the ability to listen and send raw packets, you can extend the functionality of the client beyond what is provided by the base API. 

## Example

In this example, we extend the [`Client`](api/classes/Client) with an ability to grab the Lua API guide in `string` form.

`myClient.ts`
```ts
import { Base, Client, Identifier } from "@cheeseformice/transformice.js";
import { ClientOptions } from "@cheeseformice/transformice.js/dist/client/Client";
import ClientEvents from "@cheeseformice/transformice.js/dist/client/Events";
import { ByteArray, Connection } from "@cheeseformice/transformice.js/dist/utils";

export interface MyExtraClientEvents extends ClientEvents {
    longTextPopup: (popup: LongTextPopup) => void;
}

declare interface MyExtraClient {
    on<T extends keyof MyExtraClientEvents>(event: T, listener: MyExtraClientEvents[T]): this;
    once<T extends keyof MyExtraClientEvents>(event: T, listener: MyExtraClientEvents[T]): this;
    emit<T extends keyof MyExtraClientEvents>(event: T, ...args: Parameters<MyExtraClientEvents[T]>): boolean;
    waitFor<T extends keyof MyExtraClientEvents>(eventName: T, timeout?: number, condition?: (...args: Parameters<MyExtraClientEvents[T]>) => boolean): Promise<Parameters<MyExtraClientEvents[T]>>;
    waitFor<T extends keyof MyExtraClientEvents>(eventName: T, condition?: (...args: Parameters<MyExtraClientEvents[T]>) => boolean, timeout?: number): Promise<Parameters<MyExtraClientEvents[T]>>;
}

class MyExtraClient extends Client {
       startTimestamp: number;

    constructor(name: string, password: string, options?: ClientOptions) {
        super(name, password, options);
        this.startTimestamp = -1;

        this.on("login", this.onLogin.bind(this));
        this.on("rawPacket", this.handleNormalPackets.bind(this));
    }

    get uptime() {
        return Date.now() - this.startTimestamp;
    }

    private onLogin() {
        this.startTimestamp = Date.now();
    }

    private handleNormalPackets(conn: Connection, ccc: number, packet: ByteArray) {
        packet.readPosition = 2;

        switch (ccc) {
            // Long text popup
            case Identifier(28, 46): {
                const contentType = packet.readByte();
                packet.readUTF();
                const contentLen = (packet.readUnsignedByte() & 255) << 16 | (packet.readUnsignedByte() & 255) << 8 | packet.readUnsignedByte() & 255;
                const content = packet.readBufBytes(contentLen).toString();
                this.emit("longTextPopup", new LongTextPopup(this, contentType, content));
                break;
            }
        }
    }

    async getLuaHelp() {
        this.sendCommand("luahelp");
        const [popup] = await this.waitFor("longTextPopup", (popup) => popup.contentType === 2, 5000);
        return popup.content;
    }
}

class LongTextPopup extends Base {
    contentType: LongTextPopupContent;
    content: string;

    constructor(
        client: Client,
        contentType: LongTextPopupContent,
        content: string
    ) {
        super(client);
        this.contentType = contentType;
        this.content = content;
    }
}

export { MyExtraClient };
```

`main.ts`
```js
import { enums } from "@cheeseformice/transformice.js");
import { MyExtraClient } from "myClient";

// Use our newly written MyExtraClient instead of the default client provided by Transformice.js
const client = new MyExtraClient("username", "password", {
	language: enums.Languages.en
});

client.on("roomMessage", (message) => {
	if (client.name === message.author.name) return;
	client.sendRoomMessage(message.author.look);

	client.getLuaHelp()
		.then((luaHelpString: string) => {
			client.sendRoomMessage("Got Lua Help: " + luaHelpString.substring(20));
		})
		.catch((e) => {
			console.error(e)
		});
});

client.run();
```

You can use this as a boilerplate to further extend functionality for your requirements. 

## Quick Links
- [Client API](api/classes/Client)
- [Client Events](api/interfaces/Internal.ClientEvents)
- [Enums](api/namespaces/enums)
