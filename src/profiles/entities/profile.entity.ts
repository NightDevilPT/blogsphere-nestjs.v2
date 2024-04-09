import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsString,
  IsUrl,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { GenderEnum } from '../interface/profile-interface';
import { Blog } from 'src/blogs/entities/blog.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column({ nullable: false })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({ nullable: true })
  @IsOptional()
  avatar: string;

  @Column({ nullable: true })
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @Column({ nullable: true })
  @IsOptional()
  bio: string;

  @Column({ nullable: true })
  @IsUrl()
  @IsOptional()
  facebookUrl: string;

  @Column({ nullable: true })
  @IsUrl()
  @IsOptional()
  twitterUrl: string;

  @Column({ nullable: true })
  @IsUrl()
  @IsOptional()
  youtubeUrl: string;

  @Column({ nullable: true })
  @IsUrl()
  @IsOptional()
  instagramUrl: string;

  @Column({ nullable: true })
  @IsUrl()
  @IsOptional()
  linkedinUrl: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Blog, (blog) => blog.author, { cascade: true, eager: true })
  blogs: Blog[];
}
