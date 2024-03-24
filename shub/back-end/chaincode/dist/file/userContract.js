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
exports.UserContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
const json_stringify_deterministic_1 = __importDefault(require("json-stringify-deterministic"));
const sort_keys_recursive_1 = __importDefault(require("sort-keys-recursive"));
let UserContract = class UserContract extends fabric_contract_api_1.Contract {
    //Init
    // @Transaction()
    // public async AddUser(ctx: Context): Promise<void>{
    //     const exists =await this.UserExists(ctx, file_id);
    //     if (exists) {
    //         throw new Error(`The file ${file_id} already exists`);
    //     }
    //     const newfile = {
    //         file_id: file_id,
    //         file_name: file_name,
    //         file_path: file_path,
    //         cid: cid,
    //         user_id: user_id,
    //     };
    //     await ctx.stub.putState(file_id,Buffer.from(stringify(sortKeysRecursive(newfile))));
    // }
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
    async NewUser(ctx, email, password, firstName, lastName) {
        const user_id = await this.generateUniqueId(ctx, 'user_');
        const exists = await this.UserEmailExists(ctx, email);
        if (exists) {
            throw new Error(`The user ${email} already exists`);
        }
        const newUser = {
            user_id: user_id,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        };
        await ctx.stub.putState(user_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(newUser))));
        return JSON.stringify(newUser);
    }
    async GetUserById(ctx, user_id) {
        console.log('Check');
        const fileJSON = await ctx.stub.getState(user_id);
        if (!fileJSON || fileJSON.length === 0) {
            throw new Error(`The user ${user_id} does not exist`);
        }
        return fileJSON.toString();
    }
    async GetUserByEmail(ctx, email) {
        const queryString = {
            selector: {
                email: email,
            },
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const result = await iterator.next();
        if (result.done) {
            throw new Error(`User with email ${email} not found`);
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
        const userJSON = await ctx.stub.getState(user_id);
        return userJSON && userJSON.length > 0;
    }
    async UserEmailExists(ctx, user_email) {
        const queryString = {
            selector: {
                email: user_email,
            },
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const result = await iterator.next();
        // Return false if no user is found
        if (result.done) {
            return false;
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
        // Return true if a user with the email is found
        return true;
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
            if (record.user_id && record.user_id.startsWith('user_')) {
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
    async ChangePassword(ctx, user_id, newPassword) {
        const exists = await this.UserExists(ctx, user_id);
        if (!exists) {
            throw new Error(`The user ${user_id} does not exist`);
        }
        const userString = await this.GetUserById(ctx, user_id);
        const userJSON = JSON.parse(userString);
        userJSON.password = newPassword;
        await ctx.stub.putState(user_id, Buffer.from((0, json_stringify_deterministic_1.default)((0, sort_keys_recursive_1.default)(userJSON))));
    }
};
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserContract.prototype, "NewUser", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UserContract.prototype, "GetUserById", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UserContract.prototype, "GetUserByEmail", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UserContract.prototype, "UserExists", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('boolean'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UserContract.prototype, "UserEmailExists", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(false),
    (0, fabric_contract_api_1.Returns)('string'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], UserContract.prototype, "GetAllUser", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], UserContract.prototype, "DeleteUser", null);
__decorate([
    (0, fabric_contract_api_1.Transaction)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], UserContract.prototype, "ChangePassword", null);
UserContract = __decorate([
    (0, fabric_contract_api_1.Info)({ title: 'ManageUser', description: 'Smart contract for User' })
], UserContract);
exports.UserContract = UserContract;
//# sourceMappingURL=userContract.js.map