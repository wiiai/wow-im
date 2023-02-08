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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("./base");
// 用户基础信息表
let UserEntity = class UserEntity extends base_1.BasicEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ comment: 'ID' }),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '账户' }),
    __metadata("design:type", String)
], UserEntity.prototype, "account", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '密码' }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '昵称' }),
    __metadata("design:type", String)
], UserEntity.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '手机号码' }),
    __metadata("design:type", String)
], UserEntity.prototype, "mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '头像地址' }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '性别' }),
    __metadata("design:type", String)
], UserEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '生日' }),
    __metadata("design:type", String)
], UserEntity.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '居住地' }),
    __metadata("design:type", String)
], UserEntity.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '毕业院校' }),
    __metadata("design:type", String)
], UserEntity.prototype, "college", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '自我介绍' }),
    __metadata("design:type", String)
], UserEntity.prototype, "introduction", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '背景图片' }),
    __metadata("design:type", String)
], UserEntity.prototype, "background", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        default: 1,
        comment: '状态 0->禁用 1->可用',
    }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "status", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)('user_tab')
], UserEntity);
exports.UserEntity = UserEntity;
