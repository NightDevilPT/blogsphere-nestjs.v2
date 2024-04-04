import {
  IsString,
  IsUrl,
  IsOptional,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { GenderEnum } from '../interface/profile-interface'; // Assuming GenderEnum is defined in profile-interface

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty({ groups: ['update'] }) // Not empty only if provided
  firstName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty({ groups: ['update'] }) // Not empty only if provided
  lastName?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  facebookUrl?: string;

  @IsUrl()
  @IsOptional()
  twitterUrl?: string;

  @IsUrl()
  @IsOptional()
  youtubeUrl?: string;

  @IsUrl()
  @IsOptional()
  instagramUrl?: string;

  @IsUrl()
  @IsOptional()
  linkedinUrl?: string;
}
