// Exercise entity (matches JDL)
export interface IExercise {
  id?: number;
  exerciseText?: string; // TextBlob
  exerciseType?: ExerciseType;
  correctAnswerRaw?: string; // TextBlob - raw correct answer
  audioUrl?: string;
  imageUrl?: string;
  orderIndex?: number;
  unitId?: number;
  createdDate?: Date;
  lastModifiedDate?: Date;
}

export enum ExerciseType {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTI_CHOICE = 'MULTI_CHOICE',
  FILL_IN_BLANK = 'FILL_IN_BLANK',
}

export const defaultValue: Readonly<IExercise> = {
  id: undefined,
  exerciseText: '',
  exerciseType: ExerciseType.SINGLE_CHOICE,
  correctAnswerRaw: '',
  audioUrl: '',
  imageUrl: '',
  orderIndex: 0,
  unitId: undefined,
  createdDate: undefined,
  lastModifiedDate: undefined,
};

// Alias for backward compatibility
export type IQuestion = IExercise;
export const QuestionType = ExerciseType;
