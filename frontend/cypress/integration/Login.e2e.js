describe('The login page', function () {
    it('successfully loads', function () {
        cy.visit('/home/login');
        cy.url().should('include', '/home/login');
        cy.get('[data-testid="userLoginForm"]').should('exist');
    });
    it('allows a user to login', function () {
        cy.visit('/');
        cy.url().should('include', '/home/login');
    });
});