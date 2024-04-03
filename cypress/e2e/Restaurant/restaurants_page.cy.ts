describe('Restaurants page', () => {
  describe('when user is restaurant_admin', () => {
    it('restaurant counters table and restaurant item etiquetas table data should not exist in the DOM', () => {
      cy.loginAsRestaurantAdmin();
      cy.get('[data-testid="restaurants-counters-table"]').should('not.exist');
      cy.get('[data-testid="restaurant-item-etiquetas"]').should('not.exist');
      cy.logout();
    });
  });

  describe('when user is suflex_admin', () => {
    it('restaurant counters table and restaurant item etiquetas table data should exist in the DOM', () => {
      cy.loginAsSuflexAdmin();
      cy.get('[data-testid="restaurants-counters-table"]').should('exist');
      cy.get('[data-testid="restaurant-item-etiquetas"]').should('exist');
    });
  });
});
