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
const friend_service_1 = require("../service/friend.service");
const user_service_1 = require("../service/user.service");
const router = (0, express_1.Router)();
router.post('/query_friend_list', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers['token'];
        const data = yield friend_service_1.friendService.queryFriend({ token });
        res.json({
            data
        });
    });
});
router.post('/queryProfile', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { list } = req.body;
        const data = yield user_service_1.userService.queryProfile(list);
        res.json({
            data
        });
    });
});
router.post('/add_friend', function (req, res) {
    res.json({
        name: 'hello',
    });
});
router.post('/remove_friend', function (req, res) {
    res.json({
        name: 'hello',
    });
});
exports.default = router;
