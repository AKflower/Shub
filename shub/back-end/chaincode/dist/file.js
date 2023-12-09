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
exports.File = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
let File = class File {
    constructor({ file_id, file_name, file_path, user_id, cid }) {
        this.file_id = file_id;
        this.file_name = file_name;
        this.file_path = file_path;
        this.cid = cid;
        this.user_id = user_id;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
};
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], File.prototype, "file_id", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], File.prototype, "file_name", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], File.prototype, "file_path", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], File.prototype, "cid", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", String)
], File.prototype, "user_id", void 0);
<<<<<<< HEAD
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", Date)
], File.prototype, "created_at", void 0);
__decorate([
    (0, fabric_contract_api_1.Property)(),
    __metadata("design:type", Date)
], File.prototype, "updated_at", void 0);
=======
>>>>>>> b53c4ea
File = __decorate([
    (0, fabric_contract_api_1.Object)(),
    __metadata("design:paramtypes", [Object])
], File);
exports.File = File;
//# sourceMappingURL=file.js.map