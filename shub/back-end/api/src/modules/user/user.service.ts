import { Injectable } from '@nestjs/common';
import { connect, Contract, Signer, signers } from '@hyperledger/fabric-gateway';
import { promises as fs } from 'fs';
import { User } from 'src/model/user.model';



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
        username: result.username,
        password: result.password,
        email: result.email
    }
    console.log('*** Result:', result);
    console.log('*** Transaction committed successfully');
 
    return user;
}
async getUserByUserName(contract: Contract, user_name: string): Promise<User> {
  console.log('\n ---> Submit Transaction: getUserbyUSerName');
  const resultBytes= await contract.evaluateTransaction('GetUserByUserName',user_name);
  const utf8Decoder = new TextDecoder();
  const resultJson = utf8Decoder.decode(resultBytes);
  const result = JSON.parse(resultJson);
  const user : User = {
      user_id: result.user_id,
      username: result.username,
      password: result.password,
      email: result.email
  }
  console.log('*** Result:', result);
  console.log('*** Transaction committed successfully');

  return user;
}
async createNewUser(contract: Contract, newUser : User): Promise<string> {
  console.log('check new user');
  await contract.submitTransaction('NewUser',newUser.username,newUser.password,newUser.email);
  return 'Success';
}
  

}
