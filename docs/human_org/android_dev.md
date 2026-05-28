# Senior Android Developer

The **Senior Android Developer** owns the native Android applications, codebase architecture, Kotlin frameworks, Gradle configurations, and Google Play Console release workflows across the KalaGato portfolio. This role is responsible for shipping robust, performant Android apps and ensuring compliance with Google Play Store developer policies.

---

## Core Responsibilities

1. **Android Codebase Management**: Maintaining and writing modular, secure, and clean code in **Kotlin** and **Java**.
2. **Android Billing & Libraries**: Integrating Google Play Billing services, Firebase libraries, and specialized networking protocols (e.g., **AndroidLibXrayLite** for security/VPN applications).
3. **Play Store Publishing**: Packaging Android App Bundles (AABs), managing testing tracks (internal, alpha, beta), and submitting binaries to **Google Play Console**.
4. **Developer-Testing & Debugging**:
 * Implementing debugging tools (e.g., **Flipper** in debug configurations) to trace network calls and database logs.
 * Using **LeakCanary** to identify and fix memory leaks.
 * Writing concise dev-testing logs and pinning them to active Jira tickets.
5. **Code Optimization**: Securing packages using **ProGuard** and **R8** to reduce binary footprints and protect against reverse engineering.

---

## Daily & Weekly Routine

### Daily Checklist
- [ ] **Android Build Compilation**: Monitor local compilation runs, Gradle dependencies, and layout render checks.
- [ ] **Jira Task Triage**: Coordinate task progression with the Product Lead and fix Android bugs.
- [ ] **Console Diagnostics**: Check Google Play Console dashboards and Firebase Crashlytics for any Android platform crashes or ANRs.

### Weekly Checklist
- [ ] **Monday Weekly Sync**: Coordinate with the PM, ASO Lead, and Designers on upcoming release schedules and sprint priorities.
- [ ] **Google Play Console Staging**: Upload validated AAB packages to the internal/alpha testing tracks for QA verification.
- [ ] **Performance Audits**: Profile active Android builds in Android Studio Profiler (CPU workloads, memory allocations, energy profiles).

---

## Mandatory Engineering Gates

The Senior Android Developer governs the following engineering milestones:

| Category | Gate Trigger | Required Engineering Action |
| :--- | :--- | :--- |
| **Gradle Configuration Mod** | Modifying build.gradle parameters or upgrading target SDKs | Secure local sandbox build verification and Tech Lead approval |
| **Keystore Management** | Modifying release keystores, aliases, or signature credentials | Store key configurations in secure vaults and confirm signing |
| **Google Play Submissions** | Promoting builds to production or public beta tracks | Confirm ProGuard obfuscation has completed and verify in Play Console |
| **VPN Protocol Updates** | Modifying VPN core libraries (AndroidLibXrayLite, etc.) | Conduct stress-testing scenarios and verify VPN socket states |
