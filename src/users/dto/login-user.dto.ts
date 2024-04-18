import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'happy_bird_94@yahoo.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: 'test123' })
  password: string;
}
