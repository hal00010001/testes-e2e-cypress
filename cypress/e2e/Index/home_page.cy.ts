describe('Home Page', () => {
  it('loads successfully', () => {
    cy.visit(Cypress.env('host'));
    cy.get('[data-test=foodcamp-logo]').should('be.visible');
  });
});
