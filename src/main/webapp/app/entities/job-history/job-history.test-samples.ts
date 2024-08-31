import dayjs from 'dayjs/esm';

import { Language } from 'app/entities/enumerations/language.model';

import { IJobHistory, NewJobHistory } from './job-history.model';

export const sampleWithRequiredData: IJobHistory = {
  id: 95113,
};

export const sampleWithPartialData: IJobHistory = {
  id: 71556,
  endDate: dayjs('2024-08-31T02:37'),
  file: '../fake-data/blob/hipster.png',
  fileContentType: 'unknown',
  date: dayjs('2024-08-30T10:28'),
};

export const sampleWithFullData: IJobHistory = {
  id: 95879,
  startDate: dayjs('2024-08-30T23:37'),
  endDate: dayjs('2024-08-30T08:06'),
  language: Language['SPANISH'],
  file: '../fake-data/blob/hipster.png',
  fileContentType: 'unknown',
  date: dayjs('2024-08-30T09:47'),
};

export const sampleWithNewData: NewJobHistory = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
