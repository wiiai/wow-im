"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_1 = __importDefault(require("http"));
const debug_1 = __importDefault(require("debug"));
const app_1 = __importDefault(require("./app"));
const socket_1 = require("./socket");
const normalizePort_1 = require("./utils/normalizePort");
const mysql_1 = require("./database/mysql");
const mongo_1 = require("./database/mongo");
const redis_1 = require("./database/redis");
require("./utils/constant");
const fs = __importStar(require("fs"));
const constant_1 = require("./utils/constant");
const appRoot = require('app-root-path');
let sslOptions = {
    key: fs.readFileSync(appRoot.path + "/deploy/cert/localhost+2-key.pem"),
    cert: fs.readFileSync(appRoot.path + "/deploy/cert/localhost+2.pem"), //里面的文件替换成你生成的证书
};
const debug = (0, debug_1.default)('node-im-express-ts:server');
const port = (0, normalizePort_1.normalizePort)(process.env.PORT || '3010');
const server = !constant_1.isPrd ? http_1.default.createServer(app_1.default) : http_1.default.createServer(app_1.default);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, mysql_1.initMysql)();
        yield (0, mongo_1.initMongo)();
        yield (0, redis_1.initRedis)();
        yield (0, socket_1.initSocket)(server);
        app_1.default.set('port', port);
        server.listen(port);
        server.on('error', onError);
        server.on('listening', onListening);
    });
}
bootstrap();
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + (addr === null || addr === void 0 ? void 0 : addr.port);
    debug('Listening on ' + bind);
}
