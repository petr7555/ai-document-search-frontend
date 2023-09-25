describe('Login page', () => {
  it('Sign in test', () => {
    cy.visit('/');

    cy.contains('Sign in').click();

    cy.get('[data-cy="username-text-field"]').should('have.text', 'Username');
    cy.get('[data-cy="username-text-field"]').type('test@email.com');

    cy.get('[data-cy="password-text-field"]').should('have.text', 'Password');
    cy.get('[data-cy="password-text-field"]').type('123456');

    cy.get('[data-cy="username-text-field"]').within(() => {
      cy.get('input').should('have.value', 'test@email.com');
    });

    cy.get('[data-cy="password-text-field"]').within(() => {
      cy.get('input').should('have.value', '123456');
    });

    cy.contains('Sign in').click();

    //WIP test, as there is no functionality there is nothing to check if successful or unsuccessful sign in
  });
});
