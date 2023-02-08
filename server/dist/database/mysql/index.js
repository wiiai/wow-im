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
exports.getRepos = exports.initMysql = exports.entities = exports.connection = void 0;
const typeorm_1 = require("typeorm");
const friend_entity_1 = require("./entity/friend.entity");
const group_user_entity_1 = require("./entity/group-user.entity");
const group_entity_1 = require("./entity/group.entity");
const read_log_entity_1 = require("./entity/read-log.entity");
const user_entity_1 = require("./entity/user.entity");
const constant_1 = require("../../utils/constant");
exports.entities = [
    user_entity_1.UserEntity,
    friend_entity_1.FriendEntity,
    read_log_entity_1.ReadLogEntity,
    group_entity_1.GroupEntity,
    group_user_entity_1.GroupUserEntity
];
function initMysql() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.connection = yield (0, typeorm_1.createConnection)(Object.assign(Object.assign({}, constant_1.config.mysql), { type: 'mysql', timezone: '+08:00', dateStrings: true, logging: false, synchronize: true, entities: exports.entities }));
    });
}
exports.initMysql = initMysql;
const getRepos = (entity) => {
};
exports.getRepos = getRepos;
