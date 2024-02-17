import { Context, Contract, Info, Returns, Transaction } from "fabric-contract-api";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { File } from "./file";




@Info({title: 'ManageUploadShare', description: 'Smart contract for Upload and share file'})
export class StorageFileContract extends Contract {
    
    //Init
    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        
       
        const firstfile: File = new File({
            file_id: '1',
            file_name: "example.txt",
            file_path: "+files",
            cid: "123abc",
            user_id: '1',
            
        }); 
    
            await ctx.stub.putState(''+firstfile.file_id, Buffer.from(stringify(sortKeysRecursive(firstfile))));
            console.info(`Asset ${firstfile.file_id} initialized`);
    }

    @Transaction()
    public async UploadFile(ctx: Context,file_id: string, file_name: string, file_path: string, cid: string, user_id: number ): Promise<void>{
        const exists =await this.FileExists(ctx, file_id);
        if (exists) {
            throw new Error(`The file ${file_id} already exists`);

        }
        const newfile = new File({
            file_id: file_id,
            file_name: file_name,
            file_path: file_path,
            cid: cid,
            user_id: user_id,
        });
        await ctx.stub.putState(file_id,Buffer.from(stringify(sortKeysRecursive(newfile))));

    }
    @Transaction()
    public async GetFile(ctx:Context, file_id:string): Promise<string>{
        const fileJSON = await ctx.stub.getState(file_id);
        if (!fileJSON || fileJSON.length===0) {
            throw new Error(`The file ${file_id} does not exist`);
        } 
        return fileJSON.toString();
    }

    @Transaction(false)
    @Returns('boolean')
    public async FileExists(ctx:Context, id: string): Promise<boolean>{
        const fileJSON = await ctx.stub.getState(id);
        return fileJSON && fileJSON.length>0;
    }
    @Transaction(false)
    @Returns('string')
    public async GetFilesByPath(ctx: Context, file_path: string): Promise<string> {
        const queryString = {
            selector: {
                file_path: file_path,
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
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
    @Transaction()
    public async DeleteFile(ctx: Context, file_id: string): Promise<void> {
        const exists = await this.FileExists(ctx, file_id);
        if (!exists) {
            throw new Error(`The asset ${file_id} does not exist`);
        }
        return ctx.stub.deleteState(''+file_id);
    }
    
}
   
    


