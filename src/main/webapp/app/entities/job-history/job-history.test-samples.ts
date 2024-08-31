import dayjs from 'dayjs/esm';

import { Language } from 'app/entities/enumerations/language.model';

import { IJobHistory, NewJobHistory } from './job-history.model';

export const sampleWithRequiredData: IJobHistory = {
  id: 95113,
};

export const sampleWithPartialData: IJobHistory = {
  id: 7757,
  endDate: dayjs('2024-08-30T10:28'),
  file: '../fake-data/blob/hipster.png',
  fileContentType: 'unknown',
  date: dayjs('2024-08-30T05:28'),
  duration: '20263',
};

export const sampleWithFullData: IJobHistory = {
  id: 84891,
  startDate: dayjs('2024-08-30T11:29'),
  endDate: dayjs('2024-08-30T09:47'),
  language: Language['SPANISH'],
  file: '../fake-data/blob/hipster.png',
  fileContentType: 'unknown',
  date: dayjs('2024-08-30T20:25'),
  duration: '4181',
};

export const sampleWithNewData: NewJobHistory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
