import { aliasQuery } from '../../utils/graphql-test-utils';

describe('Restaurant Page > Products', () => {
  describe('when user is restaurant_admin', () => {
    const product = {
      name: 'Abacate Cypress',
      manipulation: {
        cold: '1',
        cold_track: '2',
      },
    };

    beforeEach(() => {
      cy.viewport('macbook-13');
      cy.loginAsRestaurantAdmin();
      cy.intercept(
        'POST',
        'http://api-stage.foodcamp.com.br/graphql',
        (req) => {
          if (req.alias === 'GetAvailableProducts') {
            aliasQuery(req, 'GetAvailableProducts');
          }
          aliasQuery(req, 'GetAvailableProducts');
        }
      );
      cy.get(
        `[data-testid="${
          Cypress.env('user').restaurant_admin.restaurant_id
        }-config-button"]`
      ).click();
      cy.get('[data-testid="restaurant-products-tab"]').click();
    });

    describe('and add new product', () => {
      it('successfully add new product to de products list', () => {
        cy.get('[data-testid="page-header-button"]').click();
        cy.get('[data-testid="add-new-restaurat-product"]').click();
        cy.get('[id="name"]').type(product.name);
        cy.get('[id="cold"]').type(product.manipulation.cold);
        cy.get('[data-testid="combobox-input"]')
          .type('{downarrow}')
          .eq(0)
          .click()
          .type('{enter}');
        cy.get('[data-testid="add-product"]').click();
        cy.get('[data-testid="search-restaurant-products"]').type(product.name);
        cy.get('[data-testid="product-item-name"]').should(
          'include.text',
          product.name
        );
        cy.get('[data-testid="shelflife-cold"]')
          .first()
          .should('have.text', product.manipulation.cold);
      });
    });

    describe('and edit product', () => {
      it('successfully edit product', () => {
        cy.get('[data-testid="search-restaurant-products"]').type(product.name);
        cy.get('[data-testid="product-item-name"]').should(
          'include.text',
          product.name
        );
        cy.get('[data-testid="Abacate Cypress-edit-product"]').first().click();
        cy.get('[id="name"]').clear().type(product.name);
        cy.get('[id="cold"]').clear().type(product.manipulation.cold);
        cy.get('[id="cold_track"]')
          .clear()
          .type(product.manipulation.cold_track);
        cy.get('[data-testid="remove-group-button"]').click();
        cy.get('[data-testid="combobox-input"]').type('{downarrow}');
        cy.get('[data-testid="combobox-input"]')
          .type('{downarrow}')
          .eq(0)
          .click()
          .type('{enter}');
        cy.get('[data-testid="save-edit-product-button"]').click();
        cy.get('[data-testid="product-item-name"]')
          .first()
          .should('have.text', product.name);
        cy.get('[data-testid="shelflife-cold"]')
          .first()
          .should('have.text', product.manipulation.cold);
        cy.get('[data-testid="shelflife-cold_track"]')
          .first()
          .should('have.text', product.manipulation.cold_track);
      });
    });

    describe('and remove product', () => {
      it('successfully remove product', () => {
        cy.get('[data-testid="search-restaurant-products"]').type(product.name);
        cy.get('[data-testid="product-item-name"]').should(
          'include.text',
          product.name
        );
        cy.get('[data-testid="Abacate Cypress-remove-product"]')
          .first()
          .click();
        cy.get('[data-testid="confirm-remove-product-button"]').click();
        cy.intercept(
          'POST',
          'http://api-stage.foodcamp.com.br/graphql',
          (req) => {
            aliasQuery(req, 'DeleteProduct');
          }
        );
        cy.wait('@gqlDeleteProductQuery');
      });
    });

    describe('and associate product', () => {
      it('successfully associate product', () => {
        cy.get('[data-testid="page-header-button"]').click();
        cy.get('[data-testid="assing-product-button"]').click();
        cy.wait('@gqlGetAvailableProductsQuery');
        cy.get('[data-testid="combobox-input"]').type('A');
        cy.get('[data-testid="select-product-button"]').eq(0).click();
        cy.get('[data-testid="open-accordion-button"]').click();
        cy.get('[id="cold"]').type(product.manipulation.cold);
        cy.get('[data-testid="combobox-input"]')
          .eq(1)
          .type('{downarrow}')
          .eq(0)
          .click()
          .type('{enter}');
        cy.get('[data-testid="assign-product-button"]').click();
        cy.get('[data-testid="app"]').should(
          'include.text',
          'Produto criado com sucesso!'
        );
      });
    });

    describe('and add product without filling the fields', () => {
      it('does not add product and show validations', () => {
        cy.get('[data-testid="page-header-button"]').click();
        cy.get('[data-testid="add-new-restaurat-product"]').click();
        cy.get('[data-testid="add-product"]').click();
        cy.get('[data-testid="new-product"]').should(
          'include.text',
          'Informe o nome do produto'
        );
        cy.get('[data-testid="new-product"]').should(
          'include.text',
          'informe ao menos uma validade'
        );
        cy.get('[data-testid="new-product"]').should(
          'include.text',
          'selecione um grupo'
        );
      });
    });
  });
});
