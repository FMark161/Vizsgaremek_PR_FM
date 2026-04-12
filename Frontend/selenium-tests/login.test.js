const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Harmónia Zeneiskola - Bejelentkezés tesztek', () => {
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
    if (driver) {
      await driver.quit();
    }
  });

  test('Bejelentkezés oldal betöltődik', async () => {
    await driver.get('http://localhost:5173/login');
    const loginForm = await driver.findElement(By.css('.auth-form'));
    expect(loginForm).toBeDefined();
  }, 10000);

  test('Sikeres bejelentkezés admin felhasználóval', async () => {
    await driver.get('http://localhost:5173/login');
    
    // Kitöltjük a mezőket
    const usernameInput = await driver.findElement(By.css('input[name="fnev"]'));
    await usernameInput.clear();
    await usernameInput.sendKeys('info');
    
    const passwordInput = await driver.findElement(By.css('input[name="jelszo"]'));
    await passwordInput.clear();
    await passwordInput.sendKeys('123456');
    
    // Kattintás a bejelentkezés gombra
    const loginBtn = await driver.findElement(By.css('.auth-submit-btn'));
    await loginBtn.click();
    
    // Várjuk, hogy megjelenjen a felhasználónév a menüben (ami bejelentkezést jelzi)
    try {
      await driver.wait(until.elementLocated(By.css('.user-name')), 5000);
      const userName = await driver.findElement(By.css('.user-name'));
      const userNameText = await userName.getText();
      expect(userNameText).toBe('info');
    } catch (error) {
      // Ha nem sikerül, ellenőrizzük, hogy van-e hibaüzenet
      const errorMsg = await driver.findElements(By.css('.auth-server-error'));
      if (errorMsg.length > 0) {
        const errorText = await errorMsg[0].getText();
        console.log('Hibaüzenet:', errorText);
      }
      throw error;
    }
    
    // Ellenőrizzük az URL-t is (opcionális)
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/');
  }, 15000);
});