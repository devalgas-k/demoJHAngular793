import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SubjectComponentsPage, SubjectDeleteDialog, SubjectUpdatePage } from './subject.page-object';

const expect = chai.expect;

describe('Subject e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subjectComponentsPage: SubjectComponentsPage;
  let subjectUpdatePage: SubjectUpdatePage;
  let subjectDeleteDialog: SubjectDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Subjects', async () => {
    await navBarPage.goToEntity('subject');
    subjectComponentsPage = new SubjectComponentsPage();
    await browser.wait(ec.visibilityOf(subjectComponentsPage.title), 5000);
    expect(await subjectComponentsPage.getTitle()).to.eq('demoApp.subject.home.title');
    await browser.wait(ec.or(ec.visibilityOf(subjectComponentsPage.entities), ec.visibilityOf(subjectComponentsPage.noResult)), 1000);
  });

  it('should load create Subject page', async () => {
    await subjectComponentsPage.clickOnCreateButton();
    subjectUpdatePage = new SubjectUpdatePage();
    expect(await subjectUpdatePage.getPageTitle()).to.eq('demoApp.subject.home.createOrEditLabel');
    await subjectUpdatePage.cancel();
  });

  it('should create and save Subjects', async () => {
    const nbButtonsBeforeCreate = await subjectComponentsPage.countDeleteButtons();

    await subjectComponentsPage.clickOnCreateButton();

    await promise.all([subjectUpdatePage.setNameInput('name')]);

    await subjectUpdatePage.save();
    expect(await subjectUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await subjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Subject', async () => {
    const nbButtonsBeforeDelete = await subjectComponentsPage.countDeleteButtons();
    await subjectComponentsPage.clickOnLastDeleteButton();

    subjectDeleteDialog = new SubjectDeleteDialog();
    expect(await subjectDeleteDialog.getDialogTitle()).to.eq('demoApp.subject.delete.question');
    await subjectDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(subjectComponentsPage.title), 5000);

    expect(await subjectComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
