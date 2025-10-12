import {test} from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { ProjectsPage } from '../src/pages/ProjectsPage';


test.describe('Projects Page Tests', () => {
    let homePage: HomePage;
    let projectsPage: ProjectsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.navigateToHomePage();
        projectsPage= new ProjectsPage(page, homePage);
    });

    test('@smoke Verify Projects Section is Visible', async () => {
        await projectsPage.VerifyProjectsSection();
    });

    test('@smoke Verify Projects Header', async () => {
        await projectsPage.verifyProjectsHeader();
    });

    test('@smoke Verify Project Descriptions', async () => {
        await projectsPage.verifyProjectDescription();
    });

    test('@smoke Verify Project Tech Stack', async () => {
        await projectsPage.verifyProjectTechStack();
    });
});