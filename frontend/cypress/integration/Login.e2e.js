describe('The login page', function () {
    it('successfully loads', function () {
        cy.visit('/home/login');
        cy.url().should('include', '/home/login');
        cy.get('[data-testid="userLoginForm"]').should('exist');
    });
    it('allows a user to login', function () {
        const username = 'test_user';
        const password = 'test_password';
        cy.visit('/home/login');
        cy.get('input[name=username]').type(username);
        cy.get('input[name=password]').type(`${password}{enter}`);
        cy.get('[data-testid="logoutButton"]').should('exist');
    });
});