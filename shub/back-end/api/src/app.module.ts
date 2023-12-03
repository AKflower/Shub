// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { FoldersModule } from './folders/folders.module';
import { AuthModule } from './auth/auth.module';
import { IPFSModule } from './ipfs/ipfs.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "khoa",
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
export class AppModule {}
