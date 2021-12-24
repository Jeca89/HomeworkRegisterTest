class GalleryPage {
    get galleryCard() {
        return cy.get('.cell');
    }

    get loadMoreBtn() {
        return cy.get('button').contains('Load more');
    }

    getGalleryHeading(index) {
        return this.galleryCard.eq(index).find('h2');
    }

    getGalleryAuthor(index) {
        return this.galleryCard.eq(index).find('p')
    }
}

export const galleryPage = new GalleryPage();

