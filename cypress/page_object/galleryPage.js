class GalleryPage {
    get galleryCard() {
        return cy.get('.cell');
    }

    get loadMoreBtn() {
        return cy.get('button').contains('Load more');
    }

    get galleryHeading(index) {
        return this.galleryCard.eq(index).find('h2');
    }

    get galleryAuthor(index) {
        return this.galleryCard.eq(index).find('p')
    }
}

export const galleryPage = new GalleryPage();

