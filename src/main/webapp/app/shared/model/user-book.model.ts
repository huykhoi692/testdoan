export interface IUserBook {
  id?: number;
  bookId?: number;
  bookTitle?: string;
  learningStatus?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progressPercentage?: number;
  isFavorite?: boolean;
  savedAt?: string;
  lastAccessedAt?: string;
  currentChapterId?: number;
}

export const defaultValue: Readonly<IUserBook> = {
  learningStatus: 'NOT_STARTED',
  progressPercentage: 0,
  isFavorite: false,
};
