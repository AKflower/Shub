import { Controller, Get, Post,  UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IPFSService } from './ipfs.service';

@Controller()
export class IPFSController {
  constructor(private readonly appService: IPFSService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file)  {
    return this.appService.uploadFile(file);
  }

  @Get('listPinnedFiles')
  async listPinnedFiles() {
    return this.appService.listPinnedFiles();
  }

  @Get('download/:cid')
  downloadFile(@Param('cid') cid: string): Promise<void> {
    return this.appService.downloadFile(cid);
  }

  
}
