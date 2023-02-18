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
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const group_service_1 = require("./service/group.service");
const message_service_1 = require("./service/message.service");
const session_service_1 = require("./service/session.service");
const user_service_1 = require("./service/user.service");
const IMessagePayload_1 = require("./types/IMessagePayload");
const getUrlParam_1 = require("./utils/getUrlParam");
const logger_1 = require("./utils/logger");
const userMap = {};
/**
 * @description 监听用户下线
 * @param socket
 * @param payload
 * @param user
 */
function onDisconnected(socket, user) {
    logger_1.logger.log(`user ${user === null || user === void 0 ? void 0 : user.id} disconnected`);
    delete userMap[user.id];
}
/**
 * @description 监听用户的消息
 * @param socket
 * @param payload
 * @param user
 */
function onMessage(socket, user, payload, callback) {
    console.log(payload, 222);
    switch (payload.cmd) {
        case IMessagePayload_1.CmdEnum.private_chat: {
            sendPrivateMsg(socket, user, payload, callback);
            return;
        }
        case IMessagePayload_1.CmdEnum.group_chat: {
            sendGroupMsg(socket, user, payload, callback);
            return;
        }
    }
}
/**
 * @description 私聊
 * @param socket
 * @param payload
 * @param user
 */
function sendPrivateMsg(socket, user, payload, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const rid = payload.rid;
        const rCon = userMap[rid];
        const sCon = userMap[user.id];
        const data = Object.assign(Object.assign({}, payload), { is_group: false, type: payload.type || IMessagePayload_1.MsgTypeEnum.text, suid: user.id, rid: payload.rid, title: payload.title || '', content: payload.content, create_time: new Date(), time: Date.now() });
        const msg = yield message_service_1.messageService.saveMessage(data);
        yield session_service_1.sessionService.saveSession(Object.assign({}, data), user, msg);
        // 给接收人发
        // 接收不一定在线
        rCon &&
            rCon.emit('message', Object.assign(Object.assign({}, data), { msg_no: payload.msg_no }));
        // 给发送者发
        // 发送着也不一定在线, 比如发了消息立马下线
        sCon &&
            sCon.emit('message', Object.assign(Object.assign({}, data), { msg_no: payload.msg_no }));
        callback();
    });
}
/**
 * @description 私聊
 * @param socket
 * @param payload
 * @param user
 */
function sendGroupMsg(socket, user, payload, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        const rid = payload.rid;
        const sCon = userMap[user.id];
        const rUsers = yield group_service_1.groupService.getUserIdsById(rid);
        const data = Object.assign(Object.assign({}, payload), { is_group: true, type: payload.type || IMessagePayload_1.MsgTypeEnum.text, suid: user.id, rid: payload.rid, title: payload.title || '', content: payload.content, create_time: new Date(), time: Date.now() });
        const msg = yield message_service_1.messageService.saveMessage(data);
        yield session_service_1.sessionService.saveSession(data, user, msg);
        rUsers
            .filter((it) => {
            return it.user_id !== user.id;
        })
            .forEach((it) => {
            const rCon = userMap[it.user_id];
            // 给接收人发
            // 接收不一定在线
            rCon &&
                rCon.emit('message', Object.assign(Object.assign({}, data), { msg_no: payload.msg_no }));
        });
        // 给发送者发
        // 发送着也不一定在线, 比如发了消息立马下线
        sCon &&
            sCon.emit('message', Object.assign(Object.assign({}, data), { msg_no: payload.msg_no }));
        callback();
    });
}
/**
 * @description 初始化
 * @param server
 */
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    io.on('error', (message) => {
        logger_1.logger.log('error');
    });
    setInterval(() => {
        logger_1.logger.log(`current user: ${Object.keys(userMap)}`);
    }, 10000);
    io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        const token = (0, getUrlParam_1.getUrlParam)(socket.request.url || '', 'token');
        logger_1.logger.log(`try connect: ${token}`);
        if (!token) {
            socket.disconnect();
        }
        const user = yield user_service_1.userService.getUserByToken(token || '');
        if (user) {
            userMap[user.id] = socket;
        }
        else {
            logger_1.logger.error('reject connect');
            socket.disconnect();
            return;
        }
        // 上线打印
        logger_1.logger.log(`user ${user === null || user === void 0 ? void 0 : user.id} connected`);
        // 监听断开
        socket.on('disconnect', () => onDisconnected(socket, user));
        // sdp 消息的转发
        socket.on("sdp", (data) => {
            console.log(`receive sdp: sender ${data.sender} to ${data.to}`, Boolean(userMap[data.to]));
            if (userMap[data.to]) {
                userMap[data.to].emit("sdp", {
                    description: data.description,
                    sender: data.sender,
                });
            }
        });
        // candidates 消息的转发
        socket.on("ice candidates", (data) => {
            console.log(`receive ice candidates: sender ${data.sender} to ${data.to}`, Boolean(userMap[data.to]));
            if (userMap[data.to]) {
                userMap[data.to].emit("ice candidates", {
                    candidate: data.candidate,
                    sender: data.sender,
                });
            }
        });
        // 协议转发
        function transfer(name) {
            socket.on(name, data => {
                const { to } = data, rest = __rest(data, ["to"]);
                if (userMap[to]) {
                    userMap[to].emit(name, {
                        sender: user.id,
                        nickname: user.nickname,
                        avatar: user.avatar,
                        data: rest
                    });
                }
            });
        }
        transfer('async');
        transfer('enter-screen');
        transfer('enter-screen-answer');
        // 视频聊天
        socket.on('video-call', data => {
            if (userMap[data.to]) {
                userMap[data.to].emit('video-call', {
                    sender: user.id,
                    nickname: user.nickname,
                    avatar: user.avatar
                });
            }
        });
        socket.on('video-call-answer', data => {
            if (userMap[data.to]) {
                userMap[data.to].emit('video-call-answer', {
                    status: data.status
                });
            }
        });
        // 监听消息
        socket.on('message', (message, callback) => onMessage(socket, user, message, callback));
    }));
};
exports.initSocket = initSocket;
