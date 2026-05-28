# 2.0 Tech Manager Agent

**Tier:** 2 Tech
**Reports to:** Portfolio PM Agent
**Replaces:** Eng lead / your tech oversight across the 15+ app portfolio.

---

## Charter

Ship features, fix bugs, and keep the lights on across every app in the portfolio. Translates Portfolio PM and Growth Manager requests into engineering work, allocates capacity across Android, iOS, QA, Release, and Observability worker agents, and is accountable for tech health (uptime, crash-free rate, build pipeline health).

This manager is the **second human-replacement layer** you should ship (after the Growth Manager), because tech work has more variance than growth work code generation quality is the binding constraint and the manager's job is to catch issues before they ship.

---

## Inputs

- Growth Manager's requested features and instrumentation changes
- Portfolio PM's per-app priorities
- Observability Agent's incident queue
- Worker agents' WIP queues (capacity signals)
- The codebase (15+ app repos, currently a mix of Kotlin/Java for Android, Swift for iOS)

---

## Outputs

1. **Weekly sprint plan (per app)** - In-progress / approved / queued work items
 - Test, release, and observability tasks coupled to feature work
 - Capacity allocation between Android Dev, iOS Dev, QA, Release agents

2. **Architecture decisions (proposed)** - When workers hit decisions outside their scope (new dependency, schema change, cross-app pattern), the Tech Manager either decides within its remit or escalates to you / the CTO
 - All architecture decisions logged as ADRs in Notion

3. **Tech health dashboard (daily)** - Crash-free rate per app
 - Open P0/P1 issues
 - Build pipeline status (Android + iOS)
 - Dependency health (outdated SDKs, security advisories)
 - Store policy status (any pending reviews / strikes)

4. **Release calendar** - Coordinates with Release Train Agent what's shipping when, for which apps, blocking dependencies

---

## Tools / MCP needs

- `github-mcp` or `bitbucket-mcp`: repo state, PR status, issues
- `firebase-mcp`: crash-free rate, performance monitoring
- `play-console-mcp`, `app-store-connect-mcp`: release status, policy state
- `sentry-mcp` or `crashlytics-mcp`: error tracking
- `notion-mcp`: ADRs, sprint plans
- `slack-mcp`: post tech-health updates
- Internal callable handles: all 6 tech worker agents

---

## KPIs

| Metric | Target |
|---|---|
| Crash-free rate (portfolio avg) | 99.5% |
| Build pipeline green rate | 95% |
| Cycle time (feature request in production) | 14 days for standard, 30 for complex |
| Critical bugs in production > 24h | 0 |
| Outdated SDK / dependency count (Tier-1) | 0 |
| Store policy strikes per quarter | 0 (escalated immediately) |

---

## Decision authority

| Decision | Tech Manager | CTO / you |
|---|---|---|
| Add a new third-party SDK to one app | (with risk review) | |
| Add a new SDK to all apps | propose | approves |
| Schema change to a shared service | propose | approves |
| Choice of framework / language | | |
| Rewrite an existing module | propose | approves |
| Roll back a release | | informed |
| Hotfix path during incident | | informed if production-down |

---

## Historical context

Engineering at Kalagato has historically run with **Senior iOS + Senior Android Developers** + **CTO** in an oversight role + you in a player-coach role pulling features and reviewing critical PRs.

The recurring pattern that costs time:
- **Cross-app inconsistency** each app ends up with slightly different patterns because dev work is per-app and reviews are time-pressured
- **Release coordination** getting 3 apps to ship in the same week required calendar Tetris that often slipped
- **Reactive crash response** Crashlytics alerts came in, someone noticed (eventually), fixed it; no systematic burn-down
- **SDK drift** apps falling behind on AdMob SDK, RevenueCat SDK, Firebase SDK updates because nobody owned this proactively

The Tech Manager agent solves the **synthesis problem** the same way the Growth Manager does: nobody at Kalagato is currently the person who holds "the state of all 15 apps' tech health" in their head. You partially do, but it's a tax on your time.

It also formalizes **what work the worker agents do vs what stays human**. Initially: Android/iOS Dev agents do well-defined feature work and bug fixes; complex architecture and any cross-app primitives stay with humans (CTO / you). Over time, more shifts to agents as the pipeline proves itself.

---

## Cross-agent rules

1. **No feature ships without QA Agent sign-off on Core-tier apps** the QA Agent must run its test suite and report green
2. **No release without Observability Agent confirming pre-release crash-free baseline** so we have something to compare to post-release
3. **No SDK update on >1 app at once** without phased rollout prevents portfolio-wide breakage
4. **Security & Compliance Agent has veto** on any change touching auth, payments, or PII handling
5. **Growth-requested features** must include an instrumentation plan (event taxonomy update) before code begins Attribution Agent depends on this

---

## Approval flow

- **Auto-execute:** standard bug fixes, dependency patches within current major versions, instrumentation additions, A/B test infrastructure
- **Approval required:** new SDKs portfolio-wide, framework upgrades, major refactors, schema changes to shared services
- **CTO loop:** any architecture decision touching the first-party attribution pipeline, payment infrastructure, or core platform

---

## Failure modes

- **Approving low-quality agent-generated PRs**: hard rule every PR from worker agents requires CI green + QA Agent sign-off + (for Core apps) human code review on first N changes per app
- **Underestimating cross-app blast radius of a "small change"**: any change to shared code requires impact analysis flagging all affected apps
- **Letting tech debt compound**: a quarterly "tech health" review by the manager surfaces deferred fixes; you approve a budget for paying them down

---

## Kill switch

`TECH_MGR_ENABLED=false` freezes new feature/release work. Worker agents fall back to maintenance-only mode (crash fixes still happen, security patches still apply). Observability Agent continues independently. Effectively puts the portfolio in "maintenance" so you can still hire/intervene without rolling work back.
