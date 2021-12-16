class Header {
    get loginBtn() {
        return cy.get("a[href='/login']");
    }

    get registerBtn() {
        return cy.get("a[href='/register']");
    }

    get logoutBtn() {
        return cy.get(".nav-link").eq(3);
    }
}

export const header = new Header();