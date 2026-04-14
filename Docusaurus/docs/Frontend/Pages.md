**Kezdőlap**

A kezdőoldal (Home.jsx-ben definiálva) az alkalmazás központi belépési pontja, amely több alkomponensből és szekcióból áll össze, hogy a felhasználó azonnal átláthassa a zeneiskola szolgáltatásait, közelgő eseményeket és könnyen elérje a navigációs funkciókat. 

Az oldal tetején található a sötét tónusú navigációs sáv (Navigation.jsx komponens), amely minden oldalon megjelenik a Layout-on keresztül. Bal oldalon helyezkedik el a "Harmónia Zeneiskola" logó és név, amely a főoldalra vezet vissza, középen pedig a fő navigációs menüpontok (Kezdőlap, Jelentkezés, Hangszerek, Események, Kapcsolat), amelyek dinamikusan változnak a felhasználó bejelentkezési állapotától függően. A védett oldalak (Kölcsönzés, Óráim) csak bejelentkezetteknek jelenik meg, az Admin pedig kizárólag admin jogosultságú felhasználóknak. Jobb oldalon található a felhasználói profil terület, ahol ha a felhasználó nincs bejelentkezve, itt érhető el a bejelentkezés és regisztráció gomb, amelyek a megfelelő oldalakra vezetnek, míg bejelentkezett felhasználók esetén megjelenik a név, a szerepkör (Diák/Tanár/Admin) és a kijelentkezés gomb.

A fő tartalom a navigációs sáv alatt kezdődik a hero szekciójával, amely bal oldalon egy üdvözlő szöveget és cselekvésre ösztönző gombokat (Jelentkezés és Kapcsolat) tartalmaz, jobb oldalon pedig egy nagy képet a zeneiskoláról. Ezt követi a bemutatkozás szekció, ahol részletes szöveg olvasható a zeneiskola történetéről, értékeiről és küldetéséről, hangsúlyozva a minőségi oktatást és közösségi légkört. A "Miért válassz minket?" szekció nyolc szolgáltatási kártyát tartalmaz, amelyek ikonokkal és rövid leírásokkal mutatják be az előnyöket, mint a kiváló szakmai háttér, széles hangszerkínálat, egyéni és csoportos órák, rendszeres fellépési lehetőség, családi légkör, rugalmas időbeosztás, kiváló elhelyezkedés és felvételi előkészítő.

**Hangszerek**
A hangszer oldal (Instruments.jsx-ben definiálva) az alkalmazás egyik informatív része, amely a zeneiskola által kínált hangszer-családokat mutatja be részletesen. 

Az oldal egyik fontos eleme a szűrő szekció, ahol gombokkal lehet kiválasztani a hangszer-családokat (összes, vonósok, fafúvósok, rézfúvósok, ütősök, billentyűsök, pengetősök, ének, elektronikus), dinamikusan szűrve a megjelenített tartalmat.

A fő tartalom a hangszer-családok listája, ahol minden család egy kártyában jelenik meg: névvel, részletes leírással, példák listájával (címkékben), egy érdekességgel és egy "Érdekel a tanulás" gombbal, amely a jelentkezési oldalra vezet. Végül az információs szekció három dobozt tartalmaz ikonokkal: minden hangszerre tanítunk, kiváló oktatók és hangszer kölcsönzés, amelyek további cselekvésre ösztönöznek.

**Események**

Az események oldal (Events.jsx-ben definiálva) az alkalmazás közösségi és információs központja, ahol a zeneiskola által szervezett rendezvényeket lehet böngészni és részleteket megtekinteni.

Az oldalon egy szűrő szekció található, ahol gombokkal lehet kiválasztani az esemény-kategóriákat (minden esemény, koncert, nyílt nap, mesterkurzus, tábor, fesztivál), dinamikusan szűrve a megjelenített tartalmat.

A fő tartalom az események listája, ahol minden esemény egy kártyában jelenik meg: címmel, kiemelt badge-dzsel (ha kiemelt), meta adatokkal (dátum, idő, helyszín, kategória ikonokkal), rövid leírással és egy "Részletek" gombbal. Az események dátum szerint rendezettek, a legközelebbi elöl. Ha rákattintanak egy eseményre, egy modal nyílik meg a részletes nézettel: teljes cím, kiemelt jelzés, meta adatok és hosszú leírás. A modal bezárható gombokkal vagy kívül kattintással.

**Jelentkezések**

Az oldal legelején a tanárok bemutatása szekció lelhető, ahol kártyákban jelennek meg az oktatók képekkel, nevekkel, rövid leírásokkal és tapasztalatokkal, dinamikusan töltődve az API-ból. A fő tartalom a jelentkezési űrlap, amely két oszlopban helyezkedik el: bal oldalon személyes adatok (név, email, telefon, születési dátum ikonokkal), jobb oldalon zenei információk (hangszer választás legördülővel ikonokkal, tapasztalat szint, saját hangszer kérdés, üzenet mező, feltételek elfogadása checkbox). A küldés gomb után loading állapot, siker esetén pedig egy teljes képernyős success üzenet jelenik meg pipa ikonnal, köszönő szöveggel és vissza a kezdőlapra gomb.

**Kapcsolatok**

A kapcsolat oldal (Contact.jsx-ben definiálva) az alkalmazás kommunikációs központja, ahol a felhasználók kapcsolatba léphetnek a zeneiskolával üzenetek küldésével és elérhetőségek megtekintésével. Az oldalon a fő tartalom két oszlopban található: bal oldalon az elérhetőségek kártyákban (cím, telefon, email, nyitvatartás ikonokkal), valamint közösségi média linkek (Facebook, Instagram, YouTube).

Jobb oldalon található a kapcsolatfelvételi űrlap: név, email, telefon, tárgy és üzenet mezők, kötelező jelzésekkel és ikonokkal. A küldés gomb után loading állapot, siker esetén pedig egy teljes képernyős success üzenet jelenik meg pipa ikonnal, köszönő szöveggel és vissza a kezdőlapra gomb. Hiba esetén error üzenet látható. Végül, az oldal alján egy térkép is található, ami rámutat a zeneiskolára.

**Bejelentkezés**

A bejelentkezés oldal (Login.jsx-ben definiálva) az alkalmazás autentikációs belépési pontja, ahol a felhasználók fiókjukba léphetnek. Az oldal tetején található a hero szekció, amely egy nagy címmel és bevezető szöveggel indít, hangsúlyozva a tananyagokhoz és jelentkezésekhez való hozzáférést. Ezt követi a fő tartalom egy központi kártyában: üdvözlő szöveg, űrlap felhasználónév és jelszó mezőkkel (ikonokkal), emlékezz rám checkbox, bejelentkezés gomb (loading állapottal), valamint link a regisztrációhoz.

**Regisztráció**

A regisztráció oldal (Register.jsx-ben definiálva) az alkalmazás új felhasználók számára készült belépési pontja, ahol fiókot lehet létrehozni. Az oldal tetején található a hero szekció, amely egy nagy címmel ("Regisztráció") és bevezető szöveggel indít, hangsúlyozva a zenei közösséghez való csatlakozást. Ezt követi a fő tartalom egy központi kártyában: üdvözlő szöveg, űrlap felhasználónév, email cím, jelszó és jelszó megerősítés mezőkkel (ikonokkal), elfogadom a feltételeket checkbox (linkekkel a feltételekhez), regisztráció gomb (loading állapottal), valamint link a bejelentkezéshez.

A validáció kliens oldalon történik (kötelező mezők, email formátum, jelszó hossz és egyezés, feltételek elfogadása), server error esetén üzenet jelenik meg. Sikeres regisztráció után a felhasználó a kezdőoldalra navigál.

**Kölcsönzések**

Az oldalon szűrő szekcó található, amellyel gombokkal lehet kiválasztani a hangszer-kategóriákat (összes, billentyűsök, gitárok, vonósok, fúvósok, ütősök, ének, egyéb), dinamikusan szűrve a megjelenített tartalmat. A fő tartalom a hangszer kártyák rácsa, ahol minden hangszer egy kártyában jelenik meg: képpel, névvel, oktatóval, havi árral, státusz jelzéssel (elérhető, kölcsönözve, szervízben) és egy "Kölcsönzés" gombbal. Ha rákattintanak, egy modal nyílik meg az űrlappal: név, email, telefon, időtartam választás (1-12 hónap), feltételek elfogadása checkbox, küldés gomb. Sikeres küldés után alert jelenik meg az adatokkal.

**Órák**

Az oldal tetején található a nézet választó (hét vagy nap), és egy dátumválasztó, amely dinamikusan szűri az órákat. A fő tartalom az órák listája, ahol minden óra egy kártyában jelenik meg: dátum, idő, tanár, diák, hangszer, téma, státusz jelzéssel (tervezett, megtartva, lemondva ikonokkal). Szerepkör alapján változik a tartalom: Az admin látja az összes órát és tud szerkeszteni, tanár a sajátjait és a diák szintén a saját óráit. Minden órához tartozik szerkesztés (ceruza ikon) és törlés (kuka ikon) gomb, valamint egy hozzáadás gomb az új órákhoz. A szerkesztés vagy hozzáadás modal ablakot nyit meg űrlappal: tanár választás (admin esetén), diák választás, hangszer választás, téma, dátum, idő, státusz. Sikeres mentés után az oldal frissül.

**Admin**

Az admin oldal (Admin.jsx-ben definiálva) az alkalmazás központi vezérlőfelülete, ahol az adminisztrátorok teljesen kezelhetik a rendszer adatait. Az oldal tetején található a tab navigáció, ahol 12 különböző kategóriát lehet kiválasztani: események, hangszerek, oktatók, jelentkezések, diákok, kölcsönzések, felhasználók, kategóriák, leltár, oktatók hangszerei, órák és üzenetek. Minden tab egy táblázatot jelenít meg a megfelelő adatokkal, fejlécekkel és sorokkal, státusz jelzésekkel és ikonokkal. A táblázatokban minden sorhoz tartozik szerkesztés (ceruza ikon), törlés (kuka ikon) és hozzáadás (plusz ikon) gomb. A szerkesztés vagy hozzáadás modal ablakot nyit meg, ahol űrlap mezőkkel lehet módosítani az adatokat (pl. eseményeknél cím, dátum, helyszín; felhasználóknál név, email, jogosultság). Az üzenetek tab-nál külön "olvasottá jelölés" funkció van.