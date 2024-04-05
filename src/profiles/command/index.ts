import { CreateProfileHandler } from './handler/create-profile.command.handler';
import { UpdateProfileHandler } from './handler/update-profile.command.handler';

export const profileCommandHandlers = [
  CreateProfileHandler,
  UpdateProfileHandler,
];
