// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Files } from './files.entity'; 
import { IPFSModule } from 'src/ipfs/ipfs.module';


@Module({
  imports: [TypeOrmModule.forFeature([Files]), IPFSModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
