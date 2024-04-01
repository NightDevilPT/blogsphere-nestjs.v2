import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GoneException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordEncryptionService } from 'src/services/password-service';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/services/mail-service';
import { ForgetUserCommand } from '../impl/forget-password.command';

@Injectable()
@CommandHandler(ForgetUserCommand)
export class ForgetUserCommandHandler implements ICommandHandler<ForgetUserCommand> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private password: PasswordEncryptionService,
    private mailService: MailService,
    private configService: ConfigService,
  ) {}

  async execute(command: ForgetUserCommand): Promise<any> {
    const { emailPayload } = command;
    const findUser = await this.usersRepository.findOne({ where: { email: emailPayload } });
    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    return this.generateLink(emailPayload, findUser);
  }

  async generateLink(email: string, user: User): Promise<{ message: string }> {
    const token = await this.password.hashPassword(`${new Date().toLocaleTimeString()}`);
    try {
      await this.usersRepository.update(user.id, { token });
      const sendMailResult = await this.mailService.sendUpdatePasswordLink(
        user.email,
        user.username,
        `${this.configService.get('ORIGIN')}/update-password?token=${token}`,
      );

      if (!sendMailResult) {
        throw new Error('Failed to send update password email');
      }

      return {
        message: `Update Password link sent to ${user.email}`,
      };
    } catch (error) {
      throw new GoneException('Failed to generate update password link');
    }
  }
}
