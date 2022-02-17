---
id: quickstart
title: Quick Start
sidebar_label: Quick Start
slug: /
---

## Installation
```bash
npm i @cheeseformice/transformice.js
```

## Example

```js
const { Client, enums } = require("@cheeseformice/transformice.js");

const client = new Client("username", "password", {
	language: enums.Languages.en
});

client.on("roomMessage", (message) => {
	if (client.name === message.author.name) return;
	client.sendRoomMessage(message.author.look);
});

client.run();
```

## Quick Links
- [Client API](api/classes/Client)
- [Client Events](api/interfaces/Internal.ClientEvents)
- [Enums](api/namespaces/enums)
