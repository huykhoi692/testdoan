import { IAppUser } from 'app/shared/services/app-user.service';
import { IChapter } from 'app/shared/model/models';

export interface IChapterProgress {
  id?: number;
  percent?: number;
  lastAccessed?: string;
  completed?: boolean;
  appUser?: IAppUser;
  chapter?: IChapter;

  // Flattened fields for convenience/frontend usage
  chapterId?: number;
  chapterTitle?: string;
  bookId?: number;
  isCompleted?: boolean; // Alias for completed
  progress?: number; // Alias for percent

  // Stats
  wordsLearned?: number;
  grammarsLearned?: number;
  exercisesCompleted?: number;
}

export const defaultValue: Readonly<IChapterProgress> = {
  completed: false,
  isCompleted: false,
};
