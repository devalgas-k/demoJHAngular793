import dayjs from 'dayjs/esm';

import { Contract } from 'app/entities/enumerations/contract.model';

import { IExperience, NewExperience } from './experience.model';

export const sampleWithRequiredData: IExperience = {
  id: 52146,
  title: 'NZ:T`j',
  company: 'I',
  inProgress: false,
  contract: Contract['CDD'],
};

export const sampleWithPartialData: IExperience = {
  id: 51015,
  title: 'W tb4!',
  company: 'HK@4',
  logoCompany: '../fake-data/blob/hipster.png',
  logoCompanyContentType: 'unknown',
  inProgress: true,
  contract: Contract['CDI'],
  startDate: dayjs('2024-08-30'),
  endDate: dayjs('2024-08-31'),
};

export const sampleWithFullData: IExperience = {
  id: 60971,
  title: 'Zl',
  company: 'MiJ',
  description: '../fake-data/blob/hipster.txt',
  logoCompany: '../fake-data/blob/hipster.png',
  logoCompanyContentType: 'unknown',
  inProgress: true,
  contract: Contract['CDD'],
  startDate: dayjs('2024-08-30'),
  endDate: dayjs('2024-08-30'),
};

export const sampleWithNewData: NewExperience = {
  title: 'J',
  company: 'Sa',
  inProgress: true,
  contract: Contract['CDD'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
