export interface IBookProgress {
  id?: number;
  bookId?: number;
  userId?: number;
  percent?: number;
  book?: any;
  appUser?: any;
  completed?: boolean;
  lastAccessed?: string;
}

export const defaultValue: Readonly<IBookProgress> = {};
