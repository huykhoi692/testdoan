import { IAppUser } from 'app/shared/services/app-user.service';
import { IChapter } from 'app/shared/model/models';
import { LearningStatus } from 'app/shared/model/dto.model';

export interface IUserChapter {
  id?: number;
  savedAt?: string;
  learningStatus?: LearningStatus;
  lastAccessedAt?: string;
  isFavorite?: boolean;
  notes?: string;
  tags?: string;
  appUser?: IAppUser;
  chapter?: IChapter;

  // Extended fields
  chapterId?: number;
  chapterTitle?: string;
  chapterOrderIndex?: number;
  bookId?: number;
  bookTitle?: string;
  bookThumbnail?: string;
  bookLevel?: string;
  progressPercent?: number;
  completed?: boolean;
}

export const defaultValue: Readonly<IUserChapter> = {
  isFavorite: false,
  completed: false,
};
