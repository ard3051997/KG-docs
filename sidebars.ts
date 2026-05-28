/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        'installation',
        'configuration',
        'playground',
        'typescript-support',
      ],
    },
    {
      type: 'category',
      label: 'Human Strategic Layer (Human Org)',
      link: {
        type: 'generated-index',
        title: 'Human Strategic Layer',
        description: 'Standard Operating Procedures and manuals for human governance roles at KalaGato.',
      },
      collapsed: false,
      items: [
        'human_org/README',
        'human_org/onboarding',
        'human_org/employee-policies',
        'human_org/incident-management',
        'human_org/release-sop',
        'human_org/prd-case-study',
        'human_org/due-diligence',
        'human_org/asset-transfer',
        'human_org/admob-playbook',
        'human_org/testing-checklists',
        {
          type: 'category',
          label: 'Personnel Directory & Roles',
          collapsed: true,
          items: [
            'human_org/ceo',
            'human_org/growth_partner',
            'human_org/portfolio_pm',
            'human_org/monetization_lead',
            'human_org/cto',
            'human_org/aso_lead',
            'human_org/ios_dev',
            'human_org/android_dev',
            'human_org/systems_engineer',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Agentic Operational Layer (Agent Org)',
      link: {
        type: 'generated-index',
        title: 'KalaGato Agentic Org',
        description: 'Architectural specifications and manuals for KalaGato autonomous mobile growth & tech agents.',
      },
      collapsed: false,
      items: [
        'agent_org/README',
        'agent_org/release-sop',
        {
          type: 'category',
          label: 'Orchestrator Agents (Tier 0)',
          items: [
            'agent_org/chief-of-staff',
            'agent_org/portfolio-pm',
          ],
        },
        {
          type: 'category',
          label: 'Growth Agents (Tier 1)',
          items: [
            'agent_org/growth-manager',
            'agent_org/aso-keyword',
            'agent_org/admob-mediation',
            'agent_org/paywall-pricing',
            'agent_org/ua-paid',
            'agent_org/attribution',
            'agent_org/crm-lifecycle',
            'agent_org/store-creatives',
          ],
        },
        {
          type: 'category',
          label: 'Tech Agents (Tier 2)',
          items: [
            'agent_org/tech-manager',
            'agent_org/android-dev',
            'agent_org/ios-dev',
            'agent_org/release-train',
            'agent_org/qa-test',
            'agent_org/observability',
            'agent_org/security-compliance',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
