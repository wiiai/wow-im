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
exports.initRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const constant_1 = require("../../utils/constant");
const REDIS_LOGIN_PREFIX = 'im_login_';
const redisClient = (0, redis_1.createClient)({
    url: constant_1.config.redis,
});
exports.redisClient = redisClient;
function initRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        yield redisClient.connect();
    });
}
exports.initRedis = initRedis;
