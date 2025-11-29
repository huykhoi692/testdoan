import { IWord } from 'app/shared/model/word.model';

export interface IWordExample {
  id?: number;
  exampleText?: string;
  translation?: string;
  word?: IWord;
}

export const defaultValue: Readonly<IWordExample> = {};
