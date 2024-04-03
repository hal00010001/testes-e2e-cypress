describe('Restaurant Page > Edit', () => {
  const restaurantData = {
    tradingName: 'Padoca Suflex',
    companyName: 'Padoca Suflex Ltda',
    cnpj: '12.345.678/0001-12',
    email: 'padoca@suflex.com.br',
    phone: '(24) 4546-466476',
    zipcode: '05435-030',
    street: 'Rua Purpurina',
    number: '400',
  };

  describe('when user is restaurant_admin', () => {
    beforeEach(() => {
      cy.loginAsRestaurantAdmin();
    });

    it('successfully edit restaurant', () => {
      cy.get(
        '[data-testid="f3cf99d8-9399-43dd-8c17-241d832d78aa-config-button"]'
      ).click();
      cy.get('[data-testid="edit-restaurant-link"]').click();
      cy.get('[id="tradingName"]').clear().type(restaurantData.tradingName);
      cy.get('[id="companyName"]').clear().type(restaurantData.companyName);
      cy.get('[id="cnpj"]').clear().type(restaurantData.cnpj);
      cy.get('[id="email"]').clear().type(restaurantData.email);
      cy.get('[id="phone"]').clear().type(restaurantData.phone);
      cy.get('[id="zipcode"]').clear().type(restaurantData.zipcode);
      cy.get('[id="number"]').clear().type(restaurantData.number);
      cy.get('[data-testid="save-edit-restaurant-button"]').click();

      cy.get('[data-testid="app"]').should(
        'include.text',
        'Restaurante atualizado com sucesso!'
      );

      cy.wait(4500);
      cy.get('[data-testid="app"]').should(
        'not.include.text',
        "'Restaurante atualizado com sucesso!'"
      );

      cy.get('[data-testid="tradingName"]').should(
        'have.text',
        restaurantData.tradingName
      );
      cy.get('[data-testid="companyName"]').should(
        'have.text',
        restaurantData.companyName
      );
      cy.get('[data-testid="email"]').should('have.text', restaurantData.email);
      cy.get('[data-testid="cnpj"]').should('have.text', restaurantData.cnpj);
      cy.get('[data-testid="phone"]').should('have.text', restaurantData.phone);
      cy.get('[data-testid="addresses"]').should(
        'include.text',
        restaurantData.street
      );
      cy.get('[data-testid="addresses"]').should(
        'include.text',
        restaurantData.number
      );
      cy.get('[data-testid="addresses"]').should(
        'include.text',
        restaurantData.zipcode
      );
    });
  });
});
