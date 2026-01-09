import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { ThemeMode } from 'app/shared/model/enumerations/theme-mode.model';

export interface IUserProfile {
  id?: number;
  streakCount?: number | null;
  lastLearningDate?: dayjs.Dayjs | null;
  bio?: string | null;
  theme?: keyof typeof ThemeMode | null;
  user?: IUser;
}

export const defaultValue: Readonly<IUserProfile> = {};
