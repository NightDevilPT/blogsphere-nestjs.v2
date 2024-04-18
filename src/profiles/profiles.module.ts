import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Profile } from './entities/profile.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from 'src/services/jwt-service';
import { profileCommandHandlers } from './command';
import { PaginationService } from 'src/services/pagination-service';
import { profileQueryHandlers } from './query';
import { Follow } from './entities/profile-follow.entity';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Profile, User, Follow])],
  controllers: [ProfilesController],
  providers: [
    ProfilesService,
    JwtService,
    PaginationService,
    ...profileCommandHandlers,
    ...profileQueryHandlers,
  ],
})
export class ProfilesModule {}
