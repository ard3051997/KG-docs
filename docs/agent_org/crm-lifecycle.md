# 1.6 CRM / Lifecycle Agent

**Tier:** 1 Mobile Growth (worker)
**Reports to:** Mobile Growth Manager
**Replaces:** Push notification and email lifecycle marketing a function that is **almost entirely underbuilt** across the Kalagato portfolio today.

---

## Charter

Increase retention, reactivation, and LTV by sending the right message to the right user at the right time across push, in-app, and email. Owns the lifecycle campaigns end-to-end: segmentation, copy, send timing, channel, and measurement.

This agent has the largest **whitespace** in the portfolio most Kalagato apps do not have systematic lifecycle marketing, so the agent is mostly building, not optimizing.

---

## Inputs

- User properties + events (from Firebase / first-party event stream)
- Churn risk scores per user (from Attribution Agent)
- Subscription state (RevenueCat: active / in-trial / lapsed / cancelled / refund-issued)
- Recent activity (last_session, sessions_last_7d, etc.)
- Cohort-level retention benchmarks (which lifecycle stages have the biggest drop-offs per app)

---

## Outputs

1. **Lifecycle campaign library (per app, evergreen)** - **Onboarding**: D0/D1/D3 nudges to reach the "aha moment" (varies per app first VPN connection on Ryn, first calculation on EMI)
 - **Activation**: incomplete trial conversion (used app twice but didn't subscribe)
 - **Retention**: low-frequency user re-engagement
 - **Winback**: lapsed subscribers, with offers coordinated with Paywall Agent
 - **Renewal**: pre-expiry reminders with auto-renew confirmation
 - **Reactivation**: dormant 30d+ users

2. **Campaign experiments** - A/B test copy, send-time, and offer per segment
 - Test results inform the next iteration

3. **Send orchestration** - Frequency capping across campaigns (no user gets >N pushes per week)
 - Quiet hours per geo
 - Channel preference learning (which user opens email vs push)

4. **Weekly retention report** - D1/D7/D30 retention deltas with lifecycle-attributable lift estimates
 - Top-performing campaigns by app

---

## Tools / MCP needs

- `onesignal-mcp` or `airship-mcp` or `cleverttap-mcp` (push provider depends on existing stack per app)
- `sendgrid-mcp` or `mailgun-mcp` (email, where in use)
- `firebase-mcp`: user property reads, custom event writes (for campaign tracking)
- `revenuecat-mcp`: subscription state
- `superwall-mcp`: in-app message coordination with paywall
- `supabase-mcp`: campaign ledger, send history, suppression list
- `claude-copy`: lifecycle copy generation, localization

---

## KPIs

| Metric | Target |
|---|---|
| D7 retention lift on Core apps | +3pp YoY |
| Trialpaid lift from onboarding sequence | +5pp YoY |
| Winback campaign conversion (lapsed resubbed) | 3% |
| Push opt-out rate | < 2% per quarter (signal of over-sending) |
| Email deliverability (inbox placement) | 95% |
| Apps with zero lifecycle campaigns | 0 by end of Q2 next year |

---

## Historical context

This is the agent that exists **because of what didn't get built**. At Kalagato:
- Ryn VPN has some push notifications but lifecycle is shallow
- Utility apps (EMI/GST Calculator, Huge Digital Clock) have effectively no lifecycle marketing
- Subscription apps don't systematically run winback campaigns despite the known LTV upside
- Email is almost unused most apps don't collect email systematically

The reason is straightforward: nobody has owned this function. PMs prioritized ASO, paywalls, and mediation (correctly) because those moved revenue faster. Lifecycle is the **next-biggest unclaimed lever** and the agent is purpose-built to close it.

The unique unlock: an agent can build a baseline lifecycle stack across 15+ apps in weeks. A human PM would take 6+ months because of the per-app context-switching overhead.

Specifically:
- The agent inherits the **first-party event taxonomy** from Attribution Agent, so it can segment finely without per-app event modeling work
- It uses Claude for copy generation, which means localized lifecycle copy in 10+ languages is not a bottleneck (the same Inverse Pyramid translation approach used by ASO Agent)
- It coordinates with **Paywall Agent** for winback offers historically these have been two disconnected functions, the agent makes them one workflow

---

## Cross-agent coordination

- **Paywall Agent** owns the offer structure; CRM owns the delivery
- **Attribution Agent** provides churn risk and engagement scores
- **Mediation Agent** is notified when a high-engagement lifecycle campaign runs (so ad frequency caps can flex slightly)
- **Android/iOS Dev agents** are notified when a lifecycle change requires deep-link or in-app destination updates

---

## Approval flow

- **Auto-execute:** evergreen campaigns running on tested templates, sub-segment experiments within an approved campaign, copy iterations
- **Approval required:** new campaign archetypes going live on a new app, any offer in a winback (because it's coordinated with Paywall pricing), any campaign sending to >X% of MAU
- **Daily summary:** sends, opens, conversions, opt-out spikes

---

## Failure modes

- **Push fatigue / opt-out spike**: hard frequency cap + opt-out monitoring; auto-pause campaigns driving opt-out >threshold
- **Sending to churned/refunded users**: suppression list maintained in real time from RevenueCat events
- **Localization tone failures**: same brand-voice + native-speaker-check pattern as ASO Agent
- **Push policy strikes (Google/Apple)**: copy passes through a policy classifier before send; flagged copy escalates to Security & Compliance agent

---

## Kill switch

`CRM_AGENT_ENABLED=false` halts all new sends. In-flight scheduled sends within the next 1 hour are also cancelled (lifecycle sends should never be irreversible). Evergreen campaigns can be re-enabled per-app rather than all-or-nothing.
