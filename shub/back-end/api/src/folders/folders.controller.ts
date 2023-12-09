import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { Folders } from './folders.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Folders[]> {
    return this.foldersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string): Promise<Folders> {
    return this.foldersService.findOneById(+id);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  findAllByUserId(@Param('userId') userId: string): Promise<Folders[]> {
    return this.foldersService.findAllByUserId(+userId);
  }

  @Get(':userId/:folderPath')
  @UseGuards(JwtAuthGuard)
  async findByUserIdAndPath(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('folderPath') folderPath: string,
  ) {
      return  this.foldersService.findByUserIdAndPath(userId, folderPath);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() folderData: Partial<Folders>): Promise<Folders> {
    return this.foldersService.create(folderData);
  }

  // @Patch(':id/:oldPath')
  // @UseGuards(JwtAuthGuard)
  // updatePath(@Param('id') id: string, @Param('oldPath') oldPath: string, @Body() folderData: Partial<Folders>): Promise<void> {
  //   return this.foldersService.updatePath(+id, oldPath, folderData);
  // }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() folderData: Partial<Folders>): Promise<Folders> {
    return this.foldersService.update(+id, folderData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string): Promise<void> {
    return this.foldersService.remove(+id);
  }

  @Delete(':userId/:folderId/:folderPath')
  async deleteFolderAndSubfolders(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('folderId', ParseIntPipe) folderId: number,
    @Param('folderPath') folderPath: string,
  ) {
    try {
      await this.foldersService.deleteFolderAndSubfoldersByPath(folderPath, userId, folderId);
      return { message: 'Xóa thành công' };
    } catch (error) {
      return { message: 'Xóa thất bại', error: error.message };
    }
  }
}
