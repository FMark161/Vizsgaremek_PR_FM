const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Kijelentkezés teszt', () => {
  let driver;

  beforeAll(async () => {
    const options = new edge.Options();
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--start-maximized');
    driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
    // Bejelentkezés
    await driver.get('http://localhost:5173/login');
    await driver.findElement(By.css('input[name="fnev"]')).sendKeys('info');
    await driver.findElement(By.css('input[name="jelszo"]')).sendKeys('123456');
    await driver.findElement(By.css('.auth-submit-btn')).click();
    await driver.wait(until.urlIs('http://localhost:5173/'), 5000);
  }, 30000);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('Kijelentkezés gomb működik', async () => {
    await driver.get('http://localhost:5173/');
    const logoutBtn = await driver.findElement(By.css('.logout-btn'));
    await logoutBtn.click();
    // Ellenőrizzük, hogy a bejelentkezés/regisztráció gombok megjelentek
    const loginBtn = await driver.wait(until.elementLocated(By.linkText('Bejelentkezés')), 5000);
    expect(await loginBtn.isDisplayed()).toBe(true);
    // Ellenőrizzük, hogy a felhasználónév eltűnt
    const userName = await driver.findElements(By.css('.user-name'));
    expect(userName.length).toBe(0);
  }, 10000);
});