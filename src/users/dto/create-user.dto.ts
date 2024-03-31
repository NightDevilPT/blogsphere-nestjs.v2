import { ApiProperty } from '@nestjs/swagger';
import { Provider } from '../interface/user.interface';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: Provider, required: true })
  provider: Provider;
}
