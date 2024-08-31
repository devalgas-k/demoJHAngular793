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

describe('Expertise e2e test', () => {
  const expertisePageUrl = '/expertise';
  const expertisePageUrlPattern = new RegExp('/expertise(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const expertiseSample = { title: 'L' };

  let expertise;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/expertise+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/expertise').as('postEntityRequest');
    cy.intercept('DELETE', '/api/expertise/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (expertise) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/expertise/${expertise.id}`,
      }).then(() => {
        expertise = undefined;
      });
    }
  });

  it('Expertise menu should load Expertise page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('expertise');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Expertise').should('exist');
    cy.url().should('match', expertisePageUrlPattern);
  });

  describe('Expertise page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(expertisePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Expertise page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/expertise/new$'));
        cy.getEntityCreateUpdateHeading('Expertise');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', expertisePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/expertise',
          body: expertiseSample,
        }).then(({ body }) => {
          expertise = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/expertise+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/expertise?page=0&size=20>; rel="last",<http://localhost/api/expertise?page=0&size=20>; rel="first"',
              },
              body: [expertise],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(expertisePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Expertise page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('expertise');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', expertisePageUrlPattern);
      });

      it('edit button click should load edit Expertise page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Expertise');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', expertisePageUrlPattern);
      });

      it('edit button click should load edit Expertise page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Expertise');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', expertisePageUrlPattern);
      });

      it('last delete button click should delete instance of Expertise', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('expertise').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', expertisePageUrlPattern);

        expertise = undefined;
      });
    });
  });

  describe('new Expertise page', () => {
    beforeEach(() => {
      cy.visit(`${expertisePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Expertise');
    });

    it('should create an instance of Expertise', () => {
      cy.get(`[data-cy="title"]`).type('E`C').should('have.value', 'E`C');

      cy.get(`[data-cy="description"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="level"]`).type('82').should('have.value', '82');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        expertise = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', expertisePageUrlPattern);
    });
  });
});
