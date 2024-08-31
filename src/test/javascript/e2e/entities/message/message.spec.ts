import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  MessageComponentsPage,
  /* MessageDeleteDialog, */
  MessageUpdatePage,
} from './message.page-object';
import path from 'path';

const expect = chai.expect;

describe('Message e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let messageComponentsPage: MessageComponentsPage;
  let messageUpdatePage: MessageUpdatePage;
  /* let messageDeleteDialog: MessageDeleteDialog; */
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

  it('should load Messages', async () => {
    await navBarPage.goToEntity('message');
    messageComponentsPage = new MessageComponentsPage();
    await browser.wait(ec.visibilityOf(messageComponentsPage.title), 5000);
    expect(await messageComponentsPage.getTitle()).to.eq('demoApp.message.home.title');
    await browser.wait(ec.or(ec.visibilityOf(messageComponentsPage.entities), ec.visibilityOf(messageComponentsPage.noResult)), 1000);
  });

  it('should load create Message page', async () => {
    await messageComponentsPage.clickOnCreateButton();
    messageUpdatePage = new MessageUpdatePage();
    expect(await messageUpdatePage.getPageTitle()).to.eq('demoApp.message.home.createOrEditLabel');
    await messageUpdatePage.cancel();
  });

  /* it('should create and save Messages', async () => {
        const nbButtonsBeforeCreate = await messageComponentsPage.countDeleteButtons();

        await messageComponentsPage.clickOnCreateButton();

        await promise.all([
            messageUpdatePage.setNameInput('name'),
            messageUpdatePage.setEmailInput('l=@^9\~Ra.?&gt;D&lt;'),
            messageUpdatePage.setPhoneInput('.1637557315'),
            messageUpdatePage.setMessageInput('message'),
            messageUpdatePage.setFileInput(absolutePath),
            messageUpdatePage.setCityInput('city'),
            messageUpdatePage.setOtherCountryInput('otherCountry'),
            messageUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            messageUpdatePage.subjectSelectLastOption(),
        ]);

        await messageUpdatePage.save();
        expect(await messageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await messageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Message', async () => {
        const nbButtonsBeforeDelete = await messageComponentsPage.countDeleteButtons();
        await messageComponentsPage.clickOnLastDeleteButton();

        messageDeleteDialog = new MessageDeleteDialog();
        expect(await messageDeleteDialog.getDialogTitle())
            .to.eq('demoApp.message.delete.question');
        await messageDeleteDialog.clickOnConfirmButton();
        await browser.wait(ec.visibilityOf(messageComponentsPage.title), 5000);

        expect(await messageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
