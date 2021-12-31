# Changelog
This project adheres to [Semantic Versioning (semver)](https://semver.org/spec/v2.0.0.html).

It is recommended to keep the client up-to-date with latest versions to avoid possible breakage with each update to the game's protocol.

## 1.0.0-rc.2 - 2021-12-31
## Added
- Supports alternative IP fetching strategy using client options.

## 1.0.0-rc.1 - 2021-12-09
Maintenance of the module has moved to [Cheeseformice](https://github.com/cheeseformice/transformice.js). The package is renamed to `@cheeseformice/transformice.js`.

## Added
- Supports accounts with Bot role.
- `Client` supports option `password` to set the default login room.
- ByteArray can work natively with Node `Buffer`, with support for `readBufBytes` and `writeBufBytes`.
- ByteArray supports `.toString("printable")` for debugging, as a convenience to calling `jsesc`.
- Added `bulleConnect` event triggered on bulle connection. Note that the `bulleConnect` event was never part of `connect` and is newly added.
- Add `Channel` aliases for `getPlayers`, `join` and `leave`.
- Add client intents to ClientOptions. For now, this only contains `friendList` which is enabled by default.
- Supports a maintained `Client.friends` list when the intent `friendList` is not disabled.
- Added `tribulleConnect` event triggered on tribulle connection packet. This is equivalent to `ready` prior to this.

## Changes
- `BREAKING` Dropped support for authentication keys login. You must use a approved bot account now.
- `BREAKING` Targets minimally ES6 CommonJS now.
- `BREAKING` Changed all the typing for `enums` to use TypeScript enums instead of plain JS objects. Renamed several enum type names.
- `BREAKING` Separated `bulleConnectionError` from the regular `connectionError` event.
- `BREAKING` Renamed `ChatCommunity` to `TribulleCommunity`.
- `BREAKING` `WhisperMessage.sentTo` changed from a string to `TribullePlayer`. `Friend`, `Member` now inherits from `TribullePlayer`. This allows direct matching to be done without .toLowerCase(), e.g.
```js
client.on("whisper", (message) => {
    const toSelf = message.client.name === message.sentTo.name;
});
```
- `BREAKING` `Client.channels` changed from an array to a `Map` for performance gain when modifying the channels list.
- `BREAKING` The event signatures for `friendList`, `friendAdd`, `friendRemove`, `friendConnect`, `friendDisconnect`, `channelWho`, `channelJoin`, `channelLeave` have changed to pass specific `Friend` and `Client` objects respectively.
- Exposed `Identifier` and `IdentifierSplit` for those who wish to manipulate raw packets.
- Exposed `Client` main and bulle connections. This is useful for debugging server connections.
- `ready` event waits for the friend list to be populated before emitting (only for `friendList` intent users). Use `tribulleConnect` event for the prior definition of `ready`.

## Fixed
- Login now works with Transformice protocol to date.
- Removed an accidental delay when the bulle server connection failed.
- Fixes: Sometimes `connectionError` event does not fire when the server shuts down.

## 1.0.0-beta.1 - 2021-01-04
This is the initial beta version by SuspiciousLookingOwl.
