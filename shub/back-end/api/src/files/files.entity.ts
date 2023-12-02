import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users/users.entity';
import { Folders } from '../folders/folders.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  file_id: number;

  @Column()
  file_name: string;

  @Column()
  file_path: string;

  @Column()
  folder_id: number;

  @Column()
  user_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Folders)
  @JoinColumn({ name: 'folder_id' })
  folder: Folders;
}