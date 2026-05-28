# DevOps, QA, & Systems Engineer

The **DevOps, QA, & Systems Engineer** ensures the absolute stability, delivery pipeline health, server operational integrity, and quality standards across the KalaGato portfolio. This role is responsible for administering development environments, maintaining CI/CD pipelines, security key management, and orchestrating extensive manual and automated QA procedures.

---

## Core Responsibilities

1. **CI/CD & Infrastructure Administration**: Maintaining development and deployment pipelines (e.g., GitHub Actions), managing user access across consoles (Play Console, App Store, AdMob, Firebase), and securing corporate API keys.
2. **QA Test Case Design**: Partnering with the **Product Lead** to draft, organize, and execute robust test plans (functional, performance, security, and acceptance) attached to Jira tickets.
3. **Automated Testing Orchestration**: Utilizing QA automation environments (e.g., **MonkeyRun** and specific **Ads Violation Checkers**) to stress-test release packages and trace crashes/ANRs.
4. **Backend & DB Ops**: Auditing shared server engines, backend configurations, API endpoints, and executing database migration scripts under the direction of the Technical Lead.
5. **Quality Gatekeeper**: Enforcing the release gates:
 * **Release Halted**: Documenting blocker diagnostics and crash stacks, updating JIRA epics, and reporting to the PM.
 * **Release Passed**: Confirming build stability metrics, packaging test logs, and signing off on store submissions.

---

## Daily & Weekly Routine

### Daily Checklist
- [ ] **Infrastructure Workload Audit**: Review active deployments, CPU loads, and database capacity bounds.
- [ ] **Release Handoff Verification**: Review developer test summaries and compile build logs for pending packages.
- [ ] **Standup Triage**: Track open blockers on Jira and coordinate fixes with platform developers.
- [ ] **MonkeyRun Automation Sweeps**: Trigger automated stress tests on pending release candidate packages.

### Weekly Checklist
- [ ] **Monday Weekly Sync**: Detail active QA statuses, flag infrastructure updates, and align on upcoming sprint timelines.
- [ ] **SDK Integrity Audits**: Partner with the Technical Lead to execute performance profiles and identify leaks on new third-party libraries.
- [ ] **Access Checklist Cleanups**: Provision console access for new team members and audit developer key parameters.

---

## Mandatory Infrastructure & QA Gates

The DevOps, QA, & Systems Engineer governs the following operational gates:

| Category | Gate Threshold | Required Action |
| :--- | :--- | :--- |
| **Console Access Prov** | Adding a user to Play Console, App Store, or GitHub organization | Confirm security alignment and get written Tech Lead sign-off |
| **CI Pipeline Modifications** | Changing GitHub Actions scripts or release build pipelines | Run staging dry-run tests and confirm build integrity |
| **QA Build Sign-Off** | Declaring a release package is stable and has passed all stress sweeps | Complete release summary report and sign the Jira task |
| **Security Key Rotation** | Rotating Google Cloud credentials, database tokens, or API keys | Secure storage coordination and verify fallback credentials |
