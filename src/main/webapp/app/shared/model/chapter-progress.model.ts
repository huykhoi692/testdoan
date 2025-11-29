export interface IChapterProgress {
  id?: number;
  chapterId?: number;
  userId?: number;
  percent?: number;
  completed?: boolean;
  lastAccessed?: string;
  appUser?: { id?: number } | null;
  chapter?: { id?: number } | null;
}

export const defaultValue: Readonly<IChapterProgress> = {};
