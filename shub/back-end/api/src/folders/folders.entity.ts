// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// import { Users } from '../users/users.entity';

// @Entity()
// export class Folders {
//   @PrimaryGeneratedColumn()
//   folder_id: number;

//   @Column()
//   folder_name: string;

//   @Column()
//   folder_path: string;

//   @Column()
//   user_id: number;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   created_at: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   updated_at: Date;

//   @ManyToOne(() => Users)
//   @JoinColumn({ name: 'user_id' })
//   user: Users;
// }
