import { IStudySession } from './study-session.model';

export interface IStreakMilestone {
  id?: number;
  milestoneDays?: number; // renamed from days
  rewardName?: string; // renamed from reward
  studySession?: IStudySession | null; // relation added
}

export const defaultValue: Readonly<IStreakMilestone> = {};
