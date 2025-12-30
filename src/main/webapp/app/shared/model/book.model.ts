import { IBook } from './models';

export type { IBook };

export const defaultValue: Readonly<IBook> = {
  title: '',
  isActive: true,
};
