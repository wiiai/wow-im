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
const express_1 = require("express");
const user_service_1 = require("../service/user.service");
const router = (0, express_1.Router)();
router.post('/login', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = req.body;
        const data = yield user_service_1.userService.login(params);
        res.json(data);
    });
});
router.post('/auth_register', function (req, res, next) {
    res.json({
        name: 'hello',
    });
});
// 获取用户信息
router.post('/query_user_info', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers['token'];
        const data = yield user_service_1.userService.getUserByToken(token);
        res.json({
            data: data
        });
    });
});
router.post('/check_login', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers['token'];
        const status = yield user_service_1.userService.check_login(token);
        res.json({
            data: {
                status
            }
        });
    });
});
exports.default = router;
