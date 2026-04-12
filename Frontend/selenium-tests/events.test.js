const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Események oldal tesztek', () => {
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

  test('Az események oldal elérhető', async () => {
    await driver.get('http://localhost:5173/events');
    await driver.wait(until.elementLocated(By.css('body')), 5000);
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('/events');
  }, 15000);
});