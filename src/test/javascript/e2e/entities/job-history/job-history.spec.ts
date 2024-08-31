import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { JobHistoryComponentsPage, JobHistoryDeleteDialog, JobHistoryUpdatePage } from './job-history.page-object';
import path from 'path';

const expect = chai.expect;

describe('JobHistory e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let jobHistoryComponentsPage: JobHistoryComponentsPage;
  let jobHistoryUpdatePage: JobHistoryUpdatePage;
  let jobHistoryDeleteDialog: JobHistoryDeleteDialog;
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

  it('should load JobHistories', async () => {
    await navBarPage.goToEntity('job-history');
    jobHistoryComponentsPage = new JobHistoryComponentsPage();
    await browser.wait(ec.visibilityOf(jobHistoryComponentsPage.title), 5000);
    expect(await jobHistoryComponentsPage.getTitle()).to.eq('demoApp.jobHistory.home.title');
    await browser.wait(ec.or(ec.visibilityOf(jobHistoryComponentsPage.entities), ec.visibilityOf(jobHistoryComponentsPage.noResult)), 1000);
  });

  it('should load create JobHistory page', async () => {
    await jobHistoryComponentsPage.clickOnCreateButton();
    jobHistoryUpdatePage = new JobHistoryUpdatePage();
    expect(await jobHistoryUpdatePage.getPageTitle()).to.eq('demoApp.jobHistory.home.createOrEditLabel');
    await jobHistoryUpdatePage.cancel();
  });

  it('should create and save JobHistories', async () => {
    const nbButtonsBeforeCreate = await jobHistoryComponentsPage.countDeleteButtons();

    await jobHistoryComponentsPage.clickOnCreateButton();

    await promise.all([
      jobHistoryUpdatePage.setStartDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      jobHistoryUpdatePage.setEndDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      jobHistoryUpdatePage.languageSelectLastOption(),
      jobHistoryUpdatePage.setFileInput(absolutePath),
      jobHistoryUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      jobHistoryUpdatePage.setDurationInput('PT12S'),
      jobHistoryUpdatePage.jobSelectLastOption(),
      jobHistoryUpdatePage.departmentSelectLastOption(),
      jobHistoryUpdatePage.employeeSelectLastOption(),
    ]);

    await jobHistoryUpdatePage.save();
    expect(await jobHistoryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await jobHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last JobHistory', async () => {
    const nbButtonsBeforeDelete = await jobHistoryComponentsPage.countDeleteButtons();
    await jobHistoryComponentsPage.clickOnLastDeleteButton();

    jobHistoryDeleteDialog = new JobHistoryDeleteDialog();
    expect(await jobHistoryDeleteDialog.getDialogTitle()).to.eq('demoApp.jobHistory.delete.question');
    await jobHistoryDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(jobHistoryComponentsPage.title), 5000);

    expect(await jobHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
