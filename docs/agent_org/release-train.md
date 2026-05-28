# 2.3 Release Train Agent

**Tier:** 2 Tech (worker)
**Reports to:** Tech Manager
**Replaces:** Manual release coordination across 15+ apps on two stores (Play + App Store).

---

## Charter

Run the release pipeline for every app: from "PRs merged, ready to ship" through internal testing staged rollout 100% rollout post-release monitoring. Coordinates rollback if Observability Agent detects regressions.

This is the agent that turns release work from a **chore that someone has to remember to do** into a continuous, predictable pipeline.

---

## Inputs

- Merged-and-ready code from Android Dev / iOS Dev agents
- QA Agent's sign-off (must be green)
- Observability Agent's pre-release baseline (crash-free %, ANR rate, key user-flow success rates)
- Release calendar from Tech Manager (which apps releasing this week)
- Tier-1 store availability (no Play Console maintenance windows, etc.)
- App-specific release config: rollout cadence (1%/5%/20%/50%/100%), staged geos, beta tester groups

---

## Outputs

1. **Release candidates** - Build numbers incremented correctly
 - Release notes generated from merged PR descriptions
 - Internal testing track populated automatically post-merge

2. **Staged rollout execution** - Per app, per store: starts at 1% (or app's configured initial %), advances on schedule **if** crash-free baseline holds
 - Auto-pauses rollout when crash-free dips beyond threshold (Observability Agent's signal)
 - Per-app rollout schedules (Core apps roll out more conservatively, smaller apps faster)

3. **Rollback execution** - One-command rollback (halt rollout, revert to previous build, file an incident)
 - Coordinates with Android/iOS Dev agents to start hotfix branch

4. **Release report (post-release, per release)** - Crash-free delta vs baseline
 - Key flow conversion deltas (paywall view, trial start, purchase)
 - User-facing rating delta (Play Store / App Store review sentiment)
 - Items deferred to next release

---

## Tools / MCP needs

- `play-console-mcp`: track management, staged rollout, release notes
- `app-store-connect-mcp`: TestFlight, App Store releases, phased release
- `github-mcp`: tag releases, link PRs to release notes
- `fastlane-mcp` or shell `fastlane`: build + upload automation
- `firebase-mcp` / `crashlytics-mcp`: monitor post-release crash data
- `supabase-mcp`: release ledger, rollout state, rollback history
- `slack-mcp`: release announcements, incident postings

---

## KPIs

| Metric | Target |
|---|---|
| Releases shipped per app per quarter | planned (no slips on Core-tier apps) |
| Release rollback rate | < 10% |
| Time from "ready to ship" 100% rollout | 7 days for Core (gives observability buffer) |
| Crash regression detection latency (post-release) | < 4 hours |
| Releases with zero incidents | 80% |
| Release notes quality (user-facing readability score) | Maintained per brand standard |

---

## Release cadence per app tier (defaults)

| Tier | Default cadence | Rollout schedule |
|---|---|---|
| Core | Every 2 weeks | 1% 5% 20% 50% 100% over 7 days |
| Experimental | Weekly to monthly (variable) | 5% 25% 100% over 4 days |
| Harvest | Quarterly | 25% 100% over 3 days |
| Wind-down | Only critical fixes | 50% 100% over 2 days |

These are starting points; the agent learns appropriate cadence from rollback rate history per app.

---

## Coordination with other agents

- **QA Agent** must sign off before a build leaves internal testing
- **Observability Agent** is the rollout gatekeeper sets the green/red signal at each staged-rollout checkpoint
- **Growth Manager** is informed of release windows so paywall / ASO / UA experiments can be paused or coordinated (release-induced behavior change confounds tests)
- **Security & Compliance Agent** must sign off on any release containing flagged changes (permissions, privacy manifest, SDK additions)
- **CRM Agent** is informed for release-coupled lifecycle messages (changelog campaigns where appropriate)

---

## Historical context

Releasing 15+ apps coordinated has historically been one of the most coordination-heavy operations at Kalagato:
- **Different cadences across apps** Ryn VPN releases biweekly, utility apps less often, LightRay on its own iOS-only schedule
- **Manual Play Console / ASC work per release** staged rollout configuration, release notes per locale, beta tester groups
- **Reactive rollback** Crashlytics alerts came in, someone (you, often) noticed, then a frantic halt-and-revert
- **Release notes inconsistency** written by different people, sometimes skipped entirely

The release calendar Tetris was a recurring source of slipped weeks: when 3 apps needed to ship and reviewer availability was tight, things slipped to next week, then the next, then the pile-up made the next release riskier.

The agent specifically solves three failure modes:
1. **"We forgot to advance the rollout from 5%"** agent advances automatically when gates pass; never forgotten
2. **"Crash-free dropped 0.3% and nobody noticed until ratings tanked"** agent halts rollout the moment Observability flags it
3. **"Release notes are empty / wrong / in English only"** agent generates from merged PRs and localizes via Claude

Also reuses the **release vehicle pattern** from your AdMob mediation PRD: rule 11 of the rules engine specifically requires new ad units be paired with a release. The Release Train Agent enforces this Mediation Agent cannot deploy a new ad unit without coordinating with Release Train.

---

## Approval flow

- **Auto-execute:** release candidate creation, internal testing uploads, advancing staged rollout when gates green, release notes generation, rollback (no human required for rollback speed matters)
- **Approval required:** initial 100% rollout on a Core-tier app (one-click via Slack), any release containing a flagged change from Security & Compliance, releases on a new app version major
- **Approval batch:** weekly release calendar you confirm what's queued

---

## Failure modes

- **Premature rollout advancement on a small geo's noisy data**: rollout gates use geo-weighted baselines, not unweighted averages
- **Rollback to a broken older build**: every release tagged with a "last-known-good" pointer; rollback always targets last-known-good, not just previous version
- **Localization regression in release notes**: generated release notes pass through a "user-readable + brand-consistent" check before publication
- **Store rejection during staged rollout**: handled by Security & Compliance Agent's playbooks; Release Train Agent freezes the rollout pending resolution

---

## Kill switch

`RELEASE_AGENT_ENABLED=false` halts new release creation. In-flight staged rollouts continue advancing on schedule (you don't want to freeze a rollout that's working that's worse than letting it complete). Manual release via Play Console / ASC remains available. Effectively, agents stop *initiating* releases; ongoing ones complete.
