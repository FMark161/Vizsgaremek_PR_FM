const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Jelentkezési űrlap tesztek', () => {
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

  test('Sikeres jelentkezés beküldése', async () => {
    await driver.get('http://localhost:5173/application');

    // Görgetés az űrlaphoz (ha szükséges)
    const form = await driver.findElement(By.css('.application-form'));
    await driver.executeScript('arguments[0].scrollIntoView(true)', form);

    // Mezők kitöltése
    await driver.findElement(By.name('name')).sendKeys('Teszt Elek');
    await driver.findElement(By.name('email')).sendKeys('teszt@pelda.hu');
    await driver.findElement(By.name('phone')).sendKeys('06123456789');
    await driver.findElement(By.name('birthDate')).sendKeys('2000-01-01');

    // Hangszer kiválasztása (select)
    const instrumentSelect = await driver.findElement(By.name('instrument'));
    await instrumentSelect.click();
    await driver.findElement(By.css('option[value="guitar"]')).click();

    // Saját hangszer rádiógomb (Igen)
    await driver.findElement(By.css('input[value="yes"]')).click();

    // Szint rádiógomb (Kezdő)
    await driver.findElement(By.css('input[value="beginner"]')).click();

    // Üzenet mező
    await driver.findElement(By.name('message')).sendKeys('Ez egy teszt jelentkezés a Selenium WebDriver segítségével.');

    // Adatvédelmi checkbox
    await driver.findElement(By.name('acceptTerms')).click();

    // Küldés gomb
    await driver.findElement(By.css('.btn-submit')).click();

    // Sikeres üzenet megjelenésének ellenőrzése
    const successMsg = await driver.wait(until.elementLocated(By.css('.success-message')), 10000);
    expect(await successMsg.isDisplayed()).toBe(true);
  }, 20000);
});