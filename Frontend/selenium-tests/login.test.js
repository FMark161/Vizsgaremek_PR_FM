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
    await driver.findElement(By.name('fnev')).sendKeys('info');
    await driver.findElement(By.name('jelszo')).sendKeys('123456');
    await driver.findElement(By.css('.auth-submit-btn')).click();
    await driver.wait(until.elementLocated(By.css('.user-name')), 10000);
    const userName = await driver.findElement(By.css('.user-name'));
    expect(await userName.getText()).toBe('info');
  }, 20000);

  test('Hibás bejelentkezés esetén a felhasználó a login oldalon marad', async () => {
    await driver.get('http://localhost:5173/login');
    await driver.findElement(By.name('fnev')).sendKeys('rossz');
    await driver.findElement(By.name('jelszo')).sendKeys('rossz');
    await driver.findElement(By.css('.auth-submit-btn')).click();
    await driver.sleep(2000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('/login');
  }, 15000);
});