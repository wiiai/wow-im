"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageService = void 0;
const message_1 = require("../database/mongo/model/message");
const session_1 = require("../database/mongo/model/session");
const messageService = {
    /**
     * @description 保存消息到 db
     * @param params
     */
    saveMessage(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = new message_1.MessageModel(params);
            return yield msg.save();
        });
    },
    /**
     * @description 查询未读消息, 最多查最近的1000个
     * @param params
     */
    queryUnRead(user_id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = 20;
            // 当前的已读序号
            const log = yield session_1.SessionModel.findOne({
                $or: [
                    {
                        suid: user_id,
                        rid: params.rid,
                        is_room: Number(params.is_group),
                    },
                ],
            });
            if (params.is_group) {
                // 群消息
                const list = yield message_1.MessageModel.find({
                    rid: params.rid,
                    is_group: true,
                })
                    .where('time')
                    .gt((log === null || log === void 0 ? void 0 : log.read_time) || 0)
                    .sort({
                    create_time: -1,
                })
                    .limit(size);
                return {
                    list
                };
            }
            const list = yield message_1.MessageModel.find({
                $or: [
                    {
                        rid: params.rid,
                        suid: user_id,
                        is_group: false,
                    },
                    {
                        rid: user_id,
                        suid: params.rid,
                        is_group: false,
                    },
                ],
            })
                .where('time')
                .gt((log === null || log === void 0 ? void 0 : log.read_time) || 0)
                .sort({
                create_time: -1,
            })
                .limit(size);
            return {
                list: list,
            };
        });
    },
    /**
     * @description 查询消息
     * @param params
     */
    queryHistoryMessage(user_id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const size = 20;
            if (params.is_group) {
                const list = yield message_1.MessageModel.find({
                    rid: params.partner_id,
                    is_group: true,
                })
                    .where('time')
                    .lt(params.seq || Date.now())
                    .limit(size)
                    .sort({
                    time: -1,
                });
                return {
                    list
                };
            }
            const list = yield message_1.MessageModel.find({
                $or: [
                    {
                        rid: user_id,
                        suid: params.partner_id,
                        is_group: false,
                    },
                    {
                        rid: params.partner_id,
                        suid: user_id,
                        is_group: false,
                    },
                ],
            })
                .where('time')
                .lt(params.seq || Date.now())
                .sort({
                time: -1,
            })
                .limit(size);
            return {
                list
            };
        });
    },
};
exports.messageService = messageService;
