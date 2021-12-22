/// <reference types ="cypress" />

import { authLogin} from '../page_object/authLogin';
import { header} from '../page_object/header';
import { allGalleries} from '../page_object/allGalleries';

const faker = require("faker");

describe('POM All galeries home page', () => {

    let validEmail = 'jeca_ceca89@hotmail.com';
    let validPassword = 'brankopetra1518';

    let userData = {
        randomName: faker.name.findName(),
        randomEmail: faker.internet.email(),
        randomPassword: faker.datatype.number()
    };

    it('All galeries page - pagination', () => {
        cy.visit('/');
        cy.url().should('contains', 'gallery-app');

        header.allGalleries.eq(1).click();

        allGalleries.galleryCard.should('have.length', 10);
    })
});
