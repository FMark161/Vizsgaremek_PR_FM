import { Link } from 'react-router-dom';
import { FaMusic, FaGuitar, FaUsers, FaCalendarAlt, FaHeart, FaClock, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import heroImage from '../../assets/hero-image.jpg';
import './Home.css';


const Home = () => {
    const events = [
        {
            id: 1,
            title: "Nyílt nap a zeneiskolában",
            date: "2024. március 15.",
            time: "14:00 - 18:00",
            description: "Ismerd meg hangszereinket és tanárainkat! Kipróbálhatod a hangszereket és személyesen beszélgethetsz oktatóinkkal."
        },
        {
            id: 2,
            title: "Tavaszi hangverseny",
            date: "2024. április 20.",
            time: "18:00 - 20:00",
            description: "Tanulóink éves bemutató koncertje. Változatos műsorral készülnek növendékeink a klasszikustól a modernig."
        },
        {
            id: 3,
            title: "Gitár mesterkurzus",
            date: "2024. május 5.",
            time: "10:00 - 16:00",
            description: "Vendégoktatóval a gitározás fortélyai. Különleges technikák és improvizációs gyakorlatok haladóknak."
        }
    ];

    return (
        <div className="home">
            {/* Hero szekció - Bal oldalon szöveg, jobb oldalon kép */}
            <section className="hero">
                <div className="container">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <h1>Fedezd fel a zene örömét <span className="highlight">velünk!</span></h1>
                            <p className="hero-description">
                                Helyünkön tapasztalt zenetanárok várják a kezdő és haladó növendékeket egyaránt.
                                Akár gyermekednek szeretnél zenei élményt adni, akár magad szeretnél új hangszeren tanulni,
                                nálunk a megfelelő helyen jársz.
                            </p>
                            <div className="hero-buttons">
                                <Link to="/application" className="btn btn-primary">
                                    Jelentkezem
                                </Link>
                                <Link to="/contact" className="btn btn-secondary">
                                    Kapcsolat
                                </Link>
                            </div>
                        </div>
                        <div className="hero-image">
                            <img
                                src={heroImage}
                                alt="Harmónia Zeneiskola"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Bemutatkozás + Miért válassz minket */}
            <section className="about">
                <div className="container">
                    <div className="about-content">
                        <h2 className="section-title">Bemutatkozás</h2>
                        <p className="about-text">
                            A Harmónia Zeneiskola 2010-ben nyitotta meg kapuit Budapest szívében, azzal a céllal, hogy minden korosztály számára elérhetővé tegye a minőségi zeneoktatást. Azóta több száz növendékünk fedezte fel magában a zene szeretetét, és fejlesztette tehetségét tapasztalt tanáraink segítségével.
                        </p>
                        <p className="about-text">
                            Iskolánkban a hagyományos zeneoktatás mellett modern hangszeres és énektechnikákat is oktatunk, hogy mindenki megtalálhassa a számára legmegfelelőbb stílust. Legyen szó komolyzenéről, jazz-ről, pop-rockról vagy népzenéről, nálunk otthonra találsz. Oktatóink mind elismert művészek és pedagógusok, akik szenvedéllyel adják át tudásukat a következő generációnak.
                        </p>
                        <p className="about-text">
                            Hiszünk abban, hogy a zene nem csak egy tudomány, hanem életre szóló kaland, ami formálja a személyiséget, fejleszti a kreativitást és közösséget épít. Éppen ezért iskolánkban nem csak a technikai tudás elsajátítására helyezünk hangsúlyt, hanem a közös muzsikálás örömére, a rendszeres fellépési lehetőségekre és a barátságos, támogató közösségi légkör megteremtésére is.
                        </p>
                        <p className="about-text">
                            Ha szeretnél részese lenni ennek a közösségnek, szeretnéd gyermekedet elmélyíteni a zene világában, vagy magad szeretnél új hangszeren tanulni, szeretettel várunk a Harmónia Zeneiskolában. Ismerd meg nálunk a zene örömét!
                        </p>
                    </div>

                    <h2 className="section-title">Miért válassz minket?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaMusic />
                            </div>
                            <h3>Kiváló szakmai háttér</h3>
                            <p>Tanáraink mindannyian diplomás zenészek, aktív koncertező művészek, akik naprakész tudással és módszertani felkészültséggel rendelkeznek.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaGuitar />
                            </div>
                            <h3>Széles hangszerkínálat</h3>
                            <p>Több mint 20 hangszer közül választhatsz: zongora, hegedű, gitár, fuvola, dob, ének, és még sok más. Egyedi igényekre szabott képzés is!</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaUsers />
                            </div>
                            <h3>Egyéni és csoportos órák</h3>
                            <p>Lehetőséged van egyéni foglalkozásokra vagy kiscsoportos órákra is. Mindkét formában garantált a személyre szabott figyelem.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaCalendarAlt />
                            </div>
                            <h3>Rendszeres fellépési lehetőség</h3>
                            <p>Évente többször szervezünk növendékhangversenyeket, ahol bárki megmutathatja, mit tanult. Nyílt napokon és városi eseményeken is felléphetnek növendékeink.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaHeart />
                            </div>
                            <h3>Családias légkör</h3>
                            <p>Kis létszámú csoportok, barátságos környezet, odafigyelő tanárok – nálunk mindenki néven szólít mindenkit. Közös programok, koncertlátogatások.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaClock />
                            </div>
                            <h3>Rugalmas időbeosztás</h3>
                            <p>Óráinkat rugalmasan, a te időbeosztásodhoz igazítva szervezzük. Akár heti többször, akár csak alkalmanként szeretnél jönni.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaMapMarkerAlt />
                            </div>
                            <h3>Kiváló elhelyezkedés</h3>
                            <p>Iskolánk Budapest szívében, a Jókai téren található, tömegközlekedéssel könnyen megközelíthető. Modern, jól felszerelt termekkel várunk.</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <FaGraduationCap />
                            </div>
                            <h3>Felvételi előkészítő</h3>
                            <p>Speciális programmal készítjük fel azokat, akik zenei pályára készülnek. Segítünk a felvételi anyag összeállításában és a felkészülésben.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Események szekció */}
            <section className="events-section">
                <div className="container">
                    <h2 className="section-title">Közelgő események</h2>
                    <div className="events-grid">
                        {events.map(event => (
                            <div key={event.id} className="event-card">
                                <div className="event-content">
                                    <div className="event-meta">
                                        <span className="event-date">{event.date}</span>
                                        <span className="event-time">{event.time}</span>
                                    </div>
                                    <h3 className="event-title">{event.title}</h3>
                                    <p className="event-description">{event.description}</p>
                                    <Link to="/events" className="event-link">
                                        Részletek →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Térkép és nyitvatartás */}
            <section className="info-section">
                <div className="container">
                    <div className="info-grid">
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.123456789!2d19.0538!3d47.5039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc123456789%3A0x123456789abcdef!2sBudapest%2C%20J%C3%B3kai%20t%C3%A9r%201%2C%201061!5e0!3m2!1shu!2shu!4v1234567890"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Harmónia Zeneiskola térkép"
                            ></iframe>
                        </div>

                        <div className="opening-hours">
                            <h2>Nyitvatartás</h2>
                            <div className="hours-list">
                                <div className="hour-item">
                                    <span className="day">Hétfő - Péntek</span>
                                    <span className="time">14:00 - 20:00</span>
                                </div>
                                <div className="hour-item">
                                    <span className="day">Szombat</span>
                                    <span className="time">10:00 - 16:00</span>
                                </div>
                                <div className="hour-item closed">
                                    <span className="day">Vasárnap</span>
                                    <span className="time">Zárva</span>
                                </div>
                            </div>
                            <div className="address-info">
                                <h3>Elérhetőségeink</h3>
                                <p>📍 Budapest, Jókai tér 1.</p>
                                <p>📞 +36 1 234 5678</p>
                                <p>✉️ info@harmoniazeneiskola.hu</p>
                            </div>
                            <Link to="/contact" className="btn btn-contact">
                                Írj nekünk!
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;