SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE IF EXISTS zeneiskola_mysql;
CREATE DATABASE zeneiskola_mysql
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_hungarian_ci;

USE zeneiskola_mysql;

-- =====================================================
-- FELHASZNÁLÓK ÉS JOGOSULTSÁGOK
-- =====================================================

CREATE TABLE bejelentkezesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fnev VARCHAR(255) NOT NULL UNIQUE,
    jelszo VARCHAR(255) NOT NULL,
    jogosultsag VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- Megjegyzés: Éles rendszerben bcrypt hash-t használj!
INSERT INTO bejelentkezesek (fnev, jelszo, jogosultsag, email) VALUES
-- Tanárok
('kovacs.anna', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'tanar', 'kovacs.anna@harmonia.hu'),
('nagy.peter', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'tanar', 'nagy.peter@harmonia.hu'),
('szabo.marta', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'tanar', 'szabo.marta@harmonia.hu'),
('takacs.gabor', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'tanar', 'takacs.gabor@harmonia.hu'),
('kiss.eva', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'tanar', 'kiss.eva@harmonia.hu'),
('molnar.david', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'tanar', 'molnar.david@harmonia.hu'),

-- Diákok (példa adatok)
('kiss.peter', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'diak', 'kiss.peter@email.hu'),
('nagy.anna', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'diak', 'nagy.anna@email.hu'),
('szabo.marton', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'diak', 'szabo.marton@email.hu'),
('toth.gabor', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'diak', 'toth.gabor@email.hu'),
('varga.reka', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'diak', 'varga.reka@email.hu'),

-- Admin
('info', '$2b$10$YzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGqXZ4xYzB5ZQqVwGq', 'admin', 'info@harmonia.hu');


-- ESEMÉNYEK
-- =====================================================

CREATE TABLE esemenyek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cim VARCHAR(255) NOT NULL,
    datum DATE NOT NULL,
    idopont VARCHAR(50),
    helyszin VARCHAR(255),
    leiras TEXT,
    hosszuleiras TEXT,
    kep_url VARCHAR(500),
    kategoria VARCHAR(50),
    kiemelt BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO esemenyek (cim, datum, idopont, helyszin, leiras, hosszuleiras, kep_url, kategoria, kiemelt) VALUES
('Nyílt nap a zeneiskolában', '2025-04-15', '14:00 - 18:00', 'Harmónia Zeneiskola, Budapest', 'Ismerd meg hangszereinket és tanárainkat! Kipróbálhatod a hangszereket és személyesen beszélgethetsz oktatóinkkal.', 'A nyílt nap keretében lehetőséged lesz megismerkedni iskolánk hangszereivel és oktatóival. Kipróbálhatod a különböző hangszereket, részt vehetsz bemutató órákon, és személyesen beszélgethetsz oktatóinkkal a képzési lehetőségekről. Akár gyermekednek keresel zeneiskolát, akár magad szeretnél új hangszeren tanulni, ez a nap tökéletes alkalom a tájékozódásra.', 'https://images.unsplash.com/photo-1461783470466-3a8b7a0f8a3a', 'nyiltnap', TRUE),
('Tavaszi hangverseny', '2025-04-20', '18:00 - 20:00', 'Budai Vigadó, Budapest', 'Tanulóink éves bemutató koncertje. Változatos műsorral készülnek növendékeink a klasszikustól a modernig.', 'Hagyományos tavaszi hangversenyünkön növendékeink mutatják be az elmúlt időszakban tanultakat. A műsorban szerepelnek klasszikus zongoradarabok, gitárelőadások, hegedűszólók, kamarazenei produkciók és énekszámok is. Szeretettel várunk minden kedves érdeklődőt!', 'https://images.unsplash.com/photo-1507838153414-b4b713384a76', 'koncert', TRUE),
('Gitár mesterkurzus', '2025-05-05', '10:00 - 16:00', 'Harmónia Zeneiskola, Budapest', 'Vendégoktatóval a gitározás fortélyai. Különleges technikák és improvizációs gyakorlatok haladóknak.', 'A mesterkurzusra várjuk azokat a gitárosokat, akik szeretnék elmélyíteni tudásukat. A nap folyamán szó lesz technikai fejlesztésről, improvizációs gyakorlatokról, különböző zenei stílusok sajátosságairól. A részvétel előzetes jelentkezéshez kötött, létszámkorlátozás miatt.', 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1', 'mesterkurzus', TRUE),
('Növendék hangverseny', '2025-06-10', '17:00 - 19:00', 'Harmónia Zeneiskola, Budapest', 'Év végi bemutató, ahol a legkisebbektől a haladókig mindenki megmutathatja, mit tanult.', 'Az évzáró hangversenyen minden növendékünk lehetőséget kap a fellépésre. Ez az alkalom nem verseny, hanem ünnep, ahol a közös muzsikálás öröméé a főszerep. Szeretettel várjuk a családtagokat és barátokat!', 'https://images.unsplash.com/photo-1460723237483-7f31b0498b9f', 'koncert', FALSE),
('Zenei tábor', '2025-07-15', '09:00 - 16:00', 'Harmónia Zeneiskola, Budapest', 'Nyári zenei tábor gyerekeknek, ahol játékos formában ismerkedhetnek a zenével.', 'Egyhetes nyári táborunkban a gyerekek játékos formában ismerkedhetnek a hangszerekkel, ritmussal, énekléssel. A tábor végén egy rövid bemutatóval készülünk a szülőknek. Minden nap lesz kézműves foglalkozás, közös játék és persze sok-sok muzsikálás.', 'https://images.unsplash.com/photo-1516280440614-37939bbacd81', 'tabor', FALSE),
('Őszi fesztivál', '2025-10-12', '15:00 - 20:00', 'Jókai tér, Budapest', 'Szabadtéri rendezvény, ahol növendékeink és tanáraink adnak koncertet.', 'Az őszi fesztivál keretében a Jókai téren várjuk az érdeklődőket. Iskolánk növendékei és tanárai adnak koncertet a nap folyamán, emellett lehetőség lesz hangszerek kipróbálására és betekintésre a zeneiskola életébe.', 'https://images.unsplash.com/photo-1461783470466-3a8b7a0f8a3a', 'fesztival', TRUE);

-- =====================================================
-- JELENTKEZÉSEK
-- =====================================================

CREATE TABLE jelentkezesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefon VARCHAR(20),
    szul_datum DATE,
    hangszer VARCHAR(100),
    szint VARCHAR(50),
    sajat_hangszer VARCHAR(50),
    uzenet TEXT,
    statusz VARCHAR(50) DEFAULT 'uj',
    letrehozas TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    feldolgozva TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

-- =====================================================
-- KATEGÓRIÁK ÉS HANGSZEREK
-- =====================================================

CREATE TABLE kategoriak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    katNev VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO kategoriak (katNev) VALUES
('Billentyűs'),
('Gitár'),
('Vonós'),
('Fúvós'),
('Ütős'),
('Ének'),
('Egyéb');

CREATE TABLE leltarak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ar INT NOT NULL,
    elerhetoseg BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO leltarak (ar, elerhetoseg) VALUES
(28500, TRUE),  -- Akusztikus zongora
(22500, TRUE),  -- Digitális zongora
(12500, TRUE),  -- Akusztikus gitár
(18500, TRUE),  -- Elektromos gitár
(15500, TRUE),  -- Hegedű
(22500, TRUE),  -- Cselló
(14500, TRUE),  -- Fuvola
(24500, TRUE),  -- Saxophon
(32500, TRUE),  -- Akusztikus dob
(28500, TRUE),  -- Elektromos dob
(16500, TRUE),  -- Énekóra (mikrofon + hangfal)
(26500, TRUE);  -- Hárfa

CREATE TABLE hangszerek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    katId INT NOT NULL,
    leltarId INT NOT NULL UNIQUE,
    nev VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (katId) REFERENCES kategoriak(id) ON DELETE CASCADE,
    FOREIGN KEY (leltarId) REFERENCES leltarak(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO hangszerek (katId, leltarId, nev) VALUES
(1, 1, 'Akusztikus zongora'),
(1, 2, 'Digitális zongora'),
(2, 3, 'Akusztikus gitár'),
(2, 4, 'Elektromos gitár'),
(3, 5, 'Hegedű'),
(3, 6, 'Cselló'),
(4, 7, 'Fuvola'),
(4, 8, 'Saxophon'),
(5, 9, 'Akusztikus dob'),
(5, 10, 'Elektromos dob'),
(6, 11, 'Énekóra (mikrofon + hangfal)'),
(7, 12, 'Hárfa');

-- =====================================================
-- TANÁROK
-- =====================================================

CREATE TABLE tanarok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    felhasznaloId INT NOT NULL,
    nev VARCHAR(255) NOT NULL,
    telefonsz VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    tapasztalat VARCHAR(50),
    vegzettseg VARCHAR(255),
    leiras TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (felhasznaloId) REFERENCES bejelentkezesek(id) ON DELETE CASCADE,
    UNIQUE KEY (felhasznaloId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO tanarok (felhasznaloId, nev, telefonsz, email, tapasztalat, vegzettseg, leiras) VALUES
(1, 'Kovács Anna', '06701234501', 'kovacs.anna@harmonia.hu', '15 év', 'Liszt Ferenc Zeneművészeti Egyetem', 'Versenyző növendékeket is nevel, specialitása a klasszikus zene.'),
(2, 'Nagy Péter', '06701234502', 'nagy.peter@harmonia.hu', '12 év', 'Jazzgitár szak, Royal Academy of Music', 'Jazz, pop és rock műfajokban egyaránt otthonosan mozog.'),
(3, 'Szabó Márta', '06701234503', 'szabo.marta@harmonia.hu', '18 év', 'Zeneakadémia, hegedűművész szak', 'Kamarazenekari tapasztalattal, szólistaként is aktív.'),
(4, 'Takács Gábor', '06701234504', 'takacs.gabor@harmonia.hu', '10 év', 'Modern Drummer School', 'Fúziós jazz és rock ütőhangszeres, session zenész.'),
(5, 'Kiss Éva', '06701234505', 'kiss.eva@harmonia.hu', '14 év', 'Zeneakadémia, fuvolaművész', 'Szimfonikus zenekari tag, egyéni és csoportos órákat is tart.'),
(6, 'Molnár Dávid', '06701234506', 'molnar.david@harmonia.hu', '9 év', 'Színház- és Filmművészeti Egyetem', 'Musical és popénekes, magánénekesként is aktív.');

CREATE TABLE tanar_mit_tud (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tanarId INT NOT NULL,
    hangszerId INT NOT NULL,
    FOREIGN KEY (tanarId) REFERENCES tanarok(id) ON DELETE CASCADE,
    FOREIGN KEY (hangszerId) REFERENCES hangszerek(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO tanar_mit_tud (tanarId, hangszerId) VALUES
(1, 1), (1, 2),  -- Kovács Anna: zongorák
(2, 3), (2, 4),  -- Nagy Péter: gitárok
(3, 5), (3, 6), (3, 12),  -- Szabó Márta: hegedű, cselló, hárfa
(4, 9), (4, 10),  -- Takács Gábor: dobok
(5, 7), (5, 8),  -- Kiss Éva: fuvola, saxophon
(6, 11);  -- Molnár Dávid: ének

-- =====================================================
-- DIÁKOK
-- =====================================================

CREATE TABLE diakok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    felhasznaloId INT NOT NULL,
    nev VARCHAR(255) NOT NULL,
    telefonsz VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    szulDatum DATE NOT NULL,
    sajatHangszer VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (felhasznaloId) REFERENCES bejelentkezesek(id) ON DELETE CASCADE,
    UNIQUE KEY (felhasznaloId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO diakok (felhasznaloId, nev, telefonsz, email, szulDatum, sajatHangszer) VALUES
(7, 'Kiss Péter', '06701234507', 'kiss.peter@email.hu', '2010-03-15', NULL),
(8, 'Nagy Anna', '06701234508', 'nagy.anna@email.hu', '2009-07-22', 'Akusztikus gitár'),
(9, 'Szabó Márton', '06701234509', 'szabo.marton@email.hu', '2008-06-18', 'Hegedű'),
(10, 'Tóth Gábor', '06701234510', 'toth.gabor@email.hu', '2011-01-10', NULL),
(11, 'Varga Réka', '06701234511', 'varga.reka@email.hu', '2010-12-05', NULL);

-- =====================================================
-- ÓRÁK
-- =====================================================

CREATE TABLE orak (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tanarId INT NOT NULL,
    diakId INT NOT NULL,
    hangszerId INT NOT NULL,
    tema VARCHAR(255) NOT NULL,
    ora_datum DATE NOT NULL,
    ora_ido TIME NOT NULL,
    statusz VARCHAR(50) DEFAULT 'tervezett',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (tanarId) REFERENCES tanarok(id) ON DELETE CASCADE,
    FOREIGN KEY (diakId) REFERENCES diakok(id) ON DELETE CASCADE,
    FOREIGN KEY (hangszerId) REFERENCES hangszerek(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO orak (tanarId, diakId, hangszerId, tema, ora_datum, ora_ido) VALUES
(1, 1, 1, 'Zongora alapok', '2024-03-20', '15:00:00'),
(1, 2, 2, 'Skála gyakorlat', '2024-03-21', '16:00:00'),
(2, 3, 3, 'Gitár technika', '2024-03-22', '14:00:00'),
(3, 4, 5, 'Hegedű posztúra', '2024-03-20', '17:00:00'),
(4, 5, 9, 'Dob alapritmus', '2024-03-24', '16:00:00');

-- =====================================================
-- KÖLCSÖNZÉSEK
-- =====================================================

CREATE TABLE kolcsonzesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hangszerId INT NOT NULL,
    diakId INT NOT NULL,
    kolcsKezd TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    kolcsVeg DATE NOT NULL,
    megjegyzes TEXT,
    statusz VARCHAR(50) DEFAULT 'aktiv',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (hangszerId) REFERENCES hangszerek(id) ON DELETE CASCADE,
    FOREIGN KEY (diakId) REFERENCES diakok(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

INSERT INTO kolcsonzesek (hangszerId, diakId, kolcsVeg, megjegyzes, statusz) VALUES
(1, 1, '2024-04-15', 'Zongora gyakorlás', 'aktiv'),
(3, 2, '2024-04-20', 'Gitár tanuláshoz', 'aktiv'),
(5, 3, '2024-04-25', 'Hegedű gyakorlás', 'aktiv'),
(7, 4, '2024-05-01', 'Fuvola órákra', 'aktiv'),
(9, 5, '2024-05-10', 'Dob gyakorlás', 'aktiv');

SET FOREIGN_KEY_CHECKS = 1;