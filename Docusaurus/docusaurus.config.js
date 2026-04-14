// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Harmónia Zeneiskola', // Megváltoztatva
  tagline: 'Zeneiskolai adminisztrációs és kölcsönző rendszer', // Megváltoztatva
  favicon: 'img/logo_feherHatter.png',

  future: {
    v4: true,
  },

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  // Itt töltheted ki a saját adataidat, ha Githubra teszed fel
  organizationName: 'Harmonia-Projekt', 
  projectName: 'harmonia-docs', 

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'hu', // Magyar nyelv beállítása
    locales: ['hu'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false, // Ha nincs szükségetek blogra, itt kikapcsolható
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      
      // --- TÉMAVÁLTÓ KIKAPCSOLÁSA ---
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true, // Eltünteti a nap/hold ikont
        respectPrefersColorScheme: false,
      },

      navbar: {
        title: 'Harmónia Zeneiskola', // Megváltoztatva
        logo: {
          alt: 'Harmónia Logo',
          src: 'img/logo_feherHatter.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Dokumentáció',
          },
          {
            href: 'https://github.com/FMark161/Vizsgaremek_PR_FM',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark', // Világos lábléc jobban illik a fehér-türkizhez
        copyright: `© 2026 Harmónia Zeneiskola. Minden jog fenntartva.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;