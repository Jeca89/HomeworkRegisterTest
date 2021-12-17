/// <reference types='Cypress'/>

describe('login test',() => {
    it('Login without email adress', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('.nav-link').eq(1).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/login');
        cy.get('#password').type('brankopetra1518');
        cy.get(('button[type="submit"]')).click();
    });

    it('Login without password', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('.nav-link').eq(1).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/login');
        cy.get('#email').type('jeca_ceca89@hotmail.com');
        cy.get(('button[type="submit"]')).click();
    });

    it('Login with wrong email', () =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('.nav-link').eq(1).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/login');
        cy.get('#email').type('jeca_ceca@hotmail.com');
        cy.get('#password').type('brankopetra1518');
        cy.get(('button[type="submit"]')).click();
    });

    it('Login with invalid password and valid email',() =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('.nav-link').eq(1).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/login');
        cy.get('#email').type('jeca_ceca89@hotmail.com');
        cy.get('#password').type('brankopetra');
        cy.get(('button[type="submit"]')).click();
    });

    it('Login with invalid email and password',() =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('.nav-link').eq(1).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/login');
        cy.get('#email').type('jeca_ceca@hotmail.com');
        cy.get('#password').type('brankopetra');
        cy.get(('button[type="submit"]')).click();
    });

    it('Login with input fields empty',() =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('.nav-link').eq(1).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/login');
        cy.get(('button[type="submit"]')).click();
    });

    it('Login with added space in email',() =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('.nav-link').eq(1).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/login');
        cy.get('#email').type('jeca_ceca89@hotmail.com ');
        cy.get('#password').type('brankopetra1518');
        cy.get(('button[type="submit"]')).click();
    });

    it('Login with invalid email and empty password field',() =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('.nav-link').eq(1).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/login');
        cy.get('#email').type('jeca_ceca9@hotmail.com');
        cy.get(('button[type="submit"]')).click();
    });

    it('Login with invalid email and empty password',() =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('.nav-link').eq(1).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/login');
        cy.get('#email').type('jeca_ceca@hotmail.com');
        cy.get(('button[type="submit"]')).click();
    });

    it('Login with valid credentials',() =>{
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get('.nav-link').eq(1).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/login');
        cy.get('#email').type('jeca_ceca89@hotmail.com');
        cy.get('#password').type('brankopetra1518');
        cy.get(('button[type="submit"]')).click();
    });

    it('Click on logout button',() =>{
        cy.wait(500);
        cy.get('.nav-link').eq(3).click(0);
    });
});
