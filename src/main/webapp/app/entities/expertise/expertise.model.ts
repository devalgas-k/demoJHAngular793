import { IExperience } from 'app/entities/experience/experience.model';

export interface IExpertise {
  id: number;
  title?: string | null;
  description?: string | null;
  level?: number | null;
  experiences?: Pick<IExperience, 'id' | 'company'>[] | null;
}

export type NewExpertise = Omit<IExpertise, 'id'> & { id: null };
