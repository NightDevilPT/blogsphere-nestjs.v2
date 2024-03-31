import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
import { Provider } from '../interface/user.interface';

@Entity('users')
@Unique(['email']) // Ensure email uniqueness
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  username: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, nullable: true })
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: 'local' })
  provider: Provider;
}
