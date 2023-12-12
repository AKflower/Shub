// // jwt.strategy.ts
// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { JwtPayload } from './jwt-payload.interface'; // You need to create this interface

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'dung170202', // Replace with your secret key
//     });
//   }

//   async validate(payload: JwtPayload): Promise<any> {
//     return { userId: payload.sub, username: payload.username };
//   }
// }
