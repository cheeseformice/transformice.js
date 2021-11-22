# Changelog
This project adheres to [Semantic Versioning (semver)](https://semver.org/spec/v2.0.0.html).

It is recommended to keep the client up-to-date with latest versions to avoid possible breakage with each update to the game's protocol.

## 1.0.0-rc - Unreleased
Maintenance of the module has moved to [Cheeseformice](https://github.com/cheeseformice/transformice.js). The package is renamed to `@cheeseformice/transformice.js`.

## Added
- Supports accounts with Bot role.
- `Client` supports option `password` to set the default login room.
- ByteArray can work natively with Node `Buffer`, with support for `readBufBytes` and `writeBufBytes`.
- ByteArray supports `.toString("printable")` for debugging, as a convenience to calling `jsesc`.

## Changes
- `BREAKING` Dropped support for authentication keys login. You must use a approved bot account now.
- `BREAKING` Targets minimally ES6 CommonJS now.
- `BREAKING` Changed all the typing for `enums` to use TypeScript enums instead of plain JS objects. Renamed several enum type names.
- Exposed `Identifier` and `IdentifierSplit` for those who wish to manipulate raw packets.

## Fixed
- Login now works with Transformice protocol to date.

## 1.0.0-beta.1 - 2021-01-04
This is the initial beta version by SuspiciousLookingOwl.
