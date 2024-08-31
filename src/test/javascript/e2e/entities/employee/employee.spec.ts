import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EmployeeComponentsPage, EmployeeDeleteDialog, EmployeeUpdatePage } from './employee.page-object';
import path from 'path';

const expect = chai.expect;

describe('Employee e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let employeeComponentsPage: EmployeeComponentsPage;
  let employeeUpdatePage: EmployeeUpdatePage;
  let employeeDeleteDialog: EmployeeDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Employees', async () => {
    await navBarPage.goToEntity('employee');
    employeeComponentsPage = new EmployeeComponentsPage();
    await browser.wait(ec.visibilityOf(employeeComponentsPage.title), 5000);
    expect(await employeeComponentsPage.getTitle()).to.eq('demoApp.employee.home.title');
    await browser.wait(ec.or(ec.visibilityOf(employeeComponentsPage.entities), ec.visibilityOf(employeeComponentsPage.noResult)), 1000);
  });

  it('should load create Employee page', async () => {
    await employeeComponentsPage.clickOnCreateButton();
    employeeUpdatePage = new EmployeeUpdatePage();
    expect(await employeeUpdatePage.getPageTitle()).to.eq('demoApp.employee.home.createOrEditLabel');
    await employeeUpdatePage.cancel();
  });

  it('should create and save Employees', async () => {
    const nbButtonsBeforeCreate = await employeeComponentsPage.countDeleteButtons();

    await employeeComponentsPage.clickOnCreateButton();

    await promise.all([
      employeeUpdatePage.setFirstNameInput('firstName'),
      employeeUpdatePage.setLastNameInput('lastName'),
      employeeUpdatePage.setEmailInput('l@8RG.e'),
      employeeUpdatePage.setPhoneNumberInput('phoneNumber'),
      employeeUpdatePage.setHireDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      employeeUpdatePage.setSalaryInput('5'),
      employeeUpdatePage.setCommissionPctInput('5'),
      employeeUpdatePage.setLevelInput('5'),
      employeeUpdatePage.contractSelectLastOption(),
      employeeUpdatePage.setCvInput(absolutePath),
      employeeUpdatePage.managerSelectLastOption(),
      employeeUpdatePage.departmentSelectLastOption(),
    ]);

    await employeeUpdatePage.save();
    expect(await employeeUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Employee', async () => {
    const nbButtonsBeforeDelete = await employeeComponentsPage.countDeleteButtons();
    await employeeComponentsPage.clickOnLastDeleteButton();

    employeeDeleteDialog = new EmployeeDeleteDialog();
    expect(await employeeDeleteDialog.getDialogTitle()).to.eq('demoApp.employee.delete.question');
    await employeeDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(employeeComponentsPage.title), 5000);

    expect(await employeeComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
