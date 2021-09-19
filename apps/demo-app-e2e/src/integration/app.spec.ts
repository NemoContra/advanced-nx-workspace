import { getImage } from '../support/app.po';

describe('dashboard', () => {
  beforeEach(() => cy.visit('/'));

  it('should display a random image', () => {
    const image = getImage();
    image.should('exist');
  });
});
