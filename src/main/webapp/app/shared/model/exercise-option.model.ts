import { IExercise } from 'app/shared/model/exercise.model';

export interface IExerciseOption {
  id?: number;
  optionText?: string;
  isCorrect?: boolean;
  orderIndex?: number | null;
  exercise?: IExercise;
}

export const defaultValue: Readonly<IExerciseOption> = {
  isCorrect: false,
};
