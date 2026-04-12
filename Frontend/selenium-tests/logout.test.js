const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Kijelentkezés funkció tesztelése', () => {
  let driver;

  beforeAll(async () => {
    const options = new edge.Options();
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--start-maximized');
    driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(options)
      .build();

    // Bejelentkezés admin felhasználóval
    await driver.get('http://localhost:5173/login');
    await driver.findElement(By.name('fnev')).sendKeys('info');
    await driver.findElement(By.name('jelszo')).sendKeys('123456');
    await driver.findElement(By.css('.auth-submit-btn')).click();
    await driver.wait(until.elementLocated(By.css('.user-name')), 5000);
  }, 30000);

  afterAll(async () => {
    if (driver) await driver.quit();
  });

  test('Sikeres kijelentkezés után a felhasználó a főoldalra kerül, és a bejelentkezési gomb megjelenik', async () => {
    // Biztosítjuk, hogy a főoldalon vagyunk (a bejelentkezés után oda irányít)
    await driver.get('http://localhost:5173/');

    // Kijelentkezés gomb megkeresése és kattintás
    const logoutBtn = await driver.findElement(By.css('.logout-btn'));
    await logoutBtn.click();

    // Várjuk, hogy a felhasználónév eltűnjön (a DOM-ból)
    await driver.wait(async () => {
      const userNames = await driver.findElements(By.css('.user-name'));
      return userNames.length === 0;
    }, 5000);

    // Ellenőrizzük, hogy a bejelentkezési gomb megjelent
    const loginBtn = await driver.findElement(By.linkText('Bejelentkezés'));
    expect(await loginBtn.isDisplayed()).toBe(true);

    // Ellenőrizzük, hogy a regisztrációs gomb is megjelent
    const registerBtn = await driver.findElement(By.linkText('Regisztráció'));
    expect(await registerBtn.isDisplayed()).toBe(true);

    // Ellenőrizzük, hogy a főoldalon vagyunk (az URL a gyökér)
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/');
  }, 15000);
});