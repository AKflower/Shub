import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './modules/file/file.module';
import { FabricModule } from './modules/fabric/fabric.module';

@Module({
  imports: [FileModule, FabricModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
