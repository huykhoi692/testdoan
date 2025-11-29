import { IReadingExercise } from 'app/shared/model/reading-exercise.model';

export interface IReadingOption {
  id?: number;
  label?: string;
  content?: string;
  isCorrect?: boolean;
  orderIndex?: number;
  readingExercise?: IReadingExercise;
}

export const defaultValue: Readonly<IReadingOption> = {};
