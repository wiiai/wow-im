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
exports.userService = void 0;
const crypto_js_1 = require("crypto-js");
const typeorm_1 = require("typeorm");
const mysql_1 = require("../database/mysql");
const user_entity_1 = require("../database/mysql/entity/user.entity");
const redis_1 = require("../database/redis");
const passwordGenerator = require('generate-password');
/**
 * @description 获取登录 key (redis)
 * @returns
 */
function genLoginToken() {
    const key = passwordGenerator.generate({
        length: 10,
        numbers: true,
    });
    return (0, crypto_js_1.MD5)(`${key}`).toString();
}
const userService = {
    /**
     * @description 登录
     * @param params
     * @returns
     */
    login(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = mysql_1.connection.getRepository(user_entity_1.UserEntity);
            const { account, password } = params;
            const user = yield userRepo.findOne({
                where: {
                    account,
                    password,
                },
            });
            if (!user) {
                return null;
            }
            const token = genLoginToken();
            yield redis_1.redisClient.set(token, `${user.id}`);
            const data = Object.assign(Object.assign({}, user), { token });
            return { data, };
        });
    },
    // 退出登录
    logout() { },
    // 注册
    register() { },
    // 用户用户信息
    getUserInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            // return this.getUserByToken();
        });
    },
    /**
     * @description 判断是否登录
     * @param token
     * @returns
     */
    check_login(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                return false;
            }
            const info = yield this.getUserByToken(token);
            return info ? true : false;
        });
    },
    /**
     * @description 根据 token 获取用户信息
     * @returns
     */
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = mysql_1.connection.getRepository(user_entity_1.UserEntity);
            const userId = yield this.getUserIdByToken(token);
            const user = yield userRepo.findOne({
                where: {
                    id: Number(userId),
                },
            });
            return user;
        });
    },
    /**
     * @description 通过 token 获取 user id
     * @param token
     * @returns
     */
    getUserIdByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = yield redis_1.redisClient.get(token);
            return userId;
        });
    },
    getByIds(list) {
        return mysql_1.connection.getRepository(user_entity_1.UserEntity).findBy({
            id: (0, typeorm_1.In)(list)
        });
    },
    queryProfile(list) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield mysql_1.connection.getRepository(user_entity_1.UserEntity).findBy({
                id: (0, typeorm_1.In)(list)
            });
            return data.map(({ nickname, avatar, id }) => ({
                nickname,
                avatar,
                id
            }));
        });
    }
};
exports.userService = userService;
