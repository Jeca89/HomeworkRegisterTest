/// <reference types ="cypress" />

import { authLogin} from '../page_object/authLogin';
import { header} from '../page_object/header';
import {validationMessages} from '../fixtures/validationMessages.json';
const faker = require("faker");

describe('POM login', () => {

    let validEmail = 'jeca_ceca89@hotmail.com';
    let validPassword = 'brankopetra1518';

    let userData = {
        randomName: faker.name.findName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.datatype.number()
    }

    before('visit app', () => {
        cy.visit('/');
        cy.url().should('contains', 'gallery-app')
    });

    it('Login with invalid credentials', () => {
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible');

        cy.contains('Please login');

        authLogin.login(userData.randomEmail, userData.randomPassword);

        authLogin.errorMsg.should('be.visible');
        authLogin.errorMsg.should('have.text', validationMessages.badCred);
        authLogin.errorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.loginBtn.should('exist');
        cy.url().should('contains', '/login');
    });

    it('Login with invalid email and valid password', () => {
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible');
        cy.contains('Please login');

        authLogin.login(userData.randomEmail, validPassword);

        authLogin.errorMsg.should('be.visible');
        authLogin.errorMsg.should('have.text', validationMessages.badCred);
        authLogin.errorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.loginBtn.should('exist');
        cy.url().should('contains', '/login')
    });

    it('Login with valid email and invalid password', () => {
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible');
        cy.contains('Please login');

        authLogin.login(validEmail, userData.randomPassword);

        authLogin.errorMsg.should('be.visible');
        authLogin.errorMsg.should('have.text', validationMessages.badCred);
        authLogin.errorMsg.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        header.loginBtn.should('exist');
        cy.url().should('contains', '/login')
    });

    it('Login with emaily field empty', () => {
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible');
        cy.contains('Please login');

        authLogin.login(('{selectall}{backspace}'), userData.randomPassword);

        authLogin.emailInput.should('contain', '');
        header.loginBtn.should('exist');
        cy.url().should('contains', '/login')
    });

    it('Login with password field empty valid email', () => {
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible');
        cy.contains('Please login');

        authLogin.login(validEmail,('{selectall}{backspace}'));

        authLogin.passwordInput.should('contain', '');
        header.loginBtn.should('exist');
        cy.url().should('contains', '/login')
    });

    it('Login with password field empty invalid email', () => {
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible');
        cy.contains('Please login');

        authLogin.login(userData.randomEmail,('{selectall}{backspace}'));
        authLogin.passwordInput.should('contain', '');
        header.loginBtn.should('exist');
        cy.url().should('contains', '/login')
    });

    it('Login with space on email', () => {
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible');
        cy.contains('Please login');

        authLogin.login(userData.randomEmail + " ",('{selectall}{backspace}'));

        authLogin.passwordInput.should('contain', '');
        header.loginBtn.should('exist')
        cy.url().should('contains', '/login')
    });

    it('Login wiht all field empty', () => {
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible');
        cy.contains('Please login');

        authLogin.login(('{selectall}{backspace}'),('{selectall}{backspace}'));

        authLogin.emailInput.should('contain', '');
        authLogin.passwordInput.should('contain', '');
        header.loginBtn.should('exist');
        cy.url().should('contains', '/login')
    });

    it('Login wiht valid credentials', () => {
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible')
        cy.url().should('contains', '/login');

        authLogin.login(validEmail, validPassword);
        cy.wait(10000);
        header.loginBtn.should('not.exist');
        header.logoutBtn.should('exist')
        cy.url().should('not.contains', "/login")
    });

    it('Logout', () => {
        header.logoutBtn.click();
    })
});
