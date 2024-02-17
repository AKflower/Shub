import { Context, Contract } from "fabric-contract-api";
export declare class UserContract extends Contract {
    private generateUniqueId;
    NewUser(ctx: Context, email: string, password: string, firstName: string, lastName: string): Promise<void>;
    GetUserById(ctx: Context, user_id: string): Promise<string>;
    GetUserByEmail(ctx: Context, email: string): Promise<string>;
    UserExists(ctx: Context, user_id: string): Promise<boolean>;
    GetAllUser(ctx: Context): Promise<string>;
    DeleteUser(ctx: Context, user_id: string): Promise<void>;
}
