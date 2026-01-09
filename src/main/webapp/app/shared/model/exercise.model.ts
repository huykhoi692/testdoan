import { IUnit } from 'app/shared/model/unit.model';
import { ExerciseType } from 'app/shared/model/enumerations/exercise-type.model';
import { IExerciseOption } from 'app/shared/model/exercise-option.model';

export interface IExercise {
  id?: number;
  exerciseText?: string;
  exerciseType?: keyof typeof ExerciseType;
  correctAnswerRaw?: string | null;
  audioUrl?: string | null;
  imageUrl?: string | null;
  orderIndex?: number;
  unit?: IUnit;
  options?: IExerciseOption[];
}

export const defaultValue: Readonly<IExercise> = {
  exerciseText: '',
  exerciseType: 'SINGLE_CHOICE', // Default value if needed
  correctAnswerRaw: '',
  audioUrl: '',
  imageUrl: '',
  orderIndex: 0,
};
