import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Folders } from './folders.entity';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folders)
    private readonly folderRepository: Repository<Folders>,
  ) {}

  async findAll(): Promise<Folders[]> {
    return this.folderRepository.find();
  }

  async findOneById(id: number): Promise<Folders> {
    const folder = await this.folderRepository.findOne({ where: { folder_id: id } });

    if (!folder) {
      throw new NotFoundException(`Folder with id ${id} not found`);
    }

    return folder;
  }

  async findAllByUserId(userId: number): Promise<Folders[]> {
    return this.folderRepository.find({ where: { user_id: userId } });
  }

  async findByUserIdAndPath(userId: number, folderPath: string): Promise<Folders[]> {
    return this.folderRepository.find({
      where: {
        user_id: userId,
        folder_path: folderPath,
      },
    });
  }

  async create(folderData: Partial<Folders>): Promise<Folders> {
    const folder = this.folderRepository.create(folderData);
    return this.folderRepository.save(folder);
  }

  async update(id: number, folderData: Partial<Folders>): Promise<Folders> {
    await this.findOneById(id); // Ensure the folder exists
    await this.folderRepository.update(id, folderData);
    return this.findOneById(id); // Return the updated folder
  }

  async remove(id: number): Promise<void> {
    await this.findOneById(id); // Ensure the folder exists
    await this.folderRepository.delete(id);
  }
}
