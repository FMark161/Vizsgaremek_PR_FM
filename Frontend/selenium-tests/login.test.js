const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Harmónia Zeneiskola - Bejelentkezés tesztek', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--start-maximized');
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('Bejelentkezés oldal betöltődik', async () => {
    await driver.get('http://localhost:5173/login');
    
    const loginForm = await driver.findElement(By.css('.auth-form'));
    expect(loginForm).toBeDefined();
  });

  test('Sikeres bejelentkezés admin felhasználóval', async () => {
    await driver.get('http://localhost:5173/login');
    
    const usernameInput = await driver.findElement(By.css('input[name="fnev"]'));
    await usernameInput.sendKeys('info');
    
    const passwordInput = await driver.findElement(By.css('input[name="jelszo"]'));
    await passwordInput.sendKeys('Premo900');
    
    const loginBtn = await driver.findElement(By.css('.auth-submit-btn'));
    await loginBtn.click();
    
    await driver.wait(until.urlContains('http://localhost:5173/'), 5000);
    
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toBe('http://localhost:5173/');
  });
});