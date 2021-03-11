import {
  Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from './interfaces';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
