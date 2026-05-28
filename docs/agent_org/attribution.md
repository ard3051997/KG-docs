# 1.5 First-Party Attribution Agent

**Tier:** 1 Mobile Growth (worker)
**Reports to:** Mobile Growth Manager
**Replaces:** Manual operation of the proprietary first-party attribution system Kalagato built. Becomes the system of record for "where do users actually come from and what are they worth."

---

## Charter

Be the **single source of truth for revenue attribution and LTV** across the portfolio. Every other agent's decisions are only as good as this agent's signal so it owns measurement integrity, anomaly detection, and the cohort LTV model.

This is not a marketing-attribution-tool wrapper. It's the team that operates the first-party attribution infrastructure you already built, plus a predicted-LTV model on top.

---

## Inputs

- Raw first-party event stream from every app (install, session, paywall_view, trial_start, conversion, churn, ad_impression, etc.)
- MMP postbacks (AppsFlyer / Adjust / SKAN) for cross-validation
- Store-side data: Play Console install attribution, App Store Connect SKAN summaries
- AdMob + RevenueCat revenue (the truth on $$ in)
- UA spend per `(channel, geo, campaign, creative)` from UA Agent

---

## Outputs

1. **Cohort revenue & LTV (daily refresh)** - Per `(app, acquisition_source, geo, install_date_bucket)`: D1 / D3 / D7 / D14 / D30 / D60 / D90 revenue
 - Predicted LTV via a survival model (likely a gradient-boosted regressor on cohort features + retention curve)
 - Confidence intervals per cohort, not point estimates

2. **Attribution truth tables** - For each install, the agent's "best attribution call" across MMP, first-party, and store data
 - Discrepancies flagged when MMP and first-party diverge >X%

3. **Funnel diagnostics** - Install activation trial paid retained, per app, per source
 - Step-drop alerts when any step's conversion drops >2σ vs baseline

4. **Channel ROAS truth (feeds UA Agent)** - Every campaign reconciled to actual revenue, not MMP-modeled revenue
 - Used as the binding signal for UA Agent's reallocations

5. **Anomaly alerts** - Revenue anomalies routed to the Mobile Growth Manager with root-cause hypotheses (drop in ad fill, paywall regression, churn spike, etc.)

---

## Tools / MCP needs

- `supabase-mcp`: primary data store (the first-party event tables)
- `bigquery-mcp` or `clickhouse-mcp`: for analytical queries at scale (depending on what backs your current attribution stack)
- `appsflyer-mcp` / `adjust-mcp`: MMP cross-check
- `play-console-mcp`, `app-store-connect-mcp`: store attribution data
- `firebase-mcp`: device-level cross-check
- `revenuecat-mcp`: subscription revenue truth
- `admob-mcp` (via the Mediation Agent's FastMCP server): ad revenue truth
- Python ML libs in container: lightgbm/xgboost for LTV model, lifelines for survival analysis

---

## KPIs

| Metric | Target |
|---|---|
| MMP-to-first-party attribution match rate | 92% (mismatches are investigated, not ignored) |
| LTV prediction accuracy (MAPE on D30D90) | 15% on Core apps |
| Anomaly detection precision | 80% (most flagged anomalies are real) |
| Time-to-detect revenue anomaly | < 4 hours |
| Cohort report freshness | < 24h lag, ideally near-real-time on Core apps |

---

## Historical context

The first-party attribution system is one of Kalagato's **strategic moats**. Built originally because:
- MMP attribution post-iOS-14.5 became unreliable for granular optimization
- Subscription apps (Ryn VPN especially) need cohort revenue, not just install attribution
- AdMob ARPDAU truth requires impression-level event capture that MMPs don't provide

The system has historically operated as **infrastructure plus dashboards** engineering owns the pipeline, PMs read the dashboards. The gap: nobody systematically **investigated** anomalies. A revenue dip would show up in the dashboard, get noticed maybe 3 days later, and root cause analysis would take another week.

The agent collapses that loop: anomaly fires within hours, root-cause hypothesis is generated with supporting evidence, the Growth Manager gets a routable signal instead of a dashboard delta.

It also industrializes the **predicted-LTV** function. Today this exists as ad-hoc cohort analysis you've personally done it for major decisions (the Superwall case study work, the EMI Calculator AdMob analysis, the financial model targeting $300K MRR by Dec 2026). The agent makes it a continuous, queryable service that every other agent can call.

This is the agent most aligned with what made Kalagato profitable: **knowing what users are actually worth, not what the MMP says they're worth.** ---

## How other agents use it

- **UA Agent**: queries predicted LTV per `(channel, geo, creative)` for bid/budget decisions. Cannot bypass and use D1 ROAS only.
- **Paywall Agent**: gets cohort revenue split by paywall variant to call experiment winners
- **Mediation Agent**: gets ARPDAU normalized to acquisition cohort (so high-LTV cohorts can justify lower ad load)
- **ASO Agent**: gets organic install LTV vs paid, to know which keywords drive valuable users vs just installs
- **CRM Agent**: gets churn risk score per user/cohort, to target lifecycle campaigns

The Attribution Agent is essentially the **shared brain** the rest of the growth stack queries.

---

## Approval flow

- **Auto-execute:** everything. This agent is read-mostly. It writes to its own tables only.
- **Approval-adjacent:** model retraining (monthly) gets a sanity-check report sent to you calibration plots, feature importance shifts, residual analysis. You approve before the new model goes live.

---

## Failure modes

- **MMP-vs-first-party divergence going unnoticed**: hard alert when match rate drops below 92% Growth Manager + Tech Manager both notified
- **Model decay (LTV predictions drift)**: monthly retraining + drift monitoring on prediction calibration
- **Pipeline failures (event loss)**: paired with Observability Agent any gap >X minutes in event stream triggers P1
- **Survivorship bias in LTV training**: only train on cohorts with full observation window; correctly handle right-censored data via survival analysis

---

## Kill switch

`ATTRIBUTION_AGENT_ENABLED=false` freezes LTV predictions at last-known-good values; existing dashboards continue to work but anomaly detection stops. Pipeline (event ingestion) continues this is too foundational to truly turn off, only the agent's *decisioning* layer can be paused.
