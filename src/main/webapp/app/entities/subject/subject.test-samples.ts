import { ISubject, NewSubject } from './subject.model';

export const sampleWithRequiredData: ISubject = {
  id: 33079,
  name: 'virtual',
};

export const sampleWithPartialData: ISubject = {
  id: 95037,
  name: 'grid-enabled envisioneer quantifying',
};

export const sampleWithFullData: ISubject = {
  id: 97790,
  name: 'Shoes fuchsia',
};

export const sampleWithNewData: NewSubject = {
  name: 'withdrawal Oberkampf',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
