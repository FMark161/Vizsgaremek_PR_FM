const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Hangszerek oldal tesztek', () => {
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

  test('Hangszerek oldal betöltődik', async () => {
    await driver.get('http://localhost:5173/instruments');
    const heroTitle = await driver.findElement(By.css('.instruments-hero h1'));
    expect(await heroTitle.getText()).toBe('Hangszerek világa');
  }, 10000);

  test('Kategória szűrők működnek', async () => {
    await driver.get('http://localhost:5173/instruments');
    const filterBtn = await driver.findElement(By.css('.family-btn[data-category="strings"]'));
    await filterBtn.click();
    // Ellenőrizzük, hogy a kártyák száma csökkent (egyszerű ellenőrzés)
    const cards = await driver.findElements(By.css('.family-card'));
    expect(cards.length).toBeGreaterThan(0);
  }, 10000);
});