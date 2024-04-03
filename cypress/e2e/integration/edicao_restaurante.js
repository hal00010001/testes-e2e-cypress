// edicao_restaurante.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it('Acesso Foodcamp', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('app-stage.foodcamp.com.br/login');
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-testid="login-input"]').clear();
  cy.get('[data-testid="login-input"]').type('lab_gestor');
  cy.get('[data-testid="password-input"]').clear();
  cy.get('[data-testid="password-input"]').type('suflex');
  cy.get('[data-testid="login-button"]').click();
  cy.get('.w-6').click();
  cy.get('.fixed > .mx-auto').click();
  cy.get('[for="restaurant_adress_complement"] > div.w-full > [data-testid="text-input"]').clear();
  cy.get('[for="restaurant_adress_complement"] > div.w-full > [data-testid="text-input"]').type('Vila Madalena!');
  cy.get('.border-suflex').click();
  cy.get('.fixed > .mx-auto').click();
  cy.get('[for="restaurant_adress_complement"] > div.w-full > [data-testid="text-input"]').clear();
  cy.get('[for="restaurant_adress_complement"] > div.w-full > [data-testid="text-input"]').type('Vila Madalena');
  cy.get('.border-suflex').click();
  /* ==== End Cypress Studio ==== */
});
