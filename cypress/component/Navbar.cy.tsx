import { Navbar } from '../../src/components/Navbar/Navbar';

describe('Navbar component', () => {
  it('Navbar component test', () => {
    cy.mount(<Navbar />);

    cy.contains('Stamdata').click();

    cy.contains('Account').click();
  });
});
