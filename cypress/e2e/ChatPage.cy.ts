describe('Chat page', () => {
  const username = 'user';
  const password = 'pass';

  beforeEach(() => {
    cy.visit('/login');
    cy.get('[data-cy="username-input"]').type(username);
    cy.get('[data-cy="password-input"]').type(password);
    cy.get('[data-cy="log-in-button"]').click();
  });

  it('Shows chatbot page when logged in', () => {
    cy.url().should('include', '/');
    cy.get('[data-cy="chatbot"]').should('exist');
  });

  it('Send message to chatbot and get response', () => {
    cy.get('[data-cy="chatbot"]').should('exist');
    cy.get('[data-cy="chatbot-input-field"]').type('Hello');
    cy.get('[data-cy="chatbot-send-button"]').click();
    cy.contains('Hello').should('exist');
    cy.get('[data-cy="chatbot-response-message"]').should('exist');
  });

  it('Try to send empty input to chatbot and get error', () => {
    cy.get('[data-cy="chatbot"]').should('exist');
    cy.get('[data-cy="chatbot-input-field"]').type('  ');
    cy.get('[data-cy="chatbot-send-button"]').should('be.disabled');
  });

  it('Send message and go to link', () => {
    cy.get('[data-cy="chatbot"]').should('exist');
    cy.get('[data-cy="chatbot-input-field"]').type(
      'Hi, can you tell me about bonds?'
    );
    cy.get('[data-cy="chatbot-send-button"]').click();
    cy.get('[data-cy="user-input-message"]').should(
      'include.text',
      'Hi, can you tell me about bonds?'
    );
    cy.get('[data-cy="chatbot-response-message"]').should(
      'include.text',
      'Bonds are debt securities issued by governments, corporations, or other entities to raise capital. Investors who buy bonds effectively lend money to the issuer in exchange for periodic interest payments and the return of the bonds face value at maturity.'
    );
    cy.get('[data-cy="source-link"]').should(
      'include.text',
      'Who should buy long-term bonds? - Cambridge'
    );
    cy.get('[data-cy="source-link"]').should(
      'have.attr',
      'href',
      'https://www.nber.org/system/files/working_papers/w6801/w6801.pdf#page=7'
    );
  });

  it('Get several sources', () => {
    cy.get('[data-cy="chatbot-input-field"]').type(
      'Hi, what are some financial covenants?'
    );
    cy.get('[data-cy="chatbot-send-button"]').click();
    cy.get('[data-cy="user-input-message"]').should(
      'include.text',
      'Hi, what are some financial covenants?'
    );
    cy.get('[data-cy="chatbot-response-message"]').should(
      'include.text',
      'There are several types of financial covenants, and the specific ones used can vary depending on the type of loan and the lender.'
    );

    cy.contains('NO2222222222 What is a covenant? - Investopedia')
      .should('exist')
      .should(
        'have.attr',
        'href',
        'https://www.investopedia.com/terms/c/covenant.asp#page=1'
      );

    cy.contains('NO3333333333 Covenants - FinancialEdge')
      .should('exist')
      .should(
        'have.attr',
        'href',
        'https://www.fe.training/free-resources/financial-markets/covenants/#page=1'
      );
  });

  it('Start new conversation', () => {
    cy.get('[data-cy="chatbot-input-field"]').type(
      'Hi, what are some financial covenants?'
    );
    cy.get('[data-cy="chatbot-send-button"]').click();
    cy.get('[data-cy="user-input-message"]').should(
      'include.text',
      'Hi, what are some financial covenants?'
    );

    cy.get('[data-cy="new-conversation-button"]').click();
    cy.contains('Hi, what are some financial covenants?').should('not.exist');
  });

  it('Login and receive error message upon chatbot connection error', () => {
    cy.intercept('GET', '/conversation', {
      statusCode: 400,
      body: {
        error: 'Unknown error retrieving conversation'
      }
    }).as('getConversation');

    cy.get('[data-cy="chatbot-response-error"]').should(
      'include.text',
      'Unknown error retrieving conversation'
    );
  });
});