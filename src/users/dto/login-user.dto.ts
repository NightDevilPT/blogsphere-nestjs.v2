import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty({ default: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '123' })
  password: string;
}
