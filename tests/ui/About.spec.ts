import {test} from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { AboutPage } from '../src/pages/AboutPage';

test.describe('About Page Tests', () => {
    let homePage: HomePage;
    let aboutPage: AboutPage;
    
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        aboutPage = new AboutPage(page, homePage);
      });

    test('@smoke verify about section is visible', async()=>{
        await aboutPage.verifyAboutMeSection();
    });
    test('@smoke verify journey section', async()=>{
        await aboutPage.verifyJourneySection();
    });
});