// scheduler.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('schedulers')
export class Scheduler {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null })
  timeStamp: Date;

  @Column({ type: 'varchar' })
  command: string;

  @Column({ type: 'json' })
  payload: any;

  @Column({ type: 'varchar', nullable: false })
  payloadId: string;

  @Column({ type: 'enum', enum: ['Success', 'Pending'], default: 'Pending' })
  status: string;

  @Column({ type: 'uuid' })
  createdBy: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
