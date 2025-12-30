import { IChapter } from 'app/shared/model/models';
import { IListeningExercise } from 'app/shared/model/models';

export interface IListeningAudio {
  id?: number;
  audioUrl?: string;
  transcript?: string;
  chapter?: IChapter;
  listeningExercises?: IListeningExercise[];
}

export const defaultValue: Readonly<IListeningAudio> = {};
