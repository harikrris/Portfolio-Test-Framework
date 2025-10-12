import {expect, Locator, Page} from '@playwright/test';
import { HomePage } from './HomePage';

export class ProjectsPage {
    readonly page: Page;
    readonly projectsSection: Locator;

    constructor(page: Page, homepage: HomePage) {
        this.page = page;
        this.projectsSection = page.locator('section#projects');
    }

    async VerifyProjectsSection() {
        await this.projectsSection.scrollIntoViewIfNeeded();
        await this.projectsSection.waitFor({state: 'visible', timeout: 5000});
    }

    async verifyProjectsHeader(){
        const headerText = await this.projectsSection.locator(".project-title").allInnerTexts();
        expect(headerText).toHaveLength(2);
        expect(headerText[0].trim()).toBe("Agentic AI Test Automation");
        expect(headerText[1].trim()).toBe("Self-Healing Test Automation Framework");
    }
    

    async verifyProjectDescription(){
        const descriptions = await this.projectsSection.locator(".project-desc").allInnerTexts();
        expect(descriptions).toHaveLength(2);
        expect(descriptions[0].trim().startsWith("Designed an Agentic AI-based solution")).toBeTruthy();
        expect(descriptions[1].trim().startsWith("Led the migration to a Healium self-healing automation framework")).toBeTruthy();
    }

    async verifyProjectTechStack(){
        const techStacks = await this.projectsSection.locator(".project-tech").allInnerTexts();
        expect(techStacks).toHaveLength(2);
        expect(techStacks[1].trim()).toContain("Java, Selenium, Healenium, TestNG, Cucumber.");
        expect(techStacks[0].trim()).toContain("Python, MCP, Autogen Framework, GPT-4.0 LLM.");
    }

}