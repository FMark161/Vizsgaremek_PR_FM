# Vizsgatervezet – Zeneiskolai Webalkalmazás

## Tartalomjegyzék

- [Projekt célja](#vizsgatervezet--zeneiskolai-webalkalmazás)
- [1. Regisztráció és bejelentkezés modul](#1-regisztráció-és-bejelentkezés-modul)
- [2. Diáknyilvántartó rendszer](#2-diáknyilvántartó-rendszer)
- [3. Óravásárlás és kurzusválasztás](#3-óravásárlás-és-kurzusválasztás)
- [4. Hangszer bérlése és vásárlása](#4-hangszer-bérlése-és-vásárlása)
- [5. Eseménykezelő modul](#5-eseménykezelő-modul)
- [6. Kapcsolat és információk](#6-kapcsolat-és-információk)
- [7. Felhasználói felület és dizájn](#7-felhasználói-felület-és-dizájn)
- [8. Tesztelési terv](#8-tesztelési-terv)
- [9. Összegzés](#9-összegzés)


Projekt célja: Egy modern, felhasználóbarát webes rendszer fejlesztése, amely egy zeneiskola működését támogatja online környezetben.
A tervezett alkalmazás fő célja, hogy digitalizálja és megkönnyítse a zeneiskola mindennapi működését, valamint lehetőséget biztosítson a diákok, tanárok és érdeklődők számára az online ügyintézésre. A rendszer egy központi weboldalra épül, amely regisztrációval és belépéssel érhető el, és különböző modulokból áll, mint a diáknyilvántartás, óravásárlás, hangszerkezelés, eseménykezelés és kapcsolatfelvétel.
## 1. Regisztráció és bejelentkezés modul
A felhasználók – elsősorban diákok és szülők – létrehozhatnak egy személyes fiókot. A regisztráció során meg kell adni a szükséges alapadatokat (név, email, telefonszám, jelszó stb.). A rendszer ellenőrzi az adatok helyességét és egyedi email-címet követel meg.
A sikeres regisztráció után a felhasználók bejelentkezhetnek, ahol hitelesítést követően hozzáférnek saját profiljukhoz. A beléptetési rendszer biztonságáról jelszó-hash-elés és alapvető biztonsági megoldások (pl. session kezelés) gondoskodnak.
## 2. Diáknyilvántartó rendszer
A bejelentkezett felhasználók profiladatait a rendszer tárolja és szerkeszthetővé teszi. A nyilvántartás tartalmazza:
•	személyes adatok,
•	választott hangszer(ek),
•	tanár vagy kurzus hozzárendelése,
•	óraszámok, előre megvett óracsomagok,
•	hangszerkölcsönzési státuszok.
Ez a modul a zeneiskola adminisztrátorai számára is elérhető lesz, így ők egyszerűen módosíthatják a tanulók adatait, nyomon követhetik a fejlődést és kezelhetik a tanulócsoportokat.
## 3. Óravásárlás és kurzusválasztás
A rendszer egyik fontos eleme, hogy a diákok – tudásuknak és szintjüknek megfelelően – különböző órákat vagy óracsomagokat vásárolhatnak. A felület megjelenít minden elérhető csomagot vagy kurzust, azok leírását, árát és nehézségi szintjét.
A vásárlás egy egyszerű, átlátható folyamat: a diák kiválasztja a számára megfelelő kurzust, majd a fizetés után az óra bekerül a profiljába. Később ez alapján tud jelentkezni konkrét időpontokra.
## 4. Hangszer bérlése és vásárlása
A rendszer külön menüpontban kezeli a hangszereket. Itt lehetőség lesz:
•	hangszert kölcsönözni,
•	hangszert megvásárolni,
•	böngészni a kategóriák között,
•	megtekinteni a részletes leírást, állapotot, árat.
A kölcsönzés meghatározott időszakra történik, amelyet a rendszer automatikusan naplóz. A diák a saját profiljában követheti, meddig tart a kölcsönzés, illetve mikor kell visszavinni a hangszert.
## 5. Eseménykezelő modul
A zeneiskola rendszeresen tart koncerteket, bemutatókat, versenyeket és egyéb szakmai programokat. Ezek a közelgő események egy külön „Események” menüpontban érhetők el.
Az események listája tartalmazza:
•	dátumot,
•	helyszínt,
•	leírást,
•	részvételi feltételeket,
•	maximális létszámot (ha korlátozott).
A felhasználók közvetlenül az adott eseményre is jelentkezhetnek. A rendszer regisztrálja a jelentkezést, és visszaigazolást küld. Amennyiben betelik a létszám, további jelentkezést nem fogad.
## 6. Kapcsolat és információk
A „Kapcsolat” menüpont két fő részből áll:
1.	Kapcsolatfelvételi űrlap, amelyen keresztül üzenetet lehet küldeni az iskolának (érdeklődés, panasz, kérdés stb.).
2.	Térképes nézet, ahol a zeneiskola pontos helye megtekinthető. Az interaktív térkép segíti a gyors eligazodást, útvonaltervezést.
## 7. Felhasználói felület és dizájn
A weboldal letisztult, modern és reszponzív megjelenést kap. Célunk, hogy mobilon, tableten és számítógépen is könnyen használható legyen. A navigáció egyszerű és logikus, minden modul jól elkülönül.
## 8. Tesztelési terv
A projekt során több szintű tesztelést végzünk:
•	Funkcionális tesztelés: minden modul működésének ellenőrzése (regisztráció, bejelentkezés, óravásárlás, eseményjelentkezés stb.).
•	Felhasználói tesztelés: UI és UX teszt, hogy a rendszer valóban könnyen kezelhető legyen.
•	Integrációs tesztek: modulok közötti adatáramlás ellenőrzése.
•	Biztonsági tesztelés: alapvető adatvédelmi és jogosultsági hibák kiszűrése.
A hibákat jegyzőkönyvben rögzítjük, majd javítjuk.
## 9. Összegzés
A projekt célja egy teljes körű, modern zeneiskolai webalkalmazás fejlesztése, amely egyszerre szolgálja a diákok kényelmét és az intézmény működésének digitalizálását. A regisztrációtól az óravásárláson át a hangszerkölcsönzésig minden funkció egy helyen elérhető, jól strukturált rendszerben. A fejlesztés során a stabil működésre, biztonságra és felhasználói élményre kiemelt figyelmet fordítunk.

