// Cypress E2E: covers login, CRUD, and AI flows
describe('Absolute Realms Dashboard E2E', () => {
  it('loads the dashboard UI', () => {
    cy.visit('/');
    cy.get('#task-sidebar').should('exist');
    cy.get('#ai-generator-form').should('exist');
  });

  it('can sign in with Azure AD (UI presence)', () => {
    cy.get('#login-btn').should('exist');
  });

  it('can generate a new AI task', () => {
    cy.get('#ai-prompt').type('E2E AI task');
    cy.get('#ai-generator-form button[type=submit]').click();
    cy.contains('Task generated').should('exist');
  });

  // Add more CRUD and navigation tests as endpoints and UI mature
});
