import { hasOperationName } from "../../utils/graphql-test-utils";

describe('Restaurant devices', () => {
  beforeEach(() => {
    cy.intercept('POST', Cypress.env('api'), (req) => {
      if (hasOperationName(req, 'findDevices')) {
        req.reply((res) => {
          res.body.data.findManyDevices = [
            {
              id: 'device-id',
              serial_code: 'device-serial-code',
              device_configs: [
                {
                  id: 'device-id',
                  name: 'device-name',
                  value: 'device-value',
                },
              ],
            },
          ];
        });
      }
    }).as('request');
  });

  // describe('when user is restaurant admin', () => {
  //   it('should not render old + configuration, edit nor delete buttons', () => {
  //     cy.loginAsRestaurantAdmin();
  //     cy.get('[data-testid="sidebar-app-menu"]').click();
  //     cy.get('[data-testid="sidebar-application-logo"]').click();
  //     cy.get(
  //       '[data-testid="f3cf99d8-9399-43dd-8c17-241d832d78aa-config-button"]'
  //     ).click();
  //     cy.get('[data-testid="restaurant-dispositivos"]').click();
  //     cy.wait('@request');
  //     cy.get('[data-testid="devices-config-buttons"]').should('not.exist');
  //     cy.logout();
  //   });
  // });

  // describe('when user is suflex admin', () => {
  //   it('should render old + configuration, edit and delete buttons', () => {
  //     cy.loginAsSuflexAdmin();
  //     cy.get('[data-testid="restaurants-search-input"]').type('Padoca Suflex');
  //     cy.get(
  //       '[data-testid="f3cf99d8-9399-43dd-8c17-241d832d78aa-config-button"]'
  //     ).click();
  //     cy.get('[data-testid="restaurant-dispositivos"]').click();
  //     cy.wait('@request');
  //     cy.get('[data-testid="devices-config-buttons"]').should('exist');
  //   });
  // });
});
