import { aliasQuery } from '../../utils/graphql-test-utils';

describe('Restaurant Page > Group', () => {
  describe('when user is restaurant_admin', () => {
    const mewGroup = 'Vegetais';
    const newSubgroup = 'Folhas';
    const editedGroup = 'Vegetais editado';
    const editedSubgroup = 'Folhas editado';

    beforeEach(() => {
      cy.viewport('macbook-13');
      cy.loginAsRestaurantAdmin();
      cy.intercept(
        'POST',
        'http://api-stage.foodcamp.com.br/graphql',
        (req) => {
          aliasQuery(req, 'GetRestaurantGroups');
        }
      );
      cy.get(
        `[data-testid="${
          Cypress.env('user').restaurant_admin.restaurant_id
        }-config-button"]`
      ).click();
      cy.get('[data-testid="restaurant-groups-tab"]').click();
    });

    describe('and add new group', () => {
      it('successfully add new group', () => {
        cy.get('[data-testid="new-group-button"]').click();
        cy.get('[data-testid="group-name-input"]').type(mewGroup);
        cy.get('[data-testid="listbox-input"]').click();
        cy.get('[data-testid="group-icon-option"]').eq(0).click();
        cy.get('[data-testid="add-group-button"]').click();
        cy.wait('@gqlGetRestaurantGroupsQuery');
        cy.get(`[data-testid="${mewGroup}-group-name"]`).should(
          'contain.text',
          mewGroup
        );
      });
    });

    describe('and add new sub group', () => {
      it('successfully add new group', () => {
        cy.get('[data-testid="new-group-button"]').click();
        cy.get('[data-testid="group-name-input"]').type(newSubgroup);
        cy.get('[data-testid="listbox-input"]').click();
        cy.get('[data-testid="group-icon-option"]').eq(0).click();
        cy.get('#sub-grupo-checkbox').click();
        cy.get('[data-testid="combobox-input"]').click().type('{downarrow}');
        cy.get('[data-testid="group-option"]').eq(0).click();
        cy.get('[data-testid="add-group-button"]').click();
        cy.wait('@gqlGetRestaurantGroupsQuery');
        cy.get(`[data-testid="${newSubgroup}-group-name"]`).should(
          'contain.text',
          newSubgroup
        );
      });
    });

    describe('edit group', () => {
      it('successfully edit group', () => {
        cy.get(`[data-testid="${mewGroup}-group-edit-button"]`).first().click();
        cy.get('[data-testid="group-name-input"]').clear().type(editedGroup);
        cy.get('[data-testid="add-group-button"]').click();
        cy.wait('@gqlGetRestaurantGroupsQuery');
        cy.get(`[data-testid="${editedGroup}-group-name"]`)
          .first()
          .should('contain.text', editedGroup);
      });
    });

    describe('edit sub group', () => {
      it('successfully edit sub group', () => {
        cy.get(`[data-testid="${newSubgroup}-group-edit-button"]`)
          .first()
          .click();
        cy.get('[data-testid="group-name-input"]').clear().type(editedSubgroup);
        cy.get('[data-testid="add-group-button"]').click();
        cy.wait('@gqlGetRestaurantGroupsQuery');

        cy.get(`[data-testid="${editedSubgroup}-group-name"]`).should(
          'contain.text',
          editedSubgroup
        );
      });
    });

    describe('delete group', () => {
      it('successfully delete group', () => {
        cy.get(`[data-testid="${editedGroup}-group-delete-button"]`)
          .first()
          .click();
        cy.get('[data-testid="confirm-delete-group-button"]').click();
        cy.wait('@gqlGetRestaurantGroupsQuery');
        cy.get(`[data-testid="${editedGroup}-group-name"]`).should('not.exist');
      });
    });

    describe('delete sub group', () => {
      it('successfully delete sub group', () => {
        cy.get(`[data-testid="${editedSubgroup}-group-delete-button"]`).click();
        cy.get('[data-testid="confirm-delete-group-button"]').click();
        cy.wait('@gqlGetRestaurantGroupsQuery');
        cy.get(`[data-testid="${editedSubgroup}-group-name"]`).should(
          'not.exist'
        );
      });
    });
  });
});
