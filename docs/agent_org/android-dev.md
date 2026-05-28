# 2.1 Android Dev Agent

**Tier:** 2 Tech (worker)
**Reports to:** Tech Manager
**Replaces:** Android developer for standard feature work, bug fixes, SDK updates, and instrumentation across the Android side of the portfolio.

---

## Charter

Implement well-scoped Android changes bug fixes, feature flags, SDK upgrades, paywall/UI tweaks, instrumentation, A/B test wiring across the 15+ Android apps in the portfolio. Operates Claude Code (or equivalent) inside each repo with task-specific prompts and the Tech Manager's spec.

**Important framing:** this agent is good at **bounded, well-specified work**. It is not (today) replacing senior architecture or net-new product design.

---

## Inputs

- Tech Manager's task brief (acceptance criteria, target app, scope, instrumentation requirements)
- The relevant repo (read/write via git)
- Codebase context (architecture docs, prior similar PRs, style conventions per app)
- Test fixtures from QA Agent
- Crash signatures from Observability Agent (when fixing bugs)

---

## Outputs

1. **Pull requests** - Scoped, single-purpose PRs (small diffs)
 - Includes: code change, unit tests, instrumentation, release-notes line
 - Auto-runs CI; if CI fails, agent iterates up to N times before escalating to Tech Manager

2. **Build artifacts** - Signed debug + release builds via the existing CI (Bitrise / GitHub Actions / fastlane)
 - Internal-testing track uploads to Play Console

3. **Refactor proposals (not auto-execution)** - When the agent encounters consistent patterns across apps, it proposes extraction into a shared module (waits for Tech Manager approval)

---

## Tools / MCP needs

- `github-mcp` / git CLI in container: clone, branch, commit, push, PR
- `claude-code-mcp`: actual code generation in the repo
- `gradle-mcp` or shell: build, test, lint
- `firebase-mcp`: deploy distribution builds, write remote config
- `play-console-mcp`: upload internal testing builds
- `crashlytics-mcp`: read crash signatures to debug
- `figma-mcp`: read design specs for UI work
- `supabase-mcp`: log PR provenance (which agent ran, what brief)

---

## KPIs

| Metric | Target |
|---|---|
| PR merge rate (without human rewrite) | 75% |
| CI-green-first-try rate | 70% |
| Crash regression introduced by agent PRs | 0 P0/P1 in production |
| Test coverage on agent-touched files | baseline (no regression) |
| Median PR cycle time (open merged) | 24h |

---

## What it does well (today, with current LLM capability)

- Bug fixes from a clear crash signature
- SDK version bumps with predictable migration paths (e.g. AdMob SDK 22.x 23.x)
- Adding event instrumentation with a known taxonomy
- A/B test flag wiring (Firebase Remote Config + experiment setup)
- Localization (string resource updates)
- Paywall config updates (RevenueCat/Superwall SDK calls)
- Adding a screen following existing patterns in the repo

## What stays human (for now)

- Net-new architecture decisions
- Cross-app shared library design
- Performance optimization on the binary
- Anything touching the first-party attribution pipeline (CTO / Tech Manager handles)
- Native code (NDK / C++) uncommon in your stack but listed for completeness

---

## Per-app context library

Each app's `agent-context.md` lives in its repo and is updated as the codebase evolves. Includes:
- Architecture summary (MVVM / Compose state, navigation lib, DI)
- Common patterns (paywall integration, ad load, deep linking)
- Known footguns ("Don't touch the ad refresh logic without coordinating with Mediation agent")
- Style conventions
- Recent significant PRs to mimic patterns

The agent reads this every task. The Tech Manager updates it as patterns emerge.

---

## Historical context

Android development at Kalagato has been a dedicated Android developer's lane, supported by you for senior decisions and architecture. The patterns that have eaten time:
- **Repetitive cross-app work** same paywall integration, same AdMob update, same analytics event added to 8 apps over 3 months
- **Bug-fix queue chronically behind feature work** bugs accumulated in Crashlytics, fixes lagged
- **SDK upgrade procrastination** each individual upgrade is a 13 day task, easy to defer, hard to do all at once

The agent excels at exactly this pattern: **bounded work that's high-volume across the portfolio**. The 80% of dev work that is variations on prior PRs.

You've already seen the pattern work in two adjacent places that build conviction:
- **OpenHire's agentic outbound system** agents executing well-scoped work autonomously
- **Nanobot** Python/n8n autonomous agent on Hetzner, already in production for other workflows

This is the same playbook applied to the Android codebase, with stricter guardrails because production code is less forgiving than email outreach.

---

## Guardrails

1. **Never auto-merge** every PR awaits CI green + QA Agent green + Tech Manager review (initially Tech Manager + you; later just Tech Manager)
2. **Never touch shared modules without Tech Manager scope** the agent's brief explicitly limits files it may modify
3. **Never modify CI/CD configuration, signing keys, or release scripts** those require human change
4. **Never disable a test to make CI green** failing tests escalate
5. **Never increase APK size by >X% in a single PR without explicit approval** 6. **Never change permissions in AndroidManifest.xml without Security & Compliance Agent review** ---

## Failure modes

- **Subtle behavior changes in agent-generated code**: counter by maintaining and running screenshot/UI tests on Core paths
- **Plausible-but-wrong fixes** (the LLM "guesses" the bug cause): require the agent to reproduce the crash in test before claiming a fix
- **Style/convention drift**: per-app `agent-context.md` plus eslint/ktlint enforce conventions

---

## Kill switch

`ANDROID_DEV_AGENT_ENABLED=false` halts new PR generation. In-flight PRs continue (reviewers can finish merging). Bug fixes and SDK patches queued for the agent revert to human-assignable issues.
