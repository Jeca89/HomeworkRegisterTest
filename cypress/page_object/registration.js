class RegistrationGall {
    get firstName() {
        return cy.get("#first-name");
    }

    get lastName() {
        return cy.get("#last-name");
    }

    get registrationEmail() {
        return cy.get("#email");
    }

    get registrationPass() {
        return cy.get("#password");
    }

    get confirmPass() {
        return cy.get("#password-confirmation");
    }

    get termsBox() {
        return cy.get("input[class='form-check-input']")
    }

    get registrationBtn() {
        return cy.get("button[type='submit']");
    }

    registration(name, lastName, email, pass) {
    this.firstName.clear().type(name);
    this.lastName.clear().type(lastName);
    this.registrationEmail.clear().type(email)
    this.registrationPass.clear().type(pass);
    this.confirmPass.clear().type(pass);
    this.termsBox.check();
    this.registrationBtn.click();
    }
}

export const registrationGall = new RegistrationGall();