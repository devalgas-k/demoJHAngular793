import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../expertise.test-samples';

import { ExpertiseFormService } from './expertise-form.service';

describe('Expertise Form Service', () => {
  let service: ExpertiseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpertiseFormService);
  });

  describe('Service methods', () => {
    describe('createExpertiseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createExpertiseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            level: expect.any(Object),
            experiences: expect.any(Object),
          })
        );
      });

      it('passing IExpertise should create a new form with FormGroup', () => {
        const formGroup = service.createExpertiseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            level: expect.any(Object),
            experiences: expect.any(Object),
          })
        );
      });
    });

    describe('getExpertise', () => {
      it('should return NewExpertise for default Expertise initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createExpertiseFormGroup(sampleWithNewData);

        const expertise = service.getExpertise(formGroup) as any;

        expect(expertise).toMatchObject(sampleWithNewData);
      });

      it('should return NewExpertise for empty Expertise initial value', () => {
        const formGroup = service.createExpertiseFormGroup();

        const expertise = service.getExpertise(formGroup) as any;

        expect(expertise).toMatchObject({});
      });

      it('should return IExpertise', () => {
        const formGroup = service.createExpertiseFormGroup(sampleWithRequiredData);

        const expertise = service.getExpertise(formGroup) as any;

        expect(expertise).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IExpertise should not enable id FormControl', () => {
        const formGroup = service.createExpertiseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewExpertise should disable id FormControl', () => {
        const formGroup = service.createExpertiseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
