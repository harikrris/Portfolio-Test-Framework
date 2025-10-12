// tests/experience.spec.ts
import { test, expect } from '@playwright/test';
import { ExperiencePage } from '../src/pages/ExperiencePage';
import { HomePage } from '../src/pages/HomePage';

test.describe('Experience Page Tests', () => {
  let experiencePage: ExperiencePage;
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    experiencePage = new ExperiencePage(page, homePage);
  });

  test('@smoke should display complete experience section with all content', async () => {
    await experiencePage.navigateToExperienceSection();
    await experiencePage.verifyCompleteExperienceSection();
  });

  test('@regression should verify Lead SDET role with all responsibilities', async () => {
    await experiencePage.navigateToExperienceSection();
    
    await experiencePage.verifyLeadSDETRoleIsPresent();
    await experiencePage.verifyLeadSDETResponsibilities();
    
    const responsibilities = await experiencePage.getLeadSDETResponsibilities();
    expect(responsibilities).toContain('Architected Selenium + TestNG framework with Maven & CI/CD');
    expect(responsibilities).toContain('Migrated to Playwright for faster, stable tests');
    expect(responsibilities).toContain('Dockerized execution for parallel cross-browser runs');
    expect(responsibilities).toContain('Mentored juniors, uplifting the entire QA practice');
  });

  test('@regression should verify SDET role with all responsibilities', async () => {
    await experiencePage.navigateToExperienceSection();
    
    await experiencePage.verifySDETRoleIsPresent();
    await experiencePage.verifySDETResponsibilities();
    
    const responsibilities = await experiencePage.getSDETResponsibilities();
    expect(responsibilities).toContain('Automated 200+ regression cases with Selenium + TestNG');
    expect(responsibilities).toContain('Cut manual effort by 30%');
    expect(responsibilities).toContain('Improved coverage & collaboration with developers');
  });

  test('@regression should verify experience section structure and layout', async () => {
    await experiencePage.navigateToExperienceSection();
    
    await experiencePage.verifyExperienceSectionIsVisible();
    await experiencePage.verifySectionHeading();
    await experiencePage.verifyExperienceItemsCount();
    await experiencePage.verifyExperienceSectionStructure();
  });

  test('@regression should verify company name in both roles', async () => {
    await experiencePage.navigateToExperienceSection();
    await experiencePage.verifyCompanyNameInRoles();
  });

  test('@regression should navigate to experience section from homepage', async ({ page }) => {
    await experiencePage.goToHomeAndNavigateToExperience();
    
    await experiencePage.verifyExperienceSectionIsVisible();
    await experiencePage.verifySectionHeading();
    
    expect(page.url()).toContain('#experience');
  });

  test('@regression should verify all key technologies are mentioned', async () => {
    await experiencePage.navigateToExperienceSection();
    await experiencePage.verifyAllResponsibilitiesArePresent();
  });
});