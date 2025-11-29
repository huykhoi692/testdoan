export interface IStudySession {
  id?: number;
  userId?: number;
  appUser?: { id?: number } | null;
  startAt?: string;
  endAt?: string;
  startTime?: string;
  endTime?: string;
  durationMinutes?: number;
}

export const defaultValue: Readonly<IStudySession> = {};
