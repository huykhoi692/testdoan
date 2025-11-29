export interface IUserGrammar {
  id?: number;
  grammarId?: number;
  userId?: number;
  score?: number;
  remembered?: boolean;
  isMemorized?: boolean;
  lastReviewed?: string;
  reviewCount?: number;
  appUser?: { id?: number } | null;
  grammar?: { id?: number } | null;
}

export const defaultValue: Readonly<IUserGrammar> = {};
