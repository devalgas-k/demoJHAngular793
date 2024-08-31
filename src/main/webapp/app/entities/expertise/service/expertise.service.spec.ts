import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IExpertise } from '../expertise.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../expertise.test-samples';

import { ExpertiseService } from './expertise.service';

const requireRestSample: IExpertise = {
  ...sampleWithRequiredData,
};

describe('Expertise Service', () => {
  let service: ExpertiseService;
  let httpMock: HttpTestingController;
  let expectedResult: IExpertise | IExpertise[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(ExpertiseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Expertise', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const expertise = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(expertise).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Expertise', () => {
      const expertise = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(expertise).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Expertise', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Expertise', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Expertise', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addExpertiseToCollectionIfMissing', () => {
      it('should add a Expertise to an empty array', () => {
        const expertise: IExpertise = sampleWithRequiredData;
        expectedResult = service.addExpertiseToCollectionIfMissing([], expertise);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(expertise);
      });

      it('should not add a Expertise to an array that contains it', () => {
        const expertise: IExpertise = sampleWithRequiredData;
        const expertiseCollection: IExpertise[] = [
          {
            ...expertise,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addExpertiseToCollectionIfMissing(expertiseCollection, expertise);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Expertise to an array that doesn't contain it", () => {
        const expertise: IExpertise = sampleWithRequiredData;
        const expertiseCollection: IExpertise[] = [sampleWithPartialData];
        expectedResult = service.addExpertiseToCollectionIfMissing(expertiseCollection, expertise);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(expertise);
      });

      it('should add only unique Expertise to an array', () => {
        const expertiseArray: IExpertise[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const expertiseCollection: IExpertise[] = [sampleWithRequiredData];
        expectedResult = service.addExpertiseToCollectionIfMissing(expertiseCollection, ...expertiseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const expertise: IExpertise = sampleWithRequiredData;
        const expertise2: IExpertise = sampleWithPartialData;
        expectedResult = service.addExpertiseToCollectionIfMissing([], expertise, expertise2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(expertise);
        expect(expectedResult).toContain(expertise2);
      });

      it('should accept null and undefined values', () => {
        const expertise: IExpertise = sampleWithRequiredData;
        expectedResult = service.addExpertiseToCollectionIfMissing([], null, expertise, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(expertise);
      });

      it('should return initial array if no Expertise is added', () => {
        const expertiseCollection: IExpertise[] = [sampleWithRequiredData];
        expectedResult = service.addExpertiseToCollectionIfMissing(expertiseCollection, undefined, null);
        expect(expectedResult).toEqual(expertiseCollection);
      });
    });

    describe('compareExpertise', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareExpertise(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareExpertise(entity1, entity2);
        const compareResult2 = service.compareExpertise(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareExpertise(entity1, entity2);
        const compareResult2 = service.compareExpertise(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareExpertise(entity1, entity2);
        const compareResult2 = service.compareExpertise(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
