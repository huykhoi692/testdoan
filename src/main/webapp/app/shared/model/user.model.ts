export enum UserRole {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  USER = 'USER',
}

export interface IUser {
  id?: number;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[];
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  password?: string;
  role?: UserRole;
  imageUrl?: string;
}

export const defaultValue: Readonly<IUser> = {
  id: undefined,
  login: '',
  firstName: '',
  lastName: '',
  email: '',
  activated: true,
  langKey: 'en',
  authorities: [],
  createdBy: '',
  createdDate: undefined,
  lastModifiedBy: '',
  lastModifiedDate: undefined,
};
