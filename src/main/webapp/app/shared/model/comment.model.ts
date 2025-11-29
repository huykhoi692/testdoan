export interface IComment {
  appUser?: any;
  createdAt?: any;
  id?: number;
  userId?: number;
  content?: string;
  chapterId?: number;
}

export const defaultValue: Readonly<IComment> = {};
