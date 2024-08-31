import { IRegion, NewRegion } from './region.model';

export const sampleWithRequiredData: IRegion = {
  id: 27363,
};

export const sampleWithPartialData: IRegion = {
  id: 78962,
  regionName: 'Eb4',
};

export const sampleWithFullData: IRegion = {
  id: 18782,
  regionName: 'Ql9',
};

export const sampleWithNewData: NewRegion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
