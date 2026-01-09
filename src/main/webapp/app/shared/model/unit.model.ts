import { IBook } from 'app/shared/model/book.model';

export interface IUnit {
  id?: number;
  title?: string;
  orderIndex?: number;
  summary?: string | null;
  book?: IBook;
}

export const defaultValue: Readonly<IUnit> = {};
