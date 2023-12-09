// import { Context, Contract, Info, Returns, Transaction } from "fabric-contract-api";
// import stringify from "json-stringify-deterministic";
// import sortKeysRecursive from "sort-keys-recursive";
// import { User } from "./user";




// @Info({title: 'ManageUser', description: 'Smart contract for User'})
// export class UserContract extends Contract {
    
//     //Init
    
    
           

            
    
           

//     // @Transaction()
//     // public async AddUser(ctx: Context): Promise<void>{
//     //     const exists =await this.UserExists(ctx, file_id);
//     //     if (exists) {
//     //         throw new Error(`The file ${file_id} already exists`);

//     //     }
        
        
//     //     const newfile = {
//     //         file_id: file_id,
//     //         file_name: file_name,
//     //         file_path: file_path,
//     //         cid: cid,
//     //         user_id: user_id,
//     //     };
//     //     await ctx.stub.putState(file_id,Buffer.from(stringify(sortKeysRecursive(newfile))));

//     // }
//     @Transaction(false)
//     public async GetUserById(ctx:Context, user_id:string): Promise<string>{
//         console.log('Check');
//         const fileJSON = await ctx.stub.getState(user_id);
//         if (!fileJSON || fileJSON.length===0) {
//             throw new Error(`The user ${user_id} does not exist`);
//         } 
//         return fileJSON.toString();
//     }
//     @Transaction()
//     public async GetUserByUserName(ctx: Context, userName: string): Promise<string> {
//         const queryString = {
//             selector: {
//                 username: userName,
//             },
//         };

//         const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
//         const result = await iterator.next();

//         if (result.done) {
//             throw new Error(`User with username ${userName} not found`);
//         }

//         const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
//         let record;
//         try {
//             record = JSON.parse(strValue);
//         } catch (err) {
//             console.log(err);
//             record = strValue;
//         }

//         return JSON.stringify(record);
//     }
//     @Transaction(false)
//     @Returns('boolean')
//     public async UserExists(ctx:Context, user_id: string): Promise<boolean>{
//         const fileJSON = await ctx.stub.getState(user_id);
//         return fileJSON && fileJSON.length>0;
//     }
//     @Transaction(false)
//     @Returns('string')
//     public async GetAllUser(ctx: Context): Promise<string> {
//         const allResults = [];
//         // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
//         const iterator = await ctx.stub.getStateByRange('', '');
//         let result = await iterator.next();
//         while (!result.done) {
//             const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
//             let record;
//             try {
//                 record = JSON.parse(strValue);
//             } catch (err) {
//                 console.log(err);
//                 record = strValue;
//             }
//             if (record.file_id && record.file_id.startsWith('user_')) {
//                 allResults.push(record);
//             }
//             result = await iterator.next();
//         }
//         return JSON.stringify(allResults);
//     }
    
      
      
    
//       @Transaction()
//       public async DeleteUser(ctx: Context, user_id: string): Promise<void> {
//           const exists = await this.UserExists(ctx, user_id);
//           if (!exists) {
//               throw new Error(`The user ${user_id} does not exist`);
//           }
//           return ctx.stub.deleteState(user_id);
//       }

      

// }
   
    


