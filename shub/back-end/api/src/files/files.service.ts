// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Files } from './files.entity';

// @Injectable()
// export class FilesService {
//   constructor(
//     @InjectRepository(Files)
//     private filesRepository: Repository<Files>,
//   ) {}

//   async findAll(): Promise<Files[]> {
//     return this.filesRepository.find();
//   }

//   async findOne(id: number): Promise<Files> {
//     return this.filesRepository.findOne({ where: { file_id: id } });
//   }

//   async findByUserIdAndPath(userId: number, filePath: string): Promise<Files[]> {
//     return this.filesRepository.find({
//       where: {
//         user_id: userId,
//         file_path: filePath,
//       },
//     });
//   }
  

//   async create(files: Files): Promise<Files> {
//     return this.filesRepository.save(files);
//   }

//   async update(id: number, files: Files): Promise<Files> {
//     await this.filesRepository.update(id, files);
//     return this.filesRepository.findOne({ where: { file_id: id } });
//   }

//   async remove(id: number): Promise<void> {
//     await this.filesRepository.delete(id);
//   }
// }
