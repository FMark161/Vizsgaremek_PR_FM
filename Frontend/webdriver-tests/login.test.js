const { Builder, By, until } = require('selenium-webdriver');
const edge = require('selenium-webdriver/edge');

(async function testLogin() {
  // Edge WebDriver beállítása
  const options = new edge.Options();
  options.addArguments('--remote-allow-origins=*');
  options.addArguments('--start-maximized');
  // Headless mód (opcionális, ha nem akarod látni a böngészőt)
  // options.addArguments('--headless');

  let driver = await new Builder()
    .forBrowser('MicrosoftEdge')
    .setEdgeOptions(options)
    .build();

  try {
    console.log('1. Bejelentkezési oldal megnyitása...');
    await driver.get('http://localhost:5173/login');

    // Várjuk, hogy az oldal betöltődjön
    await driver.wait(until.elementLocated(By.css('.auth-form')), 5000);

    // Felhasználónév és jelszó megadása (a React eseményeket is triggereljük)
    const usernameInput = await driver.findElement(By.name('fnev'));
    await usernameInput.clear();
    await usernameInput.sendKeys('info');

    const passwordInput = await driver.findElement(By.name('jelszo'));
    await passwordInput.clear();
    await passwordInput.sendKeys('123456');

    // Bejelentkezés gomb
    const loginButton = await driver.findElement(By.css('.auth-submit-btn'));
    await loginButton.click();

    // Várjuk a sikeres bejelentkezést (a felhasználónév megjelenését)
    await driver.wait(until.elementLocated(By.css('.user-name')), 10000);

    // Ellenőrizzük a felhasználónevet
    const userName = await driver.findElement(By.css('.user-name'));
    const userNameText = await userName.getText();
    console.log(`Bejelentkezve: ${userNameText}`);

    if (userNameText === 'info') {
      console.log('✅ Bejelentkezési teszt sikeres!');
    } else {
      console.error('❌ Bejelentkezési teszt sikertelen: a felhasználónév nem megfelelő.');
    }

  } catch (error) {
    console.error('❌ Hiba történt:', error);
  } finally {
    await driver.quit();
  }
})();