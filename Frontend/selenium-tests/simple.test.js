const { Builder, By } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

describe('Egyszerű kapcsolat teszt', () => {
  let driver;

  beforeAll(async () => {
    const options = new edge.Options();
    options.addArguments('--remote-allow-origins=*');
    options.addArguments('--start-maximized');
    
    driver = await new Builder()
      .forBrowser('MicrosoftEdge')
      .setEdgeOptions(options)
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