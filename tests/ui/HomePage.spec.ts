import { test } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';

test.describe('Home Page Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
  });

  test('@smoke Verify Home Page Heading', async () => {
    await homePage.verifyHeroHeading();
  });

  test('@smoke Verify Subheading Text', async () => {
    await homePage.verifyLeadSDETInSubheading();
  });

  test('@smoke Verify Resume Download', async () => {
    await homePage.verifyResumeDownload();
  });
  test('@smoke Verify Summary text', async () => {
    await homePage.verifySummaryText();
  });
});