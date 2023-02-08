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
exports.groupService = void 0;
const typeorm_1 = require("typeorm");
const mysql_1 = require("../database/mysql");
const group_user_entity_1 = require("../database/mysql/entity/group-user.entity");
const group_entity_1 = require("../database/mysql/entity/group.entity");
const user_service_1 = require("./user.service");
exports.groupService = {
    /**
     * @description 查询用户所在的群
     * @param group_id
     * @returns
     */
    getUserIdsById(group_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield mysql_1.connection.getRepository(group_user_entity_1.GroupUserEntity).find({
                where: {
                    group_id: group_id
                }
            });
            return list;
        });
    },
    /**
     * @description 查询群的用户列表
     * @param params
     * @returns
     */
    getUserListById(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield mysql_1.connection.getRepository(group_user_entity_1.GroupUserEntity).find({
                where: {
                    group_id: params.id
                }
            });
            const users = yield user_service_1.userService.getByIds(list.map((it) => it.user_id));
            return {
                list: users
            };
        });
    },
    /**
     * @description 查询群信息
     * @param params
     * @returns
     */
    get_group_info_by_id_list(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return mysql_1.connection.getRepository(group_entity_1.GroupEntity).find({
                where: {
                    id: (0, typeorm_1.In)(params.id_list)
                }
            });
        });
    }
};
