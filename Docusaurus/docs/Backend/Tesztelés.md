A Backend üzleti logikájának megbízhatóságát a tests mappában elhelyezett Jest egységtesztek garantálják. A Jest egy Node.js környezetben standardnak számító JavaScript tesztkeretrendszer, amely lehetővé teszi az API végpontok, kontrollerek és biztonsági middleware-ek izolált vizsgálatát. A tesztelési folyamat során nemcsak a sikeres lefutást (happy path) ellenőrizzük, hanem azt is, hogy a rendszer hiányos vagy érvénytelen bemenet esetén a megfelelő HTTP státuszkódokkal és hibaüzenetekkel válaszol-e. Az egységtesztek jellegéból adódóan a valós adatbázis-kapcsolatot és a külső függőségeket a jest.mock() funkcióval helyettesítjük. Ez a megközelítés biztosítja a tesztek gyors futását, az éles adatok védelmét, valamint a környezettől független, stabil múködésellenőrzést

Jó példa a megvalósításra a lessonController.test.js , amely a teljes CRUD (létrehozás, olvasás, frissítés, törlés) ciklust lefedi. A tesztesetek validálják a különféle lekérdezéseket ( getAll, getByStudentld, getByTeacherld) előre definiált mock adatok segítségével, miközben az adatbázis-szintű hibák kezelését is vizsgálják. Új óra rögzítésekor ( create ) a teszt ellenőrzi a 201- es válaszkódot és az alapértelmezett mezők helyes beállítását. A módosítási ( update ) és törlési (delete ) műveletek során a rendszer ellenőrzi a sikeres végrehajtást, illetve a 404-es hibakódot is, amennyiben az adott erőforrás nem található, így biztosítva a végpontok teljes körú hibatúrését.

**Tesztelés menete lépésre bontva:**

**1.**	Megfelelő mappába kell lépni: Nyiss egy új terminált a kódszerkesztődben (pl. VS Code), és lépj be a megfelelő mappába: cd Backend

**2.**	Tesztek futtatása: A tesztek automatikus futtatásához a terminálba ezt a parancsot kell beírni: npx jest

**3.**	A folyamat és az eredmények: A parancs futtatása után a Jest automatikusan átvizsgálja a projektet, és megkeresi az összes „.test.js” kiterjesztésű tesztfájlt Ezeket a teszteket rövid időn belül lefuttatja, majd a terminálban egy jól áttekinthető összegzést jelenít meg. A sikeresen teljesített teszteket zöld színnel és PASS jelzéssel mutatja, míg a hibás eseteket piros kiemeléssel jelzi, így gyorsan átlátható, hogy minden funkció megfelelően működik-e.

**Jest Teszt**

![Jest teszt futtatási eredmények](/img/jest.png)

**API Végpont tesztek swaggerel**

A backend API teszteléséhez Swagger-t használtunk. A swagger-jsdoc és swagger-ui-express segítségével auto-generateált dokumentációt készítettünk az összes app/routes/*.js végpontról. A Swagger UI-n keresztül teszteltük az autentikációs, felhasználói, tanár-, óra-, esemény-, hangszer-, készlet-, kölcsönzés- és egyéb REST végpontokat.

![Get swagger teszt kérés](/img/eventGet.png)
![Get swagger teszt kérés eredméyne](/img/eventList.png)
A Swagger UI-ban a GET /events végpontot próbáltuk ki. Az Execute gombra kattintva a dokumentáció automatikusan lefuttatta a kérést, és a válaszként a szerver által visszaadott eseménylistát mutatta 200 OK státusszal. A képernyőn a generált curl parancs, a request URL és a szerver válasza volt látható, ami jól szemléltette a Swagger alapú endpoint tesztelés menetét.