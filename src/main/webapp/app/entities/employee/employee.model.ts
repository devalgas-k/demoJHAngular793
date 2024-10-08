import dayjs from 'dayjs/esm';
import { IDepartment } from 'app/entities/department/department.model';
import { Contract } from 'app/entities/enumerations/contract.model';

export interface IEmployee {
  id: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  hireDate?: dayjs.Dayjs | null;
  salary?: number | null;
  commissionPct?: number | null;
  level?: number | null;
  contract?: Contract | null;
  cv?: string | null;
  cvContentType?: string | null;
  manager?: Pick<IEmployee, 'id'> | null;
  department?: Pick<IDepartment, 'id'> | null;
}

export type NewEmployee = Omit<IEmployee, 'id'> & { id: null };
