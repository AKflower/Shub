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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageFileContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const json_stringify_deterministic_1 = __importDefault(require("json-stringify-deterministic"));
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
let StorageFileContract = class StorageFileContract extends fabric_contract_api_1.Contract {
    //Init
    async InitLedger(ctx) {
        const firstfile = {
            file_id: '001',
            file_name: 'Readme.md',
            file_path: '/files',
            cid: 'abcxyz',
            user_id: '1'
        };
        await ctx.stub.putState(firstfile.file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(firstfile))));
        console.info(`Asset ${firstfile.file_id} initialized`);
    }
    async UploadFile(ctx, file_id, file_name, file_path, cid, user_id) {
        const exists = await this.FileExists(ctx, file_id);
        if (exists) {
            throw new Error(`The file ${file_id} already exists`);
        }
        const newfile = {
            file_id: file_id,
            file_name: file_name,
            file_path: file_path,
            cid: cid,
            user_id: user_id,
        };
        await ctx.stub.putState(file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(newfile))));
    }
    async GetFile(ctx, id) {
        const fileJSON = await ctx.stub.getState(id);
        if (!fileJSON || fileJSON.length === 0) {
            throw new Error(`The file ${id} does not exist`);
        }
        return fileJSON.toString();
    }
    async FileExists(ctx, file_id) {
        const fileJSON = await ctx.stub.getState(file_id);
        return fileJSON && fileJSON.length > 0;
    }
    async GetAllFile(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            }
            catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
    async GetFilesByPath(ctx, path) {
        const queryString = {
            selector: {
                file_path: path,
            },
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const allResults = [];
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            }
            catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
    async GetFileByName(ctx, path, fileName) {
        const filesByPath = await this.GetFilesByPath(ctx, path);
        const files = JSON.parse(filesByPath);
        const desiredFile = files.find((file) => file.file_name === fileName);
        if (!desiredFile) {
            throw new Error(`File with name ${fileName} not found in path ${path}`);
        }
        return JSON.stringify(desiredFile);
    }
    async GetFileByCID(ctx, cid) {
        const queryString = {
            selector: {
                cid: cid,
            },
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const result = await iterator.next();
        if (result.done) {
            throw new Error(`File with CID ${cid} not found`);
        }
        const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
        let record;
        try {
            record = JSON.parse(strValue);
        }
        catch (err) {
            console.log(err);
            record = strValue;
        }
        return JSON.stringify(record);
    }
};
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "InitLedger", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UploadFile", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFile", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "FileExists", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetAllFile", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFilesByPath", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFileByName", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFileByCID", null);
StorageFileContract = __decorate([
    (0, fabric_contract_api_1.Info)({ title: 'ManageUploadShare', description: 'Smart contract for Upload and share file' })
], StorageFileContract);
exports.StorageFileContract = StorageFileContract;
//# sourceMappingURL=storageFile.js.map