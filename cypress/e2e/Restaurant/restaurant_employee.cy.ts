import { aliasMutation, aliasQuery } from '../../utils/graphql-test-utils';

describe('Restaurant Page > Employee', () => {
  describe('when user is restaurant_admin', () => {
    const newEmployee = 'Cypress Colaborador';
    const editedEmployee = 'Cypress Colaborador editado';
    const newRestaurantEmployee = 'Cypress Colaborador com login';
    const restaurantEmployeeLogin = 'colaboradorcomlogin@email.com';
    const restaurantEmployeePassword = '123456';
    const editedRestaurantEmployee = 'Cypress Colaborador com login editado';
    const newRestaurantAdmin = 'Cypress Gestor';
    const restaurantAdminLogin = 'gestor@email.com';
    const restaurantAdminPassword = '123456';
    const editedRestaurantAdmin = 'Cypress Gestor editado';

    beforeEach(() => {
      cy.viewport('macbook-13');
      cy.intercept(
        'POST',
        'http://api-stage.foodcamp.com.br/graphql',
        (req) => {
          aliasQuery(req, 'GetEmployees');
        }
      );
      cy.intercept(
        'POST',
        'http://api-stage.foodcamp.com.br/graphql',
        (req) => {
          aliasQuery(req, 'GetUsers');
        }
      );
      cy.intercept(
        'POST',
        'http://api-stage.foodcamp.com.br/graphql',
        (req) => {
          aliasMutation(req, 'createUser');
        }
      );
      cy.loginAsRestaurantAdmin();
      cy.get(
        `[data-testid="${Cypress.env('user').restaurant_admin.restaurant_id
        }-config-button"]`
      ).click();
      cy.get('[data-testid="restaurant-employee-tab"]').click();
      cy.wait('@gqlGetEmployeesQuery');
      cy.wait('@gqlGetUsersQuery');
    });

    describe('and add new employee', () => {
      it('successfully add new employee', () => {
        cy.get('[data-testid="new-member-button"]').click();
        cy.get('[data-testid="member-name-input"]').type(newEmployee);
        cy.get('[data-testid="add-member-button"]').click();
        cy.wait('@gqlGetEmployeesQuery');
        cy.get(`[data-testid="${newEmployee}-member-name"]`).should(
          'have.text',
          newEmployee
        );
      });
    });

    describe('and edit employee', () => {
      it('successfully edit employee', () => {
        cy.get(`[data-testid="${newEmployee}-member-edit-button"]`).click();
        cy.get('[data-testid="member-name-input"]')
          .clear()
          .type(editedEmployee);
        cy.get('[data-testid="add-member-button"]').click();
        cy.wait('@gqlGetEmployeesQuery');
        cy.get(`[data-testid="${editedEmployee}-member-name"]`).should(
          'have.text',
          editedEmployee
        );
      });
    });

    describe('and delete employee', () => {
      it('successfully delete employee', () => {
        cy.get(
          `[data-testid="${editedEmployee}-member-delete-button"]`
        ).click();
        cy.get('[data-testid="confirm-delete-member-button"]').click();
        cy.wait('@gqlGetEmployeesQuery');
        cy.get(`[data-testid="${editedEmployee}-member-name"]`).should(
          'not.exist'
        );
      });
    });

    describe('and add new restaurant_employeee', () => {
      it('successfully add restaurant_employeee', () => {
        cy.get('[data-testid="new-member-button"]').click();
        cy.get('[data-testid="member-name-input"]').type(newRestaurantEmployee);
        cy.get(`[data-testid="restaurant-employee-checkbox"]`).click();
        cy.get('[data-testid="member-login-input"]').type(
          restaurantEmployeeLogin
        );
        cy.get('[data-testid="member-password-input"]').type(
          restaurantEmployeePassword
        );
        cy.get('[data-testid="add-member-button"]').click();
        cy.wait('@gqlcreateUserMutation');
        cy.wait('@gqlGetUsersQuery');
        cy.get(`[data-testid="${newRestaurantEmployee}-member-name"]`).should(
          'have.text',
          newRestaurantEmployee
        );
        cy.get(`[data-testid="${newRestaurantEmployee}-member-login"]`).should(
          'have.text',
          restaurantEmployeeLogin
        );
      });
    });

    describe('and edit restaurant_employeee', () => {
      it('successfully edit restaurant_employeee', () => {
        cy.get(
          `[data-testid="${newRestaurantEmployee}-member-edit-button"]`
        ).click();
        cy.get('[data-testid="member-name-input"]')
          .clear()
          .type(editedRestaurantEmployee);
        cy.get('[data-testid="member-password-input"]')
          .clear()
          .type(restaurantEmployeePassword);
        cy.get('[data-testid="add-member-button"]').click();
        cy.wait('@gqlGetUsersQuery');
        cy.get(
          `[data-testid="${editedRestaurantEmployee}-member-name"]`
        ).should('have.text', editedRestaurantEmployee);
      });
    });

    describe('and delete restaurant_employee', () => {
      it('successfully delete restaurant_employee', () => {
        cy.get(
          `[data-testid="${editedRestaurantEmployee}-member-delete-button"]`
        ).click();
        cy.get('[data-testid="confirm-delete-member-button"]').click();
        cy.wait('@gqlGetUsersQuery');
        cy.get(
          `[data-testid="${editedRestaurantEmployee}-member-name"]`
        ).should('not.exist');
      });
    });

    describe('and add new restaurant_admin', () => {
      it('successfully add restaurant_admin', () => {
        cy.get('[data-testid="new-member-button"]').click();
        cy.get('[data-testid="member-name-input"]').type(newRestaurantAdmin);
        cy.get(`[data-testid="restaurant-admin-checkbox"]`).click();
        cy.get('[data-testid="member-login-input"]').type(restaurantAdminLogin);
        cy.get('[data-testid="member-password-input"]').type(
          restaurantAdminPassword
        );
        cy.get('[data-testid="add-member-button"]').click();
        cy.wait('@gqlcreateUserMutation');
        cy.wait('@gqlGetUsersQuery');
        cy.get(`[data-testid="${newRestaurantAdmin}-member-name"]`).should(
          'have.text',
          newRestaurantAdmin
        );
        cy.get(`[data-testid="${newRestaurantAdmin}-member-login"]`).should(
          'have.text',
          restaurantAdminLogin
        );
      });
    });

    describe('and edit restaurant_admin', () => {
      it('successfully edit restaurant_admin', () => {
        cy.get(
          `[data-testid="${newRestaurantAdmin}-member-edit-button"]`
        ).click();
        cy.get('[data-testid="member-name-input"]')
          .clear()
          .type(editedRestaurantAdmin);
        cy.get('[data-testid="member-password-input"]')
          .clear()
          .type(restaurantAdminPassword);
        cy.get('[data-testid="add-member-button"]').click();
        cy.wait('@gqlGetUsersQuery');
        cy.get(`[data-testid="${editedRestaurantAdmin}-member-name"]`).should(
          'have.text',
          editedRestaurantAdmin
        );
      });
    });

    describe('and delete restaurant_admin', () => {
      it('successfully delete restaurant_admin', () => {
        cy.get(
          `[data-testid="${editedRestaurantAdmin}-member-delete-button"]`
        ).click();
        cy.get('[data-testid="confirm-delete-member-button"]').click();
        cy.wait('@gqlGetUsersQuery');
        cy.get(`[data-testid="${editedRestaurantAdmin}-member-name"]`).should(
          'not.exist'
        );
      });
    });
  });
});
