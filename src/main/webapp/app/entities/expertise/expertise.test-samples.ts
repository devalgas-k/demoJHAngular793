import { IExpertise, NewExpertise } from './expertise.model';

export const sampleWithRequiredData: IExpertise = {
  id: 25832,
  title: 'BODBXn',
};

export const sampleWithPartialData: IExpertise = {
  id: 631,
  title: 'Y`y@A[',
};

export const sampleWithFullData: IExpertise = {
  id: 37908,
  title: 'R[4:7*',
  description: '../fake-data/blob/hipster.txt',
  level: 27,
};

export const sampleWithNewData: NewExpertise = {
  title: 'F&uH`,',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
