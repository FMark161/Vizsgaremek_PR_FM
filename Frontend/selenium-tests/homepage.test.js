const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Harmónia Zeneiskola - Kezdőlap tesztek', () => {
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

  test('A kezdőlap betöltődik', async () => {
    await driver.get('http://localhost:5173');
    const title = await driver.getTitle();
    expect(title).toBe('Harmónia Zeneiskola');
  }, 15000);

  test('A "Jelentkezem" gomb a jelentkezés oldalra visz', async () => {
    await driver.get('http://localhost:5173');
    const btn = await driver.findElement(By.css('.btn-primary'));
    await btn.click();
    await driver.wait(until.urlContains('/application'), 5000);
    expect(await driver.getCurrentUrl()).toContain('/application');
  }, 15000);
});