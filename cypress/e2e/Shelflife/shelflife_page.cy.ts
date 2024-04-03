import {
  aliasMutation,
  aliasQuery,
  hasOperationName,
} from '../../utils/graphql-test-utils';
import { startOfToday, startOfTomorrow } from 'date-fns';
import { getShelflifeEnumValueByKey } from '../../../src/utils/shelflife';

let isTagsRemoved = false;
let isAssociatedTagRemoved = false;

describe('Shelflife Page', () => {
  describe('when user is restaurant_employee', () => {
    beforeEach(() => {
      cy.loginAsRestaurantEmployee();
      cy.url().should('eq', Cypress.config().baseUrl + '/etiquetas');
      cy.intercept(
        'POST',
        'http://api-stage.foodcamp.com.br/graphql',
        (req) => {
          aliasQuery(req, 'fetchTags');
          aliasMutation(req, 'removeTags');
        }
      );
    });

    describe('and there are tags', () => {
      beforeEach(function () {
        cy.fixture('fetch-tags').then((tagsFixture) => {
          this.tagsFixture = tagsFixture;

          cy.intercept(
            'POST',
            'http://api-stage.foodcamp.com.br/graphql',
            (req) => {
              if (hasOperationName(req, 'fetchTags')) {
                req.alias = 'gqlfetchTagsQuery';

                req.reply((res) => {
                  if (
                    req.body.variables.expirationDate ===
                    startOfToday().toISOString()
                  ) {
                    res.body.data.findManyTagsView =
                      tagsFixture.getExpiringTodayTags;
                  }

                  if (
                    req.body.variables.expirationDate ===
                    startOfTomorrow().toISOString()
                  ) {
                    res.body.data.findManyTagsView =
                      tagsFixture.getExpiringTomorrowTags;
                  }

                  if (req.body.variables.manipulationType === 'cold') {
                    res.body.data.findManyTagsView = tagsFixture.getColdTags;
                  }

                  if (req.body.variables.status === 'removed') {
                    res.body.data.findManyTagsView = tagsFixture.getExpiredTags;
                  }

                  if (req.body.variables.productName === 'Bolo') {
                    res.body.data.findManyTagsView =
                      tagsFixture.getTagsByProductName;
                  }

                  if (isTagsRemoved) {
                    res.body.data.findManyTagsView =
                      tagsFixture.getTagsAfterRemove;
                  }

                  if (isAssociatedTagRemoved) {
                    res.body.data.findManyTagsView =
                      tagsFixture.getAssociatedTagsAfterRemove;
                  }
                });
              }
            }
          );
          cy.visit('/validades-v2');
          cy.wait('@gqlfetchTagsQuery');
        });
      });

      describe('and the filter is "Hoje"', () => {
        it('shows expiring today tags', function () {
          cy.get('[data-testid="shelflife-card"]').should(
            'have.length',
            this.tagsFixture.getExpiringTodayTags.tags.length
          );
          cy.get('[data-testid="shelflife-card-product"]')
            .eq(0)
            .should(
              'have.text',
              this.tagsFixture.getExpiringTodayTags.tags[0].product_name
            );
        });
      });

      describe('and the filter is "Amanhã"', () => {
        it('shows expiring tomorrow tags', function () {
          cy.get('[data-testid="filter-button-hoje"]').eq(0).click();
          cy.get('[data-testid="filter-card-amanhã"]').click();
          cy.get('[data-testid="apply-filter-button"]').click();
          cy.get('[data-testid="shelflife-card"]').should(
            'have.length',
            this.tagsFixture.getExpiringTomorrowTags.tags.length
          );
          cy.get('[data-testid="shelflife-card-product"]').should(
            'have.text',
            this.tagsFixture.getExpiringTomorrowTags.tags[0].product_name
          );
        });
      });

      describe('and selects a manipulation type', () => {
        it('shows tags with "cold" manipulation type', function () {
          cy.get('[data-testid="filter-button-todos"]').eq(0).click();
          cy.get('[data-testid="filter-card-Resfriado"]').click();
          cy.get('[data-testid="apply-filter-button"]').click();
          cy.get('[data-testid="shelflife-card"]').should(
            'have.length',
            this.tagsFixture.getColdTags.tags.length
          );
          cy.get('[data-testid="shelflife-card-label"]').should(
            'have.text',
            getShelflifeEnumValueByKey(
              this.tagsFixture.getColdTags.tags[0].type
            )
          );
        });
      });

      describe('and filters is "Vencidos"', () => {
        it('shows expired tags', function () {
          cy.get('[data-testid="filter-button-hoje"]').eq(0).click();
          cy.get('[data-testid="filter-card-vencidos"]').click();
          cy.get('[data-testid="apply-filter-button"]').click();
          cy.get('[data-testid="shelflife-card"]').should(
            'have.length',
            this.tagsFixture.getExpiredTags.tags.length
          );
          cy.get('[data-testid="shelflife-card-product"]')
            .eq(0)
            .should(
              'have.text',
              this.tagsFixture.getExpiredTags.tags[0].product_name
            );
        });
      });

      describe('and filters by product name', () => {
        it('shows tags that contain "Bolo" in the product name', function () {
          cy.get('[data-testid="tags-search-input"]').type('Bolo');
          cy.get('[data-testid="shelflife-card"]').should(
            'have.length',
            this.tagsFixture.getTagsByProductName.tags.length
          );
          cy.get('[data-testid="shelflife-card-product"]')
            .eq(0)
            .should(
              'have.text',
              this.tagsFixture.getTagsByProductName.tags[0].product_name
            );
        });
      });

      describe('and tags can be removed', () => {
        it('select and remove tags', function () {
          cy.get('[data-testid="discard-selection-button"]').click();
          cy.get('[data-testid="shelflife-card"]').eq(1).click();
          cy.get('[data-testid="remove-tags-button"]').click();
          cy.intercept(
            'POST',
            'http://api-stage.foodcamp.com.br/graphql',
            (req) => {
              if (hasOperationName(req, 'removeTags')) {
                req.alias = 'gqlremoveTagsMutation';
                req.reply({
                  data: {
                    updateManyTags: {
                      count: 1,
                    },
                  },
                });
              }
            }
          );
          cy.get('[data-testid="remove-tags-button-modal"]').click();
          cy.wait('@gqlremoveTagsMutation').then(() => {
            isTagsRemoved = true;
          });
          cy.wait('@gqlfetchTagsQuery');
          cy.get('[data-testid="app"]').should(
            'include.text',
            'Etiquetas descartadas com sucesso!'
          );
          cy.get('[data-testid="cancel-select-tags-button"]').click();
          cy.get('[data-testid="shelflife-card"]').should('have.length', 1);
        });
      });

      describe('and can view details and remove associated tags', () => {
        it('view details and remove associated tags', function () {
          cy.get('[data-testid="show-tag-details-button"]')
            .eq(0)
            .should('include.text', '2');
          cy.wait(5000);
          cy.get('[data-testid="show-tag-details-button"]').eq(0).click();
          cy.get('[data-testid="select-associated-tag-button"]').eq(0).click();
          cy.get('[data-testid="remove-tags-button"]').click();
          cy.intercept(
            'POST',
            'http://api-stage.foodcamp.com.br/graphql',
            (req) => {
              if (hasOperationName(req, 'removeTags')) {
                req.alias = 'gqlremoveTagsMutation';
                req.reply({
                  data: {
                    updateManyTags: {
                      count: 1,
                    },
                  },
                });
              }
            }
          );
          cy.get('[data-testid="remove-tags-button-modal"]').click();
          cy.wait('@gqlremoveTagsMutation').then(() => {
            isAssociatedTagRemoved = true;
          });
          cy.wait('@gqlfetchTagsQuery');
          cy.get('[data-testid="app"]').should(
            'include.text',
            'Etiquetas descartadas com sucesso!'
          );
          cy.get('[data-testid="show-tag-details-button"]')
            .eq(0)
            .should('include.text', '1');
        });
      });
    });

    describe('and there are no tags', () => {
      beforeEach(() => {
        cy.intercept(
          'POST',
          'http://api-stage.foodcamp.com.br/graphql',
          (req) => {
            if (hasOperationName(req, 'fetchTags')) {
              req.alias = 'gqlfetchTagsQuery';

              req.reply((res) => {
                res.body.data.findManyTagsView = {
                  tags: [],
                  totalTags: null,
                  totalTagsInfo: null,
                };
              });
            }
          }
        );
        cy.visit('/validades-v2');
        cy.wait('@gqlfetchTagsQuery');
      });

      it('shows empty shelflife message', () => {
        cy.get('[data-testid="empty-shelflifes"]').should('be.visible');
      });
    });
  });
});
