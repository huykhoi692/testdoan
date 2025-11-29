export interface IUserAchievement {
  id?: number;
  achievementId?: number;
  userId?: number;
  earnedAt?: string;
  awardedTo?: string;
  appUser?: { id?: number } | null;
  achievement?: { id?: number } | null;
}

export const defaultValue: Readonly<IUserAchievement> = {};
