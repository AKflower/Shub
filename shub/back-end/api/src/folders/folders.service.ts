import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folders } from './folders.entity';
import { Files } from 'src/files/files.entity';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folders)
    private readonly folderRepository: Repository<Folders>,
    @InjectRepository(Files)
    private filesRepository: Repository<Files>,
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

  async updatePath(id: number, oldPath: string, folderData: Partial<Folders>): Promise<void>{
    const foldersToUpdate = await this.folderRepository.find({ 
      where: {
        user_id: id,
        folder_path: oldPath
      } 
    });
    for (const folder of foldersToUpdate) {
      this.folderRepository.update(folder.folder_id, folderData)
    }
  }

  async update(id: number, folderData: Partial<Folders>): Promise<Folders> {
    const oldParent = await this.findOneById(id);
    const oldPath = oldParent.folder_path + `+${oldParent.folder_name}`

    await this.folderRepository.update(id, folderData);
    const parent = await this.findOneById(id);
    const folder = {
      folder_path: parent.folder_path + `+${parent.folder_name}`
    }
    this.updatePath(parent.user_id, oldPath, folder)
    return this.findOneById(id); // Return the updated folder
  }

  async remove(id: number): Promise<void> {
    await this.findOneById(id); // Ensure the folder exists
    await this.folderRepository.delete(id);
  }

  async deleteFolderAndSubfoldersByPath(folderPath: string, userId: number, folderId: number): Promise<void> {
    // Lấy tất cả các folder con của folder cha cần xóa
    const subfolders = await this.getSubfolders(folderPath, userId);
    const subfiles = await this.getSubfiles(folderPath, userId);

    for (const subfolder of subfolders) { 
      await this.remove(subfolder.folder_id)
    }
    for (const subfile of subfiles) { 
      await this.filesRepository.delete(subfile.file_id)
    }
    await this.remove(folderId)
  }

  private async getSubfolders(folderPath: string, userId: number): Promise<Folders[]> {
    // Lấy tất cả các folder con của folder cha theo đệ quy
    const subfolders: Folders[] = [];
    const getSubfoldersRecursive = async (currentFolderPath: string) => {
      const folders = await this.folderRepository.find({
        where: { folder_path: currentFolderPath, user_id: userId },
      });
      
      subfolders.push(...folders);
      

      for (const folder of folders) {
        const newPath =  `${folder.folder_path}+${folder.folder_name}`
        await getSubfoldersRecursive(newPath);
      }
    };
    await getSubfoldersRecursive(folderPath);

    return subfolders;
  }

  private async getSubfiles(folderPath: string, userId: number): Promise<Files[]> {
    // Lấy tất cả các folder con của folder cha theo đệ quy
    const subfiles: Files[] = [];
    const getSubfoldersRecursive = async (currentFolderPath: string) => {
      const folders = await this.folderRepository.find({
        where: { folder_path: currentFolderPath, user_id: userId },
      });
      const files = await this.filesRepository.find({
        where: { file_path: currentFolderPath, user_id: userId },
      });
      subfiles.push(...files);

      for (const folder of folders) {
        const newPath =  `${folder.folder_path}+${folder.folder_name}`
        await getSubfoldersRecursive(newPath);
      }
    };
    await getSubfoldersRecursive(folderPath);

    return subfiles;
  }


}
