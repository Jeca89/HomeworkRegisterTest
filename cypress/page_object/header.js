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

    get createBtn() {
        return cy.get("a[href='/create']")
    }
}

export const header = new Header();
