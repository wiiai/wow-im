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
exports.friendService = void 0;
const typeorm_1 = require("typeorm");
const mysql_1 = require("../database/mysql");
const friend_entity_1 = require("../database/mysql/entity/friend.entity");
const group_user_entity_1 = require("../database/mysql/entity/group-user.entity");
const group_entity_1 = require("../database/mysql/entity/group.entity");
const user_entity_1 = require("../database/mysql/entity/user.entity");
const user_service_1 = require("./user.service");
const friendService = {
    /**
     * @description 查询通讯录
     * @param params
     * @returns
     */
    queryFriend(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield user_service_1.userService.getUserIdByToken(params.token);
            // 好友
            const list = yield mysql_1.connection.getRepository(friend_entity_1.FriendEntity).find({
                where: {
                    suid: Number(userId),
                },
            });
            // 好友信息
            const users = yield mysql_1.connection.getRepository(user_entity_1.UserEntity).find({
                where: {
                    id: (0, typeorm_1.In)(list.map((it) => it.tuid)),
                },
            });
            // 群
            const groupUser = yield mysql_1.connection.getRepository(group_user_entity_1.GroupUserEntity).find({
                where: {
                    user_id: userId
                }
            });
            // 群信息
            const groups = yield mysql_1.connection.getRepository(group_entity_1.GroupEntity).find({
                where: {
                    id: (0, typeorm_1.In)(groupUser.map((it) => it.group_id))
                }
            });
            const list1 = users.map((it) => {
                return {
                    id: it.id,
                    avatar: it.avatar,
                    nickname: it.nickname,
                };
            });
            const list2 = groups.map((it) => {
                return {
                    id: it.id,
                    avatar: it.avatar,
                    nickname: it.name,
                    is_group: true
                };
            });
            return {
                list: [...list2, ...list1],
            };
        });
    },
};
exports.friendService = friendService;
