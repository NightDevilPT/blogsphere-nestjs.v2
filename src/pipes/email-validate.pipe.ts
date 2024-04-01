import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class EmailValidationPipe implements PipeTransform {
  transform(data: any) {
    if (data.email && !this.isValidEmail(data.email)) {
      throw new BadRequestException('Invalid email address');
    } else if (!this.isValidEmail(data)) {
      throw new BadRequestException('Invalid email address');
    }
    return data;
  }

  private isValidEmail(value: string): boolean {
    return isEmail(value);
  }
}
