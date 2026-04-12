const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Admin felület tesztek', () => {
    let driver;

    beforeAll(async () => {
        const options = new edge.Options();
        options.addArguments('--remote-allow-origins=*');
        options.addArguments('--start-maximized');
        driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();

        // Bejelentkezés adminnal
        await driver.get('http://localhost:5173/login');
        await driver.findElement(By.css('input[name="fnev"]')).sendKeys('info');
        await driver.findElement(By.css('input[name="jelszo"]')).sendKeys('123456');
        await driver.findElement(By.css('.auth-submit-btn')).click();
        await driver.wait(until.elementLocated(By.css('.user-name')), 5000);
        await driver.wait(until.urlIs('http://localhost:5173/'), 5000);
    }, 30000);

    afterAll(async () => {
        if (driver) await driver.quit();
    });

    test('Admin oldal elérhető', async () => {
        await driver.get('http://localhost:5173/admin');
        await driver.wait(until.elementLocated(By.css('.admin-table-container')), 10000);
        const adminTitle = await driver.findElement(By.css('.admin-hero h1'));
        expect(await adminTitle.getText()).toBe('Admin felület');
    }, 15000);

    test('Események tábla megjelenik', async () => {
        await driver.get('http://localhost:5173/admin');
        await driver.wait(until.elementLocated(By.css('.admin-table-container')), 10000);
        const table = await driver.findElement(By.css('.admin-data-table'));
        expect(await table.isDisplayed()).toBe(true);
    }, 15000);

    test('Új esemény hozzáadása', async () => {
        await driver.get('http://localhost:5173/admin');
        await driver.wait(until.elementLocated(By.css('.admin-tabs')), 10000);

        // Válasszuk ki az első tabot (Események)
        const tabs = await driver.findElements(By.css('.admin-tab'));
        expect(tabs.length).toBeGreaterThan(0);
        await tabs[0].click();
        await driver.sleep(500);

        // Kattints a "Új hozzáadása" gombra
        const addBtn = await driver.findElement(By.css('.admin-add-btn'));
        await addBtn.click();

        // Várjuk meg a modált
        const modal = await driver.wait(until.elementLocated(By.css('.admin-modal-overlay')), 5000);

        // Segédfüggvény input mező kitöltéséhez (clear + sendKeys)
        const fillInput = async (selector, value) => {
            const element = await driver.findElement(selector);
            await element.clear();
            await element.sendKeys(value);
        };

        // Cím
        await fillInput(By.css('input[name="cim"]'), 'Selenium teszt esemény');

        // Dátum – a mező típusa "date", ezért a formátum YYYY-MM-DD
        const dateInput = await driver.findElement(By.css('input[name="datum"]'));
        await driver.executeScript("arguments[0].value = '2025-12-31'", dateInput);
        // Triggereljük az eseményt, hogy a React érzékelje a változást
        await driver.executeScript("arguments[0].dispatchEvent(new Event('input', { bubbles: true }))", dateInput);

        // Időpont
        await fillInput(By.css('input[name="idopont"]'), '18:00');

        // Helyszín
        await fillInput(By.css('input[name="helyszin"]'), 'Teszt helyszín');

        // Mentés gomb
        await driver.findElement(By.css('.admin-save-btn')).click();

        // Kezeljük az esetleges alert-et (ha a backend hibát dob)
        try {
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            console.log('Alert szövege:', alertText);
            await alert.accept();
            // Ha alert van, akkor a teszt hibás – dobjuk a hibát
            throw new Error(`Backend hiba: ${alertText}`);
        } catch (err) {
            if (err.name !== 'NoSuchAlertError') throw err;
        }

        // Várjuk, hogy a modal eltűnjön
        await driver.wait(until.stalenessOf(modal), 5000);

        // Ellenőrizzük, hogy az új esemény megjelent a táblázatban
        const newEvent = await driver.findElement(By.xpath("//td[contains(text(),'Selenium teszt esemény')]"));
        expect(await newEvent.isDisplayed()).toBe(true);
    }, 20000);
});