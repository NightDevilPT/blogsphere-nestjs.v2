import { GetProfileByIdHandler } from './handler/get-profile-by-id.query.handler';
import { GetProfileFollowersHandler } from './handler/get-profile-followers.query.handler';
import { GetProfileFollowingHandler } from './handler/get-profile-following.query.handler';
import { GetProfileHandler } from './handler/get-profile.query.handler';

export const profileQueryHandlers = [
  GetProfileHandler,
  GetProfileByIdHandler,
  GetProfileFollowersHandler,
  GetProfileFollowingHandler,
];
