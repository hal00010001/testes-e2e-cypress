import { hasOperationName } from '../../utils/graphql-test-utils';

describe('Login', () => {
  describe('when user is suflex_admin', () => {
    it('successfully logs in', () => {
      cy.login(
        Cypress.env('user').suflex_admin.login,
        Cypress.env('user').suflex_admin.password
      );
      cy.url().should('eq', Cypress.config().baseUrl + '/restaurantes');
      cy.get('[data-testid="user-menu"]').should('be.visible');
      cy.get(':nth-child(1) > .items-center > .w-full > .text-sm').should('have.text', 'Unidade')      
    });
  });

  describe('when user is restaurant_admin', () => {
    it('successfully logs in', () => {
      cy.login(
        Cypress.env('user').restaurant_admin.login,
        Cypress.env('user').restaurant_admin.password
      );
      cy.url().should('eq', Cypress.env('host') + '/restaurantes');
      cy.get('[data-testid="user-menu"]').should('be.visible');
      cy.get('.table').should('be.visible');
    });
  });

  describe('when user is restaurant_employee', () => {
    beforeEach(() => {
      cy.intercept(
        'POST',
        Cypress.env('api'),
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

    it('successfully logs in', () => {
      cy.login(
        Cypress.env('user').restaurant_employee.login,
        Cypress.env('user').restaurant_employee.password
      );
      cy.url().should('eq', Cypress.env('host') + '/etiquetas');
      cy.get('[data-testid="user-menu"]').should('be.visible');
      cy.get('[data-testid="step-container"]').should(
        'include.text',
        'Selecionar responsável'
      );
    });
  });

  describe('when password is incorrect', () => {
    it('shows alert and don`t log in', () => {
      cy.login(
        Cypress.env('user').restaurant_employee.login,
        'incorrect password'
      );
      cy.get('[data-testid="app"]').should(
        'include.text',
        'Login ou senha incorretos'
      );
    });
  });

  describe('when login is incorrect', () => {
    it('shows alert and don`t log in', () => {
      cy.login(
        'incorrect login',
        Cypress.env('user').restaurant_employee.password
      );
      cy.get('[data-testid="app"]').should(
        'include.text',
        'Login ou senha incorretos'
      );
    });
  });
});
