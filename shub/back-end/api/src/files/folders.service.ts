// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Folders } from './files.entity';

// @Injectable()
// export class FoldersService {
//   constructor(
//     @InjectRepository(Folders)
//     private foldersRepository: Repository<Folders>,
//   ) {}

//   async findAll(): Promise<Folders[]> {
//     return this.foldersRepository.find();
//   }

//   async findOne(id: number): Promise<Folders> {
//     return this.foldersRepository.findOne({ where: { folder_id: id } });
//   }
  

//   async create(folders: Folders): Promise<Folders> {
//     return this.foldersRepository.save(folders);
//   }

//   async update(id: number, folders: Folders): Promise<Folders> {
//     await this.foldersRepository.update(id, folders);
//     return this.foldersRepository.findOne({ where: { folder_id: id } });
//   }

//   async remove(id: number): Promise<void> {
//     await this.foldersRepository.delete(id);
//   }
// }
