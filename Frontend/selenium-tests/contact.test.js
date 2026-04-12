const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Kapcsolat űrlap tesztek', () => {
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

  test('A kapcsolati oldal betöltődik', async () => {
    await driver.get('http://localhost:5173/contact');
    const heroTitle = await driver.findElement(By.css('.contact-hero h1'));
    expect(await heroTitle.getText()).toBe('Kapcsolat');
  }, 15000);

  test('Az űrlap sikeresen elküldhető', async () => {
    await driver.get('http://localhost:5173/contact');

    // Görgetés az űrlaphoz
    const form = await driver.findElement(By.css('.contact-form'));
    await driver.executeScript('arguments[0].scrollIntoView(true)', form);

    // Mezők kitöltése
    await driver.findElement(By.name('name')).sendKeys('Teszt Elek');
    await driver.findElement(By.name('email')).sendKeys('teszt@pelda.hu');
    await driver.findElement(By.name('phone')).sendKeys('06123456789');
    await driver.findElement(By.name('subject')).sendKeys('Teszt tárgy');
    await driver.findElement(By.name('message')).sendKeys('Ez egy teszt üzenet a Selenium WebDriver segítségével.');

    // Küldés gomb
    const submitBtn = await driver.findElement(By.css('.btn-submit'));
    await submitBtn.click();

    // Sikeres üzenet ellenőrzése
    const successMsg = await driver.wait(until.elementLocated(By.css('.success-message')), 10000);
    expect(await successMsg.isDisplayed()).toBe(true);
  }, 20000);
});