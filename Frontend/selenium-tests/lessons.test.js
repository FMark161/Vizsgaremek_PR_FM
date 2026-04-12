const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Óráim oldal tesztek', () => {
  let driver;

  beforeAll(async () => {
    const options = new edge.Options();
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--start-maximized');
    driver = await new Builder().forBrowser('MicrosoftEdge').setEdgeOptions(options).build();
    // Bejelentkezés (pl. diák)
    await driver.get('http://localhost:5173/login');
    await driver.findElement(By.css('input[name="fnev"]')).sendKeys('kiss.peter');
    await driver.findElement(By.css('input[name="jelszo"]')).sendKeys('123456');
    await driver.findElement(By.css('.auth-submit-btn')).click();
    await driver.wait(until.urlIs('http://localhost:5173/'), 5000);
  }, 30000);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('Óráim oldal elérhető', async () => {
    await driver.get('http://localhost:5173/lessons');
    const heroTitle = await driver.findElement(By.css('.lessons-hero h1'));
    expect(await heroTitle.getText()).toBe('Óráim');
  }, 10000);

  test('Heti nézetben megjelennek az órák', async () => {
    await driver.get('http://localhost:5173/lessons');
    const weekView = await driver.findElement(By.css('.week-view'));
    expect(await weekView.isDisplayed()).toBe(true);
  }, 10000);
});