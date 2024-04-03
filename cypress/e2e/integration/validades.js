// validades.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it('validades', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('app-stage.foodcamp.com.br');
  cy.get('[data-testid="login-input"]').clear();
  cy.get('[data-testid="login-input"]').type('lab_gestor');
  cy.get('[data-testid="password-input"]').clear();
  cy.get('[data-testid="password-input"]').type('suflex');
  cy.get('[data-testid="login-button"]').click();
  cy.get(':nth-child(3) > .text-white > .block').click();
  cy.get('.lg\\:justify-end > .rounded-md').click();
  cy.get(':nth-child(1) > .grid > :nth-child(1)').click();
  cy.get('.bottom-0 > div > .hover\\:bg-suflex-brand-600').click();
  cy.get(':nth-child(1) > .mt-auto > .mb-2').click();
  cy.get('.min-w-\\[16px\\]').click();
  cy.get('.p-4.bottom-0 > div > .hover\\:bg-suflex-brand-600').click();
  cy.get('.mb-10 > .text-\\[16px\\]').click();
  cy.get('.lg\\:justify-end > .rounded-md').click();
  cy.get(':nth-child(1) > .grid > :nth-child(1)').click();
  cy.get('.bottom-0 > div > .hover\\:bg-suflex-brand-600').click();
  /* ==== End Cypress Studio ==== */
});
