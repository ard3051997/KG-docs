# 2.4 QA & E2E Test Agent

**Tier:** 2 Tech (worker)
**Reports to:** Tech Manager
**Replaces:** Manual QA which today is mostly developer self-test + ad-hoc smoke testing before releases. There is no dedicated QA function in the org currently.

---

## Charter

Provide the **gate that PRs must pass before merge and builds must pass before release.** Owns:
- Unit test suite health (paired with Android / iOS Dev agents)
- E2E test suite across critical user flows
- Visual regression testing
- Pre-release smoke tests
- Test fixture maintenance

The QA Agent is the **mandatory signoff** for Release Train Agent. Nothing ships without it.

---

## Inputs

- Open PRs from Android Dev / iOS Dev agents (run tests on each)
- Built release candidates from Release Train Agent (run full E2E suite)
- Critical-flow definitions per app (paywall, signup, key feature flows)
- Known device matrix (which Android API levels, which iPhone models)
- Last-known-good baselines (visual snapshots, performance baselines)

---

## Outputs

1. **PR-level test reports** - Unit test pass/fail
 - Linting / static analysis
 - Build green/red
 - Verdict: ready for review / needs fixes (with specifics)

2. **Pre-release E2E reports** - Per critical flow per device class: pass/fail + screenshots/videos of failures
 - Visual regression diff (highlights pixel changes >X% on key screens)
 - Performance baselines (launch time, key flow latency)
 - Verdict: ready to release / blockers + which

3. **Test suite health (weekly)** - Flaky test detection (tests failing intermittently these are the worst, they erode trust in CI)
 - Coverage on critical flows per app
 - Missing tests for newly-shipped features

4. **Test fixture generation** - For new features added by Dev agents, generates initial test fixtures (Claude-generated based on the feature spec)

---

## Tools / MCP needs

- `github-mcp` (CI status hooks)
- `firebase-test-lab-mcp`: device cloud for Android E2E
- `aws-device-farm-mcp` or `bitrise-mcp`: iOS device cloud
- `maestro-mcp` or `xcuitest` / `espresso` runners: actual E2E execution
- `percy-mcp` or self-hosted visual diff: regression snapshots
- `supabase-mcp`: test result history, flake tracking
- `claude-code-mcp`: generate test fixtures from feature specs

---

## KPIs

| Metric | Target |
|---|---|
| E2E coverage on critical flows | 100% per Core app |
| Flaky test rate | < 2% |
| Test-suite execution time per build | 20 min (CI green needs to be fast) |
| Critical bugs reaching production despite green QA | 0 P0, < 1/quarter P1 |
| Time to add tests for new feature | 24h after merge |

---

## Critical-flow definitions per app (examples)

These are the test cases that always run, on every build, on every Core app:

| App | Critical flows |
|---|---|
| Ryn VPN | Cold start connect disconnect; first launch paywall view subscribe; offline behavior |
| LightRay VPN | Same + V2Ray protocol selection; Indian/restricted-region connectivity simulation |
| EMI Calculator | Calculate basic EMI; calculate with prepayment; share result; ad load on results screen |
| GST Calculator | Calculate inclusive / exclusive GST; result share; ad load |
| Huge Digital Clock | Launch time display; theme switch; always-on display behavior |

For each, the agent maintains:
- The test script
- Pass/fail criteria
- Visual baseline screenshots per device class
- Performance baseline (launch time, frame rate)

---

## Historical context

QA at Kalagato has been **the gap that PMs and devs filled by working extra hours**:
- Devs self-tested before merging
- PMs and Growth Leads ran smoke tests before releases when they had time
- The CEO picked up the slack on Core apps
- E2E test suites are minimal-to-nonexistent on most apps

The pattern that has cost the most: **shipping a paywall change that broke purchase on one geo / one device class**, discovered via Crashlytics + Play Store reviews 2 days post-launch, with a 12-hour hotfix scramble. Every Kalagato app has had at least one of these.

The agent specifically:
- Makes paywall testing systematic (initiates purchase flow, verifies receipt validation, checks revenue event fires) directly addresses the most-frequent fire
- Runs visual regression so unexpected layout breaks get caught before users see them
- Maintains tests for the **Inverse Pyramid Method instrumentation** ASO event taxonomy regressions get caught at the test layer, not by Attribution Agent post-fact

A specific historical example: the **EMI Calculator AdMob waterfall work** required testing ad-load behavior on dozens of `(geo, network, ad_unit)` combinations. Today this was done ad-hoc. The agent runs it as a matrix test, every build.

---

## Test generation philosophy

The agent generates tests in this priority order:
1. Tests covering critical user flows (paywall, signup, key feature)
2. Tests covering revenue-instrumentation events (every event the Attribution Agent depends on)
3. Tests covering paid-feature gating (no free user accidentally getting premium access)
4. Tests covering policy-sensitive behavior (ATT consent, GDPR consent, age-gating)
5. Tests covering everything else (lower priority but eventually backfilled)

Generated tests are reviewed by the Tech Manager on first creation per app, then trusted thereafter.

---

## Approval flow

- **Auto-execute:** all test runs, test fixture updates (within-app, non-critical-flow), flake detection, visual baseline refresh after intended UI changes
- **Approval required:** disabling a critical-flow test (almost never approved), changing pass/fail thresholds, adding a new critical flow to the matrix

---

## Failure modes

- **False-pass (test green, real bug)**: countered by visual regression + production canary monitoring tied back to test coverage gaps
- **Flaky tests eroding trust**: hard rule any test flaking >3% is quarantined automatically; agent then either fixes or escalates to Tech Manager
- **Test suite execution time bloat**: agent monitors and refactors / parallelizes when it exceeds the 20-minute target
- **Tests pinned to fragile UI state (e.g. specific strings)**: visual baselines use semantic + visual hybrid checks; pure string assertions only on test IDs, not user-visible text

---

## Kill switch

`QA_AGENT_ENABLED=false` halts the gate. **This effectively halts the entire release pipeline** because Release Train Agent requires QA Agent's green signal. This is intentional if QA breaks, nothing should ship. Manual QA can substitute (human signs off in Slack), but the gate stays.
