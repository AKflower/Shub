// // main.ts
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import { createServer } from 'http';

// async function bootstrap() {
//   const expressApp = require('express')();
//   const app = await NestFactory.create(
//     AppModule,
//     new ExpressAdapter(expressApp),
//   );

//   app.enableCors(); // Enable CORS for all routes

//   const httpServer = createServer(expressApp);
//   await app.listen(3000);

//   console.log(`Application is running on: http://localhost:3000`);
// }

// bootstrap();
import { NestFactory } from '@nestjs/core';
 import { AppModule } from './app.module';

 async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   await app.listen(3001);
 }
 bootstrap();