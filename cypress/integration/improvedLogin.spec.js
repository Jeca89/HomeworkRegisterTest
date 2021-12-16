/// <reference types ="cypress"/>


const Locators = require('../fixtures/locator.json');
const faker = require("faker")

describe("Login test", () => {
    let validEmail = 'jeca_ceca89@hotmail.com';
    let validPassword = 'brankopetra1518';

    let userData = {
        randomName: faker.name.findName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.datatype.number()
    }

    before('visit app page', () => {
        cy.visit('/');
        cy.url().should('contains','https://gallery-app');

    });

    it('Login with invalid credentials',() =>{
        cy.get(Locators.Header.LoginButton).click();
        cy.url().should('contains','/login');
        cy.get(Locators.LoginPage.EmailInput).clear().type(userData.randomEmail);
        cy.get(Locators.LoginPage.PasswordInput).clear().type(userData.randomPassword);
        cy.get(Locators.LoginPage.SubmitButton).click();
        cy.url().should('contains','/login');
    });

    it('Login with valid credentials',() =>{
        cy.get(Locators.Header.LoginButton).click();
        cy.url().should('contains','/login');
        cy.get(Locators.LoginPage.EmailInput).clear().type(validEmail);
        cy.get(Locators.LoginPage.PasswordInput).clear().type(validPassword);
        cy.get(Locators.LoginPage.SubmitButton).click();
    });

    it('Click on logout button',() =>{
        cy.wait(500);
        cy.get(Locators.Header.LogoutButton).eq(3).click(0);
    });
});

