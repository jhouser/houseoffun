describe('The Home Page', function () {
    it('successfully loads', function () {
        cy.visit('/');
        cy.url().should('include', '/home')
    });
    it('has links to the login and registration pages', function () {
        cy.visit('/');
        cy.get('a[href="/home/login"]').should('exist');
        cy.get('a[href="/home/register"]').should('exist');
    });
});

describe('The API', function () {
    it('successfully loads', function () {
        cy.visit('http://localhost:8000/api/auth/login/', {failOnStatusCode: false});
        cy.url().should('include', '/api');
    });
});