# Vizsgatervezet – Zeneiskolai Webalkalmazás

## Tartalomjegyzék

- [Projekt célja](#vizsgatervezet--zeneiskolai-webalkalmazás)
- [Feladat megosztás](#feladat-megosztás)
- [1. Telepítés](#1-telepítés)
- [2. Regisztráció és bejelentkezés](#2-regisztráció-és-bejelentkezés)
- [3. Diáknyilvántartó rendszer](#3-diáknyilvántartó-rendszer)
- [4. Órák nyilvántartása](#4-órák-nyilvántartása)
- [5. Hangszer kölcsönzés](#5-hangszer-kölcsönzés)
- [6. Eseménykezelés](#6-eseménykezelés)
- [7. Kapcsolat és információk](#7-kapcsolat-és-információk)
- [8. Felhasználói felület és dizájn](#8-felhasználói-felület-és-dizájn)
- [9. Tesztelés](#9-tesztelés)
- [10. Technológiák](#10-technológiák)
- [11. Összegzés](#11-összegzés)

---

## Projekt célja

A projekt célja egy modern, felhasználóbarát zeneiskolai webalkalmazás létrehozása, amely támogatja az intézmény mindennapi működését digitális környezetben. A rendszer lehetőséget biztosít arra, hogy a diákok, tanárok és adminisztrátorok egy közös felületen keresztül kezeljék az adatokat és nyomon kövessék az oktatáshoz kapcsolódó folyamatokat.

A webalkalmazás nem online vásárlási felületként működik, hanem egy átlátható nyilvántartó és információs rendszerként, amely megkönnyíti az adminisztrációt és a kommunikációt.

---

## Feladat megosztás

A projekt megvalósítása során a csapattagok a feladatokat egymás között felosztva dolgoztak, ugyanakkor több kulcsfontosságú döntés közösen született.

A közös megbeszélések során együtt határoztuk meg a projekt alapvető irányait, beleértve a megjelenést (színvilág, design), az elrendezést, valamint a felhasználói élmény szempontjait. Ezeket az ötleteket közösen alakítottuk ki, figyelembe véve minden csapattag javaslatait.

Az egyéni feladatok az alábbiak szerint alakultak:

**Farkas Márk:**

Frontend: Kezdőlap, Jelentkezés, Hangszerek, Bejelentkező oldal, Regisztráló oldal, Adatvédelmi nyilatkozat, Kölcsönzési feltételek

Paraoánu Richárd Tamás:

Frontend: Események, Kapcsolat, Óráim, Admin oldal

A munkafolyamat során rendszeresen egyeztettünk, segítettük egymást a felmerülő problémák megoldásában, így a projekt minden eleme közös együttműködés eredményeként valósult meg.
---

## 1. Telepítés

A projekt futtatásához szükséges a Node.js környezet és egy működő MySQL adatbázis.

Első lépésként a projektet klónozni kell:  
git clone <https://github.com/FMark161/Vizsgaremek_PR_FM>

Ezután külön kell telepíteni a backend és a frontend függőségeit.

Backend telepítése:  
cd backend  
npm install  

Frontend telepítése:  
cd frontend  
npm install  

A megfelelő működéshez szükséges egy `.env` fájl beállítása a backend mappában, amely tartalmazza az adatbázis kapcsolat adatait.

Az alkalmazás indítása:  
npm run start  

Az alkalmazás leállítása:  
npm run stop  

Sikeres indítás után a frontend böngészőből érhető el, és kapcsolódik a backend API-hoz.

---

## 2. Regisztráció és bejelentkezés

A webalkalmazás funkcióinak teljes körű használatához a felhasználóknak regisztrálniuk kell, majd be kell jelentkezniük a rendszerbe.

Nem bejelentkezett állapotban a felhasználók csak a nyilvános oldalakat érhetik el, például az információs és eseményeket bemutató felületeket. Az olyan funkciók, mint az órák megtekintése, a hangszerkölcsönzés vagy az adminisztrációs felület, kizárólag bejelentkezés után válnak elérhetővé.

Sikeres bejelentkezést követően a rendszer a felhasználó jogosultsági szintje alapján biztosít hozzáférést a különböző funkciókhoz:
- a diákok saját adataikat és óráikat láthatják,
- a tanárok az általuk tartott órákat kezelhetik,
- az adminisztrátorok teljes hozzáféréssel rendelkeznek a rendszer minden funkciójához.

A regisztráció során a felhasználók megadják alapadataikat, például felhasználónevüket, email címüket és jelszavukat.

A jelszavak biztonságosan, titkosítva kerülnek tárolásra, a bejelentkezés pedig token alapú hitelesítéssel történik, amely biztosítja a felhasználói munkamenetek védelmét.

---

## 3. Diáknyilvántartó rendszer

A webalkalmazás egyik központi eleme a diákok adatainak kezelése. Minden diáknak saját profilja van, amelyben a személyes adatok és elérhetőségek kerülnek tárolásra.

Bejelentkezést követően a diákok a saját felületükön elsősorban az „Óráim” menüpontot érik el, ahol áttekinthetik a közelgő és korábbi óráikat. Itt megjelenik az órák időpontja, a tanár neve, valamint az adott foglalkozáshoz tartozó egyéb információk.

A rendszer biztosítja, hogy bizonyos funkciók – például a hangszerkölcsönzés – kizárólag bejelentkezett felhasználók számára legyenek elérhetők.

A diákoknak saját adataik módosítására nincs lehetőségük. A személyes adatok (például email cím vagy jelszó) kezelését kizárólag az adminisztrátor végezheti.

A rendszer célja, hogy a diákok számára egy átlátható, könnyen használható felületet biztosítson, ahol minden, számukra releváns információ egy helyen elérhető.

---

## 4. Órák nyilvántartása

A webalkalmazásban az órák nem vásárolhatók meg, és kurzusválasztás sem történik online. Ezeket az iskola személyesen kezeli.

A rendszer ebben a modulban nyilvántartási szerepet tölt be. Az órák adatai – például időpont, tanár, hangszer és téma – rögzítésre kerülnek, és bejelentkezés után elérhetők.

A diákok a saját óráikat látják, a tanárok pedig az általuk tartott órákat. Az adminisztrátorok minden adatot kezelni tudnak. Ez segíti az oktatás átlátható megszervezését.

---

## 5. Hangszer kölcsönzés

A rendszerben hangszereket vásárolni nem lehet, kizárólag kölcsönözni vagy bérelni.

A hangszerek adatbázisban kerülnek tárolásra, kategóriák szerint rendszerezve. Minden hangszerhez tartozik leírás, állapot és elérhetőségi információ.

A kölcsönzés meghatározott időszakra történik, és a rendszer nyilvántartja annak kezdetét és végét.

A rendszer biztosítja, hogy egy hangszer egyszerre csak egy felhasználónál lehessen.

---

## 6. Eseménykezelés

A zeneiskola eseményei – például koncertek, bemutatók vagy táborok – külön felületen jelennek meg.

Az eseményekhez tartozó adatok közé tartozik a dátum, időpont, helyszín és leírás. A felhasználók böngészhetik ezeket, és részletes információkat is megtekinthetnek.

A modul célja, hogy mindenki naprakész információt kapjon az aktuális programokról.

---

## 7. Kapcsolat és információk

A kapcsolat modul lehetőséget biztosít arra, hogy a felhasználók üzenetet küldjenek az iskolának. Az űrlapon megadott adatok eltárolásra kerülnek, így később visszakereshetők.

Az oldalon megtalálhatók az iskola elérhetőségei, valamint egy térképes nézet is segíti a tájékozódást.

---

## 8. Felhasználói felület és dizájn

A webalkalmazás megjelenése modern és letisztult. A felület reszponzív, így különböző eszközökön is jól használható.

A frontend komponens alapú felépítésű, ahol az egyes oldalak külön modulokban találhatók. A navigáció egyszerű és átlátható, a funkciók logikusan elkülönülnek.

A dizájn célja egy modern, de nem túlzsúfolt felület kialakítása volt.

---

## 9. Tesztelés

A rendszer fejlesztése során többféle tesztelési módszert alkalmaztunk a megbízható működés biztosítása érdekében.

A backend oldalon a controllerek és modulok működését automatizált tesztekkel ellenőriztük, amelyeket Jest tesztkörnyezetben valósítottunk meg. Ezek a tesztek biztosítják, hogy az egyes üzleti logikák és funkciók megfelelően működjenek. A tesztelés során törekedtünk a minél magasabb kódlefedettség elérésére, így a rendszer kritikus részei tesztekkel lefedésre kerültek.

Az API végpontok tesztelése Swagger segítségével történt, amely lehetőséget biztosított az összes backend route ellenőrzésére és kipróbálására.

A frontend működését Selenium alapú tesztekkel vizsgáltuk, amelyek valós felhasználói interakciókat szimulálnak a böngészőben. Ezáltal ellenőrizhetővé vált a felhasználói felület helyes működése és a rendszer különböző részeinek együttműködése.

A tesztelés során kiemelt figyelmet fordítottunk az adatok validálására, valamint a hibakezelési mechanizmusok megfelelő működésére.

---

## 10. Technológiák

A projekt fejlesztése során modern webes technológiákat alkalmaztunk.

A backend Node.js környezetben készült, Express keretrendszer használatával. Az adatkezelést relációs adatbázis (MySQL) biztosítja.

A frontend React alapokra épül, komponens alapú felépítéssel. A kliensoldali navigáció React Router segítségével valósul meg.

A kommunikáció a frontend és a backend között REST API-n keresztül történik, JSON formátumban.

A fejlesztés és tesztelés során további eszközök is használatra kerültek, például Swagger az API dokumentálására és tesztelésére, valamint automatizált tesztelési megoldások.

---

## 11. Összegzés

A projekt eredményeként egy komplex webalkalmazás készült el, amely hatékonyan támogatja egy zeneiskola működését.  
A rendszer átlátható módon kezeli a felhasználókat, az órákat, a hangszereket és az eseményeket, miközben megkönnyíti az adminisztrációt és az információáramlást.  
A fejlesztés során egy stabil, jól strukturált és később bővíthető megoldást sikerült létrehozni.
