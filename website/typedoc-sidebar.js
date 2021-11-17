module.exports = [
  "api/index",
  "api/globals",
  {
    "type": "category",
    "label": "Enumerations",
    "items": [
      "api/enums/chatcommunity",
      "api/enums/emote",
      "api/enums/game",
      "api/enums/gamecommunity",
      "api/enums/gender",
      "api/enums/language",
      "api/enums/role",
      "api/enums/roommode",
      "api/enums/smile",
      "api/enums/whisperstate"
    ]
  },
  {
    "type": "category",
    "label": "Classes",
    "items": [
      "api/classes/base",
      "api/classes/bytearray",
      "api/classes/channel",
      "api/classes/channelmessage",
      "api/classes/client",
      "api/classes/friend",
      "api/classes/member",
      "api/classes/message",
      "api/classes/player",
      "api/classes/profile",
      "api/classes/rank",
      "api/classes/room",
      "api/classes/roommessage",
      "api/classes/roomplayer",
      "api/classes/tribe",
      "api/classes/whispermessage"
    ]
  },
  {
    "type": "category",
    "label": "Interfaces",
    "items": [
      "api/interfaces/clientevents",
      "api/interfaces/clientoptions",
      "api/interfaces/roomjoinoptions"
    ]
  }
];