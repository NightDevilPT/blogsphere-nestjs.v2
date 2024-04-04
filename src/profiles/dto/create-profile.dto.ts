import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsUrl,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { GenderEnum } from '../interface/profile-interface';

export class CreateProfileDto {
  @ApiProperty({ default: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ default: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ default: 'default-avatar-url' })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    enum: GenderEnum,
    enumName: 'GenderEnum',
    default: GenderEnum.Male,
  })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum = GenderEnum.Male;

  @ApiProperty({ default: 'No bio available' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ default: 'http://facebook.com' })
  @IsUrl()
  @IsOptional()
  facebookUrl?: string;

  @ApiProperty({ default: 'http://twitter.com' })
  @IsUrl()
  @IsOptional()
  twitterUrl?: string;

  @ApiProperty({ default: 'http://youtube.com' })
  @IsUrl()
  @IsOptional()
  youtubeUrl?: string;

  @ApiProperty({ default: 'http://instagram.com' })
  @IsUrl()
  @IsOptional()
  instagramUrl?: string;

  @ApiProperty({ default: 'http://linkedin.com' })
  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;
}
