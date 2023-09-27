describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('include', '/login');
    cy.get('[data-cy="username-text-field"]').should('have.text', 'Username');
    cy.get('[data-cy="password-text-field"]').should('have.text', 'Password');
  });

  it('Sign in correctly test', () => {
    cy.get('[data-cy="username-text-field"]').type('marius');
    cy.get('[data-cy="password-text-field"]').type('123');

    cy.get('[data-cy="sign-in-button"]').should('have.text', 'Sign in').click();

    cy.get('[data-cy="account-button"]').should('have.text', 'Account');
  });

  it('Sign in with wrong credentials test', () => {
    cy.get('[data-cy="username-text-field"]').type('anna');
    cy.get('[data-cy="password-text-field"]').type('123');

    cy.get('[data-cy="sign-in-button"]').should('have.text', 'Sign in').click();

    cy.get('[data-cy="error-alert-message"]').should(
      'have.text',
      'Wrong username or password'
    );
  });

  it('Sign in with empty fields test', () => {
    cy.get('[data-cy="sign-in-button"]').should('have.text', 'Sign in').click();

    cy.get('[data-cy="error-alert-message"]').should(
      'have.text',
      'Please write username and password'
    );
  });

  it('Navigate to app without having to log in again', () => {
    cy.get('[data-cy="username-text-field"]').type('marius');
    cy.get('[data-cy="password-text-field"]').type('123');

    cy.get('[data-cy="sign-in-button"]').should('have.text', 'Sign in').click();

    cy.visit('http://google.com');
    cy.visit('/');

    cy.get('[data-cy="account-button"]').should('have.text', 'Account');
  });

  it('Log out test', () => {
    cy.get('[data-cy="username-text-field"]').type('marius');
    cy.get('[data-cy="password-text-field"]').type('123');

    cy.get('[data-cy="sign-in-button"]').should('have.text', 'Sign in').click();

    cy.get('[data-cy="account-button"]').should('have.text', 'Account').click();

    cy.get('[data-cy="log-out-button"]').should('have.text', 'Log out').click();

    cy.get('[data-cy="username-text-field"]').should('have.text', 'Username');
    cy.get('[data-cy="password-text-field"]').should('have.text', 'Password');
  });
});
