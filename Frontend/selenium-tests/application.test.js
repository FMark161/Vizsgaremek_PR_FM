const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Jelentkezési űrlap tesztek', () => {
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

  test('Sikeres jelentkezés beküldése', async () => {
    await driver.get('http://localhost:5173/application');

    const form = await driver.findElement(By.css('.application-form'));
    await driver.executeScript('arguments[0].scrollIntoView(true)', form);

    await driver.findElement(By.name('name')).sendKeys('Teszt Elek');
    await driver.findElement(By.name('email')).sendKeys('teszt@pelda.hu');
    await driver.findElement(By.name('phone')).sendKeys('06123456789');

    const dateInput = await driver.findElement(By.name('birthDate'));

    await driver.executeScript(`
    const input = arguments[0];

    const nativeSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    ).set;

    nativeSetter.call(input, '2000-01-01');

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    `, dateInput);

    const instrumentSelect = await driver.findElement(By.name('instrument'));
    await instrumentSelect.click();
    await driver.findElement(By.css('option[value="guitar"]')).click();

    await driver.findElement(By.css('input[value="yes"]')).click();
    await driver.findElement(By.css('input[value="beginner"]')).click();
    await driver.findElement(By.name('message')).sendKeys('Teszt üzenet.');
    await driver.findElement(By.name('acceptTerms')).click();

    const submitBtn = await driver.findElement(By.css('.btn-submit'));
    await submitBtn.click();

    await driver.wait(until.elementLocated(By.css('.success-message')), 10000);
    const successMsg = await driver.findElement(By.css('.success-message'));
    expect(await successMsg.isDisplayed()).toBe(true);
  }, 20000);
});