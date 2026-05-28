# Technical Lead & Architect (CTO)

The **Technical Lead & Architect** serves as the principal technical authority at KalaGato. This role owns the global engineering standards, codebase integrity, release packaging guidelines, API architectures, and infrastructure scaling across our entire 15+ mobile application portfolio.

---

## Core Responsibilities

1. **System & Code Architecture**: Defining core engineering structures, third-party SDK integration guidelines, database architectures, and repository management standards.
2. **PR Code Reviews**: Leading pull request reviews to ensure excellent code quality, robust security parameters, and performance optimization before merging branches.
3. **M&A Tech Due Diligence**: Conducting structural audits, dependency scans, and stability reviews on prospective acquisition target apps submitted by the M&A analyst.
4. **CI/CD & Release Governance**: Partnering with the **DevOps & QA Engineer** to oversee automated build compilations, deployment actions, and signing credentials.
5. **Security & Compliance**: Standardizing code obfuscation (**ProGuard, R8**), secure keystore storage, data encryption models, and app store compliance parameters.

---

## Daily & Weekly Routine

### Daily Checklist
- [ ] **Codebase Health Check**: Review active pull requests and coordinate architectural queries with platform engineers.
- [ ] **Infrastructure & DB Status Check**: Monitor server workloads, cloud dependencies, API runtimes, and critical cron jobs.
- [ ] **Crash & Leak Triage**: Audit high-priority crash alerts in Firebase Crashlytics and monitor memory diagnostics.

### Weekly Checklist
- [ ] **Release Candidate Audits**: Review structural changes in pending builds with platform developers before final QA handoff.
- [ ] **Monday Weekly Sync**: Align on sprint timelines, map engineering priorities, and address tech blockers.
- [ ] **Underwriting Tech Reviews**: Draft codebase summaries for prospective app acquisitions, identifying technical debt.

---

## Mandatory Engineering Gates

The Technical Lead governs the absolute gates of the release and build packaging pipeline:

| Category | Gate Trigger | Mandatory Architect Action |
| :--- | :--- | :--- |
| **Branch Merges** | Merging features or bug-fixes into the stable release branch | Audit unit test coverage, review structural changes, and sign off |
| **Build Uploads** | staging release bundles (AAB/IPA) to developer consoles | Verify release configurations, obfuscation setup, and signing keys |
| **Tooling & SDKs** | Integrating new advertising, tracking, or billing SDKs | Perform strict package size audit, performance diagnostic, and leak check |
| **Core API Changes** | Modifying shared database parameters or core backend endpoints | Execute staging dry-run tests and review rollback scripts |
