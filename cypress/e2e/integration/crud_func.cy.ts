describe('Employee CRUD', () => {
  it('Employee CRUD', function() {    
    cy.loginAsRestaurantAdmin();    
    cy.get('.p-3').click();
    cy.get('[data-testid="restaurant-employee-tab"]').click();  
    
    // Create a user with no credentials
    cy.get('[data-testid="new-member-button"]', { timeout: 10000 }).click();
    cy.get('[data-testid="member-name-input"]').clear();
    cy.get('[data-testid="member-name-input"]').type('Atendente Restaurante');
    cy.get('#employee-phone').clear();
    cy.get('#employee-phone').type('1199999999');
    cy.get('[data-testid="member-position-input"]').clear();
    cy.get('[data-testid="member-position-input"]').type('Atendente');
    cy.get('[data-testid="member-name-input"]').clear();
    cy.get('[data-testid="member-name-input"]').type('Abgail da Silva');    
    cy.get('[data-testid="member-position-input"]').clear();
    cy.get('[data-testid="member-position-input"]').type('Auxiliar');
    cy.get('#submit-employee-form', { timeout: 10000 }).click();

    // Create a restaurant employee with login and password
    cy.get('[data-testid="new-member-button"]', { timeout: 10000 }).click();
    cy.get('[data-testid="member-name-input"]').clear();
    cy.get('[data-testid="member-name-input"]').type('@funcionario');
    cy.get('#employee-phone').clear();
    cy.get('#employee-phone').type('1199999999');
    cy.get('[data-testid="member-position-input"]').clear();
    cy.get('[data-testid="member-position-input"]').type('Cozinheiro');    
    cy.get(':nth-child(3) > [data-testid="checkbox"]').click();    
    cy.get('[data-testid="member-login-input"]').clear();
    cy.get('[data-testid="member-login-input"]').type('cozinheiro_func');    
    cy.get('#employee_password').clear();
    cy.get('#employee_password').type('CypS2503$');
    cy.get('#submit-employee-form').click();

    // Delete the restaurant employee recently created
    cy.get('[data-testid="@funcionario-member-delete-button"] > .w-6', { timeout: 10000 }).click();
    cy.get('[data-testid="confirm-delete-member-button"]').click();

    // Create a restaurant admin
    cy.get('[data-testid="new-member-button"]', { timeout: 10000 }).click();
    cy.get('[data-testid="member-name-input"]').clear();
    cy.get('[data-testid="member-name-input"]').type('Gestor da Silva');
    cy.get('#employee-phone').clear();
    cy.get('#employee-phone').type('1199999999');
    cy.get('[data-testid="member-position-input"]').clear();
    cy.get('[data-testid="member-position-input"]').type('Gestor');   
    cy.get(':nth-child(4) > [data-testid="checkbox"]').click();       
    cy.get('[data-testid="member-login-input"]').type('gestor_silva');    
    cy.get('#employee_password').type('CypS2503$');
    cy.get('#submit-employee-form',).click();
    cy.get('.ml-4').click();
    cy.get('[data-testid="usermenu-logout-button"]').click();

    // Log again with the new restaurant admin created to the first access
    cy.get('[data-testid="login-input"]').clear();
    cy.get('[data-testid="login-input"]').type('gestor_silva');
    cy.get('[data-testid="password-input"]').clear();
    cy.get('[data-testid="password-input"]').type('CypS2503$');
    cy.get('[data-testid="login-button"]').click();    
    cy.get('#password').type('Cyp2503$');
    cy.get('#password-confirmation').type('Cyp2503$');
    cy.get('.bg-suflex', { timeout: 10000 }).click();
    cy.contains('Finalizar', { timeout: 10000 }).click();
       
  });

  it('Delete users created for tests', () => {
    
    // Connect in the system with a restaurant admin
    cy.loginAsRestaurantAdmin();   
    cy.get('.p-3').click();
    cy.get('[data-testid="restaurant-employee-tab"]', { timeout: 10000 }).click();

    // Delete the restaurant admin and the employee with no credentials
    cy.get('[data-testid="Gestor da Silva-member-delete-button"]', { timeout: 15000 }).click();
    cy.get('[data-testid="confirm-delete-member-button"]').click();   
    cy.get('[data-testid="Abgail da Silva-member-delete-button"]', { timeout: 15000 }).click();
    cy.get('[data-testid="confirm-delete-member-button"]').click();    
       
  })
})
