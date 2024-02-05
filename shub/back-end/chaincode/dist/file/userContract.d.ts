import { Context, Contract } from "fabric-contract-api";
export declare class UserContract extends Contract {
    private generateUniqueId;
    NewUser(ctx: Context, username: string, password: string, email: string): Promise<void>;
    GetUserById(ctx: Context, user_id: string): Promise<string>;
    GetUserByUserName(ctx: Context, userName: string): Promise<string>;
    UserExists(ctx: Context, user_id: string): Promise<boolean>;
    GetAllUser(ctx: Context): Promise<string>;
    DeleteUser(ctx: Context, user_id: string): Promise<void>;
}
