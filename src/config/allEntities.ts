import { Profile } from 'src/profiles/entities/profile.entity';
import { User } from '../users/entities/user.entity';
import { Scheduler } from 'src/scheduler/entities/scheduler.entity';
import { Blog } from 'src/blogs/entities/blog.entity';
import { Follow } from 'src/profiles/entities/profile-follow.entity';

export const AllEntities = [User, Profile, Scheduler, Blog, Follow];
