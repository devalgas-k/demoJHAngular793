import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ExpertiseFormService } from './expertise-form.service';
import { ExpertiseService } from '../service/expertise.service';
import { IExpertise } from '../expertise.model';

import { ExpertiseUpdateComponent } from './expertise-update.component';

describe('Expertise Management Update Component', () => {
  let comp: ExpertiseUpdateComponent;
  let fixture: ComponentFixture<ExpertiseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let expertiseFormService: ExpertiseFormService;
  let expertiseService: ExpertiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [ExpertiseUpdateComponent],
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
      .overrideTemplate(ExpertiseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ExpertiseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    expertiseFormService = TestBed.inject(ExpertiseFormService);
    expertiseService = TestBed.inject(ExpertiseService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const expertise: IExpertise = { id: 456 };

      activatedRoute.data = of({ expertise });
      comp.ngOnInit();

      expect(comp.expertise).toEqual(expertise);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExpertise>>();
      const expertise = { id: 123 };
      jest.spyOn(expertiseFormService, 'getExpertise').mockReturnValue(expertise);
      jest.spyOn(expertiseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ expertise });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: expertise }));
      saveSubject.complete();

      // THEN
      expect(expertiseFormService.getExpertise).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(expertiseService.update).toHaveBeenCalledWith(expect.objectContaining(expertise));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExpertise>>();
      const expertise = { id: 123 };
      jest.spyOn(expertiseFormService, 'getExpertise').mockReturnValue({ id: null });
      jest.spyOn(expertiseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ expertise: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: expertise }));
      saveSubject.complete();

      // THEN
      expect(expertiseFormService.getExpertise).toHaveBeenCalled();
      expect(expertiseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IExpertise>>();
      const expertise = { id: 123 };
      jest.spyOn(expertiseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ expertise });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(expertiseService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
