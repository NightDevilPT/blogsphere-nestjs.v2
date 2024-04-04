// scheduler.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('scheduler')
export class Scheduler {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  timeStamp: string;

  @Column({ type: 'varchar' })
  command: string;

  @Column({ type: 'json' })
  payload: any;

  @Column({ type: 'enum', enum: ['Success', 'Pending'], default: 'Pending' })
  status: string;

  @Column({ type: 'uuid' })
  createdBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
