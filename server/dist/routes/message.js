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
const message_service_1 = require("../service/message.service");
const session_service_1 = require("../service/session.service");
const user_service_1 = require("../service/user.service");
const router = (0, express_1.Router)();
router.post('/query_session_list', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers['token'];
        const user = yield user_service_1.userService.getUserByToken(token);
        if (user) {
            const data = yield session_service_1.sessionService.querySession({ userId: user.id });
            res.json({
                data
            });
        }
        else {
            res.json({
                message: '未登录'
            });
        }
    });
});
router.post('/query_unread_list', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers['token'];
        const user = yield user_service_1.userService.getUserByToken(token);
        const body = req.body;
        if (user) {
            const data = yield message_service_1.messageService.queryUnRead(user.id, {
                rid: body.rid,
                is_group: body.is_group
            });
            res.json({
                data
            });
        }
        else {
            res.json({
                message: '未登录'
            });
        }
    });
});
router.post('/query_history_list', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers['token'];
        const user = yield user_service_1.userService.getUserByToken(token);
        const body = req.body;
        if (user) {
            const data = yield message_service_1.messageService.queryHistoryMessage(user.id, {
                seq: body.seq,
                partner_id: body.rid,
                is_group: body.is_group,
            });
            res.json({
                data
            });
        }
        else {
            res.json({
                message: '未登录'
            });
        }
    });
});
exports.default = router;
