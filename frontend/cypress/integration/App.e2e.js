describe('The Home Page', function () {
    it('successfully loads', function () {
        cy.visit('/');
        cy.url().should('include', '/dashboard')
    });
});