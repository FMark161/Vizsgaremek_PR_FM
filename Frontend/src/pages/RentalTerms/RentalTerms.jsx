import { Link } from 'react-router-dom';
import './RentalTerms.css';

const RentalTerms = () => {
  return (
    <div className="rental-terms">
      <section className="rental-terms-hero">
        <div className="container">
          <h1>Kölcsönzési Feltételek</h1>
          <p className="rental-terms-description">
            A Harmónia Zeneiskola hangszerkölcsönzésének szabályai és feltételei
          </p>
        </div>
      </section>

      <section className="rental-terms-content">
        <div className="container">
          <div className="rental-terms-card">
            <h2>1. Általános feltételek</h2>
            <p>
              A hangszerkölcsönzés kizárólag a Harmónia Zeneiskola beiratkozott diákjai számára elérhető.
              A kölcsönzési szerződés a jelentkezés elfogadásával jön létre.
            </p>

            <h2>2. Kölcsönzés időtartama</h2>
            <p>
              A hangszerek minimális kölcsönzési ideje 1 hónap, maximum 12 hónap. A kölcsönzési időszak
              a szerződés aláírásának napján kezdődik. A kölcsönzési időszak lejárta előtt a szerződés
              meghosszabbítható.
            </p>

            <h2>3. Kölcsönzés díja</h2>
            <p>
              A kölcsönzés díját a mindenkori árlap tartalmazza. A díjat havonta előre kell fizetni.
              A késedelmes fizetés esetén a Zeneiskola késedelmi kamatot számíthat fel.
            </p>

            <h2>4. A hangszer állapota</h2>
            <p>
              A kölcsönzés átvételekor a Diák köteles a hangszert megvizsgálni és annak állapotát
              a jegyzőkönyvben rögzíteni. A hangszer rendeltetésszerű használatáért a Diák felelős.
            </p>

            <h2>5. Károkozás</h2>
            <p>
              A hangszerben, illetve a tartozékaiban bekövetkezett károkért a Diák anyagi felelősséggel tartozik.
              A kár mértékét a Zeneiskola szakembere állapítja meg. A javítás költsége a Diákot terheli.
            </p>

            <h2>6. A hangszer visszaszolgáltatása</h2>
            <p>
              A kölcsönzési időszak lejártakor a Diák köteles a hangszert a Zeneiskolának visszaszolgáltatni.
              A késedelmes visszaszolgáltatás esetén a Zeneiskola további kölcsönzési díjat számíthat fel.
            </p>

            <h2>7. Lemondás</h2>
            <p>
              A kölcsönzés a szerződés aláírását követő 14 napon belül indoklás nélkül felmondható.
              Ezt követően a kölcsönzési időszak végéig a szerződés csak közös megegyezéssel szüntethető meg.
            </p>

            <h2>8. Adatkezelés</h2>
            <p>
              A kölcsönzéssel kapcsolatos személyes adatokat a Zeneiskola az Adatvédelmi Nyilatkozatban
              foglaltak szerint kezeli. A Diák hozzájárul, hogy a kölcsönzés teljesítése érdekében
              szükséges adatait a Zeneiskola kezelje.
            </p>

            <h2>9. Vegyes rendelkezések</h2>
            <p>
              A Zeneiskola fenntartja a jogot, hogy a kölcsönzési feltételeket egyoldalúan módosítsa.
              A módosítások a hatálybalépésüket követő kölcsönzésekre vonatkoznak. A jelen feltételekben
              nem szabályozott kérdésekben a Polgári Törvénykönyv rendelkezései az irányadók.
            </p>

            <div className="rental-terms-footer">
              <p>Utolsó módosítás: 2025. január 1.</p>
              <Link to="/rental" className="btn-back">Vissza a kölcsönzéshez</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RentalTerms;