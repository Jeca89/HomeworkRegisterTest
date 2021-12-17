
const Locators = require('../fixtures/locator.json');
const faker = require('faker');

describe("Registration test", () =>{

    let userData = {
        randomName: faker.name.findName(),
        randomLastName: faker.name.lastName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password(),
        randomNewPassword: faker.internet.password(),
        randomShortPassword: faker.internet.password(5)
    }

    before('visit app page', () => {
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');
    });

    it("Register with random credentials", () => {

        cy.get(Locators.Header.RegisterButton).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get(Locators.RegisterPage.FirstName).type(userData.randomName);
        cy.get(Locators.RegisterPage.LastName).type(userData.randomLastName);
        cy.get(Locators.RegisterPage.RegistrationEmail).type(userData.randomEmail);
        cy.get(Locators.RegisterPage.RegistrationPass).type(userData.randomPassword);
        cy.get(Locators.RegisterPage.PassConfirm).type(userData.randomPassword);
        cy.get(Locators.RegisterPage.TermsButton).check();
        cy.get(Locators.RegisterPage.RegistrationButton).click();
    });

    it('Register with valid credentials', () => {
        cy.visit('/');
        cy.url().should('eq','https://gallery-app.vivifyideas.com/');

        cy.get(Locators.Header.RegisterButton).click();
        cy.url().should('eq','https://gallery-app.vivifyideas.com/register');
        cy.get(Locators.RegisterPage.FirstName).type('Jellena');
        cy.get(Locators.RegisterPage.LastName).type('Reljic');
        cy.get(Locators.RegisterPage.RegistrationEmail).type('jelenar.89@gmail.com');
        cy.get(Locators.RegisterPage.RegistrationPass).type('test1234');
        cy.get(Locators.RegisterPage.PassConfirm).type('test1234');
        cy.get(Locators.RegisterPage.TermsButton).check();
        cy.get(Locators.RegisterPage.RegistrationButton).click();
    });
});
