import { Locator, Page, expect } from "@playwright/test";
import { HomePage } from "./HomePage";
import { verify } from "crypto";

export class SkillsPage {

    readonly page: Page;
    readonly homePage: HomePage;
    readonly skillsSection: Locator;
    readonly skillsHeader: Locator;
    readonly skillSetList: Locator;
    readonly skillsDiv: Locator;
    constructor(page: Page, homePage: HomePage){
        this.page = page;
        this.homePage = homePage;
        this.skillsSection = page.locator('section#skills');
        this.skillsHeader = page.locator(".skills-title");
        this.skillSetList = page.locator("span.skill-name");
        this.skillsDiv = page.locator(".skill");
    }
    async navigateAndVerifySkillsSection(){
        await this.homePage.navigateToHomePage();
        await this.skillsSection.scrollIntoViewIfNeeded();
        await this.skillsSection.waitFor({state: 'visible', timeout: 5000});
    }

    async verifySkillsHeader(){
        const headerText = await this.skillsHeader.innerText();
        expect(headerText.trim()).toBe("Skill Set");
    }

    async verifySkillSetListToBe12(){
        const skillSetNames = await this.skillSetList.allInnerTexts();
        expect(skillSetNames.length).toBe(12);
    }

    async verifyStarsCountInSkills(){
        await this.verifySkillsStars("Java", 4);
        console.log("Verified Java stars");
        await this.verifySkillsStars("Selenium", 5);
        console.log("Verified Selenium stars");
        await this.verifySkillsStars("TestNG", 4);
        console.log("Verified TestNG stars");
        await this.verifySkillsStars("Jenkins", 3);
        console.log("Verified Jenkins stars");
        await this.verifySkillsStars("Cucumber", 4);
        console.log("Verified Cucumber stars");
        await this.verifySkillsStars("Docker", 3);
        console.log("Verified Docker stars");
        await this.verifySkillsStars("Azure", 3);
        await this.verifySkillsStars("Python", 4);
        await this.verifySkillsStars("Playwright", 4);
    }

    async verifySkillsStars(skillName: string, expectedStars: number){
        const stars = await this.getStarsInSkill(skillName);
        expect(stars).toBe(expectedStars);
    }

    async getStarsInSkill(skillName: string){
        await this.skillsDiv.locator('//span[text()="'+skillName+'"]/..').first().waitFor({state: 'visible', timeout: 5000});
        const skillDiv = this.skillsDiv.locator('//span[text()="'+skillName+'"]/..').first();
        await skillDiv.locator('//i[contains(@class, "bx bxs-star filled")]').first().waitFor({state: 'visible', timeout: 5000});
        const stars = await skillDiv.locator('//i[contains(@class, "bxs-star filled")]').count();
        return stars;
    }

}   