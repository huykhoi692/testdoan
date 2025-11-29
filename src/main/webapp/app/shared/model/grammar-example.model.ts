export interface IGrammarExample {
  id?: number;
  example?: string;
  exampleText?: string;
  exampleSentence?: string;
  translation?: string;
  explanation?: string;
  grammarId?: number;
  grammar?: { id?: number } | null;
}

export const defaultValue: Readonly<IGrammarExample> = {};
