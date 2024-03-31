export enum Provider {
  GITHUB = 'github',
  LOCAL = 'local',
}

export interface createNewUser {
  email: string;
  password: string;
  provider: string;
  token: string;
  isVerified: boolean;
}

export interface loginUserInterface {
  email: string;
  password: string;
}
