import { CreateProfileHandler } from './handler/create-profile.command.handler';
import { UpdateProfileFollowHandler } from './handler/update-profile-follow.command.handler';
import { UpdateProfileHandler } from './handler/update-profile.command.handler';

export const profileCommandHandlers = [
  CreateProfileHandler,
  UpdateProfileHandler,
  UpdateProfileFollowHandler,
];
