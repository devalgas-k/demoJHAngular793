import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Experience e2e test', () => {
  const experiencePageUrl = '/experience';
  const experiencePageUrlPattern = new RegExp('/experience(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const experienceSample = { title: 'R0~!o|', company: 'Ae', inProgress: true, contract: 'CDI' };

  let experience;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/experiences+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/experiences').as('postEntityRequest');
    cy.intercept('DELETE', '/api/experiences/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (experience) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/experiences/${experience.id}`,
      }).then(() => {
        experience = undefined;
      });
    }
  });

  it('Experiences menu should load Experiences page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('experience');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Experience').should('exist');
    cy.url().should('match', experiencePageUrlPattern);
  });

  describe('Experience page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(experiencePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Experience page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/experience/new$'));
        cy.getEntityCreateUpdateHeading('Experience');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', experiencePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/experiences',
          body: experienceSample,
        }).then(({ body }) => {
          experience = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/experiences+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/experiences?page=0&size=20>; rel="last",<http://localhost/api/experiences?page=0&size=20>; rel="first"',
              },
              body: [experience],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(experiencePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Experience page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('experience');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', experiencePageUrlPattern);
      });

      it('edit button click should load edit Experience page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Experience');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', experiencePageUrlPattern);
      });

      it('edit button click should load edit Experience page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Experience');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', experiencePageUrlPattern);
      });

      it('last delete button click should delete instance of Experience', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('experience').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', experiencePageUrlPattern);

        experience = undefined;
      });
    });
  });

  describe('new Experience page', () => {
    beforeEach(() => {
      cy.visit(`${experiencePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Experience');
    });

    it('should create an instance of Experience', () => {
      cy.get(`[data-cy="title"]`).type('I5').should('have.value', 'I5');

      cy.get(`[data-cy="company"]`).type('A').should('have.value', 'A');

      cy.get(`[data-cy="description"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.setFieldImageAsBytesOfEntity('logoCompany', 'integration-test.png', 'image/png');

      cy.get(`[data-cy="inProgress"]`).should('not.be.checked');
      cy.get(`[data-cy="inProgress"]`).click().should('be.checked');

      cy.get(`[data-cy="contract"]`).select('FREELANCE');

      cy.get(`[data-cy="startDate"]`).type('2024-08-30').blur().should('have.value', '2024-08-30');

      cy.get(`[data-cy="endDate"]`).type('2024-08-30').blur().should('have.value', '2024-08-30');

      // since cypress clicks submit too fast before the blob fields are validated
      cy.wait(200); // eslint-disable-line cypress/no-unnecessary-waiting
      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        experience = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', experiencePageUrlPattern);
    });
  });
});
