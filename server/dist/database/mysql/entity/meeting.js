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
exports.MeetingEntity = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("./base");
// 用户基础信息表
let MeetingEntity = class MeetingEntity extends base_1.BasicEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MeetingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '会议ID' }),
    __metadata("design:type", String)
], MeetingEntity.prototype, "no", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '会议名称' }),
    __metadata("design:type", String)
], MeetingEntity.prototype, "name", void 0);
MeetingEntity = __decorate([
    (0, typeorm_1.Entity)('meeting_tab')
], MeetingEntity);
exports.MeetingEntity = MeetingEntity;
