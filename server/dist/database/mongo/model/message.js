"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    // 发送者用户 ID
    suid: { type: Number, required: true },
    // 接收者 ID, 如果是单聊信息，则为 user_id，如果是群组消息，则为 group_id
    rid: { type: Number, required: true },
    // 消息的类型 1(文字) 2(图片) 3(视频) 4(语音)
    type: { type: Number, required: true },
    // 标题
    title: { type: String, required: false },
    // 消息内容
    content: { type: String, required: true },
    // 文件大小
    size: { type: Number, required: false },
    // 是否为群聊
    is_group: { type: Boolean, required: true },
    // 发送时间
    create_time: { type: Date, required: true },
    // 消息序号
    time: { type: Number, required: true, default: () => Date.now() },
});
const MessageModel = (0, mongoose_1.model)('Message', schema);
exports.MessageModel = MessageModel;
