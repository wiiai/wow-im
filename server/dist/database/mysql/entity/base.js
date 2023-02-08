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
exports.BasicEntity = void 0;
const typeorm_1 = require("typeorm");
class BasicEntity {
    constructor() {
        this.create_time = new Date();
    }
}
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        name: 'lock_version',
        comment: '乐观锁版本号',
    }),
    __metadata("design:type", Number)
], BasicEntity.prototype, "lock_version", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        name: 'is_delete',
        comment: '逻辑删除 0->未删除 1->已删除',
    }),
    __metadata("design:type", Boolean)
], BasicEntity.prototype, "is_delete", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        name: 'create_time',
        default: () => 'NOW()',
        comment: '创建时间',
    }),
    __metadata("design:type", Date)
], BasicEntity.prototype, "create_time", void 0);
exports.BasicEntity = BasicEntity;
