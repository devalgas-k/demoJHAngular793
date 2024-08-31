import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExpertiseComponentsPage, ExpertiseDeleteDialog, ExpertiseUpdatePage } from './expertise.page-object';

const expect = chai.expect;

describe('Expertise e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let expertiseComponentsPage: ExpertiseComponentsPage;
  let expertiseUpdatePage: ExpertiseUpdatePage;
  let expertiseDeleteDialog: ExpertiseDeleteDialog;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing(username, password);
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Expertise', async () => {
    await navBarPage.goToEntity('expertise');
    expertiseComponentsPage = new ExpertiseComponentsPage();
    await browser.wait(ec.visibilityOf(expertiseComponentsPage.title), 5000);
    expect(await expertiseComponentsPage.getTitle()).to.eq('demoApp.expertise.home.title');
    await browser.wait(ec.or(ec.visibilityOf(expertiseComponentsPage.entities), ec.visibilityOf(expertiseComponentsPage.noResult)), 1000);
  });

  it('should load create Expertise page', async () => {
    await expertiseComponentsPage.clickOnCreateButton();
    expertiseUpdatePage = new ExpertiseUpdatePage();
    expect(await expertiseUpdatePage.getPageTitle()).to.eq('demoApp.expertise.home.createOrEditLabel');
    await expertiseUpdatePage.cancel();
  });

  it('should create and save Expertise', async () => {
    const nbButtonsBeforeCreate = await expertiseComponentsPage.countDeleteButtons();

    await expertiseComponentsPage.clickOnCreateButton();

    await promise.all([
      expertiseUpdatePage.setTitleInput('VMi-'),
      expertiseUpdatePage.setDescriptionInput('description'),
      expertiseUpdatePage.setLevelInput('5'),
    ]);

    await expertiseUpdatePage.save();
    expect(await expertiseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await expertiseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Expertise', async () => {
    const nbButtonsBeforeDelete = await expertiseComponentsPage.countDeleteButtons();
    await expertiseComponentsPage.clickOnLastDeleteButton();

    expertiseDeleteDialog = new ExpertiseDeleteDialog();
    expect(await expertiseDeleteDialog.getDialogTitle()).to.eq('demoApp.expertise.delete.question');
    await expertiseDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(expertiseComponentsPage.title), 5000);

    expect(await expertiseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
