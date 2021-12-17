/// <reference types ="cypress" />

import { authLogin} from '../page_object/authLogin';
import { header} from '../page_object/header';
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

    it.only('Login with invalid credentials', () => {
        header.loginBtn.click();
        authLogin.login(userData.randomEmail, userData.randomPassword)
        cy.url().should('contains', '/login')
    });

    it.only('Login with invalid email and valid password', () => {
        header.loginBtn.click();
        authLogin.login(userData.randomEmail, validPassword)
        cy.url().should('contains', '/login')
    });

    it.only('Login with valid email and invalid password', () => {
        header.loginBtn.click();
        authLogin.login(validEmail, userData.randomPassword)
        cy.url().should('contains', '/login')
    });

    it.only('Login with emaily field empty', () => {
        header.loginBtn.click();
        authLogin.login(('{selectall}{backspace}'), userData.randomPassword)
        cy.url().should('contains', '/login')
    });

    it.only('Login with password field empty valid email', () => {
        header.loginBtn.click();
        authLogin.login(validEmail,('{selectall}{backspace}'));
        cy.url().should('contains', '/login')
    });

    it.only('Login with password field empty invalid email', () => {
        header.loginBtn.click();
        authLogin.login(userData.randomEmail,('{selectall}{backspace}'));
        cy.url().should('contains', '/login')
    });

    it.only('Login with space on email', () => {
        header.loginBtn.click();
        authLogin.login(userData.randomEmail + " ",('{selectall}{backspace}'));
        cy.url().should('contains', '/login')
    });

    it.only('Login wiht all field empty', () => {
        header.loginBtn.click();
        authLogin.login(('{selectall}{backspace}'),('{selectall}{backspace}'));
        cy.url().should('contains', '/login')
    });

    it('Login wiht valid credentials', () => {
        header.loginBtn.click();
        cy.url().should('contains', '/login');

        authLogin.login(validEmail, validPassword);
        cy.wait(10000);
        cy.url().should('not.contains', "/login")
    });

    it('Logout', () => {
        header.logoutBtn.click();
    })
});
