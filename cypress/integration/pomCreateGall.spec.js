/// <reference types ="cypress" />

import { authLogin} from '../page_object/authLogin';
import { header} from '../page_object/header';
import { createGall} from '../page_object/createGalleryPage';

import {validationMessages} from '../fixtures/validationMessages.json';

const faker = require("faker");

describe('POM Create Gallery', () => {

    let validEmail = 'jeca_ceca89@hotmail.com';
    let validPassword = 'brankopetra1518';

    let userData = {
        randomTitle: faker.name.title(),
        shortTitle: faker.datatype.string(1),
        longTitle: faker.lorem.words(80),
        randomDescription: faker.datatype.string(),
        randomLongDescription: faker.lorem.words(1000),
        randomImg: faker.image.imageUrl + '.jpg',
        randomImg1: `${faker.image.url}.jpg`,
        randomImg2: faker.image.imageUrl(200, 200, '.jpg', true)
    };

    before('visit app and login', () => {
        cy.visit('/');
        cy.url().should('contains', 'gallery-app');
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible');

        cy.contains('Please login');
        cy.url().should('contains', '/login');

        authLogin.login(validEmail, validPassword);
        cy.wait(10000);
        cy.url().should('not.contains', "/login")
        header.logoutBtn.should('exist');
    });

    it('Create gallery with title field empty', () => {
        header.createBtn.click();
        cy.url().should('contains', '/create');

        createGall.create(('{selectall}{backspace}'), userData.randomDescription, userData.randomImg);

        createGall.titleInput.should('contain', '');
        cy.wait(1000);
        cy.url().should('contains', '/create')
    });

    it('Create gallery title field less than 2 chars', () => {
        header.createBtn.click();
        cy.url().should('contains', '/create');

        createGall.create(userData.shortTitle, userData.randomDescription, userData.randomImg2);
        createGall.errorMsgCreate.should('be.visible');
        createGall.errorMsgCreate.should('have.text', validationMessages.shortTitle);
        createGall.errorMsgCreate.should('have.css', 'background-color', 'rgb(248, 215, 218)');

        cy.wait(10000);
        cy.url().should('contains', '/create')
    });

    it('Create gallery title field more than 255 chars', () => {
        header.createBtn.click();
        cy.url().should('contains', '/create');

        createGall.create(userData.longTitle, userData.randomDescription, userData.randomImg2);

        createGall.errorMsgCreate.should('be.visible');
        createGall.errorMsgCreate.should('have.text', validationMessages.longTitle);
        createGall.errorMsgCreate.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        cy.wait(1000);
        cy.url().should('contains', '/create')
    });

    it('Create gallery with description field empty', () => {
        header.createBtn.click();
        cy.url().should('contains', '/create');

        createGall.create(userData.randomTitle, ('{selectall}{backspace}'), userData.randomImg2);
        cy.wait(1000);
        cy.url().should('not.contains', '/create')
    });

    it('Create gallery with description field more than 1000 chars', () => {
        header.createBtn.click();
        cy.url().should('contains', '/create');

        createGall.create(userData.randomTitle, userData.randomLongDescription, userData.randomImg2);

        createGall.errorMsgCreate.should('be.visible');
        createGall.errorMsgCreate.should('have.text', validationMessages.longDescription);
        createGall.errorMsgCreate.should('have.css', 'background-color', 'rgb(248, 215, 218)');
        cy.wait(1000);
        cy.url().should('contains', '/create')
    });

    it.only('Create gallery with img field empty', () => {
        header.createBtn.click();
        cy.url().should('contains', '/create');

        createGall.create(userData.randomTitle, userData.randomDescription, ('{selectall}{backspace}'));
        createGall.imagesInput.should('contain', '');
        cy.wait(1000);
        cy.url().should('contains', '/create')
    });

    it('Create gallery', () => {
        header.createBtn.click();
        cy.url().should('contains', '/create');

        createGall.create(userData.randomTitle, userData.randomDescription, userData.randomImg);
        cy.wait(10000);
        cy.url().should('not.contains', '/create')
    });
});
