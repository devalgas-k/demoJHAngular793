import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ExperienceFormService } from './experience-form.service';
import { ExperienceService } from '../service/experience.service';
import { IExperience } from '../experience.model';
import { IExpertise } from 'app/entities/expertise/expertise.model';
import { ExpertiseService } from 'app/entities/expertise/service/expertise.service';

import { ExperienceUpdateComponent } from './experience-update.component';

describe('Experience Management Update Component', () => {
  let comp: ExperienceUpdateComponent;
  let fixture: ComponentFixture<ExperienceUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let experienceFormService: ExperienceFormService;
  let experienceService: ExperienceService;
  let expertiseService: ExpertiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ExperienceUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(ExperienceUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ExperienceUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    experienceFormService = TestBed.inject(ExperienceFormService);
    experienceService = TestBed.inject(ExperienceService);
    expertiseService = TestBed.inject(ExpertiseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Expertise query and add missing value', () => {
      const experience: IExperience = { id: 456 };
      const expertise: IExpertise[] = [{ id: 27308 }];
      experience.expertise = expertise;

      const expertiseCollection: IExpertise[] = [{ id: 85759 }];
      jest.spyOn(expertiseService, 'query').mockReturnValue(of(new HttpResponse({ body: expertiseCollection })));
      const additionalExpertise = [...expertise];
      const expectedCollection: IExpertise[] = [...additionalExpertise, ...expertiseCollection];
      jest.spyOn(expertiseService, 'addExpertiseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ experience });
      comp.ngOnInit();

      expect(expertiseService.query).toHaveBeenCalled();
      expect(expertiseService.addExpertiseToCollectionIfMissing).toHaveBeenCalledWith(
        expertiseCollection,
        ...additionalExpertise.map(expect.objectContaining)
      );
      expect(comp.expertiseSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const experience: IExperience = { id: 456 };
      const expertise: IExpertise = { id: 2854 };
      experience.expertise = [expertise];

      activatedRoute.data = of({ experience });
      comp.ngOnInit();

      expect(comp.expertiseSharedCollection).toContain(expertise);
      expect(comp.experience).toEqual(experience);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExperience>>();
      const experience = { id: 123 };
      jest.spyOn(experienceFormService, 'getExperience').mockReturnValue(experience);
      jest.spyOn(experienceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ experience });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: experience }));
      saveSubject.complete();

      // THEN
      expect(experienceFormService.getExperience).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(experienceService.update).toHaveBeenCalledWith(expect.objectContaining(experience));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExperience>>();
      const experience = { id: 123 };
      jest.spyOn(experienceFormService, 'getExperience').mockReturnValue({ id: null });
      jest.spyOn(experienceService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ experience: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: experience }));
      saveSubject.complete();

      // THEN
      expect(experienceFormService.getExperience).toHaveBeenCalled();
      expect(experienceService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExperience>>();
      const experience = { id: 123 };
      jest.spyOn(experienceService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ experience });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(experienceService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareExpertise', () => {
      it('Should forward to expertiseService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(expertiseService, 'compareExpertise');
        comp.compareExpertise(entity, entity2);
        expect(expertiseService.compareExpertise).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
