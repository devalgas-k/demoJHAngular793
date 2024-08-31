import dayjs from 'dayjs/esm';

import { IJob, NewJob } from './job.model';

export const sampleWithRequiredData: IJob = {
  id: 43395,
  jobTitle: 'b b Superviseur',
  profil: '../fake-data/blob/hipster.png',
  profilContentType: 'unknown',
};

export const sampleWithPartialData: IJob = {
  id: 2082,
  jobTitle: 'a a Specialiste',
  minSalary: 86420,
  maxSalary: 6314,
  subSalary: 32907,
  profil: '../fake-data/blob/hipster.png',
  profilContentType: 'unknown',
};

export const sampleWithFullData: IJob = {
  id: 90392,
  jobTitle: 'c c Designer',
  minSalary: 57405,
  maxSalary: 30269,
  subSalary: 38941,
  totalSalary: 6104,
  date: dayjs('2024-08-30'),
  codeCode: '5a42789a-1199-4dad-b77b-e9853a384a3b',
  profil: '../fake-data/blob/hipster.png',
  profilContentType: 'unknown',
};

export const sampleWithNewData: NewJob = {
  jobTitle: 'a a Designer',
  profil: '../fake-data/blob/hipster.png',
  profilContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
