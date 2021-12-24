/// <reference types ="cypress" />

import { authLogin} from '../page_object/authLogin';
import { header} from '../page_object/header';
import { createGall} from '../page_object/createGalleryPage';

import {validationMessages} from '../fixtures/validationMessages.json';

const faker = require("faker");

describe('POM Create Gallery', () => {

    let galleryId = '';
    let galleryComment = 'jako lepa galerija';
    let authToken = window.localStorage.getItem('token');

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

    beforeEach('visit app and login', () => {
        cy.visit('/');
        cy.url().should('contains', 'gallery-app');
        header.loginBtn.click();
        authLogin.loginPageHeading.should('be.visible');

        cy.contains('Please login');
        cy.url().should('contains', '/login');

        authLogin.login(validEmail, validPassword);
        cy.wait(5000);
        cy.url().should('not.contains', "/login")
        header.logoutBtn.should('exist');
    });

    it('Create gallery with title field empty', () => {
        header.createBtn.click();
        cy.url().should('contains', '/create');

        createGall.create(('{selectall}{backspace}'), userData.randomDescription, userData.randomImg);

        createGall.titleInput.should(have.value, '');
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

    it('Create gallery with img field empty', () => {
        header.createBtn.click();
        cy.url().should('contains', '/create');

        createGall.create(userData.randomTitle, userData.randomDescription, ('{selectall}{backspace}'));
        createGall.imagesInput.should(have.value, '');
        cy.wait(1000);
        cy.url().should('contains', '/create')
    });

    it.only('Create gallery', () => {
        header.createBtn.click();
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery');

        createGall.create(userData.randomTitle, userData.randomDescription, userData.randomImg2);

        cy.wait('@createGallery').then((interception) => {
            console.log(interception.response);
            expect(interception.response.statusCode).eq(201);
            galleryId = interception.response.body.id;
        })
        cy.url().should('not.include', '/create')
    });
    it('visit specific gallery and delete it', () => {
        //cy.visit(`/galleries/${galleryId}`);
        //cy.url(`/galleries/${galleryId}`);

        cy.visit(`/galleries/` + galleryId);
        cy.get('button').contains('Delete').click();
    });

    it('visit specific gallery and comment it', () => {
        cy.intercept({
            method: "POST",
            url: "https://gallery-api.vivifyideas.com/api/comments"
        }).as('commentGallery');
        //cy.visit(`/galleries/${galleryId}`);
        //cy.url(`/galleries/${galleryId}`);

        cy.visit(`/galleries/` + galleryId);
        cy.get('textarea').type('jako lepa galerija');
        cy.get('button').contains('Submit').click();

        cy.wait("@commentGallery").then((interception) => {
            console.log(interception.response);
            expect(interception.response.statusCode).eq(200);
            expect(interception.response.body[0].body).to.have.string(galleryComment);
        });

    });
    it.only('create gallery from backend', () => {
        cy.request({
            method: "POST",
            url: "https://gallery-api.vivifyideas.com/api/galleries",
            headers: {
                authorization: `Bearer ${authToken}`,
            },
            body: {
                title: "Moja galerija",
                description: "moja lepa galerija",
                images: [
                    "https://upload.wikimedia.org/wikipedia/commons/b/b5/IMG-20190601-WA0004.jpg"
                ]
            }
        }).its('body').then((response) => {
            console.log(response)
        })
        cy.visit('/')
    })
});

