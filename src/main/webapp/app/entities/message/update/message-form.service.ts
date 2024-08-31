import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IMessage, NewMessage } from '../message.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IMessage for edit and NewMessageFormGroupInput for create.
 */
type MessageFormGroupInput = IMessage | PartialWithRequiredKeyOf<NewMessage>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IMessage | NewMessage> = Omit<T, 'date'> & {
  date?: string | null;
};

type MessageFormRawValue = FormValueOf<IMessage>;

type NewMessageFormRawValue = FormValueOf<NewMessage>;

type MessageFormDefaults = Pick<NewMessage, 'id' | 'date'>;

type MessageFormGroupContent = {
  id: FormControl<MessageFormRawValue['id'] | NewMessage['id']>;
  name: FormControl<MessageFormRawValue['name']>;
  email: FormControl<MessageFormRawValue['email']>;
  phone: FormControl<MessageFormRawValue['phone']>;
  message: FormControl<MessageFormRawValue['message']>;
  file: FormControl<MessageFormRawValue['file']>;
  fileContentType: FormControl<MessageFormRawValue['fileContentType']>;
  city: FormControl<MessageFormRawValue['city']>;
  otherCountry: FormControl<MessageFormRawValue['otherCountry']>;
  date: FormControl<MessageFormRawValue['date']>;
  subject: FormControl<MessageFormRawValue['subject']>;
};

export type MessageFormGroup = FormGroup<MessageFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class MessageFormService {
  createMessageFormGroup(message: MessageFormGroupInput = { id: null }): MessageFormGroup {
    const messageRawValue = this.convertMessageToMessageRawValue({
      ...this.getFormDefaults(),
      ...message,
    });
    return new FormGroup<MessageFormGroupContent>({
      id: new FormControl(
        { value: messageRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      name: new FormControl(messageRawValue.name, {
        validators: [Validators.required, Validators.maxLength(256)],
      }),
      email: new FormControl(messageRawValue.email, {
        validators: [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')],
      }),
      phone: new FormControl(messageRawValue.phone, {
        validators: [Validators.pattern('^\\+?[0-9]{1,4}?[-.\\s]?(\\(?\\d{1,3}?\\)?[-.\\s]?)?\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}$')],
      }),
      message: new FormControl(messageRawValue.message),
      file: new FormControl(messageRawValue.file),
      fileContentType: new FormControl(messageRawValue.fileContentType),
      city: new FormControl(messageRawValue.city, {
        validators: [Validators.maxLength(256)],
      }),
      otherCountry: new FormControl(messageRawValue.otherCountry, {
        validators: [Validators.maxLength(256)],
      }),
      date: new FormControl(messageRawValue.date),
      subject: new FormControl(messageRawValue.subject, {
        validators: [Validators.required],
      }),
    });
  }

  getMessage(form: MessageFormGroup): IMessage | NewMessage {
    return this.convertMessageRawValueToMessage(form.getRawValue() as MessageFormRawValue | NewMessageFormRawValue);
  }

  resetForm(form: MessageFormGroup, message: MessageFormGroupInput): void {
    const messageRawValue = this.convertMessageToMessageRawValue({ ...this.getFormDefaults(), ...message });
    form.reset(
      {
        ...messageRawValue,
        id: { value: messageRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): MessageFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      date: currentTime,
    };
  }

  private convertMessageRawValueToMessage(rawMessage: MessageFormRawValue | NewMessageFormRawValue): IMessage | NewMessage {
    return {
      ...rawMessage,
      date: dayjs(rawMessage.date, DATE_TIME_FORMAT),
    };
  }

  private convertMessageToMessageRawValue(
    message: IMessage | (Partial<NewMessage> & MessageFormDefaults)
  ): MessageFormRawValue | PartialWithRequiredKeyOf<NewMessageFormRawValue> {
    return {
      ...message,
      date: message.date ? message.date.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
