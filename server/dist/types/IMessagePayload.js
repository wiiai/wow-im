"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgTypeEnum = exports.CmdEnum = void 0;
var CmdEnum;
(function (CmdEnum) {
    CmdEnum[CmdEnum["private_chat"] = 0] = "private_chat";
    CmdEnum[CmdEnum["group_chat"] = 1] = "group_chat";
})(CmdEnum = exports.CmdEnum || (exports.CmdEnum = {}));
var MsgTypeEnum;
(function (MsgTypeEnum) {
    MsgTypeEnum[MsgTypeEnum["text"] = 0] = "text";
    MsgTypeEnum[MsgTypeEnum["image"] = 1] = "image";
    MsgTypeEnum[MsgTypeEnum["audio"] = 2] = "audio";
})(MsgTypeEnum = exports.MsgTypeEnum || (exports.MsgTypeEnum = {}));
