import { Context, Contract, Info, Returns, Transaction } from "fabric-contract-api";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { File } from "./file";
import { User } from "../user/user";
import { Folder } from "../folder/folder";




@Info({title: 'ManageFileUserFolder', description: 'Smart contract'})
export class StorageFileContract extends Contract {
    
    //Init
    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const firstfile: File= 
            {
                file_id: 'file_1',
                file_name: 'Readme.md',
                file_path: '/files',
                cid: 'abcxyz',
                user_id: 'user_1',
                created_date: '123',
                updated_date: '456',
                file_size:'1KB'
            }
          const admin : User = 
          {
            user_id: 'user_1',
            username: 'admin',
            password: 'admin',
            email: 'admin@hcmut.edu.vn'
          }
           
          const folder : Folder =
          {
            folder_id: 'folder_1',

            folder_name: 'folder_root',

            folder_path: '/files',
            user_id: 'user_1',
            created_date: '456',
            updated_date: '123',
          }
            
    
            await ctx.stub.putState(firstfile.file_id, Buffer.from(stringify(sortKeysRecursive(firstfile))));
            await ctx.stub.putState(admin.user_id, Buffer.from(stringify(sortKeysRecursive(admin))));
            await ctx.stub.putState(folder.user_id, Buffer.from(stringify(sortKeysRecursive(folder))));
            console.info(`Asset ${firstfile.file_id} initialized`);
            console.info(`Asset ${admin.user_id} initialized`);
    }
    @Transaction(false)
    @Returns('string')
    public async GetAllState(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }

           
            allResults.push(record);
            
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }

    

    /**************************File *****************/
    @Transaction()
    public async UploadFile(ctx: Context,file_id: string, file_name:string, file_path:string, cid: string, user_id: string, created_date: string, updated_date: string, file_size:string): Promise<void>{
        const exists =await this.FileExists(ctx, file_id);
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
        await ctx.stub.putState(file_id,Buffer.from(stringify(sortKeysRecursive(newfile))));

    }
    @Transaction()
    public async GetFile(ctx:Context, id:string): Promise<string>{
        const fileJSON = await ctx.stub.getState(id);
        if (!fileJSON || fileJSON.length===0) {
            throw new Error(`The file ${id} does not exist`);
        } 
        return fileJSON.toString();
    }

    @Transaction(false)
    @Returns('boolean')
    public async FileExists(ctx:Context, file_id: string): Promise<boolean>{
        const fileJSON = await ctx.stub.getState(file_id);
        return fileJSON && fileJSON.length>0;
    }
    @Transaction(false)
    @Returns('string')
    public async GetAllFile(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
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

    @Transaction(false)
    @Returns('string')
    public async GetFilesByPath(ctx: Context, path: string): Promise<string> {
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
          } catch (err) {
            console.log(err);
            record = strValue;
          }
          allResults.push(record);
          result = await iterator.next();
        }
    
        return JSON.stringify(allResults);
      }
      @Transaction(false)
      @Returns('string')
      public async GetFileByName(ctx: Context, path: string, fileName: string): Promise<string> {
        const filesByPath = await this.GetFilesByPath(ctx, path);
        const files = JSON.parse(filesByPath);
    
        const desiredFile = files.find((file) => file.file_name === fileName);
        if (!desiredFile) {
          throw new Error(`File with name ${fileName} not found in path ${path}`);
        }
    
        return JSON.stringify(desiredFile);
      }
      @Transaction(false)
      @Returns('string')
      public async GetFileByCID(ctx: Context, cid: string): Promise<string> {
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
        } catch (err) {
          console.log(err);
          record = strValue;
        }
    
        return JSON.stringify(record);
      }
    
      @Transaction()
      public async DeleteFile(ctx: Context, file_id: string): Promise<void> {
          const exists = await this.FileExists(ctx, file_id);
          if (!exists) {
              throw new Error(`The file ${file_id} does not exist`);
          }
          return ctx.stub.deleteState(file_id);
      }
      /*************************************User ***************************/
      @Transaction(false)
    public async GetUserById(ctx:Context, user_id:string): Promise<string>{
        console.log('Check');
        const fileJSON = await ctx.stub.getState(user_id);
        if (!fileJSON || fileJSON.length===0) {
            throw new Error(`The user ${user_id} does not exist`);
        } 
        return fileJSON.toString();
    }
    @Transaction()
    public async GetUserByUserName(ctx: Context, userName: string): Promise<string> {
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
        } catch (err) {
            console.log(err);
            record = strValue;
        }

        return JSON.stringify(record);
    }
    @Transaction(false)
    @Returns('boolean')
    public async UserExists(ctx:Context, user_id: string): Promise<boolean>{
        const fileJSON = await ctx.stub.getState(user_id);
        return fileJSON && fileJSON.length>0;
    }
    @Transaction(false)
    @Returns('string')
    public async GetAllUser(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
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
    
      
      
    
      @Transaction()
      public async DeleteUser(ctx: Context, user_id: string): Promise<void> {
          const exists = await this.UserExists(ctx, user_id);
          if (!exists) {
              throw new Error(`The user ${user_id} does not exist`);
          }
          return ctx.stub.deleteState(user_id);
      }

      /**************** Folder************************/
      @Transaction()
      public async CreateFolder(ctx: Context, folder_id:string, folder_name: string, folder_path:string, user_id: string, created_date:string, updated_date: string): Promise<void> {
        const exists = await this.FolderExists(ctx, folder_id);
        if (exists) {
            throw new Error(`The folder ${folder_id} already exists`);
        }
        const newFolder: Folder = {
            folder_id:folder_id,
            folder_name: folder_name,
            folder_path: folder_path,
            user_id: user_id,
            created_date: created_date,
            updated_date: updated_date,
        }
        await ctx.stub.putState(folder_id, Buffer.from(stringify(sortKeysRecursive(newFolder))));
      }

      @Transaction(false)
      @Returns('boolean')
      public async FolderExists(ctx: Context, folder_id: string): Promise<boolean> {
          const folderJSON = await ctx.stub.getState(folder_id);
          return folderJSON && folderJSON.length > 0;
      }
      

      @Transaction(false)
      @Returns('string')
      public async GetSubFolders(ctx: Context, user_id: string, folder_path: string): Promise<string> {
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
              } catch (err) {
                  console.log(err);
                  record = strValue;
              }

              if (record.folder_id && record.folder_id.startsWith('folder_')) {
                  allResults.push(record);
              }

              result = await iterator.next();
          }
          console.log('ketqua:',allResults);
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
    @Transaction()
    public async DeleteFolderAndSubFolder(ctx: Context, user_id: string, folder_path: string, folder_id: string): Promise<void> {
        folder_path=await this.ConcatenatePathAndNameById(ctx,folder_path,folder_id);
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

    
    @Transaction(false)
    @Returns('string')
    public async ConcatenatePathAndNameById(ctx: Context, folder_path: string, folder_id: string): Promise<string> {
        // Assume you have a method to retrieve folder_name by folder_id
        const folder_name = await this.getFolderNameById(ctx, folder_id);

        if (!folder_name) {
            throw new Error(`Folder with id ${folder_id} not found`);
        }

        const concatenatedPath = `${folder_path}/${folder_name}`;
        return concatenatedPath;
    }

    private async getFolderNameById(ctx: Context, folder_id: string): Promise<string | null> {
        const folderJSON = await ctx.stub.getState(folder_id);
        if (!folderJSON || folderJSON.length === 0) {
            return null;
        }

        try {
            const folder = JSON.parse(Buffer.from(folderJSON).toString('utf-8'));
            return folder.folder_name || null;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    @Transaction(false)
    @Returns('string')
    public async GetSubFoldersRecursive(ctx: Context, user_id: string, folder_path: string): Promise<string> {
        const subFolders = await this.getSubFoldersRecursive(ctx, user_id, folder_path);
        return JSON.stringify(subFolders);
    }
    private async getSubFoldersRecursive(ctx: Context, user_id: string, folder_path: string, allSubFolders: any[] = []): Promise<any[]> {
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
            } catch (err) {
                console.log(err);
                record = strValue;
            }

            if (record.folder_id && record.folder_id.startsWith('folder_')) {
                record.folder_path = await this.ConcatenatePathAndNameById(ctx,record.folder_path,record.folder_id);
                allSubFolders.push(record);
                await this.getSubFoldersRecursive(ctx, user_id, record.folder_path, allSubFolders);
            }

            result = await iterator.next();
        }

        return allSubFolders;
    }

}
   
    


