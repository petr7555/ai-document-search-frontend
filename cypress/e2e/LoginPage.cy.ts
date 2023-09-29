describe('Login page', () => {
  const validUsername = 'user';
  const validPassword = 'pass';

  it('Redirects to login page when not logged in', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });

  it('Shows username and password inputs', () => {
    cy.visit('/login');

    cy.get('[data-cy="username-text-field"]').should('have.text', 'Username');
    cy.get('[data-cy="password-text-field"]').should('have.text', 'Password');
  });

  it('Signs in when valid credentials are entered', () => {
    cy.visit('/login');

    cy.get('[data-cy="username-text-field"]').type(validUsername);
    cy.get('[data-cy="password-text-field"]').type(validPassword);

    cy.get('[data-cy="sign-in-button"]').click();

    cy.url().should('not.include', '/login');
  });

  it('Shows error when invalid credentials are entered', () => {
    cy.visit('/login');

    cy.get('[data-cy="username-text-field"]').type('invalid_username');
    cy.get('[data-cy="password-text-field"]').type('invalid_password');

    cy.get('[data-cy="sign-in-button"]').click();

    cy.get('[data-cy="error-alert-message"]').should(
      'have.text',
      'Invalid credentials'
    );
  });

  it('Shows error when inputs are empty', () => {
    cy.visit('/login');

    cy.get('[data-cy="sign-in-button"]').click();

    cy.get('[data-cy="error-alert-message"]').should(
      'have.text',
      'Please provide username and password'
    );
  });

  it('Redirects to login page when not logged in', () => {
    cy.visit('/');
    cy.url().should('include', '/login');
  });

  it('Does not redirect to login page when already logged in', () => {
    cy.visit('/login');

    cy.get('[data-cy="username-text-field"]').type(validUsername);
    cy.get('[data-cy="password-text-field"]').type(validPassword);

    cy.get('[data-cy="sign-in-button"]').click();

    cy.visit('/');
    cy.url().should('not.include', '/login');
  });

  it('Logs out', () => {
    cy.visit('/login');

    cy.get('[data-cy="username-text-field"]').type(validUsername);
    cy.get('[data-cy="password-text-field"]').type(validPassword);

    cy.get('[data-cy="sign-in-button"]').click();

    cy.url().should('not.include', '/login');

    cy.get('[data-cy="account-button"]').should('have.text', 'Account').click();

    cy.get('[data-cy="log-out-button"]').click();

    cy.url().should('include', '/login');
  });
});
