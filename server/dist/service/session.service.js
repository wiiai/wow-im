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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionService = void 0;
const message_1 = require("../database/mongo/model/message");
const session_1 = require("../database/mongo/model/session");
const group_service_1 = require("./group.service");
const user_service_1 = require("./user.service");
const sessionService = {
    /**
     * @description 创建或者更新
     * @param params
     */
    saveSession(params, user, msg) {
        return __awaiter(this, void 0, void 0, function* () {
            const { suid, rid } = params, rest = __rest(params, ["suid", "rid"]);
            {
                // 给发送者创建 session
                const one = yield session_1.SessionModel.findOne({
                    $or: [
                        {
                            suid,
                            rid,
                            is_group: rest.is_group,
                        },
                    ],
                });
                if (one) {
                    yield session_1.SessionModel.updateOne({ _id: one._id }, Object.assign(Object.assign({}, rest), { last_message_id: msg._id }));
                }
                else {
                    const session = new session_1.SessionModel(Object.assign(Object.assign({ suid,
                        rid }, rest), { last_message_id: msg._id }));
                    yield session.save();
                }
            }
            {
                // 给接收者创建 session
                const one = yield session_1.SessionModel.findOne({
                    $or: [
                        {
                            suid: rid,
                            rid: suid,
                            is_group: rest.is_group,
                        },
                    ],
                });
                if (one) {
                    yield session_1.SessionModel.updateOne({ _id: one._id }, Object.assign(Object.assign({}, rest), { last_message_id: msg._id }));
                }
                else {
                    const session = new session_1.SessionModel(Object.assign(Object.assign({ suid: rid, rid: suid }, rest), { last_message_id: msg._id }));
                    yield session.save();
                }
            }
        });
    },
    /**
     * @description 查询聊天列表
     * @param params
     */
    querySession(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield session_1.SessionModel.find({
                $or: [
                    {
                        suid: params.userId,
                    },
                ],
            });
            if (!list.length) {
                return {
                    list,
                };
            }
            const user_id_list = list.filter((it) => !it.is_group).map((it) => it.rid);
            const group_id_list = list.filter((it) => it.is_group).map((it) => it.rid);
            const lastMessages = yield Promise.all(list.map((it) => {
                return message_1.MessageModel.findOne({ _id: it.last_message_id });
            }));
            const users = yield user_service_1.userService.getByIds(user_id_list);
            const groups = yield group_service_1.groupService.get_group_info_by_id_list({
                id_list: group_id_list,
            });
            // 好友
            const friendSession = yield Promise.all(users.map((it) => __awaiter(this, void 0, void 0, function* () {
                return {
                    partner_id: it.id,
                    nickname: it.nickname,
                    avatar: it.avatar,
                    is_group: false,
                };
            })));
            // 群组
            const groupSession = yield Promise.all(groups.map((it) => __awaiter(this, void 0, void 0, function* () {
                return {
                    partner_id: it.id,
                    nickname: it.name,
                    avatar: it.avatar,
                    is_group: true,
                };
            })));
            return {
                list: list.map((it) => {
                    const rInfo = it.is_group
                        ? groupSession.find((g) => g.partner_id === it.rid)
                        : friendSession.find((g) => g.partner_id === it.rid);
                    const last_message = lastMessages.find((m) => {
                        var _a;
                        return (m === null || m === void 0 ? void 0 : m._id.toString()) === ((_a = it.last_message_id) === null || _a === void 0 ? void 0 : _a.toString());
                    });
                    return Object.assign(Object.assign({}, rInfo), { last_message });
                }),
            };
        });
    },
};
exports.sessionService = sessionService;
