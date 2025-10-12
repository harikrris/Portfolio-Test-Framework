import {test} from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { ContactPage } from '../src/pages/ContactPage';

test.describe('Contact Page Tests', () => {
    let homePage: HomePage;
    let contactPage: ContactPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        contactPage = new ContactPage(page, homePage);
    });

    test('@smoke verify contact section is visible', async () => {
        await contactPage.verifyContactSection();
    });
});