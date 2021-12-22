class AuthLogin {
    get emailInput() {
        return cy.get("#email");
    }

    get passwordInput() {
        return cy.get("#password");
    }

    get submitBtn() {
        return cy.get("button[type='submit']");
    }

    get logoutBtn() {
        return cy.get(".nav-link").eq(3);
    }

    get loginPageHeading() {
        return cy.get('.title-style');
    }

    get errorMsg() {
        return cy.get('.alert');
    }

    login(email, pass) {
        this.emailInput.clear().type(email);
        this.passwordInput.clear().type(pass);
        this.submitBtn.click();
    }
}

export const authLogin = new AuthLogin();
