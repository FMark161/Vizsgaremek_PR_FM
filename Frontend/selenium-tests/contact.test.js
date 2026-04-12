const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Kapcsolat oldal tesztek', () => {
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

  test('Kapcsolat oldal betöltődik', async () => {
    await driver.get('http://localhost:5173/contact');
    const heroTitle = await driver.findElement(By.css('.contact-hero h1'));
    expect(await heroTitle.getText()).toBe('Kapcsolat');
  }, 10000);

  test('Üzenet küldése sikeres', async () => {
    await driver.get('http://localhost:5173/contact');
    const form = await driver.findElement(By.css('.contact-form'));
    await driver.executeScript('arguments[0].scrollIntoView(true)', form);
    
    await driver.findElement(By.css('input[name="name"]')).sendKeys('Teszt User');
    await driver.findElement(By.css('input[name="email"]')).sendKeys('teszt@user.hu');
    await driver.findElement(By.css('input[name="phone"]')).sendKeys('06301234567');
    await driver.findElement(By.css('input[name="subject"]')).sendKeys('Teszt tárgy');
    await driver.findElement(By.css('textarea[name="message"]')).sendKeys('Ez egy teszt üzenet.');
    
    await driver.findElement(By.css('.btn-submit')).click();
    
    const successMsg = await driver.wait(until.elementLocated(By.css('.success-message')), 5000);
    expect(await successMsg.isDisplayed()).toBe(true);
  }, 15000);
});