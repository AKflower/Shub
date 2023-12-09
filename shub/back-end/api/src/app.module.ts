// src/app.module.ts
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { FoldersModule } from './folders/folders.module';
import { AuthModule } from './auth/auth.module';
import { IPFSModule } from './ipfs/ipfs.module';
import { FilesModule } from './files/files.module';
import { BlacklistMiddleware } from './auth/blacklist.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "1702",
      database: "Shub",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false
  }
    ),
    UsersModule,
    FoldersModule,
    AuthModule,
    IPFSModule,
    FilesModule
    // Import other modules as needed
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Sử dụng middleware ở mức ứng dụng hoặc chỉ cho các route cụ thể
    consumer.apply(BlacklistMiddleware).forRoutes('*');
  }
}
