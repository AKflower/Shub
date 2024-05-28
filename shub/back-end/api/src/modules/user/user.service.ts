import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { User } from 'src/model/user.model';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from "bcrypt";
import { FabricService } from '../fabric/fabric.service';
import { RoleService } from '../role/role.service';


@Injectable()
export class UserService {
  private contract: Contract;
  private contractForRole: Contract;
  

  constructor(
    private readonly fabricService: FabricService,
    private readonly roleService: RoleService
  ) {
    this.contract = this.fabricService.getContract('UserContract');
    this.contractForRole = this.fabricService.getContract('RoleContract');
    
  }
  async getAllUser(contract: Contract): Promise<User[]> {
    const resultBytes= await contract.evaluateTransaction('GetAllUser');
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    const users : User[] = [];
    for (const item of result) {
      const user : User = {
        user_id: item.user_id,
        email: item.email,
        // password: item.password,
        firstName: item.firstName,
        lastName: item.lastName,
        role: item.role,
        isActive: item.isActive,
        isFirstAccess: item.isFirstAccess,
        organization: item.organization
      }
      const roleDetail = await this.roleService.getRoleByID(this.contractForRole,user.role);
      user.role_name = roleDetail.role_name;
      user.permissionIds=roleDetail.role_permissionIds;
      user.level = roleDetail.level;
      users.push(user);
    }
    return users;
  }
  async getUserByID(contract: Contract, user_id: string): Promise<User> {
    console.log('\n ---> Submit Transaction: getUser');
    console.log(user_id);
    const resultBytes= await contract.evaluateTransaction('GetUserById',user_id);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    const user : User = {
      user_id: result.user_id,
      email: result.email,
      password: result.password,
      firstName: result.firstName,
      lastName: result.lastName,
      organization: result.organization

    }
    console.log('*** Result:', result);
    console.log('*** Transaction committed successfully');
 
    return user;
  }
  async getUserByEmail(contract: Contract, email: string): Promise<User> {
    console.log('\n ---> Submit Transaction: getUserbyUSerName');
    const resultBytes= await contract.evaluateTransaction('GetUserByEmail',email);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    const user : User = {
        user_id: result.user_id,
        email: result.email,
        password: result.password,
        firstName: result.firstName,
        lastName: result.lastName,
        isFirstAccess: result.isFirstAccess,
        role: result.role,
        isActive: result.isActive,
        organization: result.organization

    }
    const roleDetail = await this.roleService.getRoleByID(this.contractForRole,user.role);
    user.role_name = roleDetail.role_name;
    user.permissionIds=roleDetail.role_permissionIds;
    console.log('*** Result:', result);
    console.log('*** Transaction committed successfully');

    return user;
  }
  async getSession(contract: Contract, user_id: string) : Promise<User> {
    const resultBytes= await contract.evaluateTransaction('GetSession',user_id);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    const user : User = {
      user_id: result.user_id,
      email: result.email,
      password: result.password,
      firstName: result.firstName,
      lastName: result.lastName,
      isFirstAccess: result.isFirstAccess,
      role: result.role,
      isActive: result.isActive,
      organization: result.organization

  }
  const roleDetail = await this.roleService.getRoleByID(this.contractForRole,user.role);
  user.role_name = roleDetail.role_name;
  user.permissionIds=roleDetail.role_permissionIds;
  user.level = roleDetail.level;
    return user;
  }
  async getUserByOrganization(contract: Contract,organization: string) : Promise<User[]> {
    console.log(organization);
    const resultBytes= await contract.evaluateTransaction('GetUserByOrganization',organization);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    console.log(result);
    const users : User[] = [];
    if (Array.isArray(result))
    for (const item of result) {
      const user : User = {
        user_id: item.user_id,
        email: item.email,
        // password: item.password,
        firstName: item.firstName,
        lastName: item.lastName,
        role: item.role,
        isActive: item.isActive,
        isFirstAccess: item.isFirstAccess,
        organization: item.organization
      }
      
      const roleDetail = await this.roleService.getRoleByID(this.contractForRole,user.role);
      console.log(roleDetail);
      user.role_name = roleDetail.role_name;
      user.permissionIds=roleDetail.role_permissionIds;
      user.level = roleDetail.level;
      users.push(user);
    }
    else users.push(result);
    return users;
  }
  async createNewUser(contract: Contract, newUser : User): Promise<string> {
    console.log('check new user');
    const saltOfRounds = 10;
    newUser.password = await bcrypt.hash(newUser.password, saltOfRounds);
    
    const resUTF8=await contract.submitTransaction('NewUser',newUser.email,newUser.password,newUser.firstName,newUser.lastName,newUser.role,newUser.organization);
    const utf8Decoder = new TextDecoder();
    const res = utf8Decoder.decode(resUTF8);

    return res;
  }
  async changePassword(contract: Contract, user_id: string, currentPassword: string, newPassword: string): Promise<string> {
     const user = await this.getUserByID(this.contract,user_id);
     console.log(user);
     console.log( bcrypt.compare(currentPassword, user.password));
     if (user && await bcrypt.compare(currentPassword, user.password)) {
        const saltOfRounds = 10;
        newPassword = await bcrypt.hash(newPassword, saltOfRounds);
        await contract.submitTransaction('ChangePassword',user_id,newPassword);

        return 'Change Password Successfully!';
      }
     else throw new Error('Wrong password!');

  
  }
  async userEmailExists(contract: Contract, email: string): Promise<void> {
    
    const resultBytes= await contract.evaluateTransaction('UserEmailExists',email);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    console.log('ssss');
    console.log(resultJson);
  }

  async resetPassword(contract: Contract, user_id:string) : Promise<string>{
    try {
      const user = await this.getUserByID(contract,user_id);
      const saltOfRounds = 10;
      const newPassword = await bcrypt.hash(user.email, saltOfRounds);
      await contract.submitTransaction('ResetPassword',user_id, newPassword);
      return `Reset password of ${user_id} successfully!`
    }
    catch (error) {
      throw new Error("Failed!");
  }
    
  }
  async changeUserFirstAccess(contract: Contract, user_id: string,isFirstAccess: boolean) : Promise<string>{
    try{
      await contract.submitTransaction('ChangeUserFirstAccess',user_id, isFirstAccess+'');
      return `First Access!`
    }
    catch (error) {
      throw new Error('Failed!');
    }
  }
  async changeUserStatus(contract: Contract, user_id: string,isActive: boolean) : Promise<string>{
    try{
      console.log('test: ',user_id,isActive);
      await contract.submitTransaction('ChangeUserStatus',user_id, isActive+'');
      return `Change successfuly!`
    }
    catch (error) {
      throw new Error('Failed!');
    }
  }
}
