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
            file_id: 'file_1',
            file_name: 'Readme.md',
            file_path: '/files',
            cid: 'abcxyz',
            user_id: 'user_1',
            created_date: '123',
            updated_date: '456',
            file_size: '1KB'
        };
        const admin = {
            user_id: 'user_1',
            username: 'admin',
            password: 'admin',
            email: 'admin@hcmut.edu.vn'
        };
        const folder = {
            folder_id: 'folder_1',
            folder_name: 'folder_root',
            folder_path: '/files',
            user_id: 'user_1',
            created_date: '456',
            updated_date: '123',
        };
        await ctx.stub.putState(firstfile.file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(firstfile))));
        await ctx.stub.putState(admin.user_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(admin))));
        await ctx.stub.putState(folder.user_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(folder))));
        console.info(`Asset ${firstfile.file_id} initialized`);
        console.info(`Asset ${admin.user_id} initialized`);
    }
    async GetAllState(ctx) {
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
    /**************************File *****************/
    async UploadFile(ctx, file_id, file_name, file_path, cid, user_id, created_date, updated_date, file_size) {
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
            created_date: created_date,
            updated_date: updated_date,
            file_size: file_size
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
            if (record.file_id && record.file_id.startsWith('file_')) {
                allResults.push(record);
            }
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
    async DeleteFile(ctx, file_id) {
        const exists = await this.FileExists(ctx, file_id);
        if (!exists) {
            throw new Error(`The file ${file_id} does not exist`);
        }
        return ctx.stub.deleteState(file_id);
    }
    /*************************************User ***************************/
    async GetUserById(ctx, user_id) {
        console.log('Check');
        const fileJSON = await ctx.stub.getState(user_id);
        if (!fileJSON || fileJSON.length === 0) {
            throw new Error(`The user ${user_id} does not exist`);
        }
        return fileJSON.toString();
    }
    async GetUserByUserName(ctx, userName) {
        const queryString = {
            selector: {
                username: userName,
            },
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const result = await iterator.next();
        if (result.done) {
            throw new Error(`User with username ${userName} not found`);
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
    async UserExists(ctx, user_id) {
        const fileJSON = await ctx.stub.getState(user_id);
        return fileJSON && fileJSON.length > 0;
    }
    async GetAllUser(ctx) {
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
            if (record.file_id && record.file_id.startsWith('user_')) {
                allResults.push(record);
            }
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
    async DeleteUser(ctx, user_id) {
        const exists = await this.UserExists(ctx, user_id);
        if (!exists) {
            throw new Error(`The user ${user_id} does not exist`);
        }
        return ctx.stub.deleteState(user_id);
    }
    /**************** Folder************************/
    async CreateFolder(ctx, folder_id, folder_name, folder_path, user_id, created_date, updated_date) {
        const exists = await this.FolderExists(ctx, folder_id);
        if (exists) {
            throw new Error(`The folder ${folder_id} already exists`);
        }
        const newFolder = {
            folder_id: folder_id,
            folder_name: folder_name,
            folder_path: folder_path,
            user_id: user_id,
            created_date: created_date,
            updated_date: updated_date,
        };
        await ctx.stub.putState(folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(newFolder))));
    }
    async FolderExists(ctx, folder_id) {
        const folderJSON = await ctx.stub.getState(folder_id);
        return folderJSON && folderJSON.length > 0;
    }
    async GetSubFolders(ctx, user_id, folder_path) {
        const queryString = {
            selector: {
                user_id: user_id,
                folder_path: folder_path,
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
            if (record.folder_id && record.folder_id.startsWith('folder_')) {
                allResults.push(record);
            }
            result = await iterator.next();
        }
        console.log('ketqua:', allResults);
        return JSON.stringify(allResults);
    }
    //   @Transaction()
    //   public async DeleteFolderAndSubFolder(ctx: Context, user_id: string, folder_path: string, folder_id: string): Promise<void> {
    //       const subFoldersJSON = await this.GetSubFolders(ctx, user_id, folder_path);
    //       const subFolders = JSON.parse(subFoldersJSON);
    //       // Lấy folder_paths từ kết quả trả về
    //       // const subFolderPaths = subFolders.map((folder) => {folder.folder_path, folder.folder_id});
    //       // Xóa từng subfolder
    //       for (const subFolder of subFolders) {
    //           await this.DeleteFolderAndSubFolder(ctx, user_id, subFolder.folder_path, subFolder.folder_id);
    //       }
    //       // Xóa folder hiện tại
    //       await ctx.stub.deleteState(folder_id);
    //   }
    async DeleteFolderAndSubFolder(ctx, user_id, folder_path, folder_id) {
        folder_path = await this.ConcatenatePathAndNameById(ctx, folder_path, folder_id);
        const subFoldersJSON = await this.GetSubFoldersRecursive(ctx, user_id, folder_path);
        const subFolders = JSON.parse(subFoldersJSON);
        console.log('delete');
        // Tạo một mảng Promise để xóa tất cả các thư mục con cùng một lúc
        const deletePromises = subFolders.map((subFolder) => this.DeleteFolderAndSubFolder(ctx, user_id, subFolder.folder_path, subFolder.folder_id));
        // Chờ cho tất cả các Promise hoàn thành
        await Promise.all(deletePromises);
        // Xóa thư mục hiện tại
        await ctx.stub.deleteState(folder_id);
    }
    async ConcatenatePathAndNameById(ctx, folder_path, folder_id) {
        // Assume you have a method to retrieve folder_name by folder_id
        const folder_name = await this.getFolderNameById(ctx, folder_id);
        if (!folder_name) {
            throw new Error(`Folder with id ${folder_id} not found`);
        }
        const concatenatedPath = `${folder_path}/${folder_name}`;
        return concatenatedPath;
    }
    async getFolderNameById(ctx, folder_id) {
        const folderJSON = await ctx.stub.getState(folder_id);
        if (!folderJSON || folderJSON.length === 0) {
            return null;
        }
        try {
            const folder = JSON.parse(Buffer.from(folderJSON).toString('utf-8'));
            return folder.folder_name || null;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async GetSubFoldersRecursive(ctx, user_id, folder_path) {
        const subFolders = await this.getSubFoldersRecursive(ctx, user_id, folder_path);
        return JSON.stringify(subFolders);
    }
    async getSubFoldersRecursive(ctx, user_id, folder_path, allSubFolders = []) {
        const queryString = {
            selector: {
                user_id: user_id,
                folder_path: folder_path,
            },
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
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
            if (record.folder_id && record.folder_id.startsWith('folder_')) {
                record.folder_path = await this.ConcatenatePathAndNameById(ctx, record.folder_path, record.folder_id);
                allSubFolders.push(record);
                await this.getSubFoldersRecursive(ctx, user_id, record.folder_path, allSubFolders);
            }
            result = await iterator.next();
        }
        return allSubFolders;
    }
};
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "InitLedger", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetAllState", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String, String, String, String]),
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
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "DeleteFile", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetUserById", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetUserByUserName", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UserExists", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetAllUser", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "DeleteUser", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "CreateFolder", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "FolderExists", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetSubFolders", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "DeleteFolderAndSubFolder", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "ConcatenatePathAndNameById", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetSubFoldersRecursive", null);
StorageFileContract = __decorate([
    (0, fabric_contract_api_1.Info)({ title: 'ManageFileUserFolder', description: 'Smart contract' })
], StorageFileContract);
exports.StorageFileContract = StorageFileContract;
//# sourceMappingURL=storageFile.js.map