import { IChapter } from './chapter.model';
import { IGrammarExample } from './grammar-example.model';

export interface IGrammar {
  id?: number;
  title?: string;
  rule?: string;
  description?: string;
  level?: string;
  chapter?: IChapter;
  grammarExamples?: IGrammarExample[];
}

export const defaultValue: Readonly<IGrammar> = {};
