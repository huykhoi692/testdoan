import { IUnit } from 'app/shared/model/unit.model';

export interface IVocabulary {
  id?: number;
  word?: string;
  phonetic?: string | null;
  meaning?: string;
  example?: string | null;
  imageUrl?: string | null;
  orderIndex?: number;
  unit?: IUnit;
}

export const defaultValue: Readonly<IVocabulary> = {
  word: '',
  phonetic: '',
  meaning: '',
  example: '',
  imageUrl: '',
  orderIndex: 0,
};
