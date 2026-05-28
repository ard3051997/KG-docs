# 2.6 Security & Compliance Agent

**Tier:** 2 Tech (worker)
**Reports to:** Tech Manager (with veto authority across the org)
**Replaces:** Ad-hoc / reactive response to Play Store and App Store policy issues, privacy compliance work, and security advisories.

---

## Charter

Keep every app on every store in good standing. Continuously check:
- Play Store and App Store policy changes
- Privacy compliance (GDPR, CCPA, India DPDP, iOS Privacy Manifest)
- SDK security advisories (CVEs affecting bundled SDKs)
- Authentication / payment / PII handling correctness

This agent has **veto authority** any change anywhere in the system touching auth, payments, PII handling, ad-tracking permissions, or store-listing claims requires its sign-off.

---

## Inputs

- Play Store Developer Policy bulletins (RSS / API)
- App Store Review Guidelines updates
- Privacy regulation feeds (EU, India, US state-level)
- SDK security advisories (CVE feeds, vendor security mailing lists)
- Static analysis on every PR (secrets, common vulnerabilities)
- Privacy manifest files (`PrivacyInfo.xcprivacy`)
- Data safety form / Privacy nutrition label state per app
- Permissions declared in manifests (AndroidManifest.xml, Info.plist)
- Store review feedback (rejection reasons, warnings)

---

## Outputs

1. **Policy compliance status (per app, daily)** - Pass / fail against current Play / App Store policy
 - Pending warnings or strikes
 - Required actions with deadlines

2. **Privacy compliance status (per app, weekly)** - GDPR / CCPA / DPDP requirements satisfied
 - Privacy manifest accurate vs actually-collected data
 - Data safety form accurate vs actually-collected data
 - User-rights flows working (delete account, export data)

3. **Pre-merge security review (on every PR)** - Secrets in code (must be zero)
 - Dangerous permissions added
 - Network calls to new domains
 - PII handling changes
 - Verdict: approved / blocked with specifics

4. **SDK advisory response** - When a CVE drops on a bundled SDK: assess which apps are affected, generate update tickets, coordinate with Dev agents and Release Train

5. **Store rejection playbooks** - Library of "this rejection reason this response template" most Play / App Store rejections fit known patterns
 - For novel rejections, drafts response and escalates to you

---

## Tools / MCP needs

- `play-console-mcp`: policy state, review messages, data safety form
- `app-store-connect-mcp`: rejection messages, privacy nutrition labels, App Review communication
- `github-mcp`: PR scanning hooks
- `semgrep-mcp` or `trivy-mcp`: SAST / secret detection
- `snyk-mcp` or `osv-mcp`: dependency vulnerability scanning
- `supabase-mcp`: compliance state ledger
- `claude-policy`: read store policy updates, summarize what changed, identify portfolio impact
- `slack-mcp`: alert on warnings, route response drafts

---

## KPIs

| Metric | Target |
|---|---|
| Active Play / App Store policy strikes | 0 |
| Apps with stale privacy manifest | 0 |
| Apps with mismatched data safety form vs actual data collected | 0 |
| Critical-CVE response time | < 7 days from disclosure to patched in all affected apps |
| Pre-merge secret leaks reaching CI | 0 |
| Store rejections requiring human escalation | < 20% (most should resolve via playbook) |

---

## Veto powers

This agent has the authority to **block** changes in the following situations, overriding other agents:

1. **Mediation Agent** proposing a new ad network: agent blocks if the network's SDK has open CVEs or violates store policy in any region
2. **Paywall Agent** proposing new pricing in a regulated market: agent blocks if pricing display violates local tax-inclusivity rules (e.g. EU VAT-inclusive)
3. **Creatives Agent** proposing store imagery: agent blocks if imagery violates Play/App Store creative policy (medical claims, fake testimonials, etc.)
4. **CRM Agent** proposing a push campaign: agent blocks if copy violates regional notification policy or makes unsubstantiated claims
5. **UA Agent** proposing a new geo: agent blocks if the geo has data-residency requirements the apps don't meet
6. **Android / iOS Dev Agent** PR: agent blocks at PR-review level if the diff introduces policy violations

The veto is procedural it surfaces an explicit blocker to the requesting agent's manager + the Tech Manager, who can either resolve or escalate to you.

---

## Historical context

Compliance at Kalagato has been **reactive**: app gets a Play Store warning someone reads it frantic 48-hour fix resubmit. The pattern that has hurt the most:
- **AdMob policy strikes** when an ad placement was non-compliant (e.g. accidental ad on incorrect screen)
- **Data safety form drift** apps added new SDKs that collected data, but the data safety form wasn't updated
- **Privacy manifest gaps** post-iOS-17 App Store warnings on apps whose privacy manifest was incomplete
- **VPN-app-specific policy nuances** (Ryn VPN, LightRay VPN) VPN apps face stricter scrutiny on no-logs claims, privacy policy, and pricing transparency

The specific cost of each strike: lost revenue during the days the app is in limbo + a hit to store-side trust score that takes weeks to rebuild. Multiply by 15+ apps and policy issues become a real tax on the business.

The agent's value is **proactive** in two ways:
1. **Pre-merge gating** bad code never reaches production
2. **Continuous compliance audit** every app's compliance state is reviewed weekly, not on-incident

It also takes over a specific painful workstream: **responding to App Review / Play Console messages**. Most are routine ("clarify your privacy policy section X") and can be handled by playbook + Claude-drafted response with a one-click human approval. The current pattern is "someone reads the email at midnight, panics, drafts a response."

---

## VPN-app-specific playbook (illustrative)

Because VPN apps are a substantial chunk of the portfolio (Ryn VPN, LightRay), the agent has a specialized VPN playbook:

| Risk | Check |
|---|---|
| "No-logs" claim accuracy | Verify the actual logging behavior in code matches the privacy policy claim |
| Pricing transparency | Auto-renew terms displayed correctly, refund policy compliant per region |
| Geo restrictions | App available only in geos where VPN is legal / not restricted |
| Protocol disclosure | If using V2Ray / VMess or similar bypass protocols, declared correctly |
| Server location claims | Marketing claims about server locations match infrastructure |

Same pattern can be extended for utility apps (calculator accuracy claims), entertainment apps (content moderation), etc.

---

## Approval flow

- **Auto-execute:** monitoring, scanning, PR-gate blocking, playbook responses to known rejection patterns, privacy manifest sync (where mechanical)
- **Approval required:** novel store responses (you approve drafted reply), any compliance interpretation in a gray area, any SDK removal driven by CVE (because it can break revenue)
- **Veto exercise:** logged with explicit rationale; requesting agent can request override which routes to you

---

## Failure modes

- **Over-blocking (false positives)**: every veto includes an "override path" so good changes aren't permanently stuck; calibrated against false-positive rate
- **Missing a real issue (false negative)**: redundant detection policy updates checked, periodic full audits, store-side feedback used as ground truth
- **Playbook hallucination** (responding to App Review with a plausible-but-wrong template): all playbook responses on Core apps require human approval until track record of 50+ successful responses
- **Privacy regulation drift across geos**: regulation feed monitored; major changes (new state-level law, new EU directive) escalated to you for strategy

---

## Kill switch

`SECCOMP_AGENT_ENABLED=false` halts vetoes (other agents can ship without gating). **This is dangerous** only use during the agent's own debugging, never as a workaround for a blocked change. Monitoring continues read-only (alerts still fire). If you ever turn this off, the CoS posts a daily reminder until it's re-enabled.
