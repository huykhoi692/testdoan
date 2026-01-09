import dayjs from 'dayjs';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { IBook } from 'app/shared/model/book.model';
import { EnrollmentStatus } from 'app/shared/model/enumerations/enrollment-status.model';

export interface IEnrollment {
  id?: number;
  enrolledAt?: dayjs.Dayjs;
  status?: keyof typeof EnrollmentStatus;
  userProfile?: IUserProfile;
  book?: IBook;
}

export const defaultValue: Readonly<IEnrollment> = {};
