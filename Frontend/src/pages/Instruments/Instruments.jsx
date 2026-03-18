import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMusic, 
  FaStar,
  FaShoppingCart
} from 'react-icons/fa';
import './Instruments.css';

const Instruments = () => {
  const [selectedFamily, setSelectedFamily] = useState('all');

  const instrumentFamilies = [
    {
      id: 'strings',
      name: 'Vonós hangszerek',
      description: 'A vonós hangszerek családjába tartozik a hegedű, brácsa, cselló és nagybőgő. Ezek a hangszerek adják a zenekar gerincét, jellegzetes, éneklő hangjukkal.',
      examples: ['Hegedű', 'Brácsa', 'Cselló', 'Nagybőgő'],
      funFact: 'A hegedűnek 4 húrja van, de a vonóval akár 4 hangot is meg lehet szólaltatni egyszerre.'
    },
    {
      id: 'woodwinds',
      name: 'Fafúvós hangszerek',
      description: 'A fafúvósok közé tartozik a fuvola, klarinét, oboa és fagott. Hangjukat levegővel keltik, és bár eredetileg fából készültek, ma már fémből is készülhetnek.',
      examples: ['Fuvola', 'Klarinét', 'Oboa', 'Fagott', 'Saxophon'],
      funFact: 'A fuvola a legrégebbi hangszer, az őskorban is létezett már csontból készült változata.'
    },
    {
      id: 'brass',
      name: 'Rézfúvós hangszerek',
      description: 'A rézfúvósok családjába tartozik a trombita, kürt, harsona és tuba. Hangjuk erőteljes, fényes, és a zenekarban gyakran a hősiességet vagy az ünnepélyességet szimbolizálják.',
      examples: ['Trombita', 'Kürt', 'Harsona', 'Tuba'],
      funFact: 'A trombita őseit már az ókori Egyiptomban is használták, de akkor még nem fémből, hanem fából és állati szarvakból készült.'
    },
    {
      id: 'percussion',
      name: 'Ütőhangszerek',
      description: 'Az ütőhangszerek családja rendkívül változatos: dobfelszerelés, xilofon, cintányérok, harangjáték. Ezek a hangszerek adják a ritmust és a dinamikai sokszínűséget.',
      examples: ['Dobfelszerelés', 'Cintányér', 'Xilofon', 'Harangjáték', 'Üstdob'],
      funFact: 'A dob az egyik legősibb hangszer, szinte minden kultúrában megtalálható volt valamilyen formában.'
    },
    {
      id: 'keyboards',
      name: 'Billentyűs hangszerek',
      description: 'A billentyűsök közé tartozik a zongora, orgona, csembaló és a modern szintetizátor. Ezek a hangszerek egyszerre több szólamot is meg tudnak szólaltatni.',
      examples: ['Zongora', 'Orgona', 'Csembaló', 'Szintetizátor'],
      funFact: 'A zongora billentyűzetén 52 fehér és 36 fekete billentyű található, összesen 88.'
    },
    {
      id: 'plucked',
      name: 'Pengetős hangszerek',
      description: 'A pengetős hangszerek közé tartozik a gitár, hárfa, lant, mandolin. Hangjukat a húrok pengetésével vagy csippentésével keltik.',
      examples: ['Akusztikus gitár', 'Elektromos gitár', 'Hárfa', 'Mandel', 'Nagybőgő (pengetve)'],
      funFact: 'A gitár a világ egyik legnépszerűbb hangszere, szinte minden zenei műfajban megtalálható.'
    },
    {
      id: 'voice',
      name: 'Ének',
      description: 'Az ének a legősibb "hangszer", amely mindenkinél elérhető. Az emberi hang rendkívül sokszínű: szoprán, alt, tenor, basszus.',
      examples: ['Szoprán', 'Alt', 'Tenor', 'Basszus', 'Népdaléneklés'],
      funFact: 'Az emberi hang képes a legapróbb érzelmi árnyalatokat is kifejezni, ezért tartják a legkifejezőbb hangszernek.'
    },
    {
      id: 'electronic',
      name: 'Elektronikus hangszerek',
      description: 'A modern elektronikus hangszerek, mint a szintetizátor, theremin vagy dobgép, teljesen új hangzásvilágot nyitottak meg a 20. században.',
      examples: ['Szintetizátor', 'Theremin', 'Dobgép', 'Sampler'],
      funFact: 'A theremin az egyetlen hangszer, amelyet anélkül lehet megszólaltatni, hogy hozzáérnénk.'
    }
  ];

  const families = [
    { id: 'all', name: 'Összes hangszer' },
    { id: 'strings', name: 'Vonósok' },
    { id: 'woodwinds', name: 'Fafúvósok' },
    { id: 'brass', name: 'Rézfúvósok' },
    { id: 'percussion', name: 'Ütősök' },
    { id: 'keyboards', name: 'Billentyűsök' },
    { id: 'plucked', name: 'Pengetősök' },
    { id: 'voice', name: 'Ének' },
    { id: 'electronic', name: 'Elektronikus' }
  ];

  const filteredFamilies = selectedFamily === 'all' 
    ? instrumentFamilies 
    : instrumentFamilies.filter(f => f.id === selectedFamily);

  return (
    <div className="instruments">
      {/* Hero szekció */}
      <section className="instruments-hero">
        <div className="container">
          <h1>Hangszerek világa</h1>
          <p className="hero-description">
            Ismerd meg a hangszerek csodálatos világát! Az alábbiakban bemutatjuk a főbb hangszer-családokat 
            és azok jellemzőit. Bármelyik felkelti az érdeklődésed, nálunk megtanulhatod!
          </p>
        </div>
      </section>

      {/* Szűrők */}
      <section className="instruments-filter">
        <div className="container">
          <div className="family-filters">
            {families.map(family => (
              <button
                key={family.id}
                className={`family-btn ${selectedFamily === family.id ? 'active' : ''}`}
                onClick={() => setSelectedFamily(family.id)}
              >
                {family.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hangszer-családok listája - IKONOK NÉLKÜL */}
      <section className="instruments-list">
        <div className="container">
          <div className="families-grid">
            {filteredFamilies.map(family => (
              <div key={family.id} className="family-card">
                <div className="family-header">
                  <h2>{family.name}</h2>
                </div>
                <div className="family-content">
                  <p className="family-description">{family.description}</p>
                  
                  <div className="family-examples">
                    <h3>Példák:</h3>
                    <div className="example-tags">
                      {family.examples.map((example, index) => (
                        <span key={index} className="example-tag">{example}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="fun-fact">
                    <strong>Érdekesség:</strong>
                    <p>{family.funFact}</p>
                  </div>
                  
                  <div className="family-footer">
                    <Link to="/application" className="btn-learn">
                      Érdekel a tanulás
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Információs szekció - ITT MARADHATNAK AZ IKONOK */}
      <section className="instruments-info">
        <div className="container">
          <div className="info-boxes">
            <div className="info-box">
              <FaMusic className="info-icon" />
              <h3>Minden hangszerre tanítunk</h3>
              <p>Akár klasszikus, akár modern hangszerre vágysz, nálunk megtanulhatod.</p>
            </div>
            <div className="info-box">
              <FaStar className="info-icon" />
              <h3>Kiváló oktatók</h3>
              <p>Minden hangszer-családhoz tapasztalt, diplomás zenetanárok segítenek.</p>
            </div>
            <div className="info-box">
              <FaShoppingCart className="info-icon" />
              <h3>Hangszer kölcsönzés</h3>
              <p>A tanuláshoz szükséges hangszereket kedvezményesen kölcsönözheted nálunk.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Instruments;