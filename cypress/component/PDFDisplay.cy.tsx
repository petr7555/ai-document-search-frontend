import { PDFDisplay } from '../../src/components/PDFDisplay/PDFDisplay';
import React from 'react';

describe('PDFDisplay component', () => {
  it('Initializes correctly', () => {
    /*  data-cy references:
        - decrease-zoom-button
        - zoom-level-display
        - increase-zoom-button
        - number-input-component
        - text-search-field
        - close-button
        - pdf-document
        - pdf-page_#pageNumber
    */
    const setShowPDFSpy = cy.spy().as('setShowPDFSpy')
    cy.mount(<PDFDisplay source={{
            isin: "1234",
            shortname: "test source",
            link: "http://localhost:3000/test_pdf.pdf",
            page: 2
        }} 
        setShowPDF={setShowPDFSpy}/>
    );
    cy.get('[data-cy="zoom-level-display"]').should('contain.text', '100%');
    
    cy.get('[data-cy="number-input-component"]').find('input').should('have.value', 2);

    cy.get('[data-cy="text-search-field"]').find('input').should('have.value', "");

    cy.get('[data-cy="close-button"]').click();
    cy.get('@setShowPDFSpy').should('have.been.calledWith', false)

  });
  it('Zooming functions as intended', () => {
    cy.mount(<PDFDisplay source={{
            isin: "1234",
            shortname: "test source",
            link: "http://localhost:3000/test_pdf.pdf",
            page: 2
        }} 
        setShowPDF={() => {}}/>
    );
    cy.get('[data-cy="zoom-level-display"]').should('contain.text', '100%');
    
    cy.get('[data-cy="increase-zoom-button"]').click();
    cy.get('[data-cy="zoom-level-display"]').should('contain.text', '150%');
    
    cy.get('[data-cy="decrease-zoom-button"]').click();
    cy.get('[data-cy="zoom-level-display"]').should('contain.text', '100%');
    
    cy.get('[data-cy="decrease-zoom-button"]').click();
    cy.get('[data-cy="zoom-level-display"]').should('contain.text', '67%');
  });
  it('Number input functions as intended', () => {
    /*  data-cy references:
        - decrease-zoom-button
        - zoom-level-display
        - increase-zoom-button
        - number-input-component
        - text-search-field
        - close-button
        - pdf-document
        - pdf-page_#pageNumber
    */
    cy.mount(<PDFDisplay source={{
            isin: "1234",
            shortname: "test source",
            link: "http://localhost:3000/test_pdf.pdf",
            page: 1
        }} 
        setShowPDF={() => {}}/>
    );
    
    cy.wait(250);
    //Has to make sure that the pdf is loaded first so that the initial setPage does mess up the test

    cy.get('[data-cy="number-input-component"]').find('input').should('have.value', 1);
    
    cy.get('[data-cy="number-input-component"]').find('button').last().click();
    cy.get('[data-cy="number-input-component"]').find('input').should('have.value', 2);

    cy.get('[data-cy="number-input-component"]').find('button').first().click();
    cy.get('[data-cy="number-input-component"]').find('input').should('have.value', 1);

    cy.get('[data-cy="number-input-component"]').find('button').first().click();
    cy.get('[data-cy="number-input-component"]').find('input').blur();
    cy.get('[data-cy="number-input-component"]').find('input').should('have.value', 1);
    
    cy.get('[data-cy="number-input-component"]').find('input').clear();
    cy.get('[data-cy="number-input-component"]').find('input').type("3");
    cy.get('[data-cy="number-input-component"]').find('input').blur();
    cy.get('[data-cy="number-input-component"]').find('input').should('have.value', 3);

    cy.get('[data-cy="number-input-component"]').find('button').last().click();
    cy.get('[data-cy="number-input-component"]').find('input').blur();
    cy.get('[data-cy="number-input-component"]').find('input').should('have.value', 3);

    cy.get('[data-cy="number-input-component"]').find('input').clear();
    cy.get('[data-cy="number-input-component"]').find('input').type("5");
    cy.get('[data-cy="number-input-component"]').find('input').blur();
    cy.get('[data-cy="number-input-component"]').find('input').should('have.value', 3);

    cy.get('[data-cy="number-input-component"]').find('input').clear();
    cy.get('[data-cy="number-input-component"]').find('input').type("0");
    cy.get('[data-cy="number-input-component"]').find('input').blur();
    cy.get('[data-cy="number-input-component"]').find('input').should('have.value', 1);
    

  });
  
});