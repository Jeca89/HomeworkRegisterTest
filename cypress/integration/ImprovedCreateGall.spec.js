/// <reference types='Cypress'/>

const Locators = require('../fixtures/locator.json');
const faker = require('faker');

describe("Create gallery test", () =>{
    let validEmail = 'jeca_ceca89@hotmail.com';
    let validPassword = 'brankopetra1518';

    let userData = {
        randomTitle: faker.name.title(),
        randomDescription: faker.datatype.string(),
        randomImg: faker.image.imageUrl()
        }

    before('visit page app', () => {
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');
    });

    before('Login', () => {
        cy.get(Locators.Header.LoginButton).click();
        cy.url().should('contains','/login');
        cy.get(Locators.LoginPage.EmailInput).clear().type(validEmail);
        cy.get(Locators.LoginPage.PasswordInput).clear().type(validPassword);
        cy.get(Locators.LoginPage.SubmitButton).click();
    });

    it("Create gallery with valid data", () => {

        cy.get(Locators.Header.CreateGalleryBtn).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/create');
        cy.get(Locators.CreateGalleryPage.Title).type(userData.randomTitle);
        cy.get(Locators.CreateGalleryPage.Description).type(userData.randomDescription);
        cy.get(Locators.CreateGalleryPage.Images).type(userData.randomImg);
        cy.get(Locators.CreateGalleryPage.AddImgBtn).eq(0).click();
        cy.get(Locators.CreateGalleryPage.SubmitGallBtn).eq(0).click();
    });
});
