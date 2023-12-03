// import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
// import { FoldersService } from './folders.service';
// import { Folders } from './files.entity';

// @Controller('folders')
// export class FoldersController {
//   constructor(private readonly usersService: FoldersService) {}

//   @Get()
//   findAll(): Promise<Folders[]> {
//     return this.usersService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string): Promise<Folders> {
//     return this.usersService.findOne(+id);
//   }

//   @Post()
//   create(@Body() user: Folders): Promise<Folders> {
//     return this.usersService.create(user);
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() user: Folders): Promise<Folders> {
//     return this.usersService.update(+id, user);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string): Promise<void> {
//     return this.usersService.remove(+id);
//   }
// }
