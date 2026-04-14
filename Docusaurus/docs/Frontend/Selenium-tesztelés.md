A Harmónia Zeneiskola alkalmazás minőségbiztosítását a selenium-tests mappában található, JavaScript alapú automatizált tesztekkel (End-to-End tesztekkel) végeztük. A szkripteket a selenium-webdriver könyvtárral készítettük, és egy automatizált Microsoft Edge böngészőn keresztül szimuláltuk a valós felhasználói interakciókat.

A teszteket logikailag külön fájlokba bontottuk a könnyebb karbantarthatóság érdekében. Összesen több különböző tesztesetet futtattunk a következő modulok szerint, például a homepage.test.js: A kezdőoldal betöltését és alapvető navigációs elemeit ellenőriztük, beleértve a "Jelentkezem" gomb megfelelő átirányítását a jelentkezés oldalára.

**Útmutató a futtatáshoz:**

**1.** Elsőkörben a webalkalmazásnak futnia kell. Ezt a start.bat file-al könnyen indítható, és az ott megtalálható linken keresztül hozzá is lehet férni a projekthez.

**2.** Nyiss egy új terminál ablakot: Miközben a Backend, a Frontend és a Docker fut, nyiss egy teljesen új PowerShell vagy Command Prompt ablakot a fejlesztői környezetedben.

**3.** Most be kell lépni a Frontend mappába, ezt sokkal egyszerűbb elérni a fejlesztői környezetben mivel ott csak egy utasítást kell beírni, ami a következő: cd Frontend. Ha egy teljesen más terminálban vagyunk akkor ugyan úgy a „cd” paranccsal kell navigálni a Frontend mappába.

**4.** Tesztek futtatása: A következő paranccsal lehet indítani a teszteket: npm run 
test:selenium.

**5.** A tesztelési folyamat: A parancs kiadása után megnyílik egy Microsoft Edge böngésző, és a rendszer automatikusan végigmegy a teszteken – látni fogod, ahogy görget, kattint, kitölt űrlapokat. A terminálban először sárgán a Runs-t fogja kiírni, és sikeres teszt után pedig a sikeres tesztelésnél a Pass-t fogja kiírni. Hiba esetén a terminálban kimutatja milyen hiba történt és pontosan mi volt a hiba. A végén egy összesítést ír ki hogy hány teszt lett sikeres valamint sikertelen.
