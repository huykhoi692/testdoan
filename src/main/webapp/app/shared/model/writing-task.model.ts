import { IChapter } from 'app/shared/model/models';
import { IWritingExercise } from 'app/shared/model/models';

export interface IWritingTask {
  id?: number;
  prompt?: string;
  imageUrl?: string;
  chapter?: IChapter;
  writingExercises?: IWritingExercise[];
}

export const defaultValue: Readonly<IWritingTask> = {};
