import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordEncryptionService } from 'src/services/password-service';
import { JwtService } from 'src/services/jwt-service';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/services/mail-service';
import { allCommandHandlers } from './command';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    PasswordEncryptionService,
    JwtService,
    ConfigService,
    MailService,
    ...allCommandHandlers,
  ],
})
export class UsersModule {}
