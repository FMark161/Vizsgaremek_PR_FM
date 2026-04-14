![Táblák a phpmyadminban](/img/Tables.png)

A zeneiskola működését modellező adatbázist relációs adatmodell alapján alakítottuk ki. A rendszer több, egymással kapcsolatban álló táblából épül fel.

Minden tábla elsődleges kulccsal rendelkezik, amely egyértelműen azonosítja az adott rekordokat. Az egyes táblák közötti kapcsolatokat idegen kulcsok segítségével valósítottuk meg, így biztosítva az adatok közötti logikai kapcsolatot.

Az adatbázis tervezése során törekedtünk a redundancia csökkentésére, ezért a struktúrát normalizálási elvek alapján alakítottuk ki. Az adattípusok meghatározásakor figyelembe vettük az adatok jellegét és a későbbi lekérdezések hatékonyságát.

A kialakított struktúra lehetővé teszi a zeneiskola működéséhez szükséges adatok átlátható tárolását, valamint a különböző lekérdezések és kimutatások elkészítését.
Az adatbázisunk 12 táblából áll.

**Bejelentkezés tábla:**

Id: A felhasználó egyedi azonosítására szolgál. Biztosítja, hogy minden felhasználó megkülönböztethető legyen, és lehetővé teszi más táblákkal való egyértelmű kapcsolódást.

Fnev: A rendszerbe való belépéshez szükséges egyedi felhasználónév. Az azonosítás elsődleges eleme a bejelentkezés során.

Jelszo: A felhasználó hitelesítését szolgálja. Biztosítja, hogy csak jogosult személy férjen hozzá a rendszerhez.

Jogosultsag: Meghatározza a felhasználó szerepkörét (pl. adminisztrátor, tanár, diák). Ez szabályozza, hogy ki milyen funkciókat érhet el a rendszerben.

Email: Kapcsolattartásra és értesítések küldésére szolgál.

Created_at: A felhasználói fiók létrehozásának időpontját tárolja.

updated_at: Az utolsó módosítás időpontját rögzíti.

**Események tábla:**

id: Az esemény egyedi azonosítója.

cim: Az esemény neve, ami alapján megjelenik a listában.

datum: Az esemény dátuma, amely alapján lehet szűrni és időrendbe rendezni.

idopont: Az esemény időpontja vagy időtartama szöveges formában.

helyszin: A rendezvény helye (pl. iskola, koncertterem, tér).

leiras: Rövid ismertető, amely például egy eseménylista nézetben jelenhet meg.

hosszuleiras: Részletesebb bemutató szöveg, amely akár egy külön eseményoldalon is megjelenhet.

kep_url: Az eseményhez tartozó kép linkje, ami segít a vizuális megjelenítésben.

kategoria: Megmutatja, hogy milyen típusú eseményről van szó (pl. koncert, tábor).

kiemelt: Logikai mező, amely jelzi, hogy az esemény fontos-e, és kiemelt helyen kell-e 
megjeleníteni (például főoldalon).

created_at: Mikor lett az esemény rögzítve a rendszerben.

updated_at: Mikor lett utoljára módosítva az esemény.

**Kategória tábla:**
Id: Egyedi azonosító, amely lehetővé teszi, hogy a hangszerek kategóriákhoz legyenek rendelve.

Katnev: A hangszerek csoportosítását teszi lehetővé. Segít rendszerezni az adatokat (pl. vonós, fúvós), ami átláthatóbbá és kereshetőbbé teszi a nyilvántartást.

created_at: A kategória létrehozásának dátuma.

**Hangszer tábla:**
Id: A hangszer egyedi azonosítására szolgál a rendszerben.

Katid: Biztosítja, hogy minden hangszer egy adott kategóriához tartozzon, így lehetővé teszi a rendszerezést és a szűrést.

Leltarid: Kapcsolatot teremt a leltári adatokkal, így a hangszerhez hozzárendelhető az értéke és elérhetőségi állapota.

Nev: A hangszer megnevezése, amely alapján azonosítható és kiválasztható a rendszerben.

created_at: A hangszer felvitelének ideje.

updated_at: Utolsó módosítás ideje.

**Leltár tábla:**

Id: Egyedi azonosító, amely a leltári adatokat külön kezeli a hangszer alapadataitól.

Ar: A hangszer pénzbeli értékét rögzíti. Fontos a nyilvántartás, biztosítás vagy esetleges kártérítés szempontjából. Csak szám típus lehet.

Elerhetoseg: Megmutatja, hogy a hangszer aktuálisan kölcsönözhető-e. Segíti a gyors állapotellenőrzést. 

created_at: A leltári adat rögzítésének ideje.

updated_at: Utolsó módosítás ideje.

**Kölcsönzés:**

Id: A kölcsönzési esemény egyedi azonosítója.

Hangszerid: Meghatározza, hogy melyik hangszer lett kikölcsönözve.

Diakid: Megmutatja, hogy melyik diák kölcsönözte ki a hangszert.

Kolcskezd: Rögzíti a kölcsönzés kezdetének időpontját, ami szükséges a nyilvántartáshoz.

Kolcsveg: A kölcsönzés tervezett vagy tényleges befejezési dátuma. Segít a határidők figyelésében.

Megjegyzes: Lehetővé teszi kiegészítő információk rögzítését (pl. hangszer állapota, sérülés).

statusz: Megmutatja, hogy a kölcsönzés aktív vagy már lezárt.

created_at: Mikor lett rögzítve.

updated_at: Utolsó módosítás ideje.

**Diák tábla:**
Id: A diák egyedi azonosítását biztosítja.

felhasznaloId: Kapcsolatot biztosít a bejelentkezesek táblával, amely a diák felhasználói fiókját jelöli.

Nev: A diák nevének tárolására szolgál az azonosíthatóság érdekében.

Telefonsz: Kapcsolattartás céljából szükséges telefonszám. . Szám és speciális karakter lehet benne (pl.: „+”-jel).

Email: Elektronikus kapcsolattartásra szolgál. Ennél a mezőnél egy szabályt hoztunk létre, ami meghatározza, hogy csak akkor fogadható el az email cím, ha van benne „@” és pont.

Szuldatum: A diák életkorának meghatározására használható.

Sajathangszer: Megmutatja, hogy a diáknak van-e saját hangszere, így eldönthető, szükséges-e kölcsönzés.

created_at: Mikor lett rögzítve.

updated_at: Mikor lett módosítva.

**Tanár tábla:**

Id: A tanár egyedi azonosítója.

felhasznaloId: A bejelentkezesek táblára mutató kapcsolat, amely a tanár fiókját jelöli.

Nev: A tanár neve az azonosíthatóság érdekében.

telefon: Telefonos elérhetőséget biztosít.

Email: Kapcsolattartásra szolgál.

tapasztalat: A tanár tapasztalatának rövid leírása (pl. „15 év”).

vegzettseg: A tanár iskolai végzettsége.

leiras: Bemutatkozó szöveg, amely akár a weboldalon is megjelenhet.

created_at: A rekord létrehozásának ideje.

updated_at: Utolsó módosítás ideje.

**Tanár_mit_tud tábla:**

Id: A rekord egyedi azonosítója.

Tanarid: Az adott tanár azonosítója.

hangszerId: A hangszer azonosítója, amit tanít.

**Óra tábla:**

Id: Az óra egyedi azonosítója.

Tanarid: Megmutatja, melyik tanár tartotta az órát.

Diakid: Megmutatja, melyik diák vett részt az órán.

hangszerId: Megmutatja, milyen hangszerhez tartozik az óra.

Tema: Az óra tartalmának rögzítésére szolgál, segíti a tananyag nyomon követését.

ora_datum: Az óra napja.

ora_ido: Az óra kezdési ideje.

statusz: Az óra állapota (pl. megtartott vagy elmaradt).

created_at: Mikor lett felvéve az óra a rendszerbe.

updated_at: Mikor lett módosítva.

**Jelentkezések tábla:**

id: A jelentkezés azonosítója.

nev: A jelentkező neve.

email: A jelentkező email címe, amely a legfontosabb kapcsolattartási adat.

telefon: Telefonszám, ami opcionális, de gyors kapcsolatfelvételre hasznos.

szul_datum: A jelentkező születési dátuma, amely alapján eldönthető, hogy gyermek vagy felnőttképzésről van szó.

hangszer: Az a hangszer, amelyet a jelentkező tanulni szeretne.

szint: Tudásszint (pl. kezdő, középhaladó, haladó).

sajat_hangszer: Információ arról, hogy a jelentkező rendelkezik-e saját hangszerrel.

uzenet: Szabad szöveges mező, ahol a jelentkező egyedi kéréseket vagy információkat írhat le.

statusz: A jelentkezés állapotát jelzi (pl. új, feldolgozás alatt, elfogadva).

letrehozas: A jelentkezés beérkezésének időpontja.

feldolgozva: Megmutatja, mikor foglalkoztak vele, vagy mikor lett lezárva.

**Üzenetek tábla:**

id: Az üzenet egyedi azonosítója.

nev: Az üzenetet küldő személy neve.

email: Az email cím, ahová válasz küldhető.

telefon: Telefonszám, ha a feladó megadta.

targy: Az üzenet tárgya.

uzenet: Az üzenet tartalma.

statusz: Megmutatja, hogy az üzenet új-e, vagy már foglalkoztak vele.

letrehozas: Az üzenet beérkezésének időpontja.

megtekintve: Mikor lett megnyitva.

valasz: Ha válaszoltak rá, itt tárolható a válasz szövege.

idx_statusz: Index, ami gyorsabbá teszi a keresést státusz szerint.

idx_letrehozas: Index, ami segít időpont szerint gyorsan rendezni.