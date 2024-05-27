import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { Role } from 'src/model/role.model';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from "bcrypt";
import { FabricService } from '../fabric/fabric.service';



@Injectable()
export class RoleService {
  private contract: Contract;

  constructor(
    private readonly fabricService: FabricService,
  ) {
    this.contract = this.fabricService.getContract('RoleContract');

  }
  async getAllRole(contract: Contract): Promise<Role[]> {
    const resultBytes= await contract.evaluateTransaction('GetAllRole');
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log(result);
    const roles : Role[] = [];
    for (const item of result) {
      const role : Role = {
        role_id: item.role_id,
        idInt: item.idInt,
        role_name: item.role_name,
        role_organization: item.role_organization,
        level: item.level,
        role_type: item.role_type
      }
      roles.push(role);
    }
    return roles;
  }
  async getRoleActive(contract: Contract): Promise<Role[]> {
    const resultBytes= await contract.evaluateTransaction('GetRoleActive');
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log(result);
    const roles : Role[] = [];
    for (const item of result) {
      const role : Role = {
        role_id: item.role_id,
        idInt: item.idInt,
        role_name: item.role_name,
        role_organization: item.role_organization,
        level: item.level,
        role_type: item.role_type
      }
      roles.push(role);
    }
    return roles;
  }
  async getRoleByOrg(contract: Contract, role_organization: string): Promise<Role[]> {
    console.log(role_organization);
    const resultBytes= await contract.evaluateTransaction('GetRoleByOrg',role_organization);
    console.log(resultBytes);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log(result);
    const roles : Role[] = [];
    for (const item of result) {
      const role : Role = {
        role_id: item.role_id,
        idInt: item.idInt,
        role_name: item.role_name,
        role_organization: item.role_organization,
        level: item.level,
        role_type: item.role_type,

      }
      roles.push(role);
    }
    return roles;
  }
  async getRoleByID(contract: Contract, role_id: string): Promise<Role> {
    console.log('\n ---> Submit Transaction: getRole');

    const resultBytes= await contract.evaluateTransaction('GetRoleById',role_id);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    const role : Role = {
        role_id: result.role_id,
        idInt: result.idInt,
        role_name: result.role_name,
        role_organization: result.role_organization,
        level: result.level,
        role_type: result.role_type,
        role_permissionIds: result.role_permissionIds
    }
    console.log('*** Result:', result);
    console.log('*** Transaction committed successfully');
 
    return role;
  }
 
  async createNewRole(contract: Contract, newRole: Role): Promise<string> {
    
    console.log(newRole);
    const resUTF8=await contract.submitTransaction('NewRole',newRole.role_name,newRole.level+'',newRole.role_type+'',newRole.role_organization);
    const utf8Decoder = new TextDecoder();
    const res = utf8Decoder.decode(resUTF8);

    return res;
  }
  
  async updateTypeRole(contract: Contract,role_id: string, role_type: number): Promise<string> {
    await contract.submitTransaction('UpdateTypeRole',role_id,role_type+'');
    return 'Update Successful!'
  }

  async delete(contract: Contract, id: string) : Promise<string> {
    


    console.log('aloooooo',id);
    await contract.submitTransaction('DeleteRole',id);

    return 'Delete successfully!';
  }
  async updateLevel(contract: Contract,roles: Role[]): Promise<string>{
    const rolesParam = JSON.stringify(roles);
    await contract.submitTransaction('UpdateLevel',rolesParam);
    return "Update successfully!"
  }
  
}
