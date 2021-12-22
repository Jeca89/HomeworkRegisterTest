/// <reference types="cypress" />

import { validationMessages} from '../fixtures/validationMessages.json';
import { header} from '../page_object/header';
import { registrationPage } from '../page_object/registration';

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

    it("Register with checkbox unchecked", () => {

        header.registerBtn.click();
        registrationPage.registrationUncheckedBox(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword);
        registrationPage.regErrorMsg.should('be.visible');
        registrationPage.regErrorMsg.should('have.text', validationMessages.termsAndCond);
        registrationPage.regErrorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('exist');
        cy.url().should('contains', '/register')
    });

    it("Register without any credentials", () => {

        header.registerBtn.click();

        registrationPage.firstName.should('contain', '');
        registrationPage.lastName.should('contain', '');
        registrationPage.registrationEmail.should('contain', '');
        registrationPage.registrationPass.should('contain', '');
        registrationPage.confirmPass.should('contain', '');

        registrationPage.registration(('{selectall}{backspace}'), ('{selectall}{backspace}'), ('{selectall}{backspace}'), ('{selectall}{backspace}'), ('{selectall}{backspace}'));


        header.registerBtn.should('exist');
        cy.url().should('contains', '/register')
    });

    it("Register without First name", () => {

        header.registerBtn.click();

        registrationPage.registration(('{selectall}{backspace}'), userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword);
        registrationPage.firstName.should('contain', '');
        header.registerBtn.should('exist');
        cy.url().should('contains', '/register')
    });

    it("Register without Last name", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, ('{selectall}{backspace}'), userData.randomEmail, userData.randomPassword, userData.randomPassword);
        registrationPage.lastName.should('contain', '');
        header.registerBtn.should('exist');
        cy.url().should('contains', '/register')
    });

    it("Register without first and last name", () => {

        header.registerBtn.click();
        registrationPage.registration(('{selectall}{backspace}'), ('{selectall}{backspace}'), userData.randomEmail, userData.randomPassword, userData.randomPassword);
        registrationPage.firstName.should('contain', '');
        registrationPage.lastName.should('contain', '');
        header.registerBtn.should('exist');
        cy.url().should('contains', '/register')
    });

    it("Register without email", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, userData.randomLastName, ('{selectall}{backspace}'), userData.randomPassword, userData.randomPassword);
        registrationPage.registrationEmail.should('contain', '');
        header.registerBtn.should('exist')
        cy.url().should('contains', '/register')
    });

    it("Register without password", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, userData.randomLastName, userData.randomEmail, ('{selectall}{backspace}'), ('{selectall}{backspace}'));
        registrationPage.registrationPass.should('contain', '');
        header.registerBtn.should('exist')
        cy.url().should('contains', '/register')
    });

    it("Register with short password less than 8 chars", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomShortPassword, userData.randomShortPassword);
        registrationPage.regErrorMsg.should('be.visible');
        registrationPage.regErrorMsg.should('have.text', validationMessages.shortPass);
        registrationPage.regErrorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('exist');

        cy.url().should('contains', '/register')
    });

    it("Register with password not equal password confirm", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomNewPassword);
        registrationPage.regErrorMsg.should('be.visible');
        registrationPage.regErrorMsg.should('have.text', validationMessages.confMismatch);
        registrationPage.regErrorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.registerBtn.should('exist');

        cy.url().should('contains', '/register')

    });

    it("Register with email not contain @", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, userData.randomLastName, 'jeca_ceca89hotmail.com', userData.randomPassword, userData.randomPassword);
        header.registerBtn.should('exist')
    });

    it.only("Register with valid credentials", () => {

        header.registerBtn.click();
        registrationPage.registration(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomPassword, userData.randomPassword);
        header.registerBtn.should('not.exist');
        header.logoutBtn.should('exist');
        cy.url().should('not.contains', "/register")
    });

});
