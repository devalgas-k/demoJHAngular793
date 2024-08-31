import dayjs from 'dayjs/esm';

import { Contract } from 'app/entities/enumerations/contract.model';

import { IEmployee, NewEmployee } from './employee.model';

export const sampleWithRequiredData: IEmployee = {
  id: 7813,
  email: 'pq@a.gya',
};

export const sampleWithPartialData: IEmployee = {
  id: 40560,
  firstName: 'Guillemette',
  email: 'I<|?SN@z4D.q',
  phoneNumber: 'paradigm',
  contract: Contract['FREELANCE'],
  cv: '../fake-data/blob/hipster.png',
  cvContentType: 'unknown',
};

export const sampleWithFullData: IEmployee = {
  id: 93513,
  firstName: 'Oury',
  lastName: 'Gerard',
  email: '~ROP@{BCs..7AfZu',
  phoneNumber: 'challenge Iranian',
  hireDate: dayjs('2024-08-30T18:50'),
  salary: 12223,
  commissionPct: 56239,
  level: 4,
  contract: Contract['FREELANCE'],
  cv: '../fake-data/blob/hipster.png',
  cvContentType: 'unknown',
};

export const sampleWithNewData: NewEmployee = {
  email: 'RJkT_@,:E#.#',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
