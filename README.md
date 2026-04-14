# Vizsgatervezet – Zeneiskolai Webalkalmazás

## Tartalomjegyzék

- [Projekt célja](#vizsgatervezet--zeneiskolai-webalkalmazás)
- [1. Regisztráció és bejelentkezés](#1-regisztráció-és-bejelentkezés)
- [2. Diáknyilvántartó rendszer](#2-diáknyilvántartó-rendszer)
- [3. Órák nyilvántartása](#3-órák-nyilvántartása)
- [4. Hangszer kölcsönzés](#4-hangszer-kölcsönzés)
- [5. Eseménykezelés](#5-eseménykezelés)
- [6. Kapcsolat és információk](#6-kapcsolat-és-információk)
- [7. Felhasználói felület és dizájn](#7-felhasználói-felület-és-dizájn)
- [8. Tesztelési terv](#8-tesztelési-terv)
- [9. Technológiák](#9-technológiák)
- [10. Telepítés](#10-telepítés)
- [11. Összegzés](#11-összegzés)

---

## Projekt célja

A projekt célja egy modern, felhasználóbarát zeneiskolai webalkalmazás létrehozása, amely támogatja az intézmény mindennapi működését digitális környezetben. A rendszer lehetőséget biztosít arra, hogy a diákok, tanárok és adminisztrátorok egy közös felületen keresztül kezeljék az adatokat és nyomon kövessék az oktatáshoz kapcsolódó folyamatokat.

A webalkalmazás nem online vásárlási felületként működik, hanem egy átlátható nyilvántartó és információs rendszerként, amely megkönnyíti az adminisztrációt és a kommunikációt.

---

## 1. Regisztráció és bejelentkezés

A rendszer használatához a felhasználóknak regisztrálniuk kell, majd bejelentkezés után férhetnek hozzá saját felületükhöz. A regisztráció során alapadatokat adnak meg, mint például felhasználónév, email cím és jelszó.

A jelszavak biztonságosan, titkosítva kerülnek tárolásra, a bejelentkezés pedig token alapú hitelesítéssel történik. A rendszer különböző jogosultsági szinteket kezel, így a diákok, tanárok és adminisztrátorok eltérő funkciókat érhetnek el.

---

## 2. Diáknyilvántartó rendszer

A webalkalmazás egyik központi eleme a diákok adatainak kezelése. Minden diákhoz tartozik egy profil, amelyben a személyes adatok és elérhetőségek kerülnek tárolásra.

A diákok adatai összekapcsolódnak a felhasználói fiókokkal, így bejelentkezés után mindenki a saját adatait látja. Az adminisztrátorok és tanárok jogosultságuknak megfelelően módosíthatják ezeket az adatokat.

A rendszer célja, hogy átlátható módon kezelhető legyen a tanulókhoz kapcsolódó minden információ.

---

## 3. Órák nyilvántartása

A webalkalmazásban az órák nem vásárolhatók meg, és kurzusválasztás sem történik online. Ezeket az iskola személyesen kezeli.

A rendszer ebben a modulban nyilvántartási szerepet tölt be. Az órák adatai – például időpont, tanár, hangszer és téma – rögzítésre kerülnek, és bejelentkezés után elérhetők.

A diákok a saját óráikat látják, a tanárok pedig az általuk tartott órákat. Az adminisztrátorok minden adatot kezelni tudnak. Ez segíti az oktatás átlátható megszervezését.

---

## 4. Hangszer kölcsönzés

A rendszerben hangszereket vásárolni nem lehet, kizárólag kölcsönözni vagy bérelni.

A hangszerek adatbázisban kerülnek tárolásra, kategóriák szerint rendszerezve. Minden hangszerhez tartozik leírás, állapot és elérhetőségi információ.

A kölcsönzés meghatározott időszakra történik, és a rendszer nyilvántartja annak kezdetét és végét. A felhasználók a saját profiljukban követhetik a kölcsönzött hangszereiket.

A rendszer biztosítja, hogy egy hangszer egyszerre csak egy felhasználónál lehessen.

---

## 5. Eseménykezelés

A zeneiskola eseményei – például koncertek, bemutatók vagy táborok – külön felületen jelennek meg.

Az eseményekhez tartozó adatok közé tartozik a dátum, időpont, helyszín és leírás. A felhasználók böngészhetik ezeket, és részletes információkat is megtekinthetnek.

A modul célja, hogy mindenki naprakész információt kapjon az aktuális programokról.

---

## 6. Kapcsolat és információk

A kapcsolat modul lehetőséget biztosít arra, hogy a felhasználók üzenetet küldjenek az iskolának. Az űrlapon megadott adatok eltárolásra kerülnek, így később visszakereshetők.

Az oldalon megtalálhatók az iskola elérhetőségei, valamint egy térképes nézet is segíti a tájékozódást.

---

## 7. Felhasználói felület és dizájn

A webalkalmazás megjelenése modern és letisztult. A felület reszponzív, így különböző eszközökön is jól használható.

A frontend komponens alapú felépítésű, ahol az egyes oldalak külön modulokban találhatók. A navigáció egyszerű és átlátható, a funkciók logikusan elkülönülnek.

A dizájn célja egy modern, de nem túlzsúfolt felület kialakítása volt.

---

## 8. Tesztelési terv

A rendszer fejlesztése során többféle tesztelési módszert alkalmaztunk.

A backend működését automatizált tesztekkel ellenőriztük, amelyek a funkciók helyes működését vizsgálják. Az API végpontokat Swagger segítségével teszteltük.

A frontend esetében böngésző alapú teszteket alkalmaztunk, amelyek valós felhasználói műveleteket szimulálnak. Emellett kiemelt figyelmet fordítottunk az adatok validálására és a hibakezelésre.

---

## 9. Technológiák

A projekt fejlesztése során modern webes technológiákat alkalmaztunk.

A backend Node.js környezetben készült, Express keretrendszer használatával. Az adatkezelést relációs adatbázis (MySQL) biztosítja.

A frontend React alapokra épül, komponens alapú felépítéssel. A kliensoldali navigáció React Router segítségével valósul meg.

A kommunikáció a frontend és a backend között REST API-n keresztül történik, JSON formátumban.

A fejlesztés és tesztelés során további eszközök is használatra kerültek, például Swagger az API dokumentálására és tesztelésére, valamint automatizált tesztelési megoldások.

---

## 10. Telepítés

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

## 11. Összegzés

A projekt eredményeként egy komplex webalkalmazás készült el, amely hatékonyan támogatja egy zeneiskola működését.
A rendszer átlátható módon kezeli a felhasználókat, az órákat, a hangszereket és az eseményeket, miközben megkönnyíti az adminisztrációt és az információáramlást.
A fejlesztés során egy stabil, jól strukturált és később bővíthető megoldást sikerült létrehozni.
