# 0.2 Portfolio PM Agent (PPM)

**Tier:** 0 Orchestration
**Reports to:** CEO (via Chief of Staff)
**Replaces:** The portfolio-level prioritization layer what the PM and Growth Leads collectively did when deciding which apps got attention in which week, and what tradeoffs to make across the 15+ app portfolio.

---

## Charter

The Portfolio PM agent owns the **"what to work on across 15+ apps" question**. It does not execute. It allocates attention budget across the portfolio every week, sets per-app OKRs, and tells the Growth Manager and Tech Manager which apps to prioritize.

If a worker agent's queue is contested ("the ASO agent has time for 3 apps this week, which 3?"), the Portfolio PM decides.

---

## Inputs

- Live per-app dashboard from Supabase: MRR, MAU, ARPDAU, crash-free %, last release date, current store rating, ASO rank trend
- The 2026 Delegation Matrix (now a Notion database, not a doc) defines which apps are "core revenue", "experimental", "harvest", "wind-down"
- Quarterly OKRs you set (Notion)
- The Growth Manager's and Tech Manager's "I need more capacity for X" requests

---

## Outputs

1. **Monday Portfolio Plan (Notion + Slack)** - Per-app status: tier (Core / Experimental / Harvest / Wind-down), current OKR, this-week's focus
 - Capacity allocation: how many ASO cycles, paywall experiments, release slots, and dev-hours are reserved per app
 - "Don't touch this week" list

2. **Per-app OKRs (quarterly, regenerated monthly with deltas)** - One numeric goal per app (e.g. "Ryn VPN: hold 13M MAU, lift ARPDAU to $X")
 - Tied to portfolio target (the $300K MRR by Dec 2026 model)

3. **Tier reassignments** - Promotes/demotes apps between tiers based on rolling 60-day performance. Tier changes are proposed to you via the morning brief; you have one-click approve/reject.

---

## Tools / MCP needs

- `supabase-mcp`: read agent_runs, app_metrics, financial_metrics tables
- `notion-mcp`: read delegation matrix, read/write OKRs and weekly plans
- Internal callable handles: Growth Manager, Tech Manager (it doesn't talk to workers directly)

---

## KPIs

| Metric | Target |
|---|---|
| Portfolio MRR vs plan | Track to $300K by Dec 2026 model |
| % of agent capacity spent on Core-tier apps | 70% |
| Stale apps (no agent touched in 30d, tier Wind-down) | 0 |
| OKRs without measurable update at month-end | 0 |

---

## Decision logic tiering

| Tier | Criteria | Agent treatment |
|---|---|---|
| **Core** | Top 5 by MRR OR strategic (e.g. Ryn VPN scale) | Full agent coverage, weekly experiments |
| **Experimental** | New launch, &lt;90 days old, OR rebuild in progress | Capped spend, fast-fail review at day 60 |
| **Harvest** | Profitable but declining, no growth budget | ASO + mediation only, no new features |
| **Wind-down** | Costs > revenue, no path back | Maintenance only, plan removal from stores |

Tier reassignments trigger automatically on rolling 60-day data, then wait for your approval.

---

## Historical context

This replaces the most painful part of running a 15+ app portfolio: deciding **which apps deserve attention this week**. You and the PMs handled this through:
- The 2026 delegation matrix (PM/Growth rotation queue) solved the "who" but not the "what now"
- The $130K$300K MRR financial model gave the destination but needed weekly steering
- Ad-hoc lead-led portfolio reviews

The pattern that consistently broke down: Core apps (Ryn VPN, EMI Calculator, the AdMob mediation work) absorbed all attention, and 34 mid-tier apps quietly bit-rotted between reviews. Then someone would notice 60 days later and panic-prioritize, which is the worst time to do it.

The Portfolio PM agent makes the tier explicit and enforces capacity allocation upfront, so the Growth/Tech managers can't accidentally over-invest in one app.

It also subsumes the team's "rotation queue" function the agent literally maintains the queue and is unsentimental about it.

---

## What it explicitly does NOT do

- It does NOT make strategic bets (kill an app, acquire one, enter a new vertical). Those come from you.
- It does NOT do creative/product ideation. Worker agents (or you) propose experiments; PPM only prioritizes.
- It does NOT set pricing strategy. That's the Paywall agent with your approval.

---

## Failure modes

- **Over-indexing on revenue**: Without your strategic input, it would always favor highest-MRR apps and starve experimental ones. Mitigation: the tier ratios are configured by you, not learned.
- **Tier ping-pong**: Apps oscillating between tiers on noisy data. Mitigation: 60-day rolling window + hysteresis (must clear threshold by 15% for 2 consecutive checks).

---

## Kill switch

Env flag `PPM_AGENT_ENABLED=false` freezes tier assignments and weekly plan to last-known-good state. Manager agents continue executing against the frozen plan.
