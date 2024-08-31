import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExperienceComponentsPage, ExperienceDeleteDialog, ExperienceUpdatePage } from './experience.page-object';
import path from 'path';

const expect = chai.expect;

describe('Experience e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let experienceComponentsPage: ExperienceComponentsPage;
  let experienceUpdatePage: ExperienceUpdatePage;
  let experienceDeleteDialog: ExperienceDeleteDialog;
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

  it('should load Experiences', async () => {
    await navBarPage.goToEntity('experience');
    experienceComponentsPage = new ExperienceComponentsPage();
    await browser.wait(ec.visibilityOf(experienceComponentsPage.title), 5000);
    expect(await experienceComponentsPage.getTitle()).to.eq('demoApp.experience.home.title');
    await browser.wait(ec.or(ec.visibilityOf(experienceComponentsPage.entities), ec.visibilityOf(experienceComponentsPage.noResult)), 1000);
  });

  it('should load create Experience page', async () => {
    await experienceComponentsPage.clickOnCreateButton();
    experienceUpdatePage = new ExperienceUpdatePage();
    expect(await experienceUpdatePage.getPageTitle()).to.eq('demoApp.experience.home.createOrEditLabel');
    await experienceUpdatePage.cancel();
  });

  it('should create and save Experiences', async () => {
    const nbButtonsBeforeCreate = await experienceComponentsPage.countDeleteButtons();

    await experienceComponentsPage.clickOnCreateButton();

    await promise.all([
      experienceUpdatePage.setTitleInput('Ef'),
      experienceUpdatePage.setCompanyInput('IIY~Um'),
      experienceUpdatePage.setDescriptionInput('description'),
      experienceUpdatePage.setLogoCompanyInput(absolutePath),
      experienceUpdatePage.getInProgressInput().click(),
      experienceUpdatePage.contractSelectLastOption(),
      experienceUpdatePage.setStartDateInput('2000-12-31'),
      experienceUpdatePage.setEndDateInput('2000-12-31'),
      // experienceUpdatePage.expertiseSelectLastOption(),
    ]);

    await experienceUpdatePage.save();
    expect(await experienceUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await experienceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Experience', async () => {
    const nbButtonsBeforeDelete = await experienceComponentsPage.countDeleteButtons();
    await experienceComponentsPage.clickOnLastDeleteButton();

    experienceDeleteDialog = new ExperienceDeleteDialog();
    expect(await experienceDeleteDialog.getDialogTitle()).to.eq('demoApp.experience.delete.question');
    await experienceDeleteDialog.clickOnConfirmButton();
    await browser.wait(ec.visibilityOf(experienceComponentsPage.title), 5000);

    expect(await experienceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
