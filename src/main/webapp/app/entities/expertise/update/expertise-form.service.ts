import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IExpertise, NewExpertise } from '../expertise.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IExpertise for edit and NewExpertiseFormGroupInput for create.
 */
type ExpertiseFormGroupInput = IExpertise | PartialWithRequiredKeyOf<NewExpertise>;

type ExpertiseFormDefaults = Pick<NewExpertise, 'id' | 'experiences'>;

type ExpertiseFormGroupContent = {
  id: FormControl<IExpertise['id'] | NewExpertise['id']>;
  title: FormControl<IExpertise['title']>;
  description: FormControl<IExpertise['description']>;
  level: FormControl<IExpertise['level']>;
  experiences: FormControl<IExpertise['experiences']>;
};

export type ExpertiseFormGroup = FormGroup<ExpertiseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ExpertiseFormService {
  createExpertiseFormGroup(expertise: ExpertiseFormGroupInput = { id: null }): ExpertiseFormGroup {
    const expertiseRawValue = {
      ...this.getFormDefaults(),
      ...expertise,
    };
    return new FormGroup<ExpertiseFormGroupContent>({
      id: new FormControl(
        { value: expertiseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      title: new FormControl(expertiseRawValue.title, {
        validators: [Validators.required, Validators.maxLength(256), Validators.pattern('^[A-Z].*$')],
      }),
      description: new FormControl(expertiseRawValue.description),
      level: new FormControl(expertiseRawValue.level, {
        validators: [Validators.min(20), Validators.max(100)],
      }),
      experiences: new FormControl(expertiseRawValue.experiences ?? []),
    });
  }

  getExpertise(form: ExpertiseFormGroup): IExpertise | NewExpertise {
    return form.getRawValue() as IExpertise | NewExpertise;
  }

  resetForm(form: ExpertiseFormGroup, expertise: ExpertiseFormGroupInput): void {
    const expertiseRawValue = { ...this.getFormDefaults(), ...expertise };
    form.reset(
      {
        ...expertiseRawValue,
        id: { value: expertiseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ExpertiseFormDefaults {
    return {
      id: null,
      experiences: [],
    };
  }
}
