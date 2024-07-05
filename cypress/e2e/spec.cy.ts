describe('Testing API', () => {
  it('Visits the initial project page', () => {
    cy.visit('https://martin-devweb.github.io/rick_a_card/');
    cy.wait;
    cy.contains('Pick a card');
  });
  it('Pick a card and stock it', () => {
    cy.visit('https://martin-devweb.github.io/rick_a_card/');
    cy.contains('Pick a card').click();
    cy.contains('Stock it').click();
    cy.contains('Back home').click();
  });
  it('Already picked a card, trying again', () => {
    cy.visit('https://martin-devweb.github.io/rick_a_card/');
    cy.contains('Pick a card').click();
    cy.contains('Next card at :');
  });
});
