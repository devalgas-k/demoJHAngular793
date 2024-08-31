import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ExpertiseFormService, ExpertiseFormGroup } from './expertise-form.service';
import { IExpertise } from '../expertise.model';
import { ExpertiseService } from '../service/expertise.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-expertise-update',
  templateUrl: './expertise-update.component.html',
})
export class ExpertiseUpdateComponent implements OnInit {
  isSaving = false;
  expertise: IExpertise | null = null;

  editForm: ExpertiseFormGroup = this.expertiseFormService.createExpertiseFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected expertiseService: ExpertiseService,
    protected expertiseFormService: ExpertiseFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ expertise }) => {
      this.expertise = expertise;
      if (expertise) {
        this.updateForm(expertise);
      }
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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const expertise = this.expertiseFormService.getExpertise(this.editForm);
    if (expertise.id !== null) {
      this.subscribeToSaveResponse(this.expertiseService.update(expertise));
    } else {
      this.subscribeToSaveResponse(this.expertiseService.create(expertise));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExpertise>>): void {
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

  protected updateForm(expertise: IExpertise): void {
    this.expertise = expertise;
    this.expertiseFormService.resetForm(this.editForm, expertise);
  }
}
