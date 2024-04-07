import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import {
  IsString,
  IsUrl,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { GenderEnum } from '../interface/profile-interface';

@Entity()
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

  @OneToOne(() => User, (user) => user.profile, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinColumn()
  user: User;

  @ManyToMany(() => Profile, (profile) => profile.following, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  followers: Profile[];

  @ManyToMany(() => Profile, (profile) => profile.followers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  following: Profile[];

  async addFollower(profile: Profile): Promise<void> {
    if (!this.followers.some((follower) => follower.id === profile.id)) {
      this.followers.push(profile);
    }
  }

  async removeFollower(profile: Profile): Promise<void> {
    this.followers = this.followers.filter(
      (follower) => follower.id !== profile.id,
    );
  }

  async addFollowing(profile: Profile): Promise<void> {
    if (!this.following.some((following) => following.id === profile.id)) {
      this.following.push(profile);
    }
  }

  async removeFollowing(profile: Profile): Promise<void> {
    this.following = this.following.filter(
      (following) => following.id !== profile.id,
    );
  }
}
