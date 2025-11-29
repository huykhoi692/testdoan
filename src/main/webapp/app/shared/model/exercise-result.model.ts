import { IAppUser } from 'app/shared/model/app-user.model';
import { IListeningExercise } from 'app/shared/model/listening-exercise.model';
import { ISpeakingExercise } from 'app/shared/model/speaking-exercise.model';
import { IReadingExercise } from 'app/shared/model/reading-exercise.model';
import { IWritingExercise } from 'app/shared/model/writing-exercise.model';

export const enum ExerciseType {
  LISTENING = 'LISTENING',
  SPEAKING = 'SPEAKING',
  READING = 'READING',
  WRITING = 'WRITING',
}

export interface IExerciseResult {
  id?: number;
  exerciseType?: ExerciseType;
  score?: number;
  userAnswer?: string;
  submittedAt?: string;
  appUser?: IAppUser;
  listeningExercise?: IListeningExercise;
  speakingExercise?: ISpeakingExercise;
  readingExercise?: IReadingExercise;
  writingExercise?: IWritingExercise;
}

export const defaultValue: Readonly<IExerciseResult> = {};
