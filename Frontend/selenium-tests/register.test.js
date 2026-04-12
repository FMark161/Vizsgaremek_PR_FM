const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Regisztráció tesztek', () => {
  let driver;

  beforeAll(async () => {
    const options = new edge.Options();
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--start-maximized');
    driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
  }, 30000);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('Regisztrációs oldal betöltődik', async () => {
    await driver.get('http://localhost:5173/register');
    const form = await driver.findElement(By.css('.auth-form'));
    expect(form).toBeDefined();
  }, 10000);

  test('Sikeres regisztráció új felhasználóval', async () => {
    const unique = Date.now();
    const username = `teszt${unique}`;
    const email = `teszt${unique}@example.com`;
    const password = '123456';

    await driver.get('http://localhost:5173/register');
    
    await driver.findElement(By.css('input[name="fnev"]')).sendKeys(username);
    await driver.findElement(By.css('input[name="email"]')).sendKeys(email);
    await driver.findElement(By.css('input[name="jelszo"]')).sendKeys(password);
    await driver.findElement(By.css('input[name="confirmPassword"]')).sendKeys(password);
    await driver.findElement(By.css('input[name="acceptTerms"]')).click();
    
    await driver.findElement(By.css('.auth-submit-btn')).click();
    
    // Sikeres regisztráció után a főoldalra kell irányítani
    await driver.wait(until.urlIs('http://localhost:5173/'), 5000);
    expect(await driver.getCurrentUrl()).toBe('http://localhost:5173/');
    
    // Ellenőrizzük, hogy be van jelentkezve (megjelenik a felhasználónév)
    const userNameElem = await driver.wait(until.elementLocated(By.css('.user-name')), 5000);
    expect(await userNameElem.getText()).toBe(username);
  }, 15000);
});