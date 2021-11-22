# Transformice.js (WIP)

**NOTICE: The client is still in the Beta stage and may be prone to merciless API compatibility breakage.**

Transformice.js is a [Node.js](https://nodejs.org) Client for Transformice that allows you to create bots. It comes with full support for CommonJS and Typescript typings.

<!-- WIP -->
<!--[Read the docs](https://transformice-js.netlify.app/docs/)-->
[Read the changelogs](https://github.com/cheeseformice/transformice.js/blob/main/CHANGELOG.md)

Transformice.js is originally created and maintained by [SuspiciousLookingOwl](https://github.com/SuspiciousLookingOwl/transformice.js). This is the maintained continuation on Cheeseformice.

## Authentication

To use this client, you must have an authenticated account in-game. You will need to [apply on this form](https://forms.gle/N6Et1hLGQ9hmg95F6). If you get accepted, you will be able to choose an account (except your main account) to get the _bot role_ - and thus, being able to use the client.

See below to know the names of Transfromage managers who handle the token system.
- **[Tocutoeltuco](https://github.com/Tocutoeltuco)** @discord=> `Tocu#0018` <sub>`212634414021214209`</sub>;
- **[Blank3495](https://github.com/Blank3495)** @discord=> `󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪#8737` <sub>`436703225140346881`</sub>;
- **[Bolodefchoco](https://github.com/Lautenschlager-id)** @discord=> `Lautenschlager#2555` <sub>`285878295759814656`</sub>.

## Similar projects

If you would like a different flavor to write your bot in, you may check out the other similar Transformice clients:

* [aiotfm](https://github.com/Athesdrake/aiotfm) - Python
* [Transfromage](https://github.com/Tocutoeltuco/transfromage) - Lua
* [cheesy.js](https://github.com/Turkitutu/cheesy.js) - Another Node.js client

## Development

Clone the repository:

```
git clone https://github.com/cheeseformice/transformice.js
```

Install dependencies:

```
npm i
```

Watch and compile files:

```
npm run dev
```

## Example

```js
const { Client, enums } = require("@cheeseformice/transformice.js");

const client = new Client("username", "password", {
	language: enums.Language.en
});

client.on("roomMessage", (message) => {
	if (client.name === message.author.name) return;
	client.sendRoomMessage(message.author.look);
});

client.run();
```
