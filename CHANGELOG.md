This project adheres to [Semantic Versioning (semver)](https://semver.org/spec/v2.0.0.html).

It is recommended to keep the client up-to-date with latest versions to avoid possible breakage with each update to the game's protocol.

<!--
## 1.2.3-beta.1 - Unreleased

-->

## 1.2.2 - Unreleased

### Changes
- Adds `arbitre` to Role enum
- Bulle connection ports are randomized

## 1.2.1 - 2024-12-12

This release includes some important fixes to core code.

### Fixed
- Fixed larger segmented packets not being able to dispatch on the spot, in some scenarios. ([#6](https://github.com/cheeseformice/transformice.js/issues/6), @Cassolette)

## 1.2.0 - 2024-05-02

This release includes some important fixes to run on the latest protocol.

### Added
- `Profile`: `noSkill` version of profile stats introduced by Transformice v1.691
- Add `luadev` and `fashionsquad` in Role enum

### Changes
- `BREAKING` `Client`: Switched to native fetch API for `Client.fetchIP` in favour of less dependencies. Requires Node 18 or higher. 
- Export `Connection` class.
- Export `TFMConnectionError` class. Added `TFMConnectionError.isThis(payload: any)` static method to narrow error types.
```ts
const castedConnErr: any = new TFMConnectionError("bulle") as any

if (TFMConnectionError.isThis(castedConnErr)) {
	// castedConnErr in this scope is narrowed from `any` into `TFMConnectionError`
	console.log(castedConnErr.serverType); // prints "bulle"
}
```
- `Client`: Removed no-op `languageChange` event
- `Profile`: `Profile.role` is now a `Role` type enum rather than just a number.

### Fixed
- Fixed `Profile` packed parsing offsets.

## 1.1.0 - 2023-06-03
This release includes some important fixes to run on the latest protocol.

### Added
- `Client`: New event `roomPassworded` is emitted when a room being attempted to enter needs a password.

### Changes
- `BREAKING` `Client:` Event `disconnect` will also be emitted when a connection error occurs. It will also include an optional `err` parameter, which will be `null` when the disconnection is client-triggered. ([#4](https://github.com/cheeseformice/transformice.js/issues/4), @Cassolette)

### Fixed
- Cheeseformice endpoint is dead. Replaced it with a working link and now `Client.fetchIP` works again. 
- `Client.loadLua` actually works. It previously did not include the script buffer in its outgoing packets.
- Support server updates to room joining. `Client.enterRoom` works again. `BulleIdentifier.roomPassworded` (5,39) is no longer server-bound packet and is replaced by having the password in the `BulleIdentifier.room` (5,38) packet.

## 1.0.1 - 2022-07-07
This release includes some important fixes to run on the latest protocol.

### Added
- `RoomPlayer`: New properties, `cheeses` and `respawnId`.

### Fixed
- Fixes: player list parsing was broken due to wrong offsets. ([#5](https://github.com/cheeseformice/transformice.js/pull/5), @entibo)
- `RoomPlayer`: Negative scores were not registered correctly.

## 1.0.0 - 2022-01-04
Docs site has been re-published, check it out [here](https://cheeseformice.github.io/transformice.js/).

### Fixed
- Default connection settings endpoint wasn't working. Switched to using Cheeseformice's endpoint.

## 1.0.0-rc.2 - 2021-12-31
### Added
- Supports alternative IP fetching strategy using client options.

## 1.0.0-rc.1 - 2021-12-09
Maintenance of the module has moved to [Cheeseformice](https://github.com/cheeseformice/transformice.js). The package is renamed to `@cheeseformice/transformice.js`.

### Added
- Supports accounts with Bot role.
- `Client` supports option `password` to set the default login room.
- ByteArray can work natively with Node `Buffer`, with support for `readBufBytes` and `writeBufBytes`.
- ByteArray supports `.toString("printable")` for debugging, as a convenience to calling `jsesc`.
- Added `bulleConnect` event triggered on bulle connection. Note that the `bulleConnect` event was never part of `connect` and is newly added.
- Add `Channel` aliases for `getPlayers`, `join` and `leave`.
- Add client intents to ClientOptions. For now, this only contains `friendList` which is enabled by default.
- Supports a maintained `Client.friends` list when the intent `friendList` is not disabled.
- Added `tribulleConnect` event triggered on tribulle connection packet. This is equivalent to `ready` prior to this.

### Changes
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

### Fixed
- Login now works with Transformice protocol to date.
- Removed an accidental delay when the bulle server connection failed.
- Fixes: Sometimes `connectionError` event does not fire when the server shuts down.

## 1.0.0-beta.1 - 2021-01-04
This is the initial beta version by SuspiciousLookingOwl.
