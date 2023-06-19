"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadLogModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    // 用户 ID
    user_id: { type: Number, required: true },
    // 如果是单聊信息，则为 user_id，如果是群组消息，则为 group_id
    puid: { type: Number, required: true },
    // 是否为群聊
    is_group: { type: Boolean, required: true },
    // 发送时间
    create_time: { type: Date, required: true },
    // 消息序号
    time: { type: Number, required: true, default: () => Date.now() },
});
const ReadLogModel = (0, mongoose_1.model)('ReadLog', schema);
exports.ReadLogModel = ReadLogModel;
