const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Jelentkezési űrlap tesztek', () => {
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

  test('Jelentkezési oldal betöltődik', async () => {
    await driver.get('http://localhost:5173/application');
    const heroTitle = await driver.findElement(By.css('.application-hero h1'));
    expect(await heroTitle.getText()).toContain('Jelentkezés');
  }, 10000);

  test('Űrlap kitöltése és elküldése (sikeres beküldés)', async () => {
    await driver.get('http://localhost:5173/application');
    
    // Görgetés az űrlaphoz
    const form = await driver.findElement(By.css('.application-form'));
    await driver.executeScript('arguments[0].scrollIntoView(true)', form);
    
    await driver.findElement(By.css('input[name="name"]')).sendKeys('Selenium Tester');
    await driver.findElement(By.css('input[name="email"]')).sendKeys('selenium@test.hu');
    await driver.findElement(By.css('input[name="phone"]')).sendKeys('06301234567');
    await driver.findElement(By.css('input[name="birthDate"]')).sendKeys('2000-01-01');
    
    // Hangszer kiválasztása
    const instrumentSelect = await driver.findElement(By.css('select[name="instrument"]'));
    await instrumentSelect.click();
    await driver.findElement(By.css('option[value="guitar"]')).click();
    
    // Saját hangszer rádiógomb
    await driver.findElement(By.css('input[value="yes"]')).click();
    
    // Szint választás
    await driver.findElement(By.css('input[value="beginner"]')).click();
    
    // Üzenet
    await driver.findElement(By.css('textarea[name="message"]')).sendKeys('Selenium teszt üzenet.');
    
    // Adatvédelmi checkbox
    await driver.findElement(By.css('input[name="acceptTerms"]')).click();
    
    // Küldés
    await driver.findElement(By.css('.btn-submit')).click();
    
    // Sikeres üzenet ellenőrzése
    const successMsg = await driver.wait(until.elementLocated(By.css('.success-message')), 5000);
    expect(await successMsg.isDisplayed()).toBe(true);
  }, 15000);
});