import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { VerifyUserCommand } from '../impl/verify-user.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';

@Injectable()
@CommandHandler(VerifyUserCommand)
export class VerifyUserCommandHandler
  implements ICommandHandler<VerifyUserCommand>
{
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute(command: VerifyUserCommand): Promise<any> {
    const { token } = command;
    return this.verifyUserEmail(token);
  }

  async verifyUserEmail(token: string) {
    const findUser = await this.usersRepository.findOne({ where: { token } });
    if (!findUser) {
      throw new UnauthorizedException('Invalid token');
    }
    await this.usersRepository.update(findUser.id, {
      token: null,
      isVerified: true,
    });
    return {
      message: 'user successfully verified',
    };
  }
}
