const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Bejelentkezés tesztek', () => {
  let driver;

  beforeAll(async () => {
    const options = new edge.Options();
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--start-maximized');
    driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(options)
      .build();
  }, 30000);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('Sikeres bejelentkezés admin felhasználóval', async () => {
    await driver.get('http://localhost:5173/login');

    // A React input mezők értékadása: a sendKeys triggereli az onChange eseményt
    const username = await driver.findElement(By.name('fnev'));
    await username.clear();
    await username.sendKeys('info');

    const password = await driver.findElement(By.name('jelszo'));
    await password.clear();
    await password.sendKeys('123456');

    const submitBtn = await driver.findElement(By.css('.auth-submit-btn'));
    await submitBtn.click();

    // Várjuk, hogy a felhasználónév megjelenjen (sikeres bejelentkezés)
    await driver.wait(until.elementLocated(By.css('.user-name')), 10000);
    const userNameElem = await driver.findElement(By.css('.user-name'));
    expect(await userNameElem.getText()).toBe('info');
  }, 20000);

  test('Hibás bejelentkezés esetén hibaüzenet', async () => {
    await driver.get('http://localhost:5173/login');
    await driver.findElement(By.name('fnev')).sendKeys('rossz');
    await driver.findElement(By.name('jelszo')).sendKeys('rossz');
    await driver.findElement(By.css('.auth-submit-btn')).click();

    const errorMsg = await driver.wait(until.elementLocated(By.css('.auth-server-error')), 5000);
    expect(await errorMsg.isDisplayed()).toBe(true);
  }, 15000);
});