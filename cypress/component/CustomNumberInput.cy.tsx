import { assertEmptyStatement } from '@babel/types';
import { CustomNumberInput } from '../../src/components/PDFDisplay/CustomNumberInput';
import React from 'react';

describe('CustomNumberInput component', () => {
  it('CustomNumberInput component test', () => {
    const onChangeSpy = cy.spy().as('onChangeSpy')
    cy.mount(<CustomNumberInput
        data-cy="number-input-component"
        placeholder="…"
        value={undefined}
        onChange={onChangeSpy}
      />);
    
      cy.get('[data-cy="number-input-component"]').find('input').should('have.value', '');

      cy.get('[data-cy="number-input-component"]').find('input').type("32");
      cy.get('[data-cy="number-input-component"]').find('input').should('have.value', '32');
      cy.get('[data-cy="number-input-component"]').find('input').blur();
      cy.get('@onChangeSpy').should('have.been.called');
      
      cy.get('[data-cy="number-input-component"]').find('button').last().click();
      cy.get('@onChangeSpy').should('have.been.called');
      cy.get('[data-cy="number-input-component"]').find('input').should('have.value', '33');
  
      cy.get('[data-cy="number-input-component"]').find('button').first().click();
      cy.get('@onChangeSpy').should('have.been.called');
      cy.get('[data-cy="number-input-component"]').find('input').should('have.value', '32');
      
  });
});