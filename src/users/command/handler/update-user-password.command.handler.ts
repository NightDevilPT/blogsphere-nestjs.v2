import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordEncryptionService } from 'src/services/password-service';
import { UpdateUserPasswordCommand } from '../impl/update-user-password.command';

@Injectable()
@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordCommandHandler
  implements ICommandHandler<UpdateUserPasswordCommand>
{
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private password: PasswordEncryptionService,
  ) {}

  async execute(command: UpdateUserPasswordCommand): Promise<any> {
    const { token, password } = command;
    const findUser = await this.usersRepository.findOne({
      where: { token },
    });
    if (!findUser) {
      throw new UnauthorizedException('Invalid token');
    }
    return await this.updatePassword(findUser, password);
  }

  async updatePassword(
    findUser: User,
    password: string,
  ): Promise<{ message: string }> {
    try {
      const hashPassword = await this.password.hashPassword(password);
      await this.usersRepository.update(findUser.id, {
        token: null,
        password: hashPassword,
      });
      return {
        message: 'Password successfully updated',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('An unexpected error occurred');
    }
  }
}
