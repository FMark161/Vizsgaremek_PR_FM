import { Link } from 'react-router-dom';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms">
      <section className="terms-hero">
        <div className="container">
          <h1>Adatvédelmi Nyilatkozat</h1>
          <p className="terms-description">
            A Harmónia Zeneiskola elkötelezett a személyes adatok védelme mellett.
          </p>
        </div>
      </section>

      <section className="terms-content">
        <div className="container">
          <div className="terms-card">
            <h2>1. Bevezetés</h2>
            <p>
              A Harmónia Zeneiskola (továbbiakban: "Adatkezelő") kiemelten fontosnak tartja a személyes adatok védelmét.
              Jelen adatvédelmi nyilatkozat (továbbiakban: "Nyilatkozat") célja, hogy átlátható módon tájékoztassa a
              Felhasználókat (továbbiakban: "Ön") arról, hogy az Ön által megadott személyes adatokat hogyan gyűjtjük,
              kezeljük, tároljuk és védjük.
            </p>
            <p>
              A Nyilatkozat hatálya kiterjed a harmoniazeneiskola.hu weboldalra és minden kapcsolódó szolgáltatásra.
            </p>

            <h2>2. Kezelt adatok köre</h2>
            <p>Az alábbi személyes adatokat kezeljük:</p>
            <ul>
              <li><strong>Név</strong> - a jelentkező azonosításához</li>
              <li><strong>Email cím</strong> - kapcsolattartás céljából</li>
              <li><strong>Telefonszám</strong> - gyors kapcsolatfelvételhez</li>
              <li><strong>Születési dátum</strong> - életkori besoroláshoz</li>
              <li><strong>Választott hangszer</strong> - a tanfolyam meghatározásához</li>
              <li><strong>Zenei előképzettség</strong> - a megfelelő szint besorolásához</li>
              <li><strong>Felhasználónév és jelszó</strong> - a fiók azonosításához</li>
            </ul>

            <h2>3. Az adatkezelés célja</h2>
            <p>Az adatokat kizárólag az alábbi célokból kezeljük:</p>
            <ul>
              <li>Jelentkezések fogadása és feldolgozása</li>
              <li>Kapcsolattartás a jelentkezőkkel</li>
              <li>Órák megszervezése és időpontok egyeztetése</li>
              <li>Hangszerkölcsönzések nyomon követése</li>
              <li>Eseményekről való tájékoztatás</li>
              <li>Felhasználói fiók kezelése</li>
            </ul>

            <h2>4. Az adatkezelés jogalapja</h2>
            <p>
              Az adatkezelés az Ön hozzájárulásán alapul, amelyet a jelentkezési űrlap elküldésével,
              illetve a regisztrációval ad meg. Az adatkezelés az Európai Parlament és a Tanács (EU)
              2016/679 számú általános adatvédelmi rendeletének (GDPR) megfelelően történik.
            </p>

            <h2>5. Adatok tárolásának időtartama</h2>
            <p>
              Személyes adatait a jogviszony fennállásáig, valamint a jogviszony megszűnését követő 5 évig őrizzük meg,
              kivéve, ha jogszabály hosszabb időtartamot ír elő. A regisztrációs adatokat a felhasználói fiók törléséig,
              vagy 3 év inaktivitás után tároljuk.
            </p>

            <h2>6. Adatok továbbítása</h2>
            <p>
              Az Ön személyes adatait harmadik félnek nem adjuk át, kivéve, ha az jogszabályi kötelezettség teljesítése
              érdekében szükséges, vagy az Ön előzetes hozzájárulását adta. Az adatokat kizárólag az iskola munkatársai
              érik el, akik titoktartási kötelezettséggel rendelkeznek.
            </p>

            <h2>7. Adatbiztonság</h2>
            <p>
              Az Ön személyes adatait a legmagasabb szintű biztonsági intézkedésekkel védjük. Weboldalunk SSL
              titkosítást használ, adatbázisaink jelszóval védettek, és rendszeresen készítünk biztonsági mentéseket.
              A jelszavakat hashelten, biztonságos formában tároljuk.
            </p>

            <h2>8. Az Ön jogai</h2>
            <p>Az Önt megillető jogok a GDPR alapján:</p>
            <ul>
              <li><strong>Tájékoztatáshoz való jog</strong> - kérheti, hogy milyen adatokat kezelünk Önről</li>
              <li><strong>Helyesbítéshez való jog</strong> - kérheti a pontatlan adatok javítását</li>
              <li><strong>Törléshez való jog</strong> - kérheti adatai törlését ("elfeledtetéshez való jog")</li>
              <li><strong>Adatkezelés korlátozásához való jog</strong> - kérheti adatai kezelésének felfüggesztését</li>
              <li><strong>Adathordozhatósághoz való jog</strong> - kérheti adatai átadását</li>
              <li><strong>Tiltakozáshoz való jog</strong> - tiltakozhat az adatkezelés ellen</li>
            </ul>
            <p>
              Jogainak gyakorlásához kérjük, vegye fel velünk a kapcsolatot az <strong>info@harmoniazeneiskola.hu</strong> email címen.
            </p>

            <h2>9. Panasz benyújtása</h2>
            <p>
              Ha úgy érzi, hogy az adatkezelés során megsértettük az Ön jogait, panasszal fordulhat a
              <strong> Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH)</strong>:
            </p>
            <p>
              Cím: 1055 Budapest, Falk Miksa utca 9-11.<br />
              Telefon: +36 (1) 391-1400<br />
              Email: ugyfelszolgalat@naih.hu<br />
              Web: www.naih.hu
            </p>

            <h2>10. A Nyilatkozat módosítása</h2>
            <p>
              Fenntartjuk a jogot, hogy jelen Nyilatkozatot bármikor módosítsuk. A módosítások a közzétételükkel
              lépnek hatályba. Kérjük, időnként ellenőrizze ezt az oldalt a változások nyomon követése érdekében.
            </p>

            <h2>11. Kapcsolat</h2>
            <p>
              Ha bármilyen kérdése van az adatkezeléssel kapcsolatban, kérjük, vegye fel velünk a kapcsolatot:
            </p>
            <p>
              <strong>Harmónia Zeneiskola</strong><br />
              Cím: 1061 Budapest, Jókai tér 1.<br />
              Email: info@harmoniazeneiskola.hu<br />
              Telefon: +36 1 234 5678
            </p>

            <div className="terms-footer">
              <p>Utolsó módosítás: 2026. január 1.</p>
              <Link to="/" className="btn-back">Vissza a főoldalra</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;