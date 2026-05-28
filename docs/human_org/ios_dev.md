# Senior iOS Developer

The **Senior iOS Developer** owns the native iOS applications, codebase architecture, Swift libraries, Xcode settings, and App Store Connect release workflows across the KalaGato portfolio. This role is responsible for shipping clean, stable, and highly performant iOS apps in compliance with Apple's strict Human Interface Guidelines.

---

## Core Responsibilities

1. **iOS Codebase Management**: Maintaining and writing modular, secure, and clean code in **Swift**.
2. **Monetization & Billing Integration**: Integrating subscription engines (**RevenueCat**) and paywall elements (**Superwall**). Staging sandbox transactions and testing purchase states.
3. **App Store Publishing**: Packaging iOS builds (IPAs), managing test flights, configuring app capabilities, and submitting build binaries to **App Store Connect**.
4. **Developer-Testing (Dev-Test)**: Executing comprehensive developer tests, building test summaries, and reviewing iOS-specific analytics events.
5. **Code Review & Quality**: Reviewing iOS pull requests to protect structural code quality and prevent performance or memory leaks.

---

## Daily & Weekly Routine

### Daily Checklist
- [ ] **iOS Build Compilation**: Monitor build runs, Xcode schemas, and test package logs.
- [ ] **Jira Task Triage**: Update ticket states, push Swift feature code, and fix iOS-specific bugs.
- [ ] **Console Diagnostics**: Check App Store Connect logs and Firebase Crashlytics for any iOS platform crashes.

### Weekly Checklist
- [ ] **Monday Weekly Sync**: Coordinate with the Product Lead and Designers on upcoming sprint priorities and release boundaries.
- [ ] **App Store Connect Submissions**: Push verified iOS builds to TestFlight for QA verification.
- [ ] **Performance Audits**: Profile active iOS releases in Xcode Instruments (CPU, memory footprints, network calls).

---

## Mandatory Engineering Gates

The Senior iOS Developer governs the following engineering milestones:

| Category | Gate Trigger | Required Engineering Action |
| :--- | :--- | :--- |
| **Xcode Version Upgrades** | Upgrading Xcode, Swift compiler, or core dependencies | Sandbox compilation test and Tech Lead validation |
| **Certificates & Provisioning** | Modifying provisioning profiles, p12 keys, or bundle IDs | Secure storage update and coordinate verification with DevOps |
| **App Store Build Staging** | Pushing candidate IPA package to TestFlight | Verify sandbox billing configuration and trigger QA checklist |
| **Dynamic Paywall Setup** | Syncing paywall assets in Superwall/RevenueCat dashboards | Verify localized paywall displays and cross-check in Jira |
