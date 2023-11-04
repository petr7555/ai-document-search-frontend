// @ts-check
///<reference path="../global.d.ts" />

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});
