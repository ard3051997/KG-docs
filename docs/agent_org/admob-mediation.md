# 1.2 AdMob Mediation Agent

**Tier:** 1 Mobile Growth (worker)
**Reports to:** Mobile Growth Manager
**Replaces:** Manual AdMob mediation management. **This is the agent you're already 70% done building** the FastMCP server with the 50+ network registry, 15-rule rules engine, and Kalagato portfolio configurations.

---

## Charter

Maximize ad revenue (eCPM × fill rate × impressions) per app, per geo, per ad unit. Manages the AdMob mediation waterfall, ad-unit-level floor prices, network priority, and the constant tuning between fill and yield.

---

## Inputs

- Per-`(app, geo, ad_unit)` performance: eCPM, fill rate, impressions, revenue, latency
- Network-level performance: AppLovin, Unity, Meta, Pangle, Mintegral, ironSource, Liftoff, etc. (the 50+ network registry)
- DAU and session data (so revenue can be normalized to ARPDAU)
- Competitive floor-price intel (industry benchmarks via the rules engine)
- App-specific config: VPN apps (different network compatibility Ryn VPN, LightRay), utility apps (EMI Calculator, GST Calculator, Huge Digital Clock), entertainment apps
- The 15-rule rules engine the policy layer you've already specified

---

## Outputs

1. **Daily waterfall adjustments** - Per `(app, geo, ad_unit)`: reorder networks, change floor prices, enable/disable networks
 - Always within rules-engine guardrails (e.g. never disable AppLovin globally, never set floor < $X on a Tier-1 geo)

2. **Weekly experiment proposals** - A/B-tested floor price changes (Auto-mediation vs manual bid floors)
 - New network onboarding proposals (for the VPN-friendly network shortlist, etc.)
 - Ad unit placement experiments (interstitial frequency caps, rewarded video placement)

3. **Revenue forecast (weekly)** - Per app, projected ad revenue with confidence interval
 - Identified uplift opportunities ranked by expected $$ (the same logic that surfaced the ~$862/month EMI Calculator opportunity)

4. **Network health monitoring** - Real-time anomaly detection: if AppLovin fill drops 30% in a geo, flag immediately
 - Latency monitoring slow networks evicted from waterfall when SLA violated

---

## Tools / MCP needs

- **The Kalagato FastMCP AdMob server you're already building** this *is* the tool layer
- `applovin-mcp`, `unity-ads-mcp`, `meta-audience-network-mcp`, `pangle-mcp`, `mintegral-mcp`, `liftoff-mcp` per-network admin APIs
- `firebase-mcp`: DAU, ARPDAU, session data
- `supabase-mcp`: experiment state, historical waterfall configurations, rollback snapshots
- `revenuecat-mcp`: needed for hybrid apps (free + paywall) to coordinate IAP vs ad revenue tradeoff

---

## KPIs

| Metric | Target |
|---|---|
| Portfolio ad ARPDAU lift YoY | +25% |
| Fill rate on Core apps | 95% |
| Waterfall change rollback rate | < 5% (high rollback = bad decisioning) |
| Time-to-detect network anomaly | < 30 min |
| eCPM uplift on Tier-1 geos (US/UK/CA/AU) | +15% per quarter |

---

## The 15-rule rules engine (operational layer)

These are guardrails baked into the agent's decision loop (from your existing PRD work):

1. Never auto-disable a network on Core-tier apps without 7-day rolling underperformance evidence
2. Floor price changes capped at ±20% per change, with 48h cooldown
3. Tier-1 geos always get min N=4 networks in waterfall
4. VPN apps respect the VPN-network allowlist (some networks reject VPN traffic)
5. Newly onboarded networks start at low waterfall priority for 14-day evaluation
6. Latency violators (>2s mediation chain) auto-demoted
7. Frequency caps on interstitials never relax without UX/retention guardrail
8. Reward video placement changes require D7 retention guardrail
9. Banner refresh rates never go below 30s (Google policy)
10. Rewarded interstitials only on apps where session length N
11. New ad unit creation requires release vehicle (paired with Release Train agent)
12. Geographic floor differentiation always uses the live PPP-adjusted bands
13. Sensitive geos (some MENA, parts of SEA) use a curated subset of networks for compliance
14. Auto-mediation toggle decisions require 30-day comparison data
15. Any rule override = human approval

---

## Historical context

This is the agent you have the **most context on** and the **highest conviction in**, because:
- You wrote the comprehensive AdMob mediation PRD (FastMCP server, 50+ network registry, 15-rule rules engine, Kalagato portfolio configurations)
- You ran the **EMI Calculator** mediation analysis that surfaced the ~$862/month uplift
- You explored VPN-friendly mediation networks for **Ryn VPN** specifically
- You scaled **Kalagato from negative to +58% profitability** in significant part through mediation discipline

The pattern that historically lost money: **mediation decisions were batchy and reactive**. Someone would notice eCPM was off, then spend 2 weeks reorganizing the waterfall, miss two weeks of compounding revenue. The agent runs the loop daily.

Specific historical wins this agent automates:
- The VPN-friendly network curation that became the Ryn VPN playbook
- The Tier-1 geo floor-price discipline (most operators leave money here)
- The auto-mediation vs manual bid floor decision (most operators just flip the toggle and forget)

---

## Approval flow

- **Auto-execute (no approval):** intra-day waterfall reorders within rules engine, floor price changes within ±20%, network priority shuffles
- **Daily summary (you, in morning brief):** which changes were made, expected revenue impact, anomalies caught
- **Approval required:** rule overrides, new network onboarding (introduces SDK dependency Tech Manager involved), floor changes >20%, any Core-app waterfall structural change

---

## Failure modes

- **Optimizer fooled by short-term eCPM spike from a single bidder**: 7-day rolling windows required for any structural change
- **Network gaming via fill-rate manipulation**: cross-checks fill rate against impressions and historical patterns; flagged outliers route to human
- **SDK compatibility drift**: paired with Android/iOS Dev agents mediation agent cannot enable a network whose SDK version isn't compatible with current app builds

---

## Kill switch

`MEDIATION_AGENT_ENABLED=false` freezes the waterfall in its current state. Monitoring and reporting continue. This is the safest agent to freeze (waterfalls degrade slowly, not catastrophically), so freezing for a week is low-risk if needed.
