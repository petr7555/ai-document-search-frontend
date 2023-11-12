import a11yOptions from '../support/a11yOptions';
import terminalLog from '../support/terminalLog';

describe('Login page', () => {
  const validUsername = 'user';
  const validPassword = 'pass';

  it('Has no detectable a11y violations on load', () => {
    cy.visit('/login');

    cy.injectAxe();
    cy.checkA11y(undefined, a11yOptions, terminalLog);
  });

  it('Redirects to login page when not logged in', () => {
    cy.visit('/');

    cy.url().should('include', '/login');
  });

  it('Shows username and password inputs', () => {
    cy.visit('/login');

    cy.getBySel('username-field').should('have.text', 'Username');
    cy.getBySel('password-field').should('have.text', 'Password');
  });

  it('Logs in when valid credentials are entered', () => {
    cy.visit('/login');

    cy.getBySel('username-input').type(validUsername);
    cy.getBySel('password-input').type(validPassword);
    cy.getBySel('login-button').click();

    cy.url().should('not.include', '/login');
    cy.getBySel('chatbot').should('exist');
  });

  it('Shows error when invalid credentials are entered', () => {
    cy.visit('/login');

    cy.getBySel('username-input').type('invalid_username');
    cy.getBySel('password-input').type('invalid_password');
    cy.getBySel('login-button').click();

    cy.getBySel('api-error-snackbar').should(
      'have.text',
      'Invalid credentials'
    );
  });

  it('Shows validation errors when inputs are empty', () => {
    cy.visit('/login');

    cy.getBySel('login-button').click();

    cy.contains('Username is required').should('exist');
    cy.contains('Password is required').should('exist');
  });

  it('Shows validation error when username is empty', () => {
    cy.visit('/login');

    cy.getBySel('username-input').type('user').clear();

    cy.contains('Username is required').should('exist');
  });

  it('Shows validation error when password is empty', () => {
    cy.visit('/login');

    cy.getBySel('password-input').type('pass').clear();

    cy.contains('Password is required').should('exist');
  });

  it('Does not redirect to login page when already logged in', () => {
    cy.visit('/login');
    cy.getBySel('username-input').type(validUsername);
    cy.getBySel('password-input').type(validPassword);
    cy.getBySel('login-button').click();
    cy.visit('/');

    cy.url().should('not.include', '/login');
  });

  it('Logs out when log out button is clicked', () => {
    cy.visit('/login');
    cy.getBySel('username-input').type(validUsername);
    cy.getBySel('password-input').type(validPassword);
    cy.getBySel('login-button').click();

    cy.getBySel('logout-button').click();

    cy.url().should('include', '/login');
  });
});
