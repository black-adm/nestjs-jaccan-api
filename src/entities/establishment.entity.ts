import { createId } from '@paralleldrive/cuid2';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('establishments')
export class Establishment {
  @PrimaryColumn('text', { name: 'establishment_id' })
  id: string = createId();

  @Column('text', { name: 'name', nullable: false })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string;

  @Column('text', { name: 'manager_id', nullable: true })
  managerId: string;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'manager_id' })
  manager: User | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
