import { element, by, ElementFinder } from 'protractor';

export class ExperienceComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-experience div table .btn-danger'));
  title = element.all(by.css('jhi-experience div h2#page-heading span')).first();
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

export class ExperienceUpdatePage {
  pageTitle = element(by.id('jhi-experience-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  titleInput = element(by.id('field_title'));
  companyInput = element(by.id('field_company'));
  descriptionInput = element(by.id('field_description'));
  logoCompanyInput = element(by.id('file_logoCompany'));
  inProgressInput = element(by.id('field_inProgress'));
  contractSelect = element(by.id('field_contract'));
  startDateInput = element(by.id('field_startDate'));
  endDateInput = element(by.id('field_endDate'));

  expertiseSelect = element(by.id('field_expertise'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setCompanyInput(company: string): Promise<void> {
    await this.companyInput.sendKeys(company);
  }

  async getCompanyInput(): Promise<string> {
    return await this.companyInput.getAttribute('value');
  }

  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getAttribute('value');
  }

  async setLogoCompanyInput(logoCompany: string): Promise<void> {
    await this.logoCompanyInput.sendKeys(logoCompany);
  }

  async getLogoCompanyInput(): Promise<string> {
    return await this.logoCompanyInput.getAttribute('value');
  }

  getInProgressInput(): ElementFinder {
    return this.inProgressInput;
  }

  async setContractSelect(contract: string): Promise<void> {
    await this.contractSelect.sendKeys(contract);
  }

  async getContractSelect(): Promise<string> {
    return await this.contractSelect.element(by.css('option:checked')).getText();
  }

  async contractSelectLastOption(): Promise<void> {
    await this.contractSelect.all(by.tagName('option')).last().click();
  }

  async setStartDateInput(startDate: string): Promise<void> {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput(): Promise<string> {
    return await this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate: string): Promise<void> {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput(): Promise<string> {
    return await this.endDateInput.getAttribute('value');
  }

  async expertiseSelectLastOption(): Promise<void> {
    await this.expertiseSelect.all(by.tagName('option')).last().click();
  }

  async expertiseSelectOption(option: string): Promise<void> {
    await this.expertiseSelect.sendKeys(option);
  }

  getExpertiseSelect(): ElementFinder {
    return this.expertiseSelect;
  }

  async getExpertiseSelectedOption(): Promise<string> {
    return await this.expertiseSelect.element(by.css('option:checked')).getText();
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

export class ExperienceDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-experience-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-experience'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
