import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FilesService } from './files.service';
import { Files } from './files.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { IPFSService } from 'src/ipfs/ipfs.service';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService, private readonly ipfsService: IPFSService, ) {}
  

  @Get()
  findAll(): Promise<Files[]> {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Files> {
    return this.filesService.findOne(+id);
  }

  @Post()
  create(@Body() user: Files): Promise<Files> {
    return this.filesService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: Files): Promise<Files> {
    return this.filesService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.filesService.remove(+id);
  }

  @Get(':userId/:filePath')
  @UseGuards(JwtAuthGuard)
  async findByUserIdAndPath(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('filePath') filePath: string,
  ) {
      return  this.filesService.findByUserIdAndPath(userId, filePath);
  }

  @Post('upload/:userId/:filePath')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file, @Param('userId', ParseIntPipe) userId: number, @Param('filePath') filePath: string)  {
    const res = await this.ipfsService.uploadFile(file);
    const fileData = {
      file_name: file.originalname,
      file_path: filePath,
      file_data: res.cid,
      file_type: file.mimetype,
      user_id: userId
    }
    return fileData

  }
}
