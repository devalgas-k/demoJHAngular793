import dayjs from 'dayjs/esm';
import { ITask } from 'app/entities/task/task.model';
import { IEmployee } from 'app/entities/employee/employee.model';

export interface IJob {
  id: number;
  jobTitle?: string | null;
  minSalary?: number | null;
  maxSalary?: number | null;
  subSalary?: number | null;
  totalSalary?: number | null;
  date?: dayjs.Dayjs | null;
  codeCode?: string | null;
  profil?: string | null;
  profilContentType?: string | null;
  tasks?: Pick<ITask, 'id' | 'title'>[] | null;
  employee?: Pick<IEmployee, 'id'> | null;
}

export type NewJob = Omit<IJob, 'id'> & { id: null };
