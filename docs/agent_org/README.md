---
slug: /agent_org
sidebar_label: Overview
---

# Kalagato Agentic Org Mobile Growth & Tech

**Version:** 1.0
**Scope:** Replace human-operated Mobile Growth and Tech functions with autonomous agents, leaving you (CEO) as the only human in the loop for strategy, capital allocation, and edge-case approval.

**Out of scope:** Finance, Legal, HR, BD/Acquisitions, Content/UGC creator management. Those remain human-operated for now.

---

## Design Principles

1. **One agent = one job-to-be-done.** No "do everything" agents. Each agent has a single, measurable output.
2. **Two-tier hierarchy.** Manager agents own a function, plan work, and call worker agents. Workers execute atomic tasks. This matches how PMs operated as leaders over executors.
3. **Humans approve only spend, store-facing copy, and irreversible actions.** Everything else runs on autopilot with daily/weekly digests.
4. **Built on the existing stack.** Reuses what's already production at Kalagato/OpenHire: Claude for reasoning, FastMCP for tool layer (the AdMob mediation server pattern), Supabase for state, n8n for triggers, Hetzner/Cloudflare Workers for compute. No new vendors unless justified.
5. **Every agent has a kill switch.** A single env flag pauses the agent and routes its queue to a human-review inbox.

---

## Org Chart (Visual)

```
 
 CEO (Human) 
 Strategy / Capital / Veto 
 
 
 
 
 
 CHIEF OF STAFF PORTFOLIO PM 
 Agent (CoS) weekly digests Agent (PPM) 
 Routes & briefs Per-app OKRs 
 
 
 
 
 
 MOBILE GROWTH MANAGER TECH MANAGER 
 Owns: revenue, users Owns: ship + uptime 
 
 
 
 
 
 ASO MEDI PWL UAQ ATR CRM STR 
 ATION PAY UA ATTR LCM STORE 
 
 
 
 
 
 AND iOS REL QA OBS SEC 
 ROID DEV EASE TEST ERVE /COMP 
 
 
 

 GROWTH workers: TECH workers:
 ASO = ASO/Keyword Agent ANDROID = Android Build & Feature Agent
 MEDIATION = AdMob/Waterfall Agent iOS = iOS Build & Feature Agent
 PWLPAY = Paywall/Pricing Agent RELEASE = Release Train Agent
 UAUA = UA / Paid Marketing Agent QATEST = QA / E2E Test Agent
 ATTRATTR = First-Party Attribution OBSERVE = Observability / Crash Agent
 CRMLCM = CRM / Lifecycle Agent SECCOMP = Security & Compliance Agent
 STRSTORE = Store Listing / Creatives
```

---

## Function Index

Each function below has a dedicated spec page. Specs cover: charter, inputs, outputs, tools/MCP needs, KPIs, escalation rules, and historical context from how this work was previously done at Kalagato.

### Tier 0 Orchestration

| # | Function | File | Replaces |
|---|---|---|---|
| 0.1 | Chief of Staff Agent | [`chief-of-staff.md`](./chief-of-staff.md) | The "CEO-as-router" function triaging Slack, scheduling, follow-ups |
| 0.2 | Portfolio PM Agent | [`portfolio-pm.md`](./portfolio-pm.md) | PM + Monetization + Growth portfolio-level prioritization |

### Tier 1 Mobile Growth

| # | Function | File | Replaces |
|---|---|---|---|
| 1.0 | Mobile Growth Manager | [`growth-manager.md`](./growth-manager.md) | Head of Growth / your direct growth oversight |
| 1.1 | ASO & Keyword Agent | [`aso-keyword.md`](./aso-keyword.md) | ASO Lead (ASO depth) + Inverse Pyramid Method dashboard |
| 1.2 | AdMob Mediation Agent | [`admob-mediation.md`](./admob-mediation.md) | The FastMCP AdMob mediation server you're already building |
| 1.3 | Paywall & Pricing Agent | [`paywall-pricing.md`](./paywall-pricing.md) | The Superwall 158% lift case-study workflow |
| 1.4 | UA & Paid Marketing Agent | [`ua-paid.md`](./ua-paid.md) | UA buyer (currently outsourced/ad-hoc) |
| 1.5 | First-Party Attribution Agent | [`attribution.md`](./attribution.md) | The proprietary first-party attribution system |
| 1.6 | CRM / Lifecycle Agent | [`crm-lifecycle.md`](./crm-lifecycle.md) | Push/email lifecycle (currently underbuilt at most apps) |
| 1.7 | Store Listing & Creatives Agent | [`store-creatives.md`](./store-creatives.md) | UGC Creator + ASO creative iteration |

### Tier 2 Tech

| # | Function | File | Replaces |
|---|---|---|---|
| 2.0 | Tech Manager Agent | [`tech-manager.md`](./tech-manager.md) | Eng lead / your tech oversight |
| 2.1 | Android Dev Agent | [`android-dev.md`](./android-dev.md) | Android developer |
| 2.2 | iOS Dev Agent | [`ios-dev.md`](./ios-dev.md) | iOS developer |
| 2.3 | Release Train Agent | [`release-train.md`](./release-train.md) | Manual release coordination across 15+ apps |
| 2.4 | QA & E2E Test Agent | [`qa-test.md`](./qa-test.md) | Mostly manual QA today |
| 2.5 | Observability & Crash Agent | [`observability.md`](./observability.md) | Reactive Crashlytics monitoring |
| 2.6 | Security & Compliance Agent | [`security-compliance.md`](./security-compliance.md) | Reactive policy responses (Play/App Store rejections) |

---

## Human Touchpoints (Daily)

You stay involved at these five gates only:

1. **Morning brief (5 min)** CoS posts a Slack digest: yesterday's revenue/installs delta, anomalies, pending approvals.
2. **Spend approvals (as needed)** UA agent requests budget changes >50K/day or new geos. Paywall agent requests new price points.
3. **Store-facing copy & creatives (weekly batch)** Approve/reject the ASO and Creatives agent's proposed listings/screenshots before they go live.
4. **Release approvals (per release)** One-click approve the Release Train agent's staged rollout plan.
5. **Policy escalations (rare)** Play Store / App Store rejections that the Security & Compliance agent can't resolve via known playbooks.

Everything else runs.

---

## Stack Summary

| Layer | Component | Rationale |
|---|---|---|
| Reasoning | Claude (Opus for managers, Sonnet for workers, Haiku for high-volume classify tasks) | Already the default in your OpenHire stack |
| Tool layer | FastMCP servers (one per external API: AdMob, Play Console, App Store Connect, RevenueCat, Superwall, Firebase, MMP, Slack, Notion) | Pattern is proven you're already building the AdMob one |
| Orchestration | n8n on Hetzner VPS for scheduled triggers + event bus | Same box that runs Nanobot today |
| State | Supabase (Postgres + Storage + Realtime) | Already the OpenHire backend; reuse |
| Long-term memory | Per-agent Notion database + Supabase vector store | Notion for human-readable history, vector store for retrieval |
| Inbox / digests | Slack | Where you already live |
| Approval UI | Slack Block Kit buttons n8n webhook | Zero new UI to build |
| Observability | Langfuse (agent traces) + Sentry (worker errors) + Better Stack (uptime) | Standard |

---

## Build Sequence (90-day plan)

**Days 130 Foundation** - Stand up FastMCP servers for AdMob (already in flight), Play Console, App Store Connect, RevenueCat, Firebase.
- Build the Observability Agent first (it's the safety net for everything else).
- Migrate the existing ASO Inverse Pyramid dashboard into the ASO Agent.

**Days 3160 Growth loop closure** - Ship Mediation Agent, Paywall Agent, Attribution Agent. These three are the revenue engine and you already have the most context.
- Wire the Growth Manager on top.

**Days 6190 Tech loop closure + UA** - Ship Release Train + QA + Android/iOS Dev agents (these are the hardest because code-gen quality varies).
- Bring up UA Agent last it spends money, so it gets the most guardrails.
- Decommission overlapping human roles.

---

## What this is NOT

- Not a replacement for the CTO's judgment on architecture decisions.
- Not a replacement for you on M&A, pricing strategy, or geo expansion bets.
- Not a content/brand engine UGC and personal branding stay human-led.
- Not an autonomous spend agent. UA and paywall changes still pass through you for amounts above defined thresholds.
