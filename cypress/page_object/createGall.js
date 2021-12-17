class CreateGall {
    get titleInput() {
        return cy.get("#title");
    }

    get descriptionInput() {
        return cy.get("#description");
    }

    get imagesInput() {
        return cy.get("input[type='url']");
    }

    get addImgBtn() {
        return cy.get("button[type='button']").eq(0);
    }

    get submitCreateBtn() {
        return cy.get(".btn").eq(0);
    }

    get cancelSubBtn() {
        return cy.get(".btn").eq(1);
    }

    create(title, description, img) {
    this.titleInput.clear().type(title);
    this.descriptionInput.clear().type(description);
    this.imagesInput.clear().type(img)
    this.addImgBtn.click();
    this.addImgBtn.click();
    this.submitCreateBtn.click();
    }
}

export const createGall = new CreateGall();