import { Context, Contract, Info, Returns, Transaction } from "fabric-contract-api";
import stringify from "json-stringify-deterministic";
import sortKeysRecursive from "sort-keys-recursive";
import { User } from "../user/user";
import { Permission } from "../permission/permission";



@Info({title: 'ManageRole', description: 'Smart contract for Permission'})
export class PermissionContract extends Contract {
    
    
   
    @Transaction(false)
    @Returns('string')
    public async GetAllPermission(ctx: Context): Promise<string> {
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
            if (record.permission_id && record.permission_id.startsWith('permission_')) {
                allResults.push(record);
            }
            result = await iterator.next();
        }
 
        return JSON.stringify(allResults);
    }
    @Transaction(false)
    public async GetPermissionById(ctx:Context, permission_id:string): Promise<string>{
        console.log('Check');
        const permissionJSON = await ctx.stub.getState(permission_id);
        if (!permissionJSON || permissionJSON.length===0) {
            throw new Error(`The role ${permission_id} does not exist`);
        } 
        return permissionJSON.toString();
    }
    // @Transaction(false)
    // @Returns('boolean')
    // public async RoleExists(ctx: Context, role_name: string): Promise<boolean> {
    //     const queryString = {
    //         selector: {
    //             role_name: role_name,
    //         },
    //     };

    //     const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    //     const result = await iterator.next();

    //     // Return false if no user is found
    //     if (result.done) {
    //         return false;
    //     }

    //     const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
    //     let record;
    //     try {
    //         record = JSON.parse(strValue);
    //     } catch (err) {
    //         console.log(err);
    //         record = strValue;
    //     }

    //     // Return true if a user with the email is found
    //     return true;
    // }
    // @Transaction()
    //   public async UpdateTypeRole(ctx: Context, role_id: string,role_type: string): Promise<void> {
          
    //      const roleString = await this.GetRoleById(ctx,role_id);
    //       const roleJSON = JSON.parse(roleString);
    //       roleJSON.role_type= parseInt(role_type,10);

    //       await ctx.stub.putState(role_id,Buffer.from(stringify(sortKeysRecursive(roleJSON))))
          
    // }
    // @Transaction()
    // public async DeleteRole(ctx: Context, role_id: string): Promise<void> {
    //     // console.log('Delete role ', role_id);
    //     // const exists = await this.RoleExists(ctx, role_id);
    //     // if (!exists) {
    //     //     throw new Error(`The role ${role_id} does not exist`);
    //     // }
    //     return ctx.stub.deleteState(role_id);
    // }
    // @Transaction()
    // public async UpdateLevel(ctx: Context, roles: string): Promise<void>{
    //     const rolesJSON = JSON.parse(roles);
    //     // const oldRole = await this.GetRoleActive(ctx);
    //     // const oldRoleJSON = JSON.parse(oldRole);
    //     for (const role of rolesJSON) {
    //         await ctx.stub.putState(role.role_id,Buffer.from(stringify(sortKeysRecursive(role))));
    //     }
        

    // }
    // @Transaction(false)
    // public async GetRoleActive(ctx: Context): Promise<string> {
    //     const queryString = {
    //         selector: {
    //             role_type: 1,
    //         }
    //     };
    //     const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    //     const allResults = [];
    
    //     let result = await iterator.next();
    //     while (!result.done) {
    //       const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
    //       let record;
    //       try {
    //         record = JSON.parse(strValue);
    //       } catch (err) {
    //         console.log(err);
    //         record = strValue;
    //       }
    //       allResults.push(record);
    //       result = await iterator.next();
    //     }
    
    //     return JSON.stringify(allResults);
    // }
    // @Transaction(false)
    // public async GetRoleByOrg(ctx: Context,role_organization:string): Promise<string> {
    //     const queryString = {
    //         selector: {
    //             role_organization: role_organization,
    //         }
    //     };
    //     const iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString));
    //     const allResults = [];
    
    //     let result = await iterator.next();
    //     while (!result.done) {
    //       const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
    //       let record;
    //       try {
    //         record = JSON.parse(strValue);
    //       } catch (err) {
    //         console.log(err);
    //         record = strValue;
    //       }
    //       allResults.push(record);
    //       result = await iterator.next();
    //     }
    
    //     return JSON.stringify(allResults);
    // }
}


