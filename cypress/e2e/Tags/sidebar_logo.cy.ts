describe('Sidebar application', () => {
  describe('when user is restaurant_employee', () => {
    describe('and clicks on the application sidebar logo', () => {
      it('redirects to tags page (/etiquetas)', () => {
        cy.loginAsRestaurantEmployee();
        cy.get('[data-testid="close-icon"]').click();
        cy.get('[data-testid="sidebar-app-menu"]').click();
        cy.get('[data-testid="sidebar-application-logo"]').click();
        cy.url().should('include', '/etiquetas');
      });
    });
  });

  describe('when user is restaurant_admin', () => {
    describe('and clicks on the application sidebar logo', () => {
      it('redirects to restaurants page (/restaurantes)', () => {
        cy.loginAsRestaurantAdmin();
        cy.get('[data-testid="sidebar-app-menu"]').click();
        cy.get('[data-testid="sidebar-application-logo"]').click();
        cy.url().should('include', '/restaurantes');
      });
    });
  });

  describe('when user is suflex_admin', () => {
    describe('and clicks on the application sidebar logo', () => {
      it('redirects to restaurants page (/restaurantes)', () => {
        cy.loginAsSuflexAdmin();
        cy.get('[data-testid="sidebar-app-menu"]').click();
        cy.get('[data-testid="sidebar-application-logo"]').click();
        cy.url().should('include', '/restaurantes');
      });
    });
  });
});
