import { IChapter } from 'app/shared/model/models';
import { ISpeakingExercise } from 'app/shared/model/models';

export interface ISpeakingTopic {
  id?: number;
  context?: string;
  imageUrl?: string;
  chapter?: IChapter;
  speakingExercises?: ISpeakingExercise[];
}

export const defaultValue: Readonly<ISpeakingTopic> = {};
