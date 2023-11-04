/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getBySel(
      dataTestAttribute: string,
      args?: unknown
    ): Chainable<JQuery<HTMLElement>>;
  }
}
