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
            file_nameForSearch: 'readme',
            cid: 'abcxyz',
            owner: 'user_1',
            created_date: '123',
            updated_date: '456',
            file_size: '1KB',
            file_type: 'image/png',
            file_password: "",
            file_lock: false
        };
        const admin = {
            user_id: 'user_1',
            email: 'admin@hcmut.edu.vn',
            password: '$2b$10$eS3mg4D3HBFx.CAz4EH9YuTacq3YTytUm1AvOezNkkJdwhqWA0M8m',
            firstName: 'Admin',
            role: "role_1",
            lastName: '',
            isFirstAccess: false,
            isActive: true,
            organization: ""
        };
        const folder = {
            folder_id: 'folder_1',
            folder_name: 'folder_root',
            folder_nameForSearch: 'folder_root',
            folder_path: '/files',
            owner: 'user_1',
            created_date: '456',
            updated_date: '123',
            share: ['user_2'],
            folder_password: "",
            folder_lock: false
        };
        const role1 = {
            role_id: 'role_1',
            idInt: 1,
            role_name: 'admin',
            level: -Infinity,
            role_type: 1,
            role_organization: '',
            role_permissionIds: ['permission_1', 'permission_2', 'permission_3', 'permission_4']
        };
        const role2 = {
            role_id: 'role_2',
            idInt: 2,
            role_name: 'user',
            level: Infinity,
            role_type: 1,
            role_organization: '',
            role_permissionIds: []
        };
        const role3 = {
            role_id: 'role_3',
            idInt: 3,
            role_name: 'user',
            level: Infinity,
            role_type: 1,
            role_organization: '',
            role_permissionIds: ['permission_4']
        };
        const permission1 = {
            permission_id: 'permission_1',
            permission_name: 'User manage',
        };
        const permission2 = {
            permission_id: 'permission_2',
            permission_name: 'User manage in Organization',
        };
        const permission3 = {
            permission_id: 'permission_3',
            permission_name: 'Role manage',
        };
        const permission4 = {
            permission_id: 'permission_4',
            permission_name: 'Lower-level document access',
        };
        const permission5 = {
            permission_id: 'permission_5',
            permission_name: 'Modify document'
        };
        await ctx.stub.putState(firstfile.file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(firstfile))));
        await ctx.stub.putState(admin.user_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(admin))));
        await ctx.stub.putState(folder.folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(folder))));
        await ctx.stub.putState(role1.role_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(role1))));
        await ctx.stub.putState(role2.role_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(role2))));
        await ctx.stub.putState(role3.role_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(role3))));
        await ctx.stub.putState(permission1.permission_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(permission1))));
        await ctx.stub.putState(permission2.permission_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(permission2))));
        await ctx.stub.putState(permission3.permission_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(permission3))));
        await ctx.stub.putState(permission4.permission_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(permission4))));
        await ctx.stub.putState(permission5.permission_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(permission5))));
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
    async generateUniqueId(ctx, prefix) {
        let idCounter = 2;
        // Lấy giá trị hiện tại của counter từ ledger
        const counterBytes = await ctx.stub.getState('counter');
        if (counterBytes && counterBytes.length > 0) {
            idCounter = parseInt(counterBytes.toString(), 10);
        }
        // Tạo id mới với prefix và counter
        const newId = `${prefix}${idCounter}`;
        // Tăng giá trị counter cho lần tạo tiếp theo
        idCounter++;
        await ctx.stub.putState('counter', Buffer.from(idCounter.toString()));
        return newId;
    }
    /**************************File *****************/
    async UploadFile(ctx, file_name, file_path, cid, user_id, created_date, updated_date, file_size, file_type) {
        const file_id = await this.generateUniqueId(ctx, 'file_');
        const exists = await this.FileExists(ctx, file_id);
        if (exists) {
            throw new Error(`The file ${file_id} already exists`);
        }
        const newfile = {
            file_id: file_id,
            file_name: file_name,
            file_nameForSearch: file_name.toLowerCase(),
            file_path: file_path,
            cid: cid,
            owner: user_id,
            created_date: created_date,
            updated_date: updated_date,
            file_size: file_size,
            file_type: file_type,
            isDelete: false,
            isFavourite: false,
            share: [],
            file_password: "",
            file_lock: false
        };
        await ctx.stub.putState(file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(newfile))));
    }
    async GetFile(ctx, file_id) {
        const fileJSON = await ctx.stub.getState(file_id);
        if (!fileJSON || fileJSON.length === 0) {
            throw new Error(`The file ${file_id} does not exist`);
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
        console.log('All files:', allResults);
        return JSON.stringify(allResults);
    }
    async GetFilesByName(ctx, fileName) {
        const queryString = {
            selector: {
                file_name: fileName,
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
    async GetFilesByPrefix(ctx, prefix) {
        prefix = prefix.toLowerCase();
        const queryString = {
            selector: {
                file_nameForSearch: {
                    $regex: `^${prefix}`
                }
            }
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
    async checkDelete(ctx, path) {
        const folderNames = path.split('/');
        folderNames.reverse();
        folderNames.pop();
        folderNames.pop();
        if (folderNames.length !== 0)
            for (const folderName of folderNames) {
                var name = folderName.split("%20").join(" ");
                path = path.substring(0, path.lastIndexOf('/'));
                var folderString = await this.GetFolderByName(ctx, path, name);
                var folderJSON = JSON.parse(folderString);
                if (folderJSON.isDelete)
                    return true;
            }
        return false;
    }
    async GetFilesByPath(ctx, user_id, path) {
        // const check = await this.checkDelete(ctx,path);
        if (path === '/files') {
            const queryString = {
                selector: {
                    // $or: [
                    //   { owner: user_id },
                    //   { share: { $elemMatch: { $eq: user_id } } }
                    // ],
                    file_path: path,
                    owner: user_id
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
        else {
            const checkForShare = await this.checkForShare(ctx, user_id, path);
            if (!checkForShare)
                return "You don't have permission!";
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
    }
    async GetFileByName(ctx, path, fileName) {
        const queryString = {
            selector: {
                file_path: path,
                file_name: fileName
            },
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const result = await iterator.next();
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
    async GetFolderByName(ctx, path, folderName) {
        const queryString = {
            selector: {
                folder_path: path,
                folder_name: folderName
            },
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const result = await iterator.next();
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
    // @Transaction(false)
    // @Returns('string')
    // public async GetFileByName(ctx: Context, path: string, fileName: string): Promise<string> {
    //   const filesByPath = await this.GetFilesByPath(ctx, path);
    //   const files = JSON.parse(filesByPath);
    //   const desiredFile = files.find((file) => file.file_name === fileName);
    //   if (!desiredFile) {
    //     throw new Error(`File with name ${fileName} not found in path ${path}`);
    //   }
    //   return JSON.stringify(desiredFile);
    // }
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
        console.log('Delete file ', file_id);
        const exists = await this.FileExists(ctx, file_id);
        if (!exists) {
            throw new Error(`The file ${file_id} does not exist`);
        }
        return ctx.stub.deleteState(file_id);
    }
    async UpdateFilePath(ctx, file_id, newPath) {
        const fileString = await this.GetFile(ctx, file_id);
        const fileJSON = JSON.parse(fileString);
        fileJSON.file_path = newPath;
        await ctx.stub.putState(file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(fileJSON))));
    }
    /*************************************User ***************************/
    //   @Transaction(false)
    // public async GetUserById(ctx:Context, user_id:string): Promise<string>{
    //     console.log('Check');
    //     const fileJSON = await ctx.stub.getState(user_id);
    //     if (!fileJSON || fileJSON.length===0) {
    //         throw new Error(`The user ${user_id} does not exist`);
    //     } 
    //     return fileJSON.toString();
    // }
    // @Transaction()
    // public async GetUserByUserName(ctx: Context, userName: string): Promise<string> {
    //     const queryString = {
    //         selector: {
    //             username: userName,
    //         },
    //     };
    //     const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    //     const result = await iterator.next();
    //     if (result.done) {
    //         throw new Error(`User with username ${userName} not found`);
    //     }
    //     const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
    //     let record;
    //     try {
    //         record = JSON.parse(strValue);
    //     } catch (err) {
    //         console.log(err);
    //         record = strValue;
    //     }
    //     return JSON.stringify(record);
    // }
    // @Transaction(false)
    // @Returns('boolean')
    // public async UserExists(ctx:Context, user_id: string): Promise<boolean>{
    //     const fileJSON = await ctx.stub.getState(user_id);
    //     return fileJSON && fileJSON.length>0;
    // }
    // @Transaction(false)
    // @Returns('string')
    // public async GetAllUser(ctx: Context): Promise<string> {
    //     const allResults = [];
    //     // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    //     const iterator = await ctx.stub.getStateByRange('', '');
    //     let result = await iterator.next();
    //     while (!result.done) {
    //         const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
    //         let record;
    //         try {
    //             record = JSON.parse(strValue);
    //         } catch (err) {
    //             console.log(err);
    //             record = strValue;
    //         }
    //         if (record.file_id && record.file_id.startsWith('user_')) {
    //             allResults.push(record);
    //         }
    //         result = await iterator.next();
    //     }
    //     return JSON.stringify(allResults);
    // }
    //   @Transaction()
    //   public async DeleteUser(ctx: Context, user_id: string): Promise<void> {
    //       const exists = await this.UserExists(ctx, user_id);
    //       if (!exists) {
    //           throw new Error(`The user ${user_id} does not exist`);
    //       }
    //       return ctx.stub.deleteState(user_id);
    //   }
    /**************** Folder************************/
    async CreateFolder(ctx, folder_name, folder_path, user_id, created_date, updated_date) {
        const folder_id = await this.generateUniqueId(ctx, 'folder_');
        const exists = await this.FolderExists(ctx, folder_id);
        if (exists) {
            throw new Error(`The folder ${folder_id} already exists`);
        }
        const newFolder = {
            folder_id: folder_id,
            folder_name: folder_name,
            folder_nameForSearch: folder_name.toLowerCase(),
            folder_path: folder_path,
            owner: user_id,
            created_date: created_date,
            updated_date: updated_date,
            isDelete: false,
            isFavourite: false,
            share: [],
            folder_password: "",
            folder_lock: false
        };
        await ctx.stub.putState(folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(newFolder))));
    }
    // @Transaction()
    // public async UploadFolderandFile(ctx: Context,foldersArrayString: string,filesArrayString: string, user_id: string): Promise<void> {
    //   const foldersArray = JSON.parse(foldersArrayString);
    //   const filesArray = JSON.parse(filesArrayString);
    //   for (const folder of foldersArray) {
    //     await this.CreateFolder(ctx,folder.folder_name,folder.folder_path,user_id,folder.created_date,folder.updated_date)
    //   }
    //   for (const file of filesArray) {
    //     await this.UploadFile(ctx,file.file_name,file.file_path,file.cid,user_id,file.created_date,file.updated_date,file.size,file.type)
    //   }
    // }
    // @Transaction()
    // public async UploadFolderandFileWithNewPath(ctx: Context,foldersArrayString: string,filesArrayString: string, newPath:string, user_id: string): Promise<void> {
    //   const foldersArray = JSON.parse(foldersArrayString);
    //   const filesArray = JSON.parse(filesArrayString);
    //   for (const folder of foldersArray) {
    //     await this.CreateFolder(ctx,folder.folder_name,newPath,user_id,folder.created_date,folder.updated_date);
    //   }
    //   for (const file of filesArray) {
    //     await this.UploadFile(ctx,file.file_name,newPath,file.cid,user_id,file.created_date,file.updated_date,file.size,file.type);
    //   }
    // }
    async GetFolder(ctx, folder_id) {
        const folderJSON = await ctx.stub.getState(folder_id);
        if (!folderJSON || folderJSON.length === 0) {
            throw new Error(`The folder ${folder_id} does not exist`);
        }
        return folderJSON.toString();
    }
    async checkForShare(ctx, user_id, path) {
        const folderNames = path.split('/');
        folderNames.reverse();
        folderNames.pop();
        folderNames.pop();
        // if (folderNames.length===1) return true;
        if (folderNames.length === 0)
            return true;
        for (const folderName of folderNames) {
            var name = folderName.split('%20').join(" ");
            path = path.substring(0, path.lastIndexOf('/'));
            var folderString = await this.GetFolderByName(ctx, path, name);
            var folderJSON = JSON.parse(folderString);
            if (folderJSON.share.includes(user_id) || folderJSON.owner === user_id)
                return true;
        }
        return false;
    }
    async GetFoldersByPath(ctx, user_id, path) {
        if (path === '/files') {
            const queryString = {
                selector: {
                    // $or: [
                    //   { owner: user_id },
                    //   { share: { $elemMatch: { $eq: user_id } } }
                    // ],
                    folder_path: path,
                    owner: user_id
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
        else {
            const check = await this.checkDelete(ctx, path);
            const checkForShare = await this.checkForShare(ctx, user_id, path);
            if (check || !checkForShare)
                return JSON.stringify({ message: "You don't have permission!", checkDelete: check, checkForShare: checkForShare });
            const queryString = {
                selector: {
                    folder_path: path,
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
    }
    async DeleteFolder(ctx, folder_id) {
        console.log('Delete file ', folder_id);
        const exists = await this.FileExists(ctx, folder_id);
        if (!exists) {
            throw new Error(`The file ${folder_id} does not exist`);
        }
        return ctx.stub.deleteState(folder_id);
    }
    async FolderExists(ctx, folder_id) {
        const folderJSON = await ctx.stub.getState(folder_id);
        return folderJSON && folderJSON.length > 0;
    }
    // @Transaction()
    // public async CopyFolder(ctx: Context,folder_id: string,newPath:string,user_id:string,firstAccess:boolean = true) : Promise<void> {
    //   const folderString = await this.GetFolder(ctx,folder_id);
    //   const folderJSON = JSON.parse(folderString);
    //   const oldPath = folderJSON.folder_path;
    //   if (firstAccess) {
    //     const created_date=new Date()+'';
    //     const updated_date=new Date()+'';
    //     await this.CreateFolder(ctx,folderJSON.folder_name,newPath,user_id,created_date,updated_date);
    //     firstAccess=false;
    //   }
    //   //Get subFolders
    //    const subFoldersString = await this.GetSubFolders(ctx,user_id,oldPath,folder_id);
    //    const subFolders = JSON.parse(subFoldersString);
    //    //Get subfiles
    //    const filePath = await this.ConcatenatePathAndNameById(ctx,oldPath,folder_id);
    //    const subFilesString=await this.GetFilesByPath(ctx,user_id,filePath);
    //    newPath = newPath +'/'+ folderJSON.folder_name;
    //    await this.UploadFolderandFileWithNewPath(ctx,subFoldersString,subFilesString,newPath,user_id);
    //   for (const subFolder of subFolders) {
    //      await this.CopyFolder(ctx,subFolder.folder_id,newPath,user_id,firstAccess);
    //   }
    // }
    async UpdateFoldersAndFilesPath(ctx, folder_id, newPath, user_id) {
        const folderString = await this.GetFolder(ctx, folder_id);
        const folderJSON = JSON.parse(folderString);
        const oldPathPrefix = folderJSON.folder_path;
        await this.updateFoldersAndFilesPath(ctx, folderJSON.folder_id, newPath, newPath, oldPathPrefix, user_id);
    }
    async updateFoldersAndFilesPath(ctx, folder_id, newPath, newPathPrefix, oldPathPrefix, user_id) {
        const folderString = await this.GetFolder(ctx, folder_id);
        const folderJSON = JSON.parse(folderString);
        //Get subFolders
        const subFoldersString = await this.GetSubFolders(ctx, user_id, folderJSON.folder_path, folder_id);
        const subFolders = JSON.parse(subFoldersString);
        //Get subfiles
        const filePath = await this.ConcatenatePathAndNameById(ctx, folderJSON.folder_path, folder_id);
        const subFilesString = await this.GetFilesByPath(ctx, user_id, filePath);
        const subFiles = JSON.parse(subFilesString);
        for (const subFile of subFiles) {
            var newPathForSubFile = await this.genNewPath(ctx, subFile.file_path, oldPathPrefix, newPathPrefix);
            await this.UpdateFilePath(ctx, subFile.file_id, newPathForSubFile);
        }
        await this.UpdateFolderPath(ctx, folder_id, newPath);
        for (const subFolder of subFolders) {
            var newPathForSubFolder = await this.genNewPath(ctx, subFolder.folder_path, oldPathPrefix, newPathPrefix);
            await this.updateFoldersAndFilesPath(ctx, subFolder.folder_id, newPathForSubFolder, newPathPrefix, oldPathPrefix, user_id);
        }
    }
    async genNewPath(ctx, oldPath, oldPathPrefix, newPathPrefix) {
        const newPath = oldPath.replace(oldPathPrefix, newPathPrefix);
        return newPath;
    }
    async UpdateFolderPath(ctx, folder_id, newPath) {
        const folderString = await this.GetFolder(ctx, folder_id);
        const folderJSON = JSON.parse(folderString);
        folderJSON.folder_path = newPath;
        await ctx.stub.putState(folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(folderJSON))));
    }
    async GetSubFolders(ctx, user_id, folder_path, folder_id) {
        folder_path = await this.ConcatenatePathAndNameById(ctx, folder_path, folder_id);
        const queryString = {
            selector: {
                owner: user_id,
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
    async DeleteFolderAndSubFolder(ctx, user_id, folder_path, folder_id) {
        //Get subFolders
        const subFoldersString = await this.GetSubFolders(ctx, user_id, folder_path, folder_id);
        const subFolders = JSON.parse(subFoldersString);
        //Get subfiles
        const filePath = await this.ConcatenatePathAndNameById(ctx, folder_path, folder_id);
        const subFilesString = await this.GetFilesByPath(ctx, user_id, filePath);
        const subFiles = JSON.parse(subFilesString);
        //Delete subfiles
        for (const subFile of subFiles) {
            await this.DeleteFile(ctx, subFile.file_id);
        }
        //Delete curr folder
        await this.DeleteFolder(ctx, folder_id);
        //Recursive
        for (const subFolder of subFolders) {
            await this.DeleteFolderAndSubFolder(ctx, user_id, subFolder.folder_path, subFolder.folder_id);
        }
    }
    async RenameFolder(ctx, user_id, folder_path, folder_id, new_folder_name) {
        const folderString = await this.GetFolder(ctx, folder_id);
        const folder = JSON.parse(folderString);
        const pathLength = folder.folder_path.length + 2 - 1; //Plus 2 -1 -> indexOf
        const old_name = folder.folder_name;
        await this.ChangePath(ctx, user_id, folder_path, folder_id, old_name, new_folder_name, pathLength);
        folder.folder_name = new_folder_name;
        await ctx.stub.putState(folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(folder))));
    }
    async ChangePath(ctx, user_id, folder_path, folder_id, old_name, new_parent_name, pathLength) {
        const subFoldersString = await this.GetSubFolders(ctx, user_id, folder_path, folder_id);
        const subFolders = JSON.parse(subFoldersString);
        const folderString = await this.GetFolder(ctx, folder_id);
        //Get subfiles
        const filePath = await this.ConcatenatePathAndNameById(ctx, folder_path, folder_id);
        const subFilesString = await this.GetFilesByPath(ctx, user_id, filePath);
        const subFiles = JSON.parse(subFilesString);
        for (const subFile of subFiles) {
            subFile.file_path = await this.replacePath(ctx, filePath, old_name, new_parent_name, pathLength);
            await ctx.stub.putState(subFile.file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(subFile))));
        }
        const folder = JSON.parse(folderString);
        if (folder_path.length >= pathLength) {
            folder.folder_path = await this.replacePath(ctx, folder_path, old_name, new_parent_name, pathLength);
            await ctx.stub.putState(folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(folder))));
        }
        for (const subFolder of subFolders) {
            await this.ChangePath(ctx, user_id, subFolder.folder_path, subFolder.folder_id, old_name, new_parent_name, pathLength);
        }
    }
    async replacePath(ctx, path, wordToReplace, replacementWord, startIndex) {
        var replacedString = path.substring(0, startIndex) + replacementWord + path.substring(startIndex + wordToReplace.length);
        replacedString = replacedString.replace(/ /g, '%20');
        return replacedString;
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
    async GetFoldersByPrefix(ctx, prefix) {
        prefix = prefix.toLowerCase();
        const queryString = {
            selector: {
                folder_nameForSearch: {
                    $regex: `^${prefix}`
                }
            }
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
    async GetFilesAndFoldersFavourite(ctx, user_id) {
        const queryString = {
            selector: {
                owner: user_id,
                isFavourite: true,
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
        const files = [];
        const folders = [];
        allResults.forEach((record) => {
            if (record.file_id && record.file_id.startsWith('file_')) {
                files.push(record);
            }
            if (record.folder_id && record.folder_id.startsWith('folder_')) {
                folders.push(record);
            }
        });
        const filesAndFolders = { files, folders };
        return JSON.stringify(filesAndFolders);
    }
    async UpdateFavourtieFile(ctx, user_id, file_id, isFavourite) {
        const fileString = await this.GetFile(ctx, file_id);
        const fileJSON = JSON.parse(fileString);
        fileJSON.isFavourite = isFavourite;
        await ctx.stub.putState(file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(fileJSON))));
    }
    async UpdateFavourtieFolder(ctx, user_id, folder_id, isFavourite) {
        const folderString = await this.GetFolder(ctx, folder_id);
        const folderJSON = JSON.parse(folderString);
        folderJSON.isFavourite = isFavourite;
        await ctx.stub.putState(folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(folderJSON))));
    }
    async GetTrashFoldersAndFiles(ctx, user_id) {
        const queryString = {
            selector: {
                owner: user_id,
                isDelete: true,
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
        const files = [];
        const folders = [];
        allResults.forEach((record) => {
            if (record.file_id && record.file_id.startsWith('file_')) {
                files.push(record);
            }
            if (record.folder_id && record.folder_id.startsWith('folder_')) {
                folders.push(record);
            }
        });
        const filesAndFolders = { files, folders };
        return JSON.stringify(filesAndFolders);
    }
    async UpdateTrashFile(ctx, user_id, file_id, isDelete) {
        const fileString = await this.GetFile(ctx, file_id);
        const fileJSON = JSON.parse(fileString);
        if (isDelete === false) {
            var check = await this.checkDelete(ctx, fileJSON.file_path);
            if (check)
                fileJSON.file_path = `/files`;
        }
        fileJSON.isDelete = isDelete;
        fileJSON.file_name = '#' + fileJSON.file_name;
        await ctx.stub.putState(file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(fileJSON))));
        return JSON.stringify(fileJSON);
    }
    async UpdateTrashFolder(ctx, user_id, folder_id, isDelete) {
        const folderString = await this.GetFolder(ctx, folder_id);
        const folderJSON = JSON.parse(folderString);
        if (isDelete === false) {
            folderJSON.isDelete = isDelete;
            await ctx.stub.putState(folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(folderJSON))));
            //Re-assign
            var check = await this.checkDelete(ctx, folderJSON.folder_path);
            if (check) {
                await this.UpdateFoldersAndFilesPath(ctx, folder_id, '/files', user_id);
                folderJSON.folder_path = '/files';
            }
        }
        else {
            folderJSON.folder_name = '#' + folderJSON.folder_name;
            await this.RenameFolder(ctx, user_id, folderJSON.folder_path, folder_id, folderJSON.folder_name);
            folderJSON.isDelete = isDelete;
            await ctx.stub.putState(folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(folderJSON))));
        }
        return JSON.stringify(folderJSON);
    }
    async GetShareFolders(ctx, user_id) {
        const queryString = {
            selector: {
                share: {
                    $elemMatch: {
                        $eq: user_id
                    }
                }
            }
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
    async UpdateShareFolder(ctx, user_id, folder_id, share) {
        const folderString = await this.GetFolder(ctx, folder_id);
        const folderJSON = JSON.parse(folderString);
        const shareUser = JSON.parse(share);
        folderJSON.share = shareUser;
        await ctx.stub.putState(folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(folderJSON))));
    }
    async UpdateShareFile(ctx, user_id, file_id, share) {
        const fileString = await this.GetFile(ctx, file_id);
        const fileJSON = JSON.parse(fileString);
        const shareUser = JSON.parse(share);
        fileJSON.share = shareUser;
        await ctx.stub.putState(file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(fileJSON))));
    }
    async ChangeFolderPassword(ctx, user_id, folder_id, folder_password) {
        const folderString = await this.GetFolder(ctx, folder_id);
        const folderJSON = JSON.parse(folderString);
        folderJSON.folder_password = folder_password;
        if (folder_password === "")
            folderJSON.folder_lock = false;
        else
            folderJSON.folder_lock = true;
        await ctx.stub.putState(folder_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(folderJSON))));
    }
    async ChangeFilePassword(ctx, user_id, file_id, file_password) {
        const fileString = await this.GetFile(ctx, file_id);
        const fileJSON = JSON.parse(fileString);
        fileJSON.file_password = file_password;
        if (file_password === "")
            fileJSON.file_lock = false;
        else
            fileJSON.file_lock = true;
        await ctx.stub.putState(file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(fileJSON))));
    }
    async GetFilePassword(ctx, user_id, file_id) {
        const fileString = await this.GetFile(ctx, file_id);
        const fileJSON = JSON.parse(fileString);
        return fileJSON.file_password;
    }
    async GetFolderPassword(ctx, user_id, folder_id) {
        const folderString = await this.GetFolder(ctx, folder_id);
        const folderJSON = JSON.parse(folderString);
        return folderJSON.folder_password;
    }
    async UpdateCID(ctx, user_id, file_id, cid) {
        const fileString = await this.GetFile(ctx, file_id);
        const fileJSON = JSON.parse(fileString);
        fileJSON.cid = cid;
        await ctx.stub.putState(file_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(fileJSON))));
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
    (0, fabric_contract_api_1.Transaction)(false),
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
], StorageFileContract.prototype, "GetFilesByName", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFilesByPrefix", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
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
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFolderByName", null);
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
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UpdateFilePath", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "CreateFolder", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFolder", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFoldersByPath", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "DeleteFolder", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "FolderExists", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UpdateFoldersAndFilesPath", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UpdateFolderPath", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetSubFolders", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "DeleteFolderAndSubFolder", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "RenameFolder", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String, String, Number]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "ChangePath", null);
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
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFoldersByPrefix", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFilesAndFoldersFavourite", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UpdateFavourtieFile", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UpdateFavourtieFolder", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetTrashFoldersAndFiles", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UpdateTrashFile", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UpdateTrashFolder", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetShareFolders", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UpdateShareFolder", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UpdateShareFile", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "ChangeFolderPassword", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "ChangeFilePassword", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFilePassword", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "GetFolderPassword", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], StorageFileContract.prototype, "UpdateCID", null);
StorageFileContract = __decorate([
    (0, fabric_contract_api_1.Info)({ title: 'ManageFileUserFolder', description: 'Smart contract' })
], StorageFileContract);
exports.StorageFileContract = StorageFileContract;
//# sourceMappingURL=storageFile.js.map