import { Module } from '@nestjs/common';
 import { FabricFactory } from './fabric.config';
 import { FabricService } from './fabric.service';
import { ShubService } from 'src/config/shub.service';

 @Module({
   providers: [FabricService, FabricFactory,ShubService],
   exports: [FabricService],
 })
 export class FabricModule {}