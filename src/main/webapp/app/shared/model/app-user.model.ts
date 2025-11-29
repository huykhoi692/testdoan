import { IUser } from './user.model';

export interface IAppUser {
  id?: number;
  displayName?: string;
  avatarUrl?: string;
  bio?: string;
  internalUser?: IUser;
}

export const defaultValue: Readonly<IAppUser> = {};
