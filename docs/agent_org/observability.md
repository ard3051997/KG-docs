# 2.5 Observability & Crash Agent

**Tier:** 2 Tech (worker)
**Reports to:** Tech Manager
**Replaces:** Reactive Crashlytics / Sentry monitoring the "someone notices a spike eventually" pattern.

---

## Charter

Monitor the **health of every app, every service, every pipeline** continuously. Detect anomalies. Triage them (real issue vs noise). Diagnose root cause when possible. Open incidents. Coordinate with Release Train, Android/iOS Dev, and Attribution agents to resolve.

This agent is the **safety net for the entire system**. It is the first agent you should ship, before any other tech agent, because it watches everything else and lets you fail safer.

---

## Inputs

- Crashlytics / Firebase Crash for every app
- Sentry for backend services (the first-party attribution pipeline, FastMCP servers, n8n workflows)
- Firebase Performance Monitoring (launch time, network latency)
- Application logs (per app, structured)
- Synthetic monitoring (Better Stack / Uptime Robot pings on critical endpoints)
- Store-side metrics: Play Console vitals (ANR rate, crash rate, bad behavior)
- App Store Connect metrics (crash rate, hangs, energy issues)
- Agent-run health metrics (Langfuse traces for every other agent)

---

## Outputs

1. **Real-time incident queue** - Severity-classified incidents (P0 / P1 / P2 / P3)
 - Each incident has: signature, affected apps, user impact estimate, suspected root cause hypothesis
 - P0/P1 routed to CoS for human notification per escalation rules

2. **Pre-release baseline (feeds Release Train Agent)** - Per app: current crash-free %, ANR rate, key flow conversion baselines
 - Release Train uses this to decide if staged rollout should advance

3. **Post-release diff** - Compares post-release metrics to pre-release baseline
 - Auto-pauses rollout if regressions cross thresholds

4. **Weekly tech-health report (feeds Tech Manager's daily dashboard)** - Trend on crash-free %, ANR rate
 - Slow-burning issues (not P0 but consistently degrading)
 - SLA breaches on internal services

5. **Root-cause hypotheses** - When a crash signature is new, Claude analyzes stack trace + recent PRs + recent SDK updates to propose a probable cause
 - Hypothesis is attached to the incident; not auto-fixed, but speeds human / dev-agent triage

---

## Tools / MCP needs

- `firebase-mcp` / `crashlytics-mcp`: crash data
- `sentry-mcp`: backend error tracking
- `play-console-mcp`: Android vitals
- `app-store-connect-mcp`: iOS metrics
- `better-stack-mcp` or `uptime-robot-mcp`: synthetic monitoring
- `langfuse-mcp`: agent-trace observability
- `supabase-mcp`: incident ledger, baseline snapshots, alert history
- `slack-mcp`: P0/P1 alert routing
- `claude-diagnose`: root-cause hypothesis generation from stack traces + PR diffs

---

## KPIs

| Metric | Target |
|---|---|
| Crash-free rate (portfolio) | 99.5% |
| ANR rate (Android, portfolio) | < 0.5% |
| Time to detect P0 incident | < 5 minutes |
| Time to detect P1 incident | < 30 minutes |
| False-positive P0/P1 alerts | < 5% (you should trust pages) |
| Incident first hypothesis posted | < 10 minutes |
| Post-release regression detection | < 4 hours |

---

## Severity classification

| Severity | Definition | Auto-actions |
|---|---|---|
| **P0** | Revenue down / production down / mass crash / store strike imminent | Page CoS wake you up; auto-pause Release Train rollouts; auto-pause UA spend on affected app |
| **P1** | Significant degradation; affects >5% users; crash-free dropping toward 99%; subscription flow broken | Page CoS for morning brief; auto-pause Release Train for affected app; surface to Tech Manager |
| **P2** | Localized issue; specific device class or geo; minor revenue impact | Tech Manager + Dev agent queue |
| **P3** | Cosmetic / edge case | Logged for next sprint |

Auto-actions are critical the agent doesn't just detect, it **mitigates the blast radius** while humans are summoned.

---

## Historical context

Observability at Kalagato has historically been **reactive and human-paced**:
- Crashlytics alerts came in via email; someone (often you) read them sometime that day
- Spike-noticing depended on whoever happened to check the dashboard
- Post-release regressions were often caught by **users leaving 1-star reviews** before the team noticed
- The first-party attribution pipeline has had silent data-loss incidents that were caught days later when revenue numbers looked off

The specific incident pattern that has cost the most: **a release ships, crash-free drops 1.5%, nobody notices for 36 hours because it's a weekend, by Monday morning the app has dozens of 1-star reviews mentioning the crash, store rating drops 0.2 stars, takes 4 weeks of clean releases to recover.** The agent collapses the detect-to-mitigate window from days to minutes:
- Detection: 5 min vs hours
- Mitigation (rollout pause): instant vs whenever-someone-decides
- Hypothesis: 10 min vs hours of human triage
- Fix: still requires Dev agent + human review, but starts much sooner

It also covers the **internal infrastructure** observability gap: the first-party attribution pipeline, the FastMCP servers, the n8n workflows. Today these have minimal monitoring beyond "it broke and someone noticed." Agent applies the same playbook portfolio-wide.

---

## Coordination with other agents

- **Release Train Agent**: provides go/no-go signal for staged rollouts
- **Android / iOS Dev Agents**: receives auto-filed bug reports with crash signatures + hypotheses for them to work on
- **Attribution Agent**: cross-checks revenue anomalies; observed crash uptick correlates with revenue dip faster diagnosis
- **Security & Compliance Agent**: flags any crash signature suggesting auth / payment / PII data leak
- **Mediation Agent**: notified when SDK-level crashes implicate an ad network's SDK (auto-demote that network in waterfall)
- **CoS**: the only agent that can interrupt humans outside the morning brief, per the P0/P1 escalation rules

---

## Approval flow

- **Auto-execute:** all monitoring, all detection, all auto-mitigation (rollout pause, UA spend pause on affected apps, alert routing), incident creation, hypothesis posting
- **Approval required:** declaring an incident "resolved" closes the loop humans (Dev agent + reviewer) confirm fix landed and post-fix metrics held; agent doesn't unilaterally close P0/P1

---

## Failure modes

- **Alert fatigue from noisy signals**: aggressive deduplication; signatures grouped by stack trace + app version + device class; rate-limited per signature
- **Missed real issues drowned in noise**: severity classifier tuned conservatively (better to surface a P2 incorrectly than miss a P1); calibrated weekly against ground truth
- **Auto-mitigation overreach** (pausing a rollout for a minor blip): mitigation actions have rollback paths and minimum-evidence thresholds before firing
- **Hypothesis hallucination**: hypotheses are **explicitly labeled as hypotheses**, never as conclusions; Dev agents/humans verify before fixing based on them

---

## Kill switch

`OBSERVABILITY_AGENT_ENABLED=false` halts auto-mitigations. **Detection still runs** alerts still fire to Slack but actions like pausing rollouts or UA spend pause. This is intentional: you want to keep eyes on, even if you don't trust the auto-actions. Effectively reverts to "human-paced" observability.

Note this is the agent **least likely to be killed** because it's the safety net for the rest.
