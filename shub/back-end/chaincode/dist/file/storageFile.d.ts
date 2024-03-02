import { Context, Contract } from "fabric-contract-api";
export declare class StorageFileContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    GetAllState(ctx: Context): Promise<string>;
    private generateUniqueId;
    /**************************File *****************/
    UploadFile(ctx: Context, file_name: string, file_path: string, cid: string, user_id: string, created_date: string, updated_date: string, file_size: string, file_type: string): Promise<void>;
    GetFile(ctx: Context, id: string): Promise<string>;
    FileExists(ctx: Context, file_id: string): Promise<boolean>;
    GetAllFile(ctx: Context): Promise<string>;
    GetFilesByName(ctx: Context, fileName: string): Promise<string>;
    GetFilesByPrefix(ctx: Context, prefix: string): Promise<string>;
    GetFilesByPath(ctx: Context, path: string): Promise<string>;
    GetFileByName(ctx: Context, path: string, fileName: string): Promise<string>;
    GetFileByCID(ctx: Context, cid: string): Promise<string>;
    DeleteFile(ctx: Context, file_id: string): Promise<void>;
    /*************************************User ***************************/
    GetUserById(ctx: Context, user_id: string): Promise<string>;
    GetUserByUserName(ctx: Context, userName: string): Promise<string>;
    UserExists(ctx: Context, user_id: string): Promise<boolean>;
    GetAllUser(ctx: Context): Promise<string>;
    DeleteUser(ctx: Context, user_id: string): Promise<void>;
    /**************** Folder************************/
    CreateFolder(ctx: Context, folder_name: string, folder_path: string, user_id: string, created_date: string, updated_date: string): Promise<void>;
    GetFolder(ctx: Context, folder_id: string): Promise<string>;
    GetFoldersByPath(ctx: Context, path: string): Promise<string>;
    DeleteFolder(ctx: Context, folder_id: string): Promise<void>;
    FolderExists(ctx: Context, folder_id: string): Promise<boolean>;
    GetSubFolders(ctx: Context, user_id: string, folder_path: string, folder_id: string): Promise<string>;
    DeleteFolderAndSubFolder(ctx: Context, user_id: string, folder_path: string, folder_id: string): Promise<void>;
    RenameFolder(ctx: Context, user_id: string, folder_path: string, folder_id: string, new_folder_name: string): Promise<void>;
    ChangePath(ctx: Context, user_id: string, folder_path: string, folder_id: string, old_name: string, new_parent_name: string, pathLength: number): Promise<void>;
    private replacePath;
    ConcatenatePathAndNameById(ctx: Context, folder_path: string, folder_id: string): Promise<string>;
    private getFolderNameById;
}
