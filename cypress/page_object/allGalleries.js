class AllGalleries {

    get galleryCard() {
        return cy.get('.cell');
    }
    get inputSearch() {
        return cy.get("input[type='text']")
    }

    get filterBtn() {
        return cy.get("button[type='button']")
    }

    get loadBtn() {
        return cy.get('button').contains('Load more')
    }
}

export const allGalleries = new AllGalleries();
