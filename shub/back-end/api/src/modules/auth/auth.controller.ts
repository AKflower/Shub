// src/auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException, UseGuards, Req, Param, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
// import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService, // Inject JwtService
  ) {}

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    console.log(email,password);
    const user = await this.authService.validateUser(email, password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // If the user is valid, generate a JWT token
    const token = this.jwtService.sign({ email: user.email, sub: user.userId });

    return { 
      user_id: user.user_id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      access_token: token 
    };
  }

  @Post('logout/:token')
  async logout(@Param('token') token: string): Promise<void> {
    
    await this.authService.logout(token);
  }

}
