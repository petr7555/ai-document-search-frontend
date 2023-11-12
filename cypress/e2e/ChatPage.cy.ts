import a11yOptions from '../support/a11yOptions';
import terminalLog from '../support/terminalLog';

describe('Chat page', () => {
  const validUsername = 'user';
  const validPassword = 'pass';

  beforeEach(() => {
    cy.visit('/login');
    cy.getBySel('username-input').type(validUsername);
    cy.getBySel('password-input').type(validPassword);
    cy.getBySel('login-button').click();
  });

  it('Has no detectable a11y violations on load', () => {
    // Wait for conversation to load
    cy.contains('Conversation started').should('exist');

    cy.injectAxe();
    cy.checkA11y(undefined, a11yOptions, terminalLog);
  });

  it('Loads previous conversation', () => {
    cy.getBySel('user-message-bubble').should('have.length', 1);
    cy.getBySel('bot-message-bubble').should('have.length', 1);
  });

  it('Creates new conversation', () => {
    cy.getBySel('new-conversation-button').click();

    cy.getBySel('user-message-bubble').should('have.length', 0);
    cy.getBySel('bot-message-bubble').should('have.length', 0);
  });

  it('Asks question and gets an answer', () => {
    cy.getBySel('question-input').type('Hello');
    cy.getBySel('send-button').click();

    cy.getBySel('user-message-bubble').should('have.length', 2);
    cy.getBySel('bot-message-bubble').should('have.length', 2);
  });

  it('Cannot send empty question', () => {
    // Wait for conversation to load
    cy.contains('Conversation started').should('exist');

    cy.getBySel('send-button').should('be.disabled');
  });

  it('Opens source in a new tab', () => {
    cy.getBySel('source-link-SE0007186085').should(
      'have.attr',
      'href',
      'https://feed.stamdata.com/documents/SE0007186085_LA.pdf#page=25'
    );
    cy.getBySel('source-link-SE0007186085').should(
      'have.attr',
      'target',
      '_blank'
    );
  });

  it('Opens PDF preview', () => {
    cy.getBySel('pdf-preview').should('not.exist');
    cy.getBySel('preview-pdf-button-SE0007186085').click();

    cy.getBySel('pdf-preview').should('exist');
  });

  it('Closes PDF preview', () => {
    cy.getBySel('preview-pdf-button-SE0007186085').click();
    cy.getBySel('pdf-preview').should('exist');

    cy.getBySel('close-pdf-preview-button').click();
    cy.getBySel('pdf-preview').should('not.exist');
  });
});
