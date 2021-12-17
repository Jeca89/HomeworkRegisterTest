/// <reference types ="cypress" />

import { authLogin} from '../page_object/authLogin';
import { header} from '../page_object/header';
import { createGall} from '../page_object/createGall';
const faker = require("faker");

describe('POM Create Gallery', () => {

    let validEmail = 'jeca_ceca89@hotmail.com';
    let validPassword = 'brankopetra1518';

    let userData = {
        randomTitle: faker.name.title(),
        randomDescription: faker.datatype.string(),
        randomImg: faker.image.imageUrl()
    };

    before('visit app', () => {
        cy.visit('/');
        cy.url().should('contains', 'gallery-app')
    });

    before('Login wiht valid credentials', () => {
        header.loginBtn.click();
        cy.url().should('contains', '/login');

        authLogin.login(validEmail, validPassword);
        cy.wait(10000);
        cy.url().should('not.contains', "/login")
    });

    it('Create gallery', () => {
        header.createBtn.click();
        cy.url().should('contains', '/create');

        createGall.create(userData.randomTitle, userData.randomDescription, userData.randomImg);
        cy.wait(1000);
        cy.url().should('not.contains', '/create')
    })
});