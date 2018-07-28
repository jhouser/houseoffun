describe('The registration page', function () {
    it('successfully loads', function () {
        cy.visit('/home/register');
        cy.url().should('include', '/home/register');
        cy.get('[data-testid="userRegistrationForm"]').should('exist');
    });
    it('allows a user to register', function () {
        const email = 'test_register@example.com';
        const username = 'test_register';
        const password = 'test_register_password';
        cy.visit('/home/login');
        cy.get('input[name=email]').type(email);
        cy.get('input[name=username]').type(username);
        cy.get('input[name=password1]').type(`${password}`);
        cy.get('input[name=password2]').type(`${password}{enter}`);
        cy.get('[data-testid="logoutButton"]').should('exist');
    });
});