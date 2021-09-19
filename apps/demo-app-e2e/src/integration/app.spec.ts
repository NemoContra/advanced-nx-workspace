import { getButton, getImage, getParagraph } from '../support/app.po';

describe('demo-app', () => {
  beforeEach(() => cy.visit('/'));

  it('should display a random image', () => {
    const image = getImage();
    image.should('exist');
  });

  it('should navigate to cats', () => {
    cy.get('a').contains('Cat').click();
    const paragraph = getParagraph();
    paragraph.should('have.text', 'Only cats here');
    const image = getImage();
    image.should('have.attr', 'alt').then((alt) => expect(alt).equals('A cat'));
    const button = getButton();
    button.should('exist');
  });

  it('should navigate to dogs', () => {
    cy.get('a').contains('Dog').click();
    const paragraph = getParagraph();
    paragraph.should('have.text', 'Only dogs here');
    const image = getImage();
    image.should('have.attr', 'alt').then((alt) => expect(alt).equals('A dog'));
    const button = getButton();
    button.should('exist');
  });
});
