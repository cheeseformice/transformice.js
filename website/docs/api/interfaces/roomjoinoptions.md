---
id: "roomjoinoptions"
title: "Interface: RoomJoinOptions"
sidebar_label: "RoomJoinOptions"
---

## Hierarchy

* **RoomJoinOptions**

## Properties

### auto

• `Optional` **auto**: boolean

Lets the server decide which room to join. (Default: `false`)

___

### language

• `Optional` **language**: [ValueOf](../globals.md#valueof)<*typeof* languages\>

The community of the room to join.

___

### password

• `Optional` **password**: string

The password of the room to join.
If given, `language` and `auto` parameters are ignored.
