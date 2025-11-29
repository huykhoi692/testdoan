export interface IBook {
  id?: number;
  title?: string;
  author?: string;
  description?: string;
  level?: string;
  thumbnailUrl?: string;
  createdDate?: string;
  updatedDate?: string;
}

export const defaultValue: Readonly<IBook> = {};
