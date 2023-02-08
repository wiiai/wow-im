"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrlParam = void 0;
function getUrlParam(url, name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var s = url.split('?')[1] || '';
    var r = s.match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
exports.getUrlParam = getUrlParam;
