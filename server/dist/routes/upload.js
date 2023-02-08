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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const upload_service_1 = require("../service/upload.service");
const multer = require('multer');
// 创建 multer 的实例对象，通过dest属性指定文件的存放路径
const upload = multer({ dest: path_1.default.join(__dirname, '../../uploads') });
const router = (0, express_1.Router)();
router.post('/file', upload.single('file'), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.file);
        const data = yield (0, upload_service_1.uploadFromFilePath)(req.file.path, req.file.originalname);
        res.json({
            data: data
        });
    });
});
exports.default = router;
