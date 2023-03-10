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
exports.FriendEntity = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("./base");
// 用户基础信息表
let FriendEntity = class FriendEntity extends base_1.BasicEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FriendEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '拥有者' }),
    __metadata("design:type", Number)
], FriendEntity.prototype, "suid", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: '目标用户' }),
    __metadata("design:type", Number)
], FriendEntity.prototype, "tuid", void 0);
FriendEntity = __decorate([
    (0, typeorm_1.Entity)('friend_tab')
], FriendEntity);
exports.FriendEntity = FriendEntity;
