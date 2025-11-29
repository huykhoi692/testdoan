import { IChapter } from './chapter.model';

export interface IWord {
  id?: number;
  text?: string;
  meaning?: string;
  pronunciation?: string;
  partOfSpeech?: string;
  imageUrl?: string;
  chapter?: IChapter;
}

export const defaultValue: Readonly<IWord> = {};
