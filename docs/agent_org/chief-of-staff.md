# 0.1 Chief of Staff Agent (CoS)

**Tier:** 0 Orchestration
**Reports to:** CEO
**Replaces:** The "CEO-as-router" function the part of your day spent triaging Slack, scheduling follow-ups, chasing status, writing weekly updates, and remembering who owes what.

---

## Charter

The CoS is the single human-facing interface. Every other agent reports up through it, and you never talk directly to worker agents unless you choose to. Its job is to **compress 15+ apps and 12 agent workstreams into one 5-minute morning brief and one Friday weekly review** and to make sure no decision waits on you for more than 24 hours.

It is the only agent allowed to interrupt you outside of approval gates.

---

## Inputs

- All other agents' end-of-run summaries (JSON: `agent`, `app`, `action`, `result`, `risk_flag`, `awaiting_human`)
- Your Slack DMs and mentions
- Your Google Calendar (read-only)
- Your Gmail (read-only, filtered to Kalagato sender allowlist)
- Last 30 days of revenue, installs, crash-free rate from the Observability + Attribution agents

---

## Outputs

1. **Morning Brief (Slack DM, 08:30 IST daily)** - Yesterday's portfolio revenue vs 7-day avg (delta + reasoning)
 - Top 3 anomalies flagged by any agent
 - Pending approvals (with one-click Slack buttons)
 - Today's calendar conflicts the agents need to know about

2. **Friday Weekly Review (Notion page + Slack thread)** - Per-app scorecard: MRR, MAU, ARPDAU, crash-free %, store rating, ASO rank delta
 - Wins / losses / blocked items
 - Next week's queued experiments across all agents
 - Personal items: anything in your Gmail/calendar tagged for follow-up that didn't get done

3. **Async routing** - Inbound Slack message to you CoS reads, decides if it needs you, drafts a reply for one-click send, or routes to the right agent.

---

## Tools / MCP needs

- `slack-mcp`: read DMs/channels, post in #ceo-brief, send approval buttons
- `gcal-mcp`: read calendar, propose meeting slots
- `gmail-mcp`: read filtered inbox, draft replies (never sends without confirm)
- `notion-mcp`: write to weekly review database
- `supabase-mcp`: read the agent_runs table where every other agent writes its summary
- Internal: callable handles to every other manager agent (Growth Manager, Tech Manager, Portfolio PM)

---

## KPIs

| Metric | Target |
|---|---|
| Approval cycle time | < 4 hours median, < 24h p95 |
| Brief read time | < 5 min (measured by your "" reaction in Slack) |
| False-positive interruptions | < 1/week (you flag with ) |
| Items lost / forgotten (caught in Friday review) | 0 per quarter |

---

## Escalation rules when to wake you up

The CoS interrupts you outside the morning brief only when:
1. Portfolio revenue drops >15% day-over-day
2. Any app's crash-free rate drops below 99.0%
3. Play Store or App Store sends a policy strike on any app
4. A worker agent has retried 3x and is still failing (system health, not just task failure)
5. UA spend on any single channel exceeds approved daily budget by >20%

Everything else waits for the morning brief.

---

## Historical context

This role replaces what used to consume the first 2 hours of your day at Kalagato and OpenHire combined: checking Slack, pinging PMs for status, drafting weekly updates, remembering that the Systems Engineer's Huge Digital Clock check-in is overdue, that the iOS Developer needs the iOS provisioning profile renewed, that the EMI Calculator AdMob experiment is at day 7 of its 14-day window.

Your 2026 delegation matrix already pushed most of this down to the PMs and Growth Leads at the management layer, but you stayed as the synthesizer across the matrix. The CoS replaces *you as synthesizer*, not the PMs (those are the Portfolio PM agent + manager agents below).

The Friday weekly review specifically replaces the "CEO writes a Notion update on Sunday night" pattern that has historically been the weakest link it gets skipped when the week is bad, which is exactly when it's most needed. Agents don't skip.

---

## Failure modes & mitigations

- **Hallucinated summaries**: Brief always cites source `agent_run_id` from Supabase; you can click through to raw logs.
- **Notification fatigue**: Hard rate limit max 1 interrupt outside morning brief per day unless P0 escalation rule fires.
- **Drift from priorities**: Once a month, the CoS produces a "what I've been emphasizing vs what you said matters" diff against your stated quarterly OKRs (stored in Notion).

---

## Kill switch

Env flag `COS_AGENT_ENABLED=false` routes all of CoS's outputs into a `#cos-paused-queue` Slack channel that you can review manually. Inbound triage still happens, just nothing is sent until reactivated.
