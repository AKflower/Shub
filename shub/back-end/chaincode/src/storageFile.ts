import { Context, Contract, Info, Returns, Transaction } from "fabric-contract-api";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { File } from "./file";




@Info({title: 'ManageUploadShare', description: 'Smart contract for Upload and share file'})
export class StorageFileContract extends Contract {
    
    //Init
    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const firstfile: File= 
            {
                ID: '001',
                Owner: 'Khoa',
                NameFile: 'Readme.md',
                Type: 'md',
                Link: 'ipfs1',
            }
    
           

            
    
            await ctx.stub.putState(firstfile.ID, Buffer.from(stringify(sortKeysRecursive(firstfile))));
            console.info(`Asset ${firstfile.ID} initialized`);
    }

    @Transaction()
    public async UploadFile(ctx: Context,id: string, owner:string, namefile:string, type: string, link: string): Promise<void>{
        const exists =await this.FileExists(ctx, id);
        if (exists) {
            throw new Error(`The file ${id} already exists`);

        }
        const newfile = {
            ID: id,
            Owner: owner,
            NameFile: namefile,
            Type: type,
            Link: link,
        };
        await ctx.stub.putState(id,Buffer.from(stringify(sortKeysRecursive(newfile))));

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
    public async FileExists(ctx:Context, id: string): Promise<boolean>{
        const fileJSON = await ctx.stub.getState(id);
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
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
    @Transaction()
    public async DeleteFile(ctx: Context, id: string): Promise<void> {
        const exists = await this.FileExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }
    
}
   
    


