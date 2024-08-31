import { element, by, ElementFinder } from 'protractor';

export class MessageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-message div table .btn-danger'));
  title = element.all(by.css('jhi-message div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class MessageUpdatePage {
  pageTitle = element(by.id('jhi-message-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  nameInput = element(by.id('field_name'));
  emailInput = element(by.id('field_email'));
  phoneInput = element(by.id('field_phone'));
  messageInput = element(by.id('field_message'));
  fileInput = element(by.id('file_file'));
  cityInput = element(by.id('field_city'));
  otherCountryInput = element(by.id('field_otherCountry'));
  dateInput = element(by.id('field_date'));

  subjectSelect = element(by.id('field_subject'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setPhoneInput(phone: string): Promise<void> {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput(): Promise<string> {
    return await this.phoneInput.getAttribute('value');
  }

  async setMessageInput(message: string): Promise<void> {
    await this.messageInput.sendKeys(message);
  }

  async getMessageInput(): Promise<string> {
    return await this.messageInput.getAttribute('value');
  }

  async setFileInput(file: string): Promise<void> {
    await this.fileInput.sendKeys(file);
  }

  async getFileInput(): Promise<string> {
    return await this.fileInput.getAttribute('value');
  }

  async setCityInput(city: string): Promise<void> {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput(): Promise<string> {
    return await this.cityInput.getAttribute('value');
  }

  async setOtherCountryInput(otherCountry: string): Promise<void> {
    await this.otherCountryInput.sendKeys(otherCountry);
  }

  async getOtherCountryInput(): Promise<string> {
    return await this.otherCountryInput.getAttribute('value');
  }

  async setDateInput(date: string): Promise<void> {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput(): Promise<string> {
    return await this.dateInput.getAttribute('value');
  }

  async subjectSelectLastOption(): Promise<void> {
    await this.subjectSelect.all(by.tagName('option')).last().click();
  }

  async subjectSelectOption(option: string): Promise<void> {
    await this.subjectSelect.sendKeys(option);
  }

  getSubjectSelect(): ElementFinder {
    return this.subjectSelect;
  }

  async getSubjectSelectedOption(): Promise<string> {
    return await this.subjectSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class MessageDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-message-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-message'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
