import { PrimaryButton } from '../../src/components/Button/PrimaryButton';

describe('Navbar component', () => {
  it('Navbar component test', () => {
    cy.mount(<PrimaryButton>Test Text</PrimaryButton>);

    cy.get('button').should('contain.text', 'Test Text');
    cy.get('button').click();
  });
});
