/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    getBySel(
      dataTestAttribute: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args?: any
    ): Chainable<JQuery<HTMLElement>>;
  }
}
