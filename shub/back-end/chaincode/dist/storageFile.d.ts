import { Context, Contract } from "fabric-contract-api";
export declare class StorageFileContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    UploadFile(ctx: Context, id: string, owner: string, namefile: string, type: string, link: string): Promise<void>;
    GetFile(ctx: Context, id: string): Promise<string>;
    FileExists(ctx: Context, id: string): Promise<boolean>;
    GetAllFile(ctx: Context): Promise<string>;
}
