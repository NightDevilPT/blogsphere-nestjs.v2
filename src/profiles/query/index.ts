import { GetProfileByIdHandler } from './handler/get-profile-by-id.query.handler';
import { GetProfileHandler } from './handler/get-profile.query.handler';

export const profileQueryHandlers = [GetProfileHandler, GetProfileByIdHandler];
