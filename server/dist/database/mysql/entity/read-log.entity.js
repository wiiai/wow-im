"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadLogEntity = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("./base");
// 阅读日志表
let ReadLogEntity = class ReadLogEntity extends base_1.BasicEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ReadLogEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '所属用户' }),
    __metadata("design:type", Number)
], ReadLogEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '对话者id (room_id or user_id)' }),
    __metadata("design:type", Number)
], ReadLogEntity.prototype, "rid", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '是否为群模式', type: 'tinyint', default: 0 }),
    __metadata("design:type", Number)
], ReadLogEntity.prototype, "is_room", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '阅读标记时间', type: 'bigint', default: 0 }),
    __metadata("design:type", Number)
], ReadLogEntity.prototype, "time", void 0);
ReadLogEntity = __decorate([
    (0, typeorm_1.Entity)('read_log_tab')
], ReadLogEntity);
exports.ReadLogEntity = ReadLogEntity;
