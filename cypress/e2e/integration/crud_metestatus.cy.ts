describe('CRUD Method Status', () => {
  it('CRUD for method of conservation status', () => {
    
    cy.loginAsRestaurantAdmin();
    cy.get('.p-3').click();
    cy.get('[data-testid="restaurant-setup-tab"]').click();
    cy.get('.max-w-\\[1536px\\] > [data-testid="page-header"] > [data-testid="page-header-button"]').click();
    // cy.get('.css-ackcql').click();
    // cy.get('#react-select-2-option-1').click();
    cy.get('.css-khl107-indicatorContainer').click();
    cy.contains('Congelado').click({ force: true });
    cy.get('.css-19bb58m').click();
    cy.contains('Aberto').click();
  
    cy.get('.border-suflex').click();
    // cy.get('.max-w-\\[1536px\\] > .mt-4 > [data-testid="table"] > .table > .md\\:gap-4 > :nth-child(2) > .absolute > :nth-child(1) > .w-full > .mt-0\\.5 > .justify-end > :nth-child(1) > .p-3 > .w-6').click();
  
    // cy.get([role="${role}"])
  
  
    // cy.get('.css-ackcql').click();
    cy.get('#react-select-2-option-1').click();
    cy.get('.border-suflex').click();
    cy.get('[data-state="tooltip-visible"] > .p-3 > .w-6 > path').click();
    cy.get('[data-testid="add-product"]').click();
    cy.get('.max-w-\\[1536px\\] > [data-testid="page-header"] > [data-testid="page-header-button"]').click();
    cy.get('.css-h8vlpn-indicatorContainer').click();
    cy.get('#react-select-12-option-1 > .flex').click();
    // cy.get('.css-1fzhxdg').click();
    // cy.get('.css-1fzhxdg').click();
    // cy.get('.css-ackcql').click();
    
    cy.get('#react-select-13-input').type('Geladeira');
    cy.get('#react-select-13-option-12').click();
    cy.get('.css-1ifu4h6-control').click();
    cy.get('#react-select-13-input').clear();
    cy.get('#react-select-13-input').type('Gelado');
    cy.get('#react-select-13-option-12').click();
    cy.get('.border-suflex').click();
    cy.get('[data-state="tooltip-visible"] > .p-3 > .w-6 > path').click();
    cy.get('.css-ackcql').click();
    cy.get('#react-select-17-input').clear();
    cy.get('#react-select-17-input').type('Gelado');
    cy.get('#react-select-17-option-7').click();
    cy.get('.border-suflex').click();
    cy.get('.max-w-\\[1536px\\] > .mt-4 > [data-testid="table"] > .table > .md\\:gap-4 > :nth-child(8) > .absolute > :nth-child(1) > .w-full > .mt-0\\.5 > .justify-end > :nth-child(2) > .p-3 > .w-6').click();
    cy.get('[data-testid="add-product"]').click();
  
  });
})
