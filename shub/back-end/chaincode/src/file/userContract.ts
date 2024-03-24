import { Context, Contract, Info, Returns, Transaction } from "fabric-contract-api";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { User } from "../user/user";




@Info({title: 'ManageUser', description: 'Smart contract for User'})
export class UserContract extends Contract {
    
    //Init
    
    
           

            
    
           

    // @Transaction()
    // public async AddUser(ctx: Context): Promise<void>{
    //     const exists =await this.UserExists(ctx, file_id);
    //     if (exists) {
    //         throw new Error(`The file ${file_id} already exists`);

    //     }
        
        
    //     const newfile = {
    //         file_id: file_id,
    //         file_name: file_name,
    //         file_path: file_path,
    //         cid: cid,
    //         user_id: user_id,
    //     };
    //     await ctx.stub.putState(file_id,Buffer.from(stringify(sortKeysRecursive(newfile))));

    // }
    private async generateUniqueId(ctx: Context, prefix: string): Promise<string> {
        let idCounter = 2;

        // Lấy giá trị hiện tại của counter từ ledger
        const counterBytes = await ctx.stub.getState('counter');
        if (counterBytes && counterBytes.length > 0) {
            idCounter = parseInt(counterBytes.toString(), 10);
        }

        // Tạo id mới với prefix và counter
        const newId = `${prefix}${idCounter}`;

        // Tăng giá trị counter cho lần tạo tiếp theo
        idCounter++;
        await ctx.stub.putState('counter', Buffer.from(idCounter.toString()));

        return newId;
    }
    @Transaction()
    public async NewUser(ctx: Context, email: string, password: string, firstName: string, lastName: string): Promise<string>{
        const user_id = await this.generateUniqueId(ctx, 'user_');
        const exists =await this.UserEmailExists(ctx, email);
        if (exists) {
            throw new Error(`The user ${email} already exists`);
            
        }
        
        
        const newUser = {
            user_id: user_id,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        };
        await ctx.stub.putState(user_id,Buffer.from(stringify(sortKeysRecursive(newUser))));
        return JSON.stringify(newUser)

    }
    @Transaction(false)
    public async GetUserById(ctx:Context, user_id:string): Promise<string>{
        console.log('Check');
        const fileJSON = await ctx.stub.getState(user_id);
        if (!fileJSON || fileJSON.length===0) {
            throw new Error(`The user ${user_id} does not exist`);
        } 
        return fileJSON.toString();
    }
    @Transaction(false)
    public async GetUserByEmail(ctx: Context, email: string): Promise<string> {
        const queryString = {
            selector: {
                email: email,
            },
        };

        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const result = await iterator.next();

        if (result.done) {
            throw new Error(`User with email ${email} not found`);
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
        const userJSON = await ctx.stub.getState(user_id);
        return userJSON && userJSON.length>0;
    }
    @Transaction(false)
    @Returns('boolean')
    public async UserEmailExists(ctx: Context, user_email: string): Promise<boolean> {
        const queryString = {
            selector: {
                email: user_email,
            },
        };

        const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
        const result = await iterator.next();

        // Return false if no user is found
        if (result.done) {
            return false;
        }

        const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
        let record;
        try {
            record = JSON.parse(strValue);
        } catch (err) {
            console.log(err);
            record = strValue;
        }

        // Return true if a user with the email is found
        return true;
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
            if (record.user_id && record.user_id.startsWith('user_')) {
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

      @Transaction()
      public async ChangePassword(ctx: Context, user_id: string, newPassword: string): Promise<void> {
        const exists = await this.UserExists(ctx, user_id);
        if (!exists) {
            throw new Error(`The user ${user_id} does not exist`);
        }
        const userString = await this.GetUserById(ctx,user_id);
        const userJSON = JSON.parse(userString);
        userJSON.password=newPassword;
        await ctx.stub.putState(user_id,Buffer.from(stringify(sortKeysRecursive(userJSON))));
      }
      

}
   
    


