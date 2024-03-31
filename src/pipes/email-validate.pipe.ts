import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class EmailValidationPipe implements PipeTransform {
  transform(userData: CreateUserDto) {
    if (!this.isValidEmail(userData.email)) {
      throw new BadRequestException('Invalid email address');
    }
    return userData;
  }

  private isValidEmail(value: string): boolean {
    return isEmail(value);
  }
}
