import dayjs from 'dayjs/esm';

import { IMessage, NewMessage } from './message.model';

export const sampleWithRequiredData: IMessage = {
  id: 29027,
  name: 'turn-key SQL Midi-Pyrénées',
  email: 'th.@vSnV.uW0',
};

export const sampleWithPartialData: IMessage = {
  id: 36766,
  name: 'Peso Corse EXE',
  email: '3N-h@ft.-',
  date: dayjs('2024-08-30T18:46'),
};

export const sampleWithFullData: IMessage = {
  id: 89080,
  name: 'Account',
  email: 'N~*@g.ziXvx',
  phone: undefined,
  message: '../fake-data/blob/hipster.txt',
  file: '../fake-data/blob/hipster.png',
  fileContentType: 'unknown',
  city: 'Paulmouth',
  otherCountry: 'Poitou-Charentes Architecte Shoes',
  date: dayjs('2024-08-30T18:30'),
};

export const sampleWithNewData: NewMessage = {
  name: 'Ukraine',
  email: 'cx@KB)=.R+gaym',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
