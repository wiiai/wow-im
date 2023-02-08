"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePort = void 0;
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}
exports.normalizePort = normalizePort;
