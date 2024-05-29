import { Context, Contract } from "fabric-contract-api";
export declare class StorageFileContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    GetAllState(ctx: Context): Promise<string>;
    private generateUniqueId;
    /**************************File *****************/
    UploadFile(ctx: Context, file_name: string, file_path: string, cid: string, user_id: string, created_date: string, updated_date: string, file_size: string, file_type: string): Promise<void>;
    GetFile(ctx: Context, file_id: string): Promise<string>;
    FileExists(ctx: Context, file_id: string): Promise<boolean>;
    GetAllFile(ctx: Context): Promise<string>;
    GetFilesByName(ctx: Context, fileName: string): Promise<string>;
    GetFilesByPrefix(ctx: Context, user_id: string, prefix: string): Promise<string>;
    private checkDelete;
    GetFilesByPath(ctx: Context, user_id: string, path: string): Promise<string>;
    GetFileByName(ctx: Context, path: string, fileName: string): Promise<string>;
    GetFolderByName(ctx: Context, path: string, folderName: string): Promise<string>;
    GetFileByCID(ctx: Context, cid: string): Promise<string>;
    DeleteFile(ctx: Context, file_id: string): Promise<void>;
    UpdateFilePath(ctx: Context, file_id: string, newPath: string): Promise<void>;
    /*************************************User ***************************/
    /**************** Folder************************/
    CreateFolder(ctx: Context, folder_name: string, folder_path: string, user_id: string, created_date: string, updated_date: string): Promise<void>;
    GetFolder(ctx: Context, folder_id: string): Promise<string>;
    private checkForShare;
    GetFoldersByPath(ctx: Context, user_id: string, path: string): Promise<string>;
    DeleteFolder(ctx: Context, folder_id: string): Promise<void>;
    FolderExists(ctx: Context, folder_id: string): Promise<boolean>;
    UpdateFoldersAndFilesPath(ctx: Context, folder_id: string, newPath: string, user_id: string): Promise<void>;
    private updateFoldersAndFilesPath;
    private genNewPath;
    UpdateFolderPath(ctx: Context, folder_id: string, newPath: string): Promise<void>;
    GetSubFolders(ctx: Context, user_id: string, folder_path: string, folder_id: string): Promise<string>;
    DeleteFolderAndSubFolder(ctx: Context, user_id: string, folder_path: string, folder_id: string): Promise<void>;
    RenameFolder(ctx: Context, user_id: string, folder_path: string, folder_id: string, new_folder_name: string): Promise<void>;
    ChangePath(ctx: Context, user_id: string, folder_path: string, folder_id: string, old_name: string, new_parent_name: string, pathLength: number): Promise<void>;
    private replacePath;
    ConcatenatePathAndNameById(ctx: Context, folder_path: string, folder_id: string): Promise<string>;
    private getFolderNameById;
    GetFoldersByPrefix(ctx: Context, user_id: string, prefix: string): Promise<string>;
    GetFilesAndFoldersFavourite(ctx: Context, user_id: string): Promise<string>;
    UpdateFavourtieFile(ctx: Context, user_id: string, file_id: string, isFavourite: boolean): Promise<void>;
    UpdateFavourtieFolder(ctx: Context, user_id: string, folder_id: string, isFavourite: boolean): Promise<void>;
    GetTrashFoldersAndFiles(ctx: Context, user_id: string): Promise<string>;
    UpdateTrashFile(ctx: Context, user_id: string, file_id: string, isDelete: boolean): Promise<string>;
    UpdateTrashFolder(ctx: Context, user_id: string, folder_id: string, isDelete: boolean): Promise<string>;
    GetShareFolders(ctx: Context, user_id: string): Promise<string>;
    UpdateShareFolder(ctx: Context, user_id: string, folder_id: string, share: string): Promise<void>;
    UpdateShareFile(ctx: Context, user_id: string, file_id: string, share: string): Promise<void>;
    ChangeFolderPassword(ctx: Context, user_id: string, folder_id: string, folder_password: string): Promise<void>;
    ChangeFilePassword(ctx: Context, user_id: string, file_id: string, file_password: string): Promise<void>;
    GetFilePassword(ctx: Context, user_id: string, file_id: string): Promise<string>;
    GetFolderPassword(ctx: Context, user_id: string, folder_id: string): Promise<string>;
    UpdateCID(ctx: Context, user_id: string, file_id: string, cid: string): Promise<void>;
}
