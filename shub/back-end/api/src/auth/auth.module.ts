// // auth.module.ts
// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './jwt.strategy'; // You need to implement this strategy
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { UsersModule } from 'src/users/users.module';
// import { BlacklistService } from './blacklist.service';

// @Module({
//   imports: [
//     UsersModule,
//     JwtModule.register({
//       secret: 'dung170202', // Replace with your secret key
//       signOptions: { expiresIn: '24h' }, // Adjust the expiration time as needed
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy, JwtAuthGuard, BlacklistService],
//   exports: [JwtModule, AuthService, BlacklistService], // Export JwtModule to make it available to other modules
// })
// export class AuthModule {}
