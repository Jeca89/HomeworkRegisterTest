
import { header} from '../page_object/header';
import { registrationPage } from '../page_object/registration';
import { registrationCheckBox } from '../page_object/registrationUncheckedbox';
const faker = require('faker');

describe("POM Registration test", () =>{

    let userData = {
        randomName: faker.name.findName(),
        randomLastName: faker.name.lastName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.internet.password(),
        randomNewPassword: faker.internet.password(),
        randomShortPassword: faker.internet.password(5)
    }

    before('visit app', () => {
        cy.visit('/');
        cy.url().should('contains', 'gallery-app')
    });

    it.only("Register with checkbox unchecked", () => {

        header.registerBtn.click();
        registrationCheckBox.registrationUncheckedBox(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomPassword);
        cy.url().should('contains', '/register')
    });

    it.only("Register without any credentials", () => {

        header.registerBtn.click();
        registrationPage.registration(('{selectall}{backspace}'), ('{selectall}{backspace}'), ('{selectall}{backspace}'), ('{selectall}{backspace}'));
        cy.url().should('contains', '/register')
    });

    it.only("Register without First name", () => {

        header.registerBtn.click();
        registrationPage.registration(('{selectall}{backspace}'), userData.randomLastName, userData.randomEmail, userData.randomPassword);
        cy.url().should('contains', '/register')
    });

    it.only("Register without Last name", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, ('{selectall}{backspace}'), userData.randomEmail, userData.randomPassword);
        cy.url().should('contains', '/register')
    });

    it.only("Register without first and last name", () => {

        header.registerBtn.click();
        registrationPage.registration(('{selectall}{backspace}'), ('{selectall}{backspace}'), userData.randomEmail, userData.randomPassword);
        cy.url().should('contains', '/register')
    });

    it.only("Register without email", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, userData.randomLastName, ('{selectall}{backspace}'), userData.randomPassword);
        cy.url().should('contains', '/register')
    });

    it.only("Register without password", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, userData.randomLastName, userData.randomEmail, ('{selectall}{backspace}'));
        cy.url().should('contains', '/register')
    });

    it.only("Register with short password less than 8 chars", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomShortPassword);
        cy.url().should('contains', '/register')
    });

    it.only("Register with valid credentials", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomPassword);
        cy.url().should('not.contains', "/register")
    });

});
