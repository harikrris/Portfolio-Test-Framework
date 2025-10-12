import { Locator, Page } from "playwright";
import { expect } from "playwright/test";
import { HomePage } from "./HomePage";

export class AboutPage{
    readonly page: Page;
    readonly aboutSection : Locator;
    readonly aboutMeSubheading: Locator;
    readonly aboutmeContent : Locator;
    readonly aboutMeUL: Locator;
    readonly journeySection: Locator;
    readonly journeyHeader: Locator;
    readonly journeySubHeading: Locator;
    readonly journeyContent: Locator;

    constructor(page: Page, homePage: HomePage){
        this.page = page;
        this.aboutSection = page.locator('.about-me-title h3');
        this.aboutMeSubheading = page.locator('.about-me-content h3');
        this.aboutmeContent = page.locator('.about-me-content p');
        this.aboutMeUL = page.locator('.about-me-content ul');
        this.journeySection = page.locator('section.my-journey-section');
        this.journeyHeader = page.locator('.my-journey-content h3');
        this.journeySubHeading = page.locator('.my-journey-content h4');
        this.journeyContent = page.locator('.my-journey-content p');
    }

    async verifyAboutMeSection(){
        await this.aboutSection.waitFor({state: 'visible', timeout: 5000});
        await this.aboutSection.scrollIntoViewIfNeeded();
        await this.aboutMeSubheading.waitFor({state: 'visible', timeout: 5000});
        await this.aboutmeContent.waitFor({state: 'visible', timeout: 5000});
        await this.aboutMeUL.waitFor({state: 'visible', timeout: 5000});
    }

    async verifyJourneySection(){
        await this.journeySection.waitFor({state: 'visible', timeout: 5000});
        await this.journeyHeader.waitFor({state: 'visible', timeout: 5000});
        await this.journeySubHeading.first();
        expect(await this.journeySubHeading.count()).toBe(2);
        expect(await this.journeyContent.count()).toBe(2);
        await this.verifyJourneyContentText();
    }

    async verifyJourneyContentText(){
        const journeyTexts = await this.journeyContent.allInnerTexts();
        expect(journeyTexts[0].trim().startsWith("The team lived in the dark ages:")).toBeTruthy();
        expect(journeyTexts[1].trim().startsWith("Cue the music")).toBeTruthy();
    }


}