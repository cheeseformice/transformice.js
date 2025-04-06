# Transformice.js

Transformice.js is a [Node.js](https://nodejs.org) Client for Transformice that allows you to create bots. It comes with full support for CommonJS and Typescript typings.

- [Read the docs](https://cheeseformice.github.io/transformice.js/)
- [Read the changelogs](https://github.com/cheeseformice/transformice.js/blob/main/CHANGELOG.md)

Transformice.js was originally created by [SuspiciousLookingOwl](https://github.com/SuspiciousLookingOwl/transformice.js). It is currently being maintained on Cheeseformice.

## Authentication

To use this client, you must log in with an approved in-game bot account. Bot account [applications](https://forms.gle/N6Et1hLGQ9hmg95F6) are closed indefinitely. There is no formal task force to manage such applications at the moment, however if you have a project in need of a bot account, please feel free to reach out to a member of the Module Team or myself on the Atelier 801 forums.

Please note that we will only consider legitimate use cases that provide value-add to the game and will not entertain bots solely for personal use. Final approval is subject to higher decision-making.

## Development

Clone the repository:

```
git clone https://github.com/cheeseformice/transformice.js
```

Install dependencies:

```
pnpm i
```

Watch and compile files:

```
pnpm run dev
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

## Acknowledgements

* Thanks [Owl](https://github.com/SuspiciousLookingOwl) for pioneering the bulk of Transformice.js.
* Thanks to Athes for [detfm](https://github.com/Athesdrake/detfm). I no longer have to read garbled nonsense to get the packet structure.
* Thanks to [friedkeenan](https://github.com/friedkeenan) for maintaining the exhaustive packet documentation in [caseus](https://github.com/friedkeenan/caseus). Saves me the manual labour needing to sherlock holmes those myself.

### Similar projects

If you would like a different flavor to write your bot in, you may check out the other similar Transformice clients:

* [aiotfm](https://github.com/Athesdrake/aiotfm) - Python
* [Transfromage](https://github.com/Lautenschlager-id/Transfromage) - Lua
* [cheesy.js](https://github.com/Turkitutu/cheesy.js) - Another Node.js client
