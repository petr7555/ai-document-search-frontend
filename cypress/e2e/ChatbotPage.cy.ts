describe('Chatbot page', () => {
  const username = 'user';
  const password = 'pass';
  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy="username-text-field"]').type(username);
    cy.get('[data-cy="password-text-field"]').type(password);
    cy.get('[data-cy="sign-in-button"]').click();
  });
  it('Shows chatbot page when logged in', () => {
    cy.url().should('include', '/');
    cy.get('[data-cy="chatbot"]').should('exist');
  });

  it('Send message to chatbot and get response', () => {
    cy.get('[data-cy="chatbot"]').should('exist');
    cy.get('[data-cy="chatbot-input-field"]').type('Hello');
    cy.get('[data-cy="chatbot-send-button"]').click();
    cy.get('[data-cy="user-input-message"]').should('exist');
    cy.get('[data-cy="chatbot-response-message"]').should('exist');
  });
  it('Try to send empty input to chatbot and get error', () => {
    cy.get('[data-cy="chatbot"]').should('exist');
    cy.get('[data-cy="chatbot-input-field"]').type(' ');
    cy.get('[data-cy="chatbot-send-button"]').click();
    cy.get("[data-cy='chatbot-input-error']").should('exist');
  });
});
