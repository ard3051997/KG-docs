import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'KalaGato',
  tagline: 'The Mobile App Portfolio Scaling Engine',
  favicon: 'img/kalagato.svg',

  future: {
    v4: true,
  },

  url: 'https://ard3051997.github.io',
  baseUrl: process.env.BASE_URL ?? '/',

  organizationName: 'ard3051997',
  projectName: 'KG-docs',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    format: 'detect',
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ard3051997/kalagato-docs/edit/master/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    announcementBar: {
      id: 'announcementBar-v1_0_0',
      content: '<b>KalaGato Internal Knowledge Base &amp; SOP Playbook Center</b>',
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      hideOnScroll: true,
      title: 'KalaGato',
      logo: {
        alt: 'KalaGato Logo',
        src: 'img/kalagato.svg',
        srcDark: 'img/kalagato.svg',
        width: 32,
        height: 32,
      },
      items: [
        {
          type: 'doc',
          position: 'left',
          docId: 'introduction',
          label: 'Docs',
        },
        {
          to: '/human-org',
          label: 'Human Org Chart',
          position: 'left',
        },
        {
          to: '/editor',
          label: 'Docs Editor',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Introduction', to: 'docs'},
            {label: 'Human Org & SOPs', to: 'docs/human_org'},
            {label: 'Agentic Blueprint', to: 'docs/agent_org'},
            {label: 'Release SOP', to: 'docs/human_org/release-sop'},
          ],
        },
        {
          title: 'Operations',
          items: [
            {label: 'Incident Management', to: 'docs/human_org/incident-management'},
            {label: 'Employee Policies', to: 'docs/human_org/employee-policies'},
            {label: 'M&A Due Diligence', to: 'docs/human_org/due-diligence'},
            {label: 'AdMob Playbook', to: 'docs/human_org/admob-playbook'},
          ],
        },
        {
          title: 'Company',
          items: [
            {label: 'KalaGato Website', href: 'https://www.kalagato.ai'},
            {label: 'LinkedIn', href: 'https://www.linkedin.com/company/kalagato'},
            {label: 'Contact Us', href: 'mailto:hello@kalagato.co'},
          ],
        },
        {
          title: 'Legal',
          items: [
            {label: 'Privacy Policy', href: 'https://www.kalagato.ai/privacy-policy'},
            {label: 'Terms of Service', href: 'https://www.kalagato.ai/terms'},
          ],
        },
      ],
      logo: {
        alt: 'KalaGato Logo',
        src: '/img/kalagato.svg',
        href: 'https://kalagato.ai',
        width: 60,
        height: 60,
      },
      copyright: `Copyright © ${new Date().getFullYear()} KalaGato (Human Data SG Pte. Ltd.). All Rights Reserved.`,
    },
    prism: {
      additionalLanguages: ['java', 'bash', 'diff', 'json', 'scss'],
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
