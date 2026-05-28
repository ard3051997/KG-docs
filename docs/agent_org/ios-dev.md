# 2.2 iOS Dev Agent

**Tier:** 2 Tech (worker)
**Reports to:** Tech Manager
**Replaces:** iOS developer for standard feature work, bug fixes, SDK upgrades, and instrumentation across the iOS side of the portfolio.

---

## Charter

iOS counterpart to the Android Dev Agent. Same shape, with iOS-specific tooling, conventions, and constraints. Operates on the Swift / SwiftUI / UIKit codebases for the iOS apps in the portfolio (notably **LightRay VPN** Storyyell Private Limited, iOS-only, and the iOS builds of any cross-platform apps).

---

## Inputs

- Tech Manager's task brief
- Repo (Swift / SwiftUI / UIKit, Xcode project)
- Codebase context per app
- Crash signatures from Observability Agent
- App Store Connect state (build numbers, provisioning, certificates)

---

## Outputs

1. **Pull requests** - Scoped Swift / SwiftUI changes
 - Includes unit tests, instrumentation, release notes
 - Self-iterating CI fixes (up to N retries)

2. **Build artifacts** - Signed builds via fastlane / Xcode Cloud
 - TestFlight uploads
 - SKAdNetwork (SKAN) configuration changes when UA Agent requires them

3. **App Store Connect housekeeping** - Provisioning profile renewals (with human approval for certificate changes)
 - Build submission to TestFlight internal testing track

---

## Tools / MCP needs

- `github-mcp` / git CLI
- `claude-code-mcp`
- `xcodebuild` via shell, `fastlane` CLI
- `app-store-connect-mcp`: build uploads, TestFlight management
- `firebase-mcp`: crash data, remote config, distribution
- `figma-mcp`: design specs
- `supabase-mcp`: provenance logging

---

## KPIs

Same shape as Android Dev Agent:

| Metric | Target |
|---|---|
| PR merge rate | 75% |
| CI-green-first-try | 70% |
| Crash regressions from agent PRs | 0 P0/P1 |
| TestFlight build-upload success rate | 98% |
| Median PR cycle time | 24h |

---

## iOS-specific complications (and how the agent handles them)

| Complication | Approach |
|---|---|
| Apple code-signing / provisioning profiles | Renewal automation via fastlane match; cert changes require human approval (iOS Lead or you) |
| App Store review process | Submissions wrapped in Release Train Agent's workflow, not direct |
| SKAN postback timing | Agent doesn't make decisions based on SKAN data &lt;72h old |
| SwiftUI / UIKit hybrid codebases | Per-app `agent-context.md` specifies which framework each screen uses |
| Privacy manifest (iOS 17+ PrivacyInfo.xcprivacy) | Agent maintains the manifest with every SDK / data-access change |
| App Tracking Transparency (ATT) | Any change touching tracking flow requires Security & Compliance Agent review |
| iCloud / CloudKit | Agent does not modify CloudKit schemas (treated as shared service, Tech Manager scope) |

---

## Per-app context library

Same pattern as Android Dev Agent: each repo has `agent-context.md` with:
- SwiftUI vs UIKit per screen
- Combine / async-await conventions
- DI pattern
- Paywall integration (Superwall SDK / RevenueCat SDK calls)
- Known issues to avoid

---

## Historical context

iOS at Kalagato has been a dedicated iOS developer's lane. Specific tasks that have been recurring time sinks:
- **Provisioning profile renewals** annual cycle plus ad-hoc when team members change
- **iOS SDK version compat** Apple ships APIs every year, deprecates faster than Google; portfolio of 15+ apps falls behind by default
- **Privacy manifest compliance** (iOS 17+) every SDK update potentially affects this; non-compliance can lead to App Store rejections
- **Per-app TestFlight cycles** coordinating internal testing, external testing, and production release across multiple apps

The agent specifically targets the **annual iOS-update treadmill**: every September Apple ships iOS 18 / 19 / 20 / etc. and every app in the portfolio needs validation and potentially updates. Historically this is a 46 week sprint that displaces feature work. With the agent, it becomes parallel work the agent runs the compatibility pass across all apps simultaneously, surfaces blockers, the iOS Lead (or human reviewer) handles the genuinely-hard ones.

Specific iOS apps in the portfolio that the agent handles:
- **LightRay VPN** (Storyyell, iOS-only) flagship iOS work, V2Ray/VMess protocol differentiator
- **iOS builds of Ryn VPN** (cross-platform)
- **iOS builds of utility apps** where applicable

---

## Guardrails

1. Never modify signing certificates / Apple Developer account settings
2. Never bypass ATT consent flow
3. Never modify CloudKit / iCloud schemas
4. Never change Info.plist privacy keys without Security & Compliance Agent review
5. Never submit to App Store production without Release Train Agent's workflow
6. Same as Android: no auto-merge, no test disabling, no permission/entitlement changes without review

---

## Failure modes

- **Xcode project file conflicts** (`.pbxproj`) agent uses XcodeGen or Tuist where available; for plain Xcode projects, edits go through Xcode CLI tooling to minimize conflicts
- **Swift macro / Swift evolution lag** agent avoids cutting-edge Swift features unless explicitly enabled per-app
- **App Store review rejections from agent PRs** first 50 production releases are gated by human review; after track record establishes, gate moves to Tech Manager only

---

## Kill switch

`IOS_DEV_AGENT_ENABLED=false` halts new PR generation. In-flight PRs continue. TestFlight uploads pause. The iOS Lead (or any human iOS dev) can pick up the queue directly from the Tech Manager's task list.
