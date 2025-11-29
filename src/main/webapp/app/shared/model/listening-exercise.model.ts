import { IChapter } from 'app/shared/model/chapter.model';
import { IListeningOption } from 'app/shared/model/listening-option.model';

export interface IListeningExercise {
  id?: number;
  audioPath?: string;
  imageUrl?: string;
  transcript?: string;
  question?: string;
  correctAnswer?: string;
  maxScore?: number;
  options?: IListeningOption[];
  chapter?: IChapter;
}

export const defaultValue: Readonly<IListeningExercise> = {};
