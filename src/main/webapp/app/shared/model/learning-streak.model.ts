export interface ILearningStreak {
  id?: number;
  currentStreak?: number;
  longestStreak?: number;
  lastStudyDate?: string | null;
  iconUrl?: string | null;
  appUser?: { id?: number } | null;
}

export const defaultValue: Readonly<ILearningStreak> = {
  appUser: null,
  lastStudyDate: null,
};
