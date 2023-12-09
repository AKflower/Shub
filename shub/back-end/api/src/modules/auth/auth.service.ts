// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Adjust the path as needed
import { BlacklistService } from './blacklist.service';
import { FabricService } from '../fabric/fabric.service';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';

@Injectable()
export class AuthService {
    private contract: Contract;
    //Constructor
    
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
    private readonly fabricService: FabricService
  ) {
    this.contract = this.fabricService.getContract('basic');
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUserByUserName(this.contract,username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      console.log(result);
      return result;
    }

    return null;
  }

  async login(user: any): Promise<string> {
    const payload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload);
  }

  async logout(token: string): Promise<void> {
    // Thêm token vào danh sách blacklist
    await this.blacklistService.addToBlacklist(token);
  }
}
