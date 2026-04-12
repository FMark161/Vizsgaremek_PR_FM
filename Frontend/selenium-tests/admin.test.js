const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Admin felület tesztek', () => {
  let driver;

  beforeAll(async () => {
    const options = new edge.Options();
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--start-maximized');
    driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(options)
      .build();

    // Bejelentkezés admin felhasználóval
    await driver.get('http://localhost:5173/login');
    await driver.findElement(By.name('fnev')).sendKeys('info');
    await driver.findElement(By.name('jelszo')).sendKeys('123456');
    await driver.findElement(By.css('.auth-submit-btn')).click();
    await driver.wait(until.elementLocated(By.css('.user-name')), 5000);
  }, 30000);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('Az admin oldal elérhető', async () => {
    await driver.get('http://localhost:5173/admin');
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('/admin');
  }, 15000);

  test('Az összes tab betölti a megfelelő táblát', async () => {
    await driver.get('http://localhost:5173/admin');
    // Várjuk, hogy a tabok megjelenjenek
    const tabs = await driver.wait(until.elementsLocated(By.css('.admin-tab')), 10000);
    expect(tabs.length).toBeGreaterThan(0);

    for (let i = 0; i < tabs.length; i++) {
      // Újra lekérjük a tabokat minden iterációban, hogy elkerüljük a "stale element" hibát
      const currentTabs = await driver.findElements(By.css('.admin-tab'));
      const tab = currentTabs[i];
      const tabText = await tab.getText();
      console.log(`Kattintás a(z) "${tabText}" tabra`);

      await tab.click();
      // Várunk egy kicsit a tartalom betöltésére
      await driver.sleep(1000);

      // Ellenőrizzük, hogy a tab tartalma (táblázat) megjelent-e
      const table = await driver.findElement(By.css('.admin-table-container'));
      expect(await table.isDisplayed()).toBe(true);
    }
  }, 60000); // megnövelt időtúllépés, mert több tab van
});