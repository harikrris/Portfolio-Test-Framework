// src/pages/ExperiencePage.ts
import { Page, Locator, expect } from '@playwright/test';
import { HomePage } from './HomePage';

export class ExperiencePage {
  readonly page: Page;
  readonly homePage: HomePage;
  
  // Locators
  readonly experienceSection: Locator;
  readonly sectionHeading: Locator;
  readonly experienceGrid: Locator;
  readonly experienceItems: Locator;
  readonly roleTitles: Locator;
  readonly durations: Locator;
  readonly taglines: Locator;
  readonly responsibilityLists: Locator;
  readonly experienceNavLink: Locator;

  constructor(page: Page, homePage: HomePage) {
    this.page = page;
    this.homePage = homePage;

    // Initialize all locators
    this.experienceSection = page.locator('section#experience');
    this.sectionHeading = page.locator('section#experience h2.experience-title');
    this.experienceGrid = page.locator('section#experience .experience-grid');
    this.experienceItems = page.locator('section#experience .experience-item');
    this.roleTitles = page.locator('section#experience .exp-role');
    this.durations = page.locator('section#experience .exp-duration');
    this.taglines = page.locator('section#experience .exp-tagline');
    this.responsibilityLists = page.locator('section#experience .exp-details');
    this.experienceNavLink = page.locator("//nav[@class='navbar']/a[text()='Experience']");
  }

  // Navigation methods
  async navigateToExperienceSection(): Promise<void> {
    await this.experienceNavLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToHomeAndNavigateToExperience(): Promise<void> {
    await this.homePage.navigateToHomePage();
    await this.navigateToExperienceSection();
  }

  // Getter methods
  getExperienceItem(index: number): Locator {
    return this.page.locator(`section#experience .experience-item:nth-child(${index + 1})`);
  }

  getResponsibilitiesForRole(roleText: string): Locator {
    return this.page.locator(`section#experience .experience-item:has-text("${roleText}") .exp-details`);
  }

  // Verification methods (only those used in tests)
  async verifyExperienceSectionIsVisible(): Promise<void> {
    await expect(this.experienceSection).toBeVisible();
    await expect(this.experienceGrid).toBeVisible();
  }

  async verifySectionHeading(): Promise<void> {
    await expect(this.sectionHeading).toBeVisible();
    await expect(this.sectionHeading).toHaveText('Experience');
  }

  async verifyExperienceItemsCount(): Promise<void> {
    const itemsCount = await this.experienceItems.count();
    expect(itemsCount).toBe(2);
  }

  async verifyLeadSDETRoleIsPresent(): Promise<void> {
    await expect(this.roleTitles.first()).toBeVisible();
    await expect(this.roleTitles.first()).toContainText('Lead SDET Automation Test Engineer – TCS');
  }

  async verifySDETRoleIsPresent(): Promise<void> {
    await expect(this.roleTitles.nth(1)).toBeVisible();
    await expect(this.roleTitles.nth(1)).toContainText('SDET Automation Test Engineer – TCS');
  }

  async verifyCompanyNameInRoles(): Promise<void> {
    const roleTitles = await this.roleTitles.allTextContents();
    expect(roleTitles[0]).toContain('TCS');
    expect(roleTitles[1]).toContain('TCS');
  }

  async verifyDurationsArePresent(): Promise<void> {
    const durationTexts = await this.durations.allTextContents();
    expect(durationTexts).toContain('2024 – Present');
    expect(durationTexts).toContain('2023 – 2024');
  }

  async verifyTaglinesArePresent(): Promise<void> {
    const taglineTexts = await this.taglines.allTextContents();
    expect(taglineTexts).toContain('The Modernizer');
    expect(taglineTexts).toContain('The Framework Builder');
  }

  async verifyLeadSDETResponsibilities(): Promise<void> {
    const responsibilities = await this.getResponsibilitiesForRole('Lead SDET').textContent();
    expect(responsibilities).toContain('Architected Selenium + TestNG framework with Maven & CI/CD');
    expect(responsibilities).toContain('Migrated to Playwright for faster, stable tests');
    expect(responsibilities).toContain('Dockerized execution for parallel cross-browser runs');
    expect(responsibilities).toContain('Mentored juniors, uplifting the entire QA practice');
  }

  async verifySDETResponsibilities(): Promise<void> {
    const responsibilities = await this.getResponsibilitiesForRole('SDET Automation Test Engineer').nth(1).textContent();
    expect(responsibilities).toContain('Automated 200+ regression cases with Selenium + TestNG');
    expect(responsibilities).toContain('Cut manual effort by 30%');
    expect(responsibilities).toContain('Improved coverage & collaboration with developers');
  }

  async verifyAllResponsibilitiesArePresent(): Promise<void> {
    const allResponsibilities = await this.responsibilityLists.allTextContents();
    const combinedText = allResponsibilities.join(' ');
    
    expect(combinedText).toContain('Selenium');
    expect(combinedText).toContain('TestNG');
    expect(combinedText).toContain('Playwright');
    expect(combinedText).toContain('Docker');
    expect(combinedText).toContain('Maven');
    expect(combinedText).toContain('CI/CD');
    expect(combinedText).toContain('200+ regression cases');
    expect(combinedText).toContain('30%');
  }

  async verifyExperienceSectionStructure(): Promise<void> {
    for (let i = 0; i < 2; i++) {
      const item = this.getExperienceItem(i);
      await expect(item.locator('.exp-header')).toBeVisible();
      await expect(item.locator('.exp-role')).toBeVisible();
      await expect(item.locator('.exp-duration')).toBeVisible();
      await expect(item.locator('.exp-tagline')).toBeVisible();
      await expect(item.locator('.exp-details')).toBeVisible();
    }
  }

  // Comprehensive verification (used in main test)
  async verifyCompleteExperienceSection(): Promise<void> {
    await this.verifyExperienceSectionIsVisible();
    await this.verifySectionHeading();
    await this.verifyExperienceItemsCount();
    await this.verifyLeadSDETRoleIsPresent();
    await this.verifySDETRoleIsPresent();
    await this.verifyDurationsArePresent();
    await this.verifyTaglinesArePresent();
    await this.verifyLeadSDETResponsibilities();
    await this.verifySDETResponsibilities();
    await this.verifyAllResponsibilitiesArePresent();
  }

  // Get specific responsibility text (used in tests)
  async getLeadSDETResponsibilities(): Promise<string[]> {
    return await this.getResponsibilitiesForRole('Lead SDET').locator('li').allTextContents();
  }

  async getSDETResponsibilities(): Promise<string[]> {
    return await this.getResponsibilitiesForRole('SDET Automation Test Engineer').locator('li').allTextContents();
  }
}