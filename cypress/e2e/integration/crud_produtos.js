// crud_produtos.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
/* ==== Test Created with Cypress Studio ==== */
it('crud-produtos', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('app-stage.foodcamp.com.br/');
  cy.get('[data-testid="login-input"]').clear();
  cy.get('[data-testid="login-input"]').type('lab_gestor');
  cy.get('[data-testid="password-input"]').clear();
  cy.get('[data-testid="password-input"]').type('suflex');
  cy.get('[data-testid="login-button"]').click();
  cy.get('.w-6 > path').click();
  cy.get('[data-testid="restaurant-products-tab"]').click();
  cy.get('.flex.text-\\[24px\\] > [data-testid="page-header"] > [data-testid="page-header-button"]').click();
  cy.get(':nth-child(1) > :nth-child(2) > div.w-full > [data-testid="text-input"]').clear();
  cy.get(':nth-child(1) > :nth-child(2) > div.w-full > [data-testid="text-input"]').type('abacate');
  cy.get('.css-ackcql').click();
  cy.get('#react-select-2-option-0').click();
  cy.get('.mt-1 > :nth-child(2) > :nth-child(2) > .flex > :nth-child(1) > [data-testid="text-input"]').clear();
  cy.get('.mt-1 > :nth-child(2) > :nth-child(2) > .flex > :nth-child(1) > [data-testid="text-input"]').type('Sul');
  cy.get(':nth-child(2) > .flex > :nth-child(2) > [data-testid="text-input"]').clear();
  cy.get(':nth-child(2) > .flex > :nth-child(2) > [data-testid="text-input"]').type('123456');
  cy.get(':nth-child(3) > .css-1keq6fo-control > .css-1wy0on6 > .css-h8vlpn-indicatorContainer > .css-8mmkcg').click();
  cy.get('#react-select-6-option-1').click();
  cy.get('.w-1\\/3 > [data-testid="text-input"]').clear();
  cy.get('.w-1\\/3 > [data-testid="text-input"]').type('1');
  cy.get('[data-testid="add-product"]').click();
  cy.get('[data-testid="abacate-edit-product"] > .w-6 > path').click();
  cy.get(':nth-child(1) > .flex > div.w-full > [data-testid="text-input"]').clear();
  cy.get(':nth-child(1) > .flex > div.w-full > [data-testid="text-input"]').type('Abacate');
  cy.get(':nth-child(2) > .flex > :nth-child(2) > [data-testid="text-input"]').clear();
  cy.get(':nth-child(2) > .flex > :nth-child(2) > [data-testid="text-input"]').type('123455');
  cy.get('.min-h-282').click();
  cy.get('.rounded-t-md > :nth-child(2) > :nth-child(3) > .css-1keq6fo-control').click();
  cy.get('#react-select-21-option-2').click();
  cy.get('.rounded-t-md > :nth-child(2) > :nth-child(4) > .w-2\\/3 > :nth-child(2) > [data-testid="text-input"]').clear();
  cy.get('.rounded-t-md > :nth-child(2) > :nth-child(4) > .w-2\\/3 > :nth-child(2) > [data-testid="text-input"]').type('1');
  cy.get('[data-testid="add-product"]').click();
  cy.get('[data-testid="restaurant-groups-tab"]').click();
  cy.get('[data-testid="new-group-button"]').click();
  cy.get('[data-testid="group-name-input"]').clear();
  cy.get('[data-testid="group-name-input"]').type('Frutas');
  cy.get('[data-testid="checkbox"]').click();
  cy.get('.css-1fzhxdg').click();
  cy.get('#react-select-31-option-1').click();
  cy.get('[data-testid="add-group-button"]').click();
  cy.get('[data-testid="listbox-button"]').click();
  cy.get('#option-avocado--listbox-input--1113 > div > svg').click();
  cy.get('[data-testid="add-group-button"]').click();
  cy.get('[data-testid="restaurant-products-tab"]').click();
  cy.get('[data-testid="Abacate-edit-product"] > .w-6').click();
  cy.get('.css-1qqyd96 > .css-8mmkcg > path').click();
  cy.get('.css-ackcql').click();
  cy.get('#react-select-33-option-9').click();
  cy.get('[data-testid="add-product"]').click();
  cy.get(':nth-child(2) > .text-white > .block').click();
  cy.get('[data-testid="alert-device-offline-secondary-button"]').click();
  cy.get(':nth-child(3) > [data-testid="employee-card"] > .w-full').click();
  cy.get(':nth-child(6) > [data-testid="restaurant-groups-card"]').click();
  cy.get(':nth-child(3) > [data-testid="restaurant-subgroups-card"]').click();
  cy.get('[data-testid="restaurant-products-card"] > .flex-col > .w-full').click();
  cy.get(':nth-child(1) > [data-testid="product-shelflife-card"] > .mt-\\[24px\\] > .font-barlow').click();
  cy.get('.bg-default').click();
  cy.get('[data-testid="alert-device-offline-secondary-button"]').click();
  cy.get(':nth-child(4) > .text-white > .block > .w-\\[24px\\]').click();
  cy.get('.p-3').click();
  cy.get('[data-testid="restaurant-products-tab"]').click();
  cy.get('[data-testid="Abacate-remove-product"] > .w-6 > path').click();
  cy.get('[data-testid="confirm-remove-product-button"]').click();
  /* ==== End Cypress Studio ==== */
});
