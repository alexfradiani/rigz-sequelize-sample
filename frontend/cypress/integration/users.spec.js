/// <reference types="cypress" />

context('with users page', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('apiUrl')}/e2e/clear`);
  });

  it('shows the page', () => {
    cy.visit('/');
  });
});
