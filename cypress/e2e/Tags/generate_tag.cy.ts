/// <reference types="cypress" />

import { hasOperationName } from '../../utils/graphql-test-utils';

describe('Generate Tag', () => {
  describe('when user is restaurant_employee', () => {
    beforeEach(() => {
      cy.login(
        Cypress.env('user').restaurant_employee.login,
        Cypress.env('user').restaurant_employee.password
      );
    });

    describe('when device is offline', () => {
      it('shows device offline alert', () => {
        cy.get('[data-testid="alert-dialog-content"]').should('be.visible');
      });
    });

    describe('when device is online', () => {
      beforeEach(() => {
        cy.intercept(
          'POST',
          'http://api-stage.foodcamp.com.br/graphql',
          (req) => {
            if (hasOperationName(req, 'findDevices')) {
              req.reply({
                statusCode: 200,
                data: {
                  findManyDevices: [
                    {
                      id: 'device-id',
                      serial_code: 'device-serial-code',
                      device_configs: [],
                    },
                  ],
                },
              });
            }
          }
        );
      });

      it('generates tag', () => {
        cy.get('[data-testid="employee-card"]').eq(0).click();
        cy.get('[data-testid="restaurant-groups-card"]').eq(0).click();

        cy.get('[data-testid="step-container"]').then((element) => {
          if (
            element.find('[data-testid="restaurant-subgroups-card"]').length
          ) {
            cy.get('[data-testid="restaurant-subgroups-card"]').eq(0).click();
          }
          cy.get('[data-testid="restaurant-products-card"]').eq(0).click();
        });

        cy.get('[data-testid="product-shelflife-card"]').eq(0).click();
        cy.get('[data-testid=sif-input').type('1234');
        cy.get('[data-testid=batch-input').type('Lote');
        cy.get('[data-testid=weight-input').clear().type('100');
        cy.get('[data-testid=quantity-input').clear().type('2');
        cy.get('[data-testid="print-tag-button"]').click();

        cy.contains('Sua etiqueta foi enviada para impressão!').should(
          'be.visible'
        );

        cy.get('[data-testid="success-state-finish-button"]').click();
        cy.url().should('eq', Cypress.config().baseUrl + '/validades');
      });
    });
  });
});
