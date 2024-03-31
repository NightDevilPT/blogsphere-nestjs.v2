import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, GoneException, Injectable } from '@nestjs/common';
import { CreateUserCommand } from '../impl/create-user.command';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from 'src/services/jwt-service';
import { PasswordEncryptionService } from 'src/services/password-service';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/services/mail-service';

@Injectable()
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private password: PasswordEncryptionService,
    private mailService: MailService,
    private configService: ConfigService,
    private jwt: JwtService,
  ) {}

  async execute(command: CreateUserCommand): Promise<any> {
    const { createUserDto } = command;
    const isAvailable = await this.isUserAvailable(createUserDto.email);
    if (isAvailable) {
      throw new ConflictException('User already exists');
    }
    if (createUserDto.provider === 'github') {
      return this.createNewGithubUser(createUserDto);
    }
    return this.createNewLocalUser(createUserDto);
  }

  async isUserAvailable(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return !!user; // If user exists, return true; otherwise, return false
  }

  async createNewLocalUser(createUserDto: CreateUserDto) {
    const password = await this.password.hashPassword(createUserDto.password);
    const token = await this.password.hashPassword(createUserDto.email);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password,
      token,
    });

    try {
      const savedUser = await this.usersRepository.save(newUser);

      const sendMailResult = await this.mailService.sendVerificationLink(
        savedUser.email,
        savedUser.username,
        `${this.configService.get('ORIGIN')}/verify-mail?token=${token}`,
      );

      if (!sendMailResult) {
        await this.usersRepository.delete(savedUser.id);
        throw new Error('Failed to send verification email');
      }

      return {
        message: `Verification link sent to ${savedUser.email}`,
      };
    } catch (error) {
      await this.usersRepository.delete(newUser.id);
      throw new GoneException(error.message);
    }
  }

  async createNewGithubUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create({
      ...createUserDto,
      token: null,
      password: null,
      isVerified: true,
    });
    const saveNewUser = await this.usersRepository.save(newUser);
    const token = await this.jwt.generateToken({ email: saveNewUser.email });
    return {
      message: 'Successfully signup',
      token,
      userId: saveNewUser.id,
    };
  }
}
