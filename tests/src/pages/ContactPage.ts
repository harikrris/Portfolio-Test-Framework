import { Locator, Page } from "@playwright/test";
import { HomePage } from "./HomePage";

export class ContactPage {
    // Placeholder for ContactPage class
    readonly page: Page;
    readonly contactSection: Locator;
    readonly homepage : HomePage;
    readonly contactButton: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator
    
    constructor(page: Page, homePage: HomePage) {
        this.page = page;
        this.contactSection = page.locator('.contact-modal');
        this.homepage = homePage;
        this.contactButton = page.locator('.navbar a:has-text("Contact")');
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
    }

    async verifyContactSection() {
        await this.contactButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.contactSection.waitFor({state: 'visible', timeout: 5000});
        await this.contactSection.scrollIntoViewIfNeeded();
        await this.firstNameInput.waitFor({state: 'visible', timeout: 5000});
        await this.lastNameInput.waitFor({state: 'visible', timeout: 5000});
    }


}