describe('The registration page', function () {
    it('successfully loads', function () {
        cy.visit('/home/register');
        cy.url().should('include', '/home/register');
        cy.get('[data-testid="userRegistrationForm"]').should('exist');
    });
    it('allows a user to register', function () {
        cy.window().then((win) => {
            cy.spy(win.console, "log")
        });
        const email = 'test_register@example.com';
        const username = 'test_register';
        const password = 'test_register_password';
        console.log(process.env.REACT_APP_API_ENDPOINT);
        cy.visit('/home/register');
        cy.get('input[name=email]').type(email);
        cy.get('input[name=username]').type(username);
        cy.get('input[name=password1]').type(`${password}`);
        cy.get('input[name=password2]').type(`${password}`);
        cy.get('button[type=submit]').click();
        cy.get('[data-testid="logoutButton"]', {timeout: 5000}).should('exist');
    });
});