import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import bcrypt from 'bcrypt';
import { IUser } from './interfaces';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword(): Promise<User> {
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
    return this;
  }

  async validatePassword(pwd: string): Promise<boolean> {
    return bcrypt.compare(pwd, this.password);
  }
}
