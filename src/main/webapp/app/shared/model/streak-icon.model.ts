export interface IStreakIcon {
  id?: number;
  name?: string;
  url?: string;
  level?: number;
  minDays?: number;
  iconPath?: string;
  description?: string;
}

export const defaultValue: Readonly<IStreakIcon> = {};
