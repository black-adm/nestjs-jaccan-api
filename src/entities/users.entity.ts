import { createId } from '@paralleldrive/cuid2';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  CUSTOMER = 'customer',
  MANAGER = 'manager',
}

@Entity('users')
export class User {
  @PrimaryColumn('text', { name: 'user_id' })
  id: string = createId();

  @Column('text', { name: 'name', nullable: false })
  name: string;

  @Column('text', { name: 'email', nullable: false, unique: true })
  email: string;

  @Column('text', { name: 'phone', nullable: false })
  phone: string;

  @Column('enum', {
    name: 'role',
    enum: UserRole,
    default: UserRole.CUSTOMER,
    nullable: false,
  })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
