import { IBook } from './book.model';
import { IWord } from './word.model';
import { IGrammar } from './grammar.model';
import { IListeningExercise } from './listening-exercise.model';
import { ISpeakingExercise } from './speaking-exercise.model';
import { IReadingExercise } from './reading-exercise.model';
import { IWritingExercise } from './writing-exercise.model';

export interface IChapter {
  bookTitle?: any;
  id?: number;
  title?: string;
  content?: string;
  description?: string;
  orderIndex?: number;
  book?: IBook;
  words?: IWord[];
  grammars?: IGrammar[];
  listeningExercises?: IListeningExercise[];
  speakingExercises?: ISpeakingExercise[];
  readingExercises?: IReadingExercise[];
  writingExercises?: IWritingExercise[];
}

export const defaultValue: Readonly<IChapter> = {};
