# Vizsgatervezet – Zeneiskolai Webalkalmazás

## Tartalomjegyzék

- [Projekt célja](#vizsgatervezet--zeneiskolai-webalkalmazás)
- [Feladat megosztás](#feladat-megosztás)
- [1. Telepítés](#1-telepítés)
- [2. Docusaurus](#2-docusaurus)
- [3. Regisztráció és bejelentkezés](#3-regisztráció-és-bejelentkezés)
- [4. Diáknyilvántartó rendszer](#4-diáknyilvántartó-rendszer)
- [5. Órák nyilvántartása](#5-órák-nyilvántartása)
- [6. Hangszer kölcsönzés](#6-hangszer-kölcsönzés)
- [7. Eseménykezelés](#7-eseménykezelés)
- [8. Kapcsolat és információk](#8-kapcsolat-és-információk)
- [9. Felhasználói felület és dizájn](#9-felhasználói-felület-és-dizájn)
- [10. Tesztelés](#10-tesztelés)
- [11. Technológiák](#11-technológiák)
- [12. Összegzés](#12-összegzés)

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

Frontend:  
Kezdőlap, Jelentkezés, Hangszerek, Bejelentkező oldal, Regisztráló oldal, Adatvédelmi nyilatkozat, Kölcsönzési feltételek  

Backend:  
Bejelentkezés, Órák, Események, Jelentkezés, Kapcsolat  

Tesztek:  
- Swagger: 7 teszt  
- Selenium: Admin, Contact, Homepage, Lessons, Logout, Rental  
- Jest: ApplicationController, ApplicationModel, EventController, EventModel, IntrumentController, InstrumentModel, RentalController, StockController, StudentController  

**Paraoánu Richárd Tamás:**

Frontend:  
Események, Kapcsolat, Óráim, Admin oldal  

Backend:  
Regisztráció, Admin oldal, Kölcsönzés, Hangszerek, Közelgő események (kezdőlapon)  

Tesztek:  
- Swagger: 6 teszt  
- Selenium: Application, Events, Instruments, Login, Register  
- Jest: AuthController, AuthModel, CategoryController, LessonController, MessageController, TeacherController, TeacherModel, UserController, TeacherSkillController  

A munkafolyamat során rendszeresen egyeztettünk, segítettük egymást a felmerülő problémák megoldásában, így a projekt minden eleme közös együttműködés eredményeként valósult meg.

---

## 1. Telepítés

A projekt futtatásához szükséges a Node.js környezet és egy működő MySQL adatbázis.

```bash
git clone https://github.com/FMark161/Vizsgaremek_PR_FM
cd backend
npm install
cd ../frontend
npm install
```

A megfelelő működéshez szükséges egy `.env` fájl beállítása a backend mappában.

Az alkalmazás indítása:

```bash
npm run start
```

---

## 2. Docusaurus

A Docusaurus egy modern, statikus weboldal-generátor, amelyet dokumentációk készítésére fejlesztettek ki.

Lehetővé teszi, hogy a projekthez tartozó dokumentáció külön, jól strukturált és könnyen navigálható felületen jelenjen meg. Markdown alapú, így egyszerűen szerkeszthető és bővíthető.

Előnyei:
- Markdown alapú dokumentáció  
- Gyors statikus oldal generálás  
- Verziókezelés támogatása  
- Beépített kereső  
- Könnyű testreszabhatóság  

Különösen hasznos nagyobb projektek esetén, ahol fontos a jól strukturált fejlesztői dokumentáció.

---

## 3. Regisztráció és bejelentkezés

A webalkalmazás használatához a felhasználóknak regisztrálniuk kell.

Jogosultságok:
- Diák: saját adatok és órák megtekintése  
- Tanár: saját órák kezelése  
- Admin: teljes rendszerhozzáférés  

A jelszavak titkosítva kerülnek tárolásra, a bejelentkezés token alapú hitelesítéssel történik.

---

## 4. Diáknyilvántartó rendszer

A diákok saját profillal rendelkeznek, ahol adataik és óráik jelennek meg.

Az „Óráim” menüpont tartalmazza:
- közelgő órák  
- korábbi órák  
- tanár adatai  

Az adatok módosítása kizárólag adminisztrátor által lehetséges.

---

## 5. Órák nyilvántartása

Az órák nem vásárolhatók meg online, a rendszer nyilvántartási célt szolgál.

Tárolt adatok:
- időpont  
- tanár  
- hangszer  
- téma  

---

## 6. Hangszer kölcsönzés

A rendszerben hangszerek kölcsönözhetők.

Jellemzők:
- kategorizált hangszerek  
- állapot és elérhetőség  
- időszakos kölcsönzés  

Egy hangszer egyszerre csak egy felhasználónál lehet.

---

## 7. Eseménykezelés

A rendszer kezeli az eseményeket:
- koncertek  
- bemutatók  
- táborok  

Megjelenített adatok:
- dátum  
- helyszín  
- leírás  

---

## 8. Kapcsolat és információk

Kapcsolati űrlap segítségével a felhasználók üzenetet küldhetnek.

Az adatok mentésre kerülnek, és később visszakereshetők.

---

## 9. Felhasználói felület és dizájn

Modern, letisztult és reszponzív felület.

React alapú komponens struktúra biztosítja az átláthatóságot.

---

## 10. Tesztelés

A rendszer megbízhatóságát többféle teszt biztosítja:

- Jest – backend logika tesztelése  
- Swagger – API tesztelés  
- Selenium – frontend működés  

Cél a stabil működés és hibakezelés biztosítása.

---

## 11. Technológiák

- Backend: Node.js, Express  
- Frontend: React  
- Adatbázis: MySQL  
- API: REST  

---

## 12. Összegzés

A projekt eredményeként egy komplex zeneiskolai webalkalmazás készült el, amely támogatja az adminisztrációt, az oktatásszervezést és az információkezelést.

A rendszer átlátható, jól strukturált és később továbbfejleszthető.
