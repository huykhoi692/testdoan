import { IAppUser } from 'app/shared/services/app-user.service';

export interface IStudySession {
  id?: number;
  startAt?: string;
  endAt?: string;
  durationMinutes?: number;
  appUser?: IAppUser;
  userChapterId?: number;

  // Frontend specific or mapped fields
  chapterId?: number;
  startTime?: string; // Alias for startAt
}

export const defaultValue: Readonly<IStudySession> = {};
