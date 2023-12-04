import { Module } from '@nestjs/common';
 import { FabricFactory } from './fabric.config';
 import { FabricService } from './fabric.service';

 @Module({
   providers: [FabricService, FabricFactory],
   exports: [FabricService],
 })
 export class FabricModule {}