import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IExperience, NewExperience } from '../experience.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IExperience for edit and NewExperienceFormGroupInput for create.
 */
type ExperienceFormGroupInput = IExperience | PartialWithRequiredKeyOf<NewExperience>;

type ExperienceFormDefaults = Pick<NewExperience, 'id' | 'inProgress' | 'expertise'>;

type ExperienceFormGroupContent = {
  id: FormControl<IExperience['id'] | NewExperience['id']>;
  title: FormControl<IExperience['title']>;
  company: FormControl<IExperience['company']>;
  description: FormControl<IExperience['description']>;
  logoCompany: FormControl<IExperience['logoCompany']>;
  logoCompanyContentType: FormControl<IExperience['logoCompanyContentType']>;
  inProgress: FormControl<IExperience['inProgress']>;
  contract: FormControl<IExperience['contract']>;
  startDate: FormControl<IExperience['startDate']>;
  endDate: FormControl<IExperience['endDate']>;
  expertise: FormControl<IExperience['expertise']>;
};

export type ExperienceFormGroup = FormGroup<ExperienceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ExperienceFormService {
  createExperienceFormGroup(experience: ExperienceFormGroupInput = { id: null }): ExperienceFormGroup {
    const experienceRawValue = {
      ...this.getFormDefaults(),
      ...experience,
    };
    return new FormGroup<ExperienceFormGroupContent>({
      id: new FormControl(
        { value: experienceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(experienceRawValue.title, {
        validators: [Validators.required, Validators.maxLength(256), Validators.pattern('^[A-Z].*$')],
      }),
      company: new FormControl(experienceRawValue.company, {
        validators: [Validators.required, Validators.maxLength(256), Validators.pattern('^[A-Z].*$')],
      }),
      description: new FormControl(experienceRawValue.description),
      logoCompany: new FormControl(experienceRawValue.logoCompany),
      logoCompanyContentType: new FormControl(experienceRawValue.logoCompanyContentType),
      inProgress: new FormControl(experienceRawValue.inProgress, {
        validators: [Validators.required],
      }),
      contract: new FormControl(experienceRawValue.contract, {
        validators: [Validators.required],
      }),
      startDate: new FormControl(experienceRawValue.startDate),
      endDate: new FormControl(experienceRawValue.endDate),
      expertise: new FormControl(experienceRawValue.expertise ?? []),
    });
  }

  getExperience(form: ExperienceFormGroup): IExperience | NewExperience {
    return form.getRawValue() as IExperience | NewExperience;
  }

  resetForm(form: ExperienceFormGroup, experience: ExperienceFormGroupInput): void {
    const experienceRawValue = { ...this.getFormDefaults(), ...experience };
    form.reset(
      {
        ...experienceRawValue,
        id: { value: experienceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ExperienceFormDefaults {
    return {
      id: null,
      inProgress: false,
      expertise: [],
    };
  }
}
