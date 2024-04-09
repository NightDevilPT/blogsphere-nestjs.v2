import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Provider } from '../interface/user.interface';
import { Profile } from 'src/profiles/entities/profile.entity';

@Entity('users')
@Unique(['email']) // Ensure email uniqueness
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, nullable: true, select: false })
  password: string;

  @Column({ length: 255, nullable: true, select: false })
  token: string;

  @Column({ default: false, name: 'isVerified' })
  isVerified: boolean;

  @Column({ default: 'local' })
  provider: Provider;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
