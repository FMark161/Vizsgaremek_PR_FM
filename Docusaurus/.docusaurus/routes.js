import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '53a'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '179'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '3d0'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '811'),
            routes: [
              {
                path: '/docs/Backend/Architecture',
                component: ComponentCreator('/docs/Backend/Architecture', '9a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Backend/Testing',
                component: ComponentCreator('/docs/Backend/Testing', 'bc2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Database/Er-model',
                component: ComponentCreator('/docs/Database/Er-model', '19c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Database/Tables',
                component: ComponentCreator('/docs/Database/Tables', '2af'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Frontend/Pages',
                component: ComponentCreator('/docs/Frontend/Pages', '7e6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Frontend/Selenium-tests',
                component: ComponentCreator('/docs/Frontend/Selenium-tests', '08e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Node modulok',
                component: ComponentCreator('/docs/Node modulok', '14d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Reflektálás',
                component: ComponentCreator('/docs/Reflektálás', '88c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/Telepítés',
                component: ComponentCreator('/docs/Telepítés', 'eea'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
