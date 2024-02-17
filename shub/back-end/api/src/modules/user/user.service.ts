import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { User } from 'src/model/user.model';
import * as bcrypt from "bcrypt";


@Injectable()
export class UserService {
  
 
  async getUserByID(contract: Contract, user_id: string): Promise<User> {
    console.log('\n ---> Submit Transaction: getUser');
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
  
  await contract.submitTransaction('NewUser',newUser.email,newUser.password,newUser.firstName,newUser.lastName);
  return 'Success';
}
  

}
