// ExerciseOption entity (matches JDL)
export interface IExerciseOption {
  id?: number;
  optionText?: string;
  isCorrect?: boolean;
  orderIndex?: number;
  exerciseId?: number; // Changed from questionId to match JDL
  createdDate?: Date;
  lastModifiedDate?: Date;
}

export const defaultValue: Readonly<IExerciseOption> = {
  id: undefined,
  optionText: '',
  isCorrect: false,
  orderIndex: 0,
  exerciseId: undefined,
  createdDate: undefined,
  lastModifiedDate: undefined,
};

// Alias for backward compatibility
export type IQuestionOption = IExerciseOption;
