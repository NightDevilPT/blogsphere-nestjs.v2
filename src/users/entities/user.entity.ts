import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToOne,
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

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 'local' })
  provider: Provider;

  @OneToOne(() => Profile, (profile) => profile.user, { eager: true })
  profile: Profile;
}
