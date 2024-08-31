import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ExperienceFormService, ExperienceFormGroup } from './experience-form.service';
import { IExperience } from '../experience.model';
import { ExperienceService } from '../service/experience.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IExpertise } from 'app/entities/expertise/expertise.model';
import { ExpertiseService } from 'app/entities/expertise/service/expertise.service';
import { Contract } from 'app/entities/enumerations/contract.model';

@Component({
  selector: 'jhi-experience-update',
  templateUrl: './experience-update.component.html',
})
export class ExperienceUpdateComponent implements OnInit {
  isSaving = false;
  experience: IExperience | null = null;
  contractValues = Object.keys(Contract);

  expertiseSharedCollection: IExpertise[] = [];

  editForm: ExperienceFormGroup = this.experienceFormService.createExperienceFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected experienceService: ExperienceService,
    protected experienceFormService: ExperienceFormService,
    protected expertiseService: ExpertiseService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareExpertise = (o1: IExpertise | null, o2: IExpertise | null): boolean => this.expertiseService.compareExpertise(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ experience }) => {
      this.experience = experience;
      if (experience) {
        this.updateForm(experience);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('demoApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const experience = this.experienceFormService.getExperience(this.editForm);
    if (experience.id !== null) {
      this.subscribeToSaveResponse(this.experienceService.update(experience));
    } else {
      this.subscribeToSaveResponse(this.experienceService.create(experience));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExperience>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(experience: IExperience): void {
    this.experience = experience;
    this.experienceFormService.resetForm(this.editForm, experience);

    this.expertiseSharedCollection = this.expertiseService.addExpertiseToCollectionIfMissing<IExpertise>(
      this.expertiseSharedCollection,
      ...(experience.expertise ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.expertiseService
      .query()
      .pipe(map((res: HttpResponse<IExpertise[]>) => res.body ?? []))
      .pipe(
        map((expertise: IExpertise[]) =>
          this.expertiseService.addExpertiseToCollectionIfMissing<IExpertise>(expertise, ...(this.experience?.expertise ?? []))
        )
      )
      .subscribe((expertise: IExpertise[]) => (this.expertiseSharedCollection = expertise));
  }
}
