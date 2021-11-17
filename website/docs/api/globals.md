---
id: "globals"
title: "@cheeseformice/transformice.js"
sidebar_label: "Globals"
---

## Index

### Enumerations

* [ChatCommunity](enums/chatcommunity.md)
* [Emote](enums/emote.md)
* [Game](enums/game.md)
* [GameCommunity](enums/gamecommunity.md)
* [Gender](enums/gender.md)
* [Language](enums/language.md)
* [Role](enums/role.md)
* [RoomMode](enums/roommode.md)
* [Smile](enums/smile.md)
* [WhisperState](enums/whisperstate.md)

### Classes

* [Base](classes/base.md)
* [ByteArray](classes/bytearray.md)
* [Channel](classes/channel.md)
* [ChannelMessage](classes/channelmessage.md)
* [Client](classes/client.md)
* [Friend](classes/friend.md)
* [Member](classes/member.md)
* [Message](classes/message.md)
* [Player](classes/player.md)
* [Profile](classes/profile.md)
* [Rank](classes/rank.md)
* [Room](classes/room.md)
* [RoomMessage](classes/roommessage.md)
* [RoomPlayer](classes/roomplayer.md)
* [Tribe](classes/tribe.md)
* [WhisperMessage](classes/whispermessage.md)

### Interfaces

* [ClientEvents](interfaces/clientevents.md)
* [ClientOptions](interfaces/clientoptions.md)
* [RoomJoinOptions](interfaces/roomjoinoptions.md)

### Type aliases

* [ValueOf](globals.md#valueof)

### Functions

* [Identifier](globals.md#identifier)
* [IdentifierSplit](globals.md#identifiersplit)

## Type aliases

### ValueOf

Ƭ  **ValueOf**<T\>: T[keyof T]

#### Type parameters:

Name |
------ |
`T` |

## Functions

### Identifier

▸ `Const`**Identifier**(`c`: number, `cc`: number): number

Joins 2 separate bytes of a packet code (c, cc) into a 16-bit short integer.

#### Parameters:

Name | Type |
------ | ------ |
`c` | number |
`cc` | number |

**Returns:** number

___

### IdentifierSplit

▸ `Const`**IdentifierSplit**(`identifier`: number): [number, number]

Splits a 16-bit short integer into 2 separate bytes of a packet code (c, cc).

#### Parameters:

Name | Type |
------ | ------ |
`identifier` | number |

**Returns:** [number, number]
