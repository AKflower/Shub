// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'; // Adjust the path as needed
import { BlacklistService } from './blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly blacklistService: BlacklistService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
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
