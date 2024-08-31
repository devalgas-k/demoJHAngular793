import dayjs from 'dayjs/esm';
import { IExpertise } from 'app/entities/expertise/expertise.model';
import { Contract } from 'app/entities/enumerations/contract.model';

export interface IExperience {
  id: number;
  title?: string | null;
  company?: string | null;
  description?: string | null;
  logoCompany?: string | null;
  logoCompanyContentType?: string | null;
  inProgress?: boolean | null;
  contract?: Contract | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  expertise?: Pick<IExpertise, 'id' | 'title'>[] | null;
}

export type NewExperience = Omit<IExperience, 'id'> & { id: null };
