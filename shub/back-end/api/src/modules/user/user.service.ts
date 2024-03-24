import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { User } from 'src/model/user.model';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from "bcrypt";
import { FabricService } from '../fabric/fabric.service';



@Injectable()
export class UserService {
  private contract: Contract;

  constructor(
    private readonly fabricService: FabricService,
  ) {
    this.contract = this.fabricService.getContract('UserContract');

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
        password: item.password,
        firstName: item.firstName,
        lastName: item.lastName,
      }
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
    }
    console.log('*** Result:', result);
    console.log('*** Transaction committed successfully');

    return user;
  }
  async createNewUser(contract: Contract, newUser : User): Promise<string> {
    console.log('check new user');
    const saltOfRounds = 10;
    newUser.password = await bcrypt.hash(newUser.password, saltOfRounds);
    
    const resUTF8=await contract.submitTransaction('NewUser',newUser.email,newUser.password,newUser.firstName,newUser.lastName);
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
    console.log('fasfafas');
    const resultBytes= await contract.evaluateTransaction('UserEmailExists',email);
    const utf8Decoder = new TextDecoder();
    const resultJson = utf8Decoder.decode(resultBytes);
    console.log('ssss');
    console.log(resultJson);
  }

  

}
