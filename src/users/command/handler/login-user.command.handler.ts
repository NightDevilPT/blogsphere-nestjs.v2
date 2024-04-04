import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from '../impl/login-user.command';
import { JwtService } from 'src/services/jwt-service';
import { loginUserInterface } from 'src/users/interface/user.interface';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PasswordEncryptionService } from 'src/services/password-service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
@CommandHandler(LoginUserCommand)
export class LoginUserCommandHandler
  implements ICommandHandler<LoginUserCommand>
{
  constructor(
    private jwt: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private passwordService: PasswordEncryptionService,
  ) {}

  async execute(command: LoginUserCommand): Promise<any> {
    const { loginPayload } = command;
    return this.loginUser(loginPayload);
  }

  async loginUser(payload: loginUserInterface) {
    const { email, password } = payload;
    const findUser = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'password', 'isVerified'],
    });

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    if (findUser.provider === 'github') {
      return this.returnToken(email, findUser.id);
    }

    const verifyPassword = await this.passwordService.verifyPassword(
      password,
      findUser.password,
    );
    if (!verifyPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    if (!findUser.isVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    return this.returnToken(email, findUser.id);
  }

  async returnToken(email: string, userId: string) {
    const token = await this.jwt.generateToken({
      email,
      userId,
    });
    return {
      message: 'User successfully logged in',
      token,
    };
  }
}
