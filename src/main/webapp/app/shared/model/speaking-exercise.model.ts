import { IChapter } from 'app/shared/model/chapter.model';

export interface ISpeakingExercise {
  id?: number;
  prompt?: string;
  sampleAudio?: string;
  maxScore?: number;
  chapter?: IChapter;
}

export const defaultValue: Readonly<ISpeakingExercise> = {};
