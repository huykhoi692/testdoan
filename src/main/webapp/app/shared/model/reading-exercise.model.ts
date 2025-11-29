import { IChapter } from './chapter.model';
import { IReadingOption } from './reading-option.model';

export interface IReadingExercise {
  id?: number;
  passage?: string;
  question?: string;
  correctAnswer?: string;
  maxScore?: number;
  chapter?: IChapter;
  readingOptions?: IReadingOption[];
}

export const defaultValue: Readonly<IReadingExercise> = {};
