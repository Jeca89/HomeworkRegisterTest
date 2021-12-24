import {galleryPage} from '../page_object/galleryPage';
import { header } from '../page_object/header';

describe('all galleries page text', () => {
    before('login via backend', () => {
        cy.loginViaBackend()
    });

    it('lolgin with valid credentials',() => {
        cy.visit('/');
        cy.contains('All Galleries')
    });

    it('assert login', () => {
        header.loginBtn.should('not.exist')
    });

})
