# 1.1 ASO & Keyword Agent

**Tier:** 1 Mobile Growth (worker)
**Reports to:** Mobile Growth Manager
**Replaces:** ASO Lead's focus + the existing Inverse Pyramid Method dashboard's manual operation loop.

---

## Charter

Drive organic installs across the portfolio by managing keywords, metadata, and store rank for every app, in every relevant locale. Runs the **Inverse Pyramid Method** continuously instead of in weekly batches.

This is the single highest-confidence agent in the system because the methodology is fully documented and the dashboard already exists. It's mostly a matter of wiring decisioning + writes to the manual workflow.

---

## Inputs

- Per-app keyword universe (already populated in the existing dashboard)
- Daily rank data per `(app, locale, keyword)` tuple (from a third-party rank tracker AppTweak / Sensor Tower MCP)
- Search volume estimates (same source)
- Conversion data: impressions page views installs, per keyword (Play Console + ASC + Firebase)
- Current metadata: title, subtitle/short description, long description, keyword field (iOS), per locale
- Competitor metadata snapshots (weekly)

---

## Outputs

1. **Metadata change proposals (per app, per locale, weekly)** - Proposed new title / subtitle / keyword field / promo text
 - Inverse Pyramid scoring per keyword (rank position × search volume × conversion fit)
 - Expected install delta with confidence interval
 - Diff vs current, sent to you for one-click approve

2. **Rank rotation schedule** - Continuous keyword rotation per the Inverse Pyramid Method (the dashboard's existing logic) promotes underweighted high-potential keywords, demotes saturated low-yield ones
 - Multi-locale coordination: doesn't rotate the same keyword across all locales in the same week (preserves clean read on each)

3. **Competitor watch alerts** - When a competitor changes title/icon/screenshots and gains rank, flag to Creatives Agent + Growth Manager
 - When a new competitor enters top 10 for any tracked keyword

4. **Localization queue** - Identifies high-opportunity new locales per app (where search volume is high and we're absent or under-translated)

---

## Tools / MCP needs

- `play-console-mcp`: read store listing data, write metadata updates (per locale), pull conversion data
- `app-store-connect-mcp`: same for iOS
- `apptweak-mcp` or `sensortower-mcp`: rank, search volume, competitor intel
- `firebase-mcp`: install attribution from search vs browse
- `supabase-mcp`: write `aso_experiments`, `keyword_rotations`, `metadata_versions` tables
- `claude-translation`: locale translation with brand voice consistency (uses Sonnet)

---

## KPIs

| Metric | Target |
|---|---|
| Organic install share (% of total) | Maintain or grow per app |
| Avg keyword rank improvement | +5 positions per quarter on tracked keywords |
| Metadata experiments shipped | 2/week across portfolio |
| Locale coverage on Core-tier apps | 100% of identified high-opportunity locales |
| Time from competitor change response | 72 hours |

---

## Inverse Pyramid Method agent operationalization

The methodology you developed (and the ASO Lead runs today) ranks keywords by:
1. **Rank potential** how achievable is top-3 from current position?
2. **Volume × fit** does search volume × keyword relevance to the app justify the slot?
3. **Conversion likelihood** historical install rate for similar keyword/app pairings

The agent runs this scoring nightly per `(app, locale, keyword)` tuple, then proposes the weekly rotation. The bottom of the pyramid (specific, high-conversion, low-volume long-tail) gets baseline coverage; the middle (medium-volume, medium-competition) is the active rotation zone; the top (head terms) is targeted only when an app has earned credibility via the lower tiers.

---

## Historical context

The ASO Inverse Pyramid Method became your highest-leverage growth methodology because it was systematic enough to delegate (the ASO Lead runs it today) but nuanced enough that nobody else in the market does it. The existing **React dashboard for multi-app, multi-locale keyword rotation** is the core asset the agent inherits all of its scoring logic.

Historically:
- **Ryn VPN scaled to 13M+ MAU** heavily on ASO compounding, especially in restricted-region locales where the V2Ray/VMess differentiator mattered (similar pattern noted for LightRay).
- **EMI Calculator** and other utility apps live or die on ASO; UA never scales profitably for 0 utilities.
- **Huge Digital Clock** (originally exited for $230K) the entire growth story was ASO.

The work has historically been bottlenecked by **human throughput**: the ASO Lead can run ~3 apps deep, ~5 apps shallow. The agent removes that ceiling. The portfolio finally gets full ASO coverage instead of "the 3 apps the ASO Lead had time for this month".

Also kills a long-running pain: ASO updates that miss the optimal weekly cycle because someone was on PTO or pulled into a release crunch. Agents don't take PTO.

---

## Approval flow

- **Auto-execute (no approval):** keyword rotations within already-approved metadata templates, A/B test enrollment, rank tracking, competitor monitoring.
- **Weekly batch approval (you, ~10 min):** new metadata copy (title/subtitle/long description), new locale launches.
- **One-off approval:** any change to brand-positioning copy (e.g. tagline shift on a Core app).

Approvals are sent via Slack Block Kit with the proposed diff + expected impact. Reject = the agent regenerates with your inline feedback.

---

## Failure modes

- **Over-optimizing for a high-volume but low-converting keyword**: caught by the conversion-fit dimension; the agent will not approve a rotation where projected install volume drops even if rank improves.
- **Local idiom drift in translations**: every translation routed through a second Claude pass with a "would a native speaker click this?" check; flagged translations go for human review.
- **Google/Apple algorithm changes**: anomaly detection on rank volatility triggers a "hold all changes" mode until 7-day moving average stabilizes.

---

## Kill switch

`ASO_AGENT_ENABLED=false` pauses metadata writes and keyword rotations. Rank tracking and competitor monitoring continue (read-only mode), so you don't lose the historical signal.
