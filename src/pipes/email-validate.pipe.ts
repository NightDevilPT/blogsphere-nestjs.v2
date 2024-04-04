import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isEmail } from 'class-validator';

@Injectable()
export class EmailValidationPipe implements PipeTransform {
  transform(data: any) {
    const email = data.email || data;
    if (!this.isValidEmail(email)) {
      console.log('print 2');
      throw new BadRequestException('Invalid email address');
    }
    return data;
  }

  private isValidEmail(value: string): boolean {
    return isEmail(value);
  }
}
