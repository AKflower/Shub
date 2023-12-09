// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { Folders } from './folders.entity'; 
import { Files } from 'src/files/files.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Folders]), TypeOrmModule.forFeature([Files]),],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
