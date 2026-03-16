// Események adatai - központi helyen
export const eventsData = [
  {
    id: 1,
    title: "Nyílt nap a zeneiskolában",
    date: "2024. március 15.",
    time: "14:00 - 18:00",
    location: "Harmónia Zeneiskola, Budapest",
    description: "Ismerd meg hangszereinket és tanárainkat! Kipróbálhatod a hangszereket és személyesen beszélgethetsz oktatóinkkal. A nap folyamán bemutató órákat tartunk, ahol betekintést nyerhetsz a zeneoktatás rejtelmeibe.",
    longDescription: "A nyílt nap keretében lehetőséged lesz megismerkedni iskolánk hangszereivel és oktatóival. Kipróbálhatod a különböző hangszereket, részt vehetsz bemutató órákon, és személyesen beszélgethetsz oktatóinkkal a képzési lehetőségekről. Akár gyermekednek keresel zeneiskolát, akár magad szeretnél új hangszeren tanulni, ez a nap tökéletes alkalom a tájékozódásra.",
    image: "https://images.unsplash.com/photo-1461783470466-3a8b7a0f8a3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "nyiltnap",
    featured: true
  },
  {
    id: 2,
    title: "Tavaszi hangverseny",
    date: "2024. április 20.",
    time: "18:00 - 20:00",
    location: "Budai Vigadó, Budapest",
    description: "Tanulóink éves bemutató koncertje. Változatos műsorral készülnek növendékeink a klasszikustól a modernig.",
    longDescription: "Hagyományos tavaszi hangversenyünkön növendékeink mutatják be az elmúlt időszakban tanultakat. A műsorban szerepelnek klasszikus zongoradarabok, gitárelőadások, hegedűszólók, kamarazenei produkciók és énekszámok is. Szeretettel várunk minden kedves érdeklődőt!",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "koncert",
    featured: true
  },
  {
    id: 3,
    title: "Gitár mesterkurzus",
    date: "2024. május 5.",
    time: "10:00 - 16:00",
    location: "Harmónia Zeneiskola, Budapest",
    description: "Vendégoktatóval a gitározás fortélyai. Különleges technikák és improvizációs gyakorlatok haladóknak.",
    longDescription: "A mesterkurzusra várjuk azokat a gitárosokat, akik szeretnék elmélyíteni tudásukat. A nap folyamán szó lesz technikai fejlesztésről, improvizációs gyakorlatokról, különböző zenei stílusok sajátosságairól. A részvétel előzetes jelentkezéshez kötött, létszámkorlátozás miatt.",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "mesterkurzus",
    featured: true
  },
  {
    id: 4,
    title: "Növendék hangverseny",
    date: "2024. június 10.",
    time: "17:00 - 19:00",
    location: "Harmónia Zeneiskola, Budapest",
    description: "Év végi bemutató, ahol a legkisebbektől a haladókig mindenki megmutathatja, mit tanult.",
    longDescription: "Az évzáró hangversenyen minden növendékünk lehetőséget kap a fellépésre. Ez az alkalom nem verseny, hanem ünnep, ahol a közös muzsikálás öröméé a főszerep. Szeretettel várjuk a családtagokat és barátokat!",
    image: "https://images.unsplash.com/photo-1460723237483-7f31b0498b9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "koncert",
    featured: false
  },
  {
    id: 5,
    title: "Zenei tábor",
    date: "2024. július 15-19.",
    time: "9:00 - 16:00",
    location: "Harmónia Zeneiskola, Budapest",
    description: "Nyári zenei tábor gyerekeknek, ahol játékos formában ismerkedhetnek a zenével.",
    longDescription: "Egyhetes nyári táborunkban a gyerekek játékos formában ismerkedhetnek a hangszerekkel, ritmussal, énekléssel. A tábor végén egy rövid bemutatóval készülünk a szülőknek. Minden nap lesz kézműves foglalkozás, közös játék és persze sok-sok muzsikálás.",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "tabor",
    featured: false
  },
  {
    id: 6,
    title: "Őszi fesztivál",
    date: "2024. október 12.",
    time: "15:00 - 20:00",
    location: "Jókai tér, Budapest",
    description: "Szabadtéri rendezvény, ahol növendékeink és tanáraink adnak koncertet.",
    longDescription: "Az őszi fesztivál keretében a Jókai téren várjuk az érdeklődőket. Iskolánk növendékei és tanárai adnak koncertet a nap folyamán, emellett lehetőség lesz hangszerek kipróbálására és betekintésre a zeneiskola életébe.",
    image: "https://images.unsplash.com/photo-1461783470466-3a8b7a0f8a3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "fesztival",
    featured: true
  }
];

// Segédfüggvény a kiemelt események lekéréséhez
export const getFeaturedEvents = () => {
  return eventsData.filter(event => event.featured === true);
};

// Segédfüggvény az összes esemény lekéréséhez
export const getAllEvents = () => {
  return eventsData;
};

// Segédfüggvény egy esemény lekéréséhez ID alapján
export const getEventById = (id) => {
  return eventsData.find(event => event.id === id);
};