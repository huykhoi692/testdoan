export interface IBookReview {
  id?: number;
  bookId?: number;
  userId?: number;
  rating?: number;
  comment?: string;
  title?: string;
  book?: any;
  appUser?: any;
  updatedAt?: string;
  createdAt?: string;
  content?: string;
}

export const defaultValue: Readonly<IBookReview> = {};
