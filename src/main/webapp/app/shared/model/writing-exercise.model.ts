import { IChapter } from 'app/shared/model/chapter.model';

export interface IWritingExercise {
  id?: number;
  prompt?: string;
  sampleAnswer?: string;
  maxScore?: number;
  chapter?: IChapter;
}
export const defaultValue: Readonly<IWritingExercise> = {};
