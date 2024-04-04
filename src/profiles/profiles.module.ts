import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Profile } from './entities/profile.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from 'src/services/jwt-service';
import { profileCommandHandlers } from './command';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfilesController],
  providers: [ProfilesService, JwtService, ...profileCommandHandlers],
})
export class ProfilesModule {}
