import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Adatbázis Tervezés',
    image: '/img/database.png',
    description: (
      <>
        A rendszer egy 12 táblás MySQL adatbázisra épül, amely kezeli a diákokat, 
        tanárokat, hangszereket és a kölcsönzéseket.
      </>
    ),
  },
  {
    title: 'Node.js & Docker',
    image: '/img/docker.png',
    description: (
      <>
        A backend Express.js alapú, MVC architektúrát követ, és Docker 
        konténerekben fut az egységes környezet biztosítása érdekében.
      </>
    ),
  },
  {
    title: 'Modern Frontend',
    image: '/img/Frontend.png',
    description: (
      <>
        A felhasználói felület reszponzív, Inter betűtípust használ, 
        és lehetővé teszi a hangszerek egyszerű böngészését és adminisztrációját.
      </>
    ),
  },
];

function Feature({title, image, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        {image && <img src={image} alt={title} style={{maxWidth: '150px', marginBottom: '10px'}} />}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}