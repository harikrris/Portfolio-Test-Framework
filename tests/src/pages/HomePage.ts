// src/pages/HomePage.ts
import { Page, Locator, expect } from '@playwright/test';
import * as fs from 'fs';

export class HomePage {
  readonly page: Page;
  readonly config: any;
  
  readonly heroHeading: Locator;
  readonly subHeading: Locator;
  readonly resumeButton: Locator;
  readonly navigationLinks: Locator;
  readonly summaryText: Locator;
  readonly moreAboutMeButton: Locator;
  readonly aboutSection: Locator;

  constructor(page: Page) {
    this.page = page;
    
    const rawData = fs.readFileSync('config/ui_test_config.json', 'utf-8');
    this.config = JSON.parse(rawData);
    
    this.heroHeading = page.locator('h1');
    this.subHeading = page.locator('.typing-text');
    this.resumeButton = page.locator('a[href*="resume_final.pdf"]');
    this.navigationLinks = page.locator('.navbar a');
    this.summaryText = page.locator("//div[contains(@class, 'home')]/p");
    this.moreAboutMeButton = page.locator('//a[text()="More about me"]');
    this.aboutSection = page.locator('section#about');
  }

  async navigateToHomePage(): Promise<void> {
    await this.page.goto(this.config.baseUrl);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Main verification method for Lead SDET text
  async verifyLeadSDETInSubheading(): Promise<void> {
    const actualText = await this.subHeading.innerText();
    expect(actualText).toContain('Lead');
  }


  async verifyHeroHeading(): Promise<void> {
    const actualText = await this.heroHeading.innerText();
    expect(actualText.trim()).toBe(this.config.expectedHeadings.home);
  }

  async verifyResumeDownload(): Promise<void> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.resumeButton.click(),
    ]);
    
    const downloadPath = await download.path();
    expect(downloadPath).not.toBeNull();
  }

  async navigateToSection(sectionName: string): Promise<void> {
    const sectionLink = this.page.locator(`nav a[href="#${sectionName.toLowerCase()}"]`);
    await sectionLink.click();
  }

  async verifySummaryText() : Promise<void>{
    const summarySectionText = await this.summaryText.innerText();
    expect(summarySectionText).toContain(this.config.expectedSummaryText);
  }

  async verifyScrollToAboutSection(){
    await this.moreAboutMeButton.click();
    await this.page.waitForTimeout(1000);
    await expect(this.aboutSection).toBeInViewport();  
  }
}