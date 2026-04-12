const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Események oldal tesztek', () => {
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

  test('Események oldal betöltődik', async () => {
    await driver.get('http://localhost:5173/events');
    const heroTitle = await driver.findElement(By.css('.events-hero h1'));
    expect(await heroTitle.getText()).toBe('Események');
  }, 10000);

  test('Részletek gomb modal-t nyit', async () => {
    await driver.get('http://localhost:5173/events');
    const detailsBtn = await driver.wait(until.elementLocated(By.css('.btn-details')), 5000);
    await detailsBtn.click();
    const modal = await driver.wait(until.elementLocated(By.css('.event-modal')), 5000);
    expect(await modal.isDisplayed()).toBe(true);
    // Bezárás
    await driver.findElement(By.css('.modal-close')).click();
    await driver.wait(until.elementIsNotVisible(modal), 5000);
  }, 10000);
});