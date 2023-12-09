import { Context, Contract } from "fabric-contract-api";
export declare class StorageFileContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    UploadFile(ctx: Context, file_id: string, file_name: string, file_path: string, cid: string, user_id: string): Promise<void>;
    GetFile(ctx: Context, id: string): Promise<string>;
    FileExists(ctx: Context, file_id: string): Promise<boolean>;
    GetAllFile(ctx: Context): Promise<string>;
    GetFilesByPath(ctx: Context, path: string): Promise<string>;
    GetFileByName(ctx: Context, path: string, fileName: string): Promise<string>;
    GetFileByCID(ctx: Context, cid: string): Promise<string>;
}
