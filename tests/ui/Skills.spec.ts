import {test} from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { SkillsPage } from '../src/pages/SkillsPage';

let homePage: HomePage;
let skillsPage: SkillsPage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    skillsPage = new SkillsPage(page, homePage);
  });
test.describe('Skills Page Tests', () => {
    test('@smoke verify skills section is visible', async()=>{
        await skillsPage.navigateAndVerifySkillsSection();
    });

    test('@smoke verify skills header text', async()=>{
        await skillsPage.navigateAndVerifySkillsSection();
        await skillsPage.verifySkillsHeader();
    });

    test('verify skill set list to be 12', async()=>{
        await skillsPage.navigateAndVerifySkillsSection();
        await skillsPage.verifySkillSetListToBe12();
    });

    test('verify stars count in skills', async()=>{
        await skillsPage.navigateAndVerifySkillsSection();
        await skillsPage.verifyStarsCountInSkills();
    });

});