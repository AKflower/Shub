// // src/app.module.ts
// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from './users/users.module';
// import { FoldersModule } from './folders/folders.module';
// import { AuthModule } from './auth/auth.module';
// import { FileModule } from './modules/file/file.module';
// import { FabricModule } from './modules/fabric/fabric.module';
// import { AppController } from './app.controller';
//  import { AppService } from './app.service';

// @Module({
//   imports: [
//   //   TypeOrmModule.forRoot({
//   //     type: "postgres",
//   //     host: "localhost",
//   //     port: 5432,
//   //     username: "postgres",
//   //     password: "khoa",
//   //     database: "Shub",
//   //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   //     synchronize: false
//   // }
//   //   ),
//     // UsersModule,
//     // FoldersModule,
//     // AuthModule,
//     FileModule, FabricModule
//     // Import other modules as needed
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';

// import { UsersModule } from './users/users.module';
// import { FoldersModule } from './folders/folders.module';
// import { AuthModule } from './auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { FabricModule } from './modules/fabric/fabric.module';
import { UserModule } from './modules/user/user.module';
import { FolderModule } from './modules/folder/folder.module';

@Module({
  imports: [
    FileModule, FabricModule, UserModule, FolderModule
  //   TypeOrmModule.forRoot({
  //     type: "postgres",
  //     host: "localhost",
  //     port: 5432,
  //     username: "postgres",
  //     password: "khoa",
  //     database: "Shub",
  //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
  //     synchronize: false
  // }
  //   ),
  //   UsersModule,
  //   FoldersModule,
  //   AuthModule
    // Import other modules as needed
  ],
})
export class AppModule {}
