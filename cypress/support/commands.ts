/// <reference types="cypress" />

Cypress.Commands.add('login', (login: string, password: string) => {
    cy.visit('/');
    cy.get('[data-testid=login-input]').type(login);
    cy.get('[data-testid=password-input]').type(password);
    cy.get('[data-testid=login-button]').click();
  });
  
  Cypress.Commands.add('loginAsRestaurantEmployee', () => {
    cy.login(
      Cypress.env('user').restaurant_employee.login,
      Cypress.env('user').restaurant_employee.password
    );
  });
  
  Cypress.Commands.add('loginAsRestaurantAdmin', () => {
    cy.login(
      Cypress.env('user').restaurant_admin.login,
      Cypress.env('user').restaurant_admin.password
    );
  });
  
  Cypress.Commands.add('loginAsSuflexAdmin', () => {
    cy.login(
      Cypress.env('user').suflex_admin.login,
      Cypress.env('user').suflex_admin.password
    );
  });
  
  Cypress.Commands.add('logout', () => {
    cy.get('[data-testid="usermenu-button"]').click();
    cy.get('[data-testid="usermenu-logout-button"]').click();
  });
  
  declare namespace Cypress {
    interface Chainable {
      login(login: string, password: string): void;
      loginAsRestaurantEmployee(): void;
      loginAsRestaurantAdmin(): void;
      loginAsSuflexAdmin(): void;
      logout(): void;
    }
  }
  