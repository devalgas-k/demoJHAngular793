import { ITask, NewTask } from './task.model';

export const sampleWithRequiredData: ITask = {
  id: 37978,
  title: 'U3DZ~}',
};

export const sampleWithPartialData: ITask = {
  id: 92549,
  title: 'I',
};

export const sampleWithFullData: ITask = {
  id: 30677,
  title: 'Va}y,',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewTask = {
  title: 'Ns',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
