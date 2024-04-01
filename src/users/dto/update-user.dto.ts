import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ default: 'xyz' })
  username?: string;

  @ApiProperty({ default: '123' })
  password?: string;
}
