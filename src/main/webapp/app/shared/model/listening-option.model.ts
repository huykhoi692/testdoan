import { IListeningExercise } from 'app/shared/model/listening-exercise.model';

export interface IListeningOption {
  id?: number;
  label?: string;
  content?: string;
  isCorrect?: boolean;
  orderIndex?: number;
  listeningExercise?: IListeningExercise;
}

export const defaultValue: Readonly<IListeningOption> = {};
