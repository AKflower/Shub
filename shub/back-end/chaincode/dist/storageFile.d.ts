import { Context, Contract } from "fabric-contract-api";
export declare class StorageFileContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    UploadFile(ctx: Context, file_id: string, file_name: string, file_path: string, cid: string, user_id: number): Promise<void>;
    GetFile(ctx: Context, file_id: string): Promise<string>;
    FileExists(ctx: Context, id: string): Promise<boolean>;
    GetFilesByPath(ctx: Context, file_path: string): Promise<string>;
    GetAllFile(ctx: Context): Promise<string>;
    DeleteFile(ctx: Context, file_id: string): Promise<void>;
}
