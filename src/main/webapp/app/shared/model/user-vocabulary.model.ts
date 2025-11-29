import { IAppUser } from 'app/shared/model/app-user.model';
import { IWord } from 'app/shared/model/word.model';

export interface IUserVocabulary {
  id?: number;
  remembered?: boolean;
  isMemorized?: boolean;
  lastReviewed?: string;
  reviewCount?: number;
  appUser?: IAppUser;
  word?: IWord;
}

export const defaultValue: Readonly<IUserVocabulary> = {};
