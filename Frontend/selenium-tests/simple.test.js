const { Builder } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Egyszerű kapcsolat teszt', () => {
  let driver;

  beforeAll(async () => {
    const options = new edge.Options();
    options.addArguments('--remote-allow-origins=*');
    
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

  test('A frontend elérhető', async () => {
    await driver.get('http://localhost:5173');
    const title = await driver.getTitle();
    expect(title).toBe('Harmónia Zeneiskola');
  }, 10000);
});