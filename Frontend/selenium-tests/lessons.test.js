const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Óráim oldal tesztek (bejelentkezés után)', () => {
    let driver;

    beforeAll(async () => {
        const options = new edge.Options();
        options.addArguments('--remote-allow-origins=*');
        options.addArguments('--start-maximized');
        driver = await new Builder()
            .forBrowser('MicrosoftEdge')
            .setEdgeOptions(options)
            .build();

        await driver.get('http://localhost:5173/login');
        await driver.findElement(By.name('fnev')).sendKeys('kiss.peter');
        await driver.findElement(By.name('jelszo')).sendKeys('123456');
        await driver.findElement(By.css('.auth-submit-btn')).click();
        await driver.wait(until.elementLocated(By.css('.user-name')), 5000);
    }, 30000);

    afterAll(async () => {
        if (driver) await driver.quit();
    });

    test('Az Óráim oldal elérhető bejelentkezés után', async () => {
        await driver.get('http://localhost:5173/lessons');
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('/lessons');
    }, 15000);

    test('A heti nézet megjelenik', async () => {
        await driver.get('http://localhost:5173/lessons');
        await driver.wait(until.elementLocated(By.css('.lessons-hero')), 10000);

        let weekView = await driver.findElements(By.css('.week-view'));
        if (weekView.length === 0) {
            const weekBtn = await driver.findElement(By.xpath("//button[contains(text(),'Heti nézet')]"));
            await weekBtn.click();
            await driver.sleep(1000);
            weekView = await driver.findElements(By.css('.week-view'));
        }
        expect(weekView.length).toBeGreaterThan(0);
        expect(await weekView[0].isDisplayed()).toBe(true);
    }, 20000);

    test('Legalább egy nap oszlopban vannak órák', async () => {
        await driver.get('http://localhost:5173/lessons');
        const dayColumns = await driver.wait(until.elementsLocated(By.css('.day-column')), 10000);
        expect(dayColumns.length).toBeGreaterThan(0);

        const lessonCards = await driver.findElements(By.css('.lesson-card'));
        expect(lessonCards.length).toBeGreaterThan(0);
    }, 20000);
});