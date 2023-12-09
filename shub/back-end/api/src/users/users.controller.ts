// import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { Users } from './users.entity';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly usersService: UsersService) {}

//   @Get()
//   @UseGuards(JwtAuthGuard)
//   findAll(): Promise<Users[]> {
//     return this.usersService.findAll();
//   }

//   @Get(':id')
//   @UseGuards(JwtAuthGuard)
//   findOne(@Param('id') id: string): Promise<Users> {
//     return this.usersService.findOne(+id);
//   }

//   @Post()
//   @UseGuards(JwtAuthGuard)
//   create(@Body() user: Users): Promise<Users> {
//     console.log(user)

//     return this.usersService.create(user);

//   }

//   @Put(':id')
//   @UseGuards(JwtAuthGuard)
//   update(@Param('id') id: string, @Body() user: Users): Promise<Users> {
//     return this.usersService.update(+id, user);
//   }

//   @Delete(':id')
//   @UseGuards(JwtAuthGuard)
//   remove(@Param('id') id: string): Promise<void> {
//     return this.usersService.remove(+id);
//   }
// }
