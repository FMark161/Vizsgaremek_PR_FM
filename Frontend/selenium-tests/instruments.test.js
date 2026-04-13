const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Hangszerek oldal szűrőinek tesztelése', () => {
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

  test('Az oldal betöltődik és a szűrők megjelennek', async () => {
    await driver.get('http://localhost:5173/instruments');
    await driver.wait(until.elementLocated(By.css('.instruments-hero')), 10000);
    const filterButtons = await driver.findElements(By.css('.family-btn'));
    expect(filterButtons.length).toBeGreaterThan(0);
  }, 15000);

  test('A "Vonósok" szűrőre kattintva csak a vonós hangszerek jelennek meg', async () => {
    await driver.get('http://localhost:5173/instruments');
    const stringsFilter = await driver.findElement(By.xpath("//button[contains(text(),'Vonósok')]"));
    await stringsFilter.click();
    await driver.sleep(1000);
    const visibleCards = await driver.findElements(By.css('.family-card'));
    for (const card of visibleCards) {
      const title = await card.findElement(By.css('.family-header h2')).getText();
      expect(title).toBe('Vonós hangszerek');
    }
  }, 20000);
});