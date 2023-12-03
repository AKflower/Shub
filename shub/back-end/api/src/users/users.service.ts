import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    return this.usersRepository.findOne({ where: { user_id: id } });
  }
  

  async create(user: Users): Promise<Users> {
    return this.usersRepository.save(user);
  }

  async update(id: number, user: Users): Promise<Users> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOne({ where: { user_id: id } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
