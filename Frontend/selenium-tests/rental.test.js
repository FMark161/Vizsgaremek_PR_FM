const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Kölcsönzés oldal (bejelentkezés után)', () => {
  let driver;

  beforeAll(async () => {
    const options = new edge.Options();
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--start-maximized');
    driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(options)
      .build();

    // Bejelentkezés admin felhasználóval (biztos, hogy létezik)
    await driver.get('http://localhost:5173/login');
    await driver.findElement(By.name('fnev')).sendKeys('info');
    await driver.findElement(By.name('jelszo')).sendKeys('123456');
    await driver.findElement(By.css('.auth-submit-btn')).click();
    await driver.wait(until.elementLocated(By.css('.user-name')), 5000);
  }, 30000);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('A kölcsönzés oldal elérhető bejelentkezés után', async () => {
    await driver.get('http://localhost:5173/rental');
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('/rental');
  }, 15000);

  test('Megjelennek a hangszerkártyák', async () => {
    await driver.get('http://localhost:5173/rental');
    await driver.wait(until.elementLocated(By.css('.instrument-card')), 10000);
    const cards = await driver.findElements(By.css('.instrument-card'));
    expect(cards.length).toBeGreaterThan(0);
  }, 15000);

  test('Az első hangszer "Kölcsönzés" gombjára kattintva megjelenik az űrlap', async () => {
    await driver.get('http://localhost:5173/rental');
    const firstRentBtn = await driver.wait(until.elementLocated(By.css('.instrument-card:first-child .btn-rent')), 10000);
    await firstRentBtn.click();
    const rentalForm = await driver.wait(until.elementLocated(By.css('.rental-form')), 5000);
    expect(await rentalForm.isDisplayed()).toBe(true);
  }, 20000);
});