import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '../interface/user.interface';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: 'xyz' })
  username: string;

  @ApiProperty({ default: 'example@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '123' })
  password: string;

  @ApiProperty({ enum: Provider, required: true, default: 'local' })
  provider: Provider;
}
