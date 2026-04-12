const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Regisztráció tesztek', () => {
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

  test('Sikeres regisztráció új felhasználóval', async () => {
    const unique = Date.now();
    const username = `teszt${unique}`;
    const email = `teszt${unique}@example.com`;

    await driver.get('http://localhost:5173/register');
    await driver.findElement(By.name('fnev')).sendKeys(username);
    await driver.findElement(By.name('email')).sendKeys(email);
    await driver.findElement(By.name('jelszo')).sendKeys('123456');
    await driver.findElement(By.name('confirmPassword')).sendKeys('123456');
    await driver.findElement(By.name('acceptTerms')).click();
    await driver.findElement(By.css('.auth-submit-btn')).click();

    // Sikeres regisztráció után a főoldalra irányít
    await driver.wait(until.urlIs('http://localhost:5173/'), 10000);
    expect(await driver.getCurrentUrl()).toBe('http://localhost:5173/');
    // Ellenőrizzük, hogy be van jelentkezve
    const userName = await driver.findElement(By.css('.user-name'));
    expect(await userName.getText()).toBe(username);
  }, 20000);
});