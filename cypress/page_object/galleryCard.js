class SpecificGallery {
    get deleteBtn() {
        return cy.get(".btn-custom").eq(0);
    }
    get editBtn() {
        return cy.get(".btn-custom").eq(1);
    }
    get submitComment() {
        return cy.get(".btn-custom").eq(2);
    }
    get deleteComment() {
        return cy.get(".fas");
    }
};

export const specificGallery = new SpecificGallery();
