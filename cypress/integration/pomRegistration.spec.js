
import { header} from '../page_object/header';
import { registrationGall } from '../page_object/registration';
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

    it("Register with random credentials", () => {

        header.registerBtn.click();
        registrationGall.registration(userData.randomName, userData.randomLastName, userData.randomEmail, userData.randomPassword)
    });

});