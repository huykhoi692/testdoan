import { IChapter } from 'app/shared/model/models';
import { IReadingExercise } from 'app/shared/model/models';

export interface IReadingPassage {
  id?: number;
  content?: string;
  title?: string;
  chapter?: IChapter;
  readingExercises?: IReadingExercise[];
}

export const defaultValue: Readonly<IReadingPassage> = {};
