const { Builder, By } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Egyszerű kapcsolat teszt', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--remote-allow-origins=*');
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('A frontend elérhető', async () => {
    await driver.get('http://localhost:5173');
    const title = await driver.getTitle();
    console.log('Oldal címe:', title);
    expect(title).toBe('Harmónia Zeneiskola');
  });
});