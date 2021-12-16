/// <reference types='Cypress'/>

describe('Registration test',() => {

    it('Register with check box unchecked', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Jellena');
        cy.get('#last-name').type('Reljic');
        cy.get('#email').type('jelenar.89@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get(('button[type="submit"]')).click();
    });

    it('Register without any credentials', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get(('button[type="submit"]')).click();
    });

    it('Register with invalid email forgoten @', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Jellena');
        cy.get('#last-name').type('Reljic');
        cy.get('#email').type('jelenar.89gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });

    it('Register with invalid email space added', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Jellena');
        cy.get('#last-name').type('Reljic');
        cy.get('#email').type('jelenar.89@gmail.com ');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });

    it('Register wihout first name', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#last-name').type('Reljic');
        cy.get('#email').type('jelenar.89@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });

    it('Register without last name', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Jellena');
        cy.get('#email').type('jelenar.89@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });

    it('Register without first name and last name', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#email').type('jelenar.89@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });

    it('Register without email', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Jellena');
        cy.get('#last-name').type('Reljic');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });

    it('Register without password', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Jellena');
        cy.get('#last-name').type('Reljic');
        cy.get('#email').type('jelenar.89@gmail.com');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });

    it('Register with password field different than confirm-pass', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Jellena');
        cy.get('#last-name').type('Reljic');
        cy.get('#email').type('jelenar.89@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test12345678');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });

    it('Register with password less than 8 chars', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Jellena');
        cy.get('#last-name').type('Reljic');
        cy.get('#email').type('jelenar.89@gmail.com');
        cy.get('#password').type('test1');
        cy.get('#password-confirmation').type('test1');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });

    it('Register with password contain only letters', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Jellena');
        cy.get('#last-name').type('Reljic');
        cy.get('#email').type('jelenar.89@gmail.com');
        cy.get('#password').type('testaplikacija');
        cy.get('#password-confirmation').type('testaplikacija');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });

    it('Register with valid credentials', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('a[href="/register"]').click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get('#first-name').type('Jellena');
        cy.get('#last-name').type('Reljic');
        cy.get('#email').type('jelenar.89@gmail.com');
        cy.get('#password').type('test1234');
        cy.get('#password-confirmation').type('test1234');
        cy.get('input[class="form-check-input"]').check();
        cy.get(('button[type="submit"]')).click();
    });
});
