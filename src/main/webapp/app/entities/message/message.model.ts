import dayjs from 'dayjs/esm';
import { ISubject } from 'app/entities/subject/subject.model';

export interface IMessage {
  id: number;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  file?: string | null;
  fileContentType?: string | null;
  city?: string | null;
  otherCountry?: string | null;
  date?: dayjs.Dayjs | null;
  subject?: Pick<ISubject, 'id' | 'name'> | null;
}

export type NewMessage = Omit<IMessage, 'id'> & { id: null };
