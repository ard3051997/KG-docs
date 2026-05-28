# Asset Transfer & Knowledge Transfer SOP

This document outlines the step-by-step standard operating procedure (SOP) for transferring digital assets, codebase repositories, developer console accounts, and platform configurations from sellers to **KalaGato** post-acquisition.

---

## 1. Directory of Transferred Assets

Every mobile application acquisition involves the complete handover of the following distinct assets:

* **Source Code**: Read/write access to git repositories containing production-ready iOS, Android, or Unity files.
* **App Store Listings**: Metadata assets, descriptions, custom store listings, screenshots, and promo videos.
* **Developer Accounts**: Credentials and administrator access to active store consoles.
* **Keystores & Certificates**: Production signing certificates, Java KeyStores (`.jks`), and associated passwords.
* **Third-Party Services**: Accounts for analytics (Firebase, Google Analytics, Mixpanel), push notifications, crash management (Sentry), and billing interfaces (RevenueCat, AppHUD).
* **Domain & Server Infrastructure**: Domain DNS management panels, server control dashboards (AWS, Digital Ocean), and database backends.
* **Marketing & Monetization Accounts**: Historic ad creatives, paid channels (Google Ads, Meta Ads), and publisher integrations (Google AdMob, bidding mediation accounts).

---

## 2. Technical Asset Handover Checklist

During the Knowledge Transfer (KT) phase, the Technical Lead and QA Head must audit and check off all items in the checklist below:

### Source Code & Builds
- [ ] **CodebaseWalkthrough**: Seller must provide a comprehensive code walkthrough (recorded KT video call).
- [ ] **Deployment Instructions**: Seller must supply detailed, step-by-step instructions for building, packaging, and deploying the app locally.
- [ ] **Third-Party SDKs**: List all active SDKs with their version parameters. Ensure no deprecated or non-compliant libraries are packaged.

### Signing Credentials & Keystores (Critical)
- [ ] **Java KeyStore File**: Securely transfer the `.jks` file used for compiling and signing the Android release package.
- [ ] **Signing Passwords**: Verify and store keystore path passwords, key alias identifiers, and key passwords in our secure company vault.
- [ ] **iOS Provisioning Profiles**: Securely transfer Apple Distribution Certificates, `.p8` push keys, and provisioning profiles.

### Console & Analytic Handover
- [ ] **Google Play Console App Transfer**: Move the app from the seller account to the **ElQube Tech** developer account.
- [ ] **App Store Connect App Transfer**: Move the app to the **NPM Industries / Human Data SG** account using Apple's built-in App Transfer utility.
- [ ] **Firebase & GA Ownership**: Request administrator access transfer for the Firebase projects and Google Analytics web/app properties. Ensure both accounts are fully controlled by `@kalagato.co` emails.
- [ ] **Sentry / Crashlytics**: Secure the error logging and crash management environment.

### Backend, Server, & Domain Access
- [ ] **Database & Backend Code**: Transfer all server repositories, database schemas, and data caching setups.
- [ ] **Server Infrastructure**: Take over billing and root management for active server instances (AWS or Digital Ocean accounts) or coordinate migration to KalaGato's unified cloud buckets.
- [ ] **DNS Domain Authority**: Transfer domain control (Namecheap, GoDaddy) and point name servers to KalaGato's Cloudflare account.

### Monetization & Ad Compliance
- [ ] **AdMob Console Access**: Transfer developer administrative access to the associated AdMob accounts.
- [ ] **Mediation Waterfall Configuration**: Extract and document the active floor pricing structure and priority tiers.
- [ ] **Ads.txt Update**: Update and host the correct `ads.txt` file on the app's official landing domain to prevent ad impressions loss.
- [ ] **Residual Revenue Check**: Verify and audit late earnings or residual incomes generated from historical versions before the transfer is finalized.

---

## 3. iOS App Transfer Process

To initiate an app transfer on App Store Connect:
1. **Prerequisites Check**: Ensure the app has at least one version approved, no pending In-App Purchase (IAP) versions, and is in an eligible status (e.g., *Ready for Sale*, *Developer Rejected*).
2. **Retrieve Team Identifiers**: Provide the seller with KalaGato's **Team ID** and **Apple ID Account Holder** email.
3. **Initiate Transfer**: The seller navigates to the *App Information* page, clicks *Transfer App*, and enters KalaGato's details.
4. **Acceptance**: The KalaGato Account Holder logs into App Store Connect, navigates to the transfer notice, enters our corporate metadata details (company support email, privacy policy links), and accepts the transfer.

---

## 4. Android App Transfer Process

To transfer an app on the Google Play Console:
1. **Prerequisites Check**: Retrieve KalaGato's **Developer Account ID** from the Account Details console.
2. **Submit Transfer Request**: The seller submits an official App Transfer Request to Google, entering our Developer Account ID and the package name of the app.
3. **Verification Documents**: The request must include the seller's original registration transaction ID and a brief transfer authorization statement.
4. **Approval**: Google processes the request within **2 to 3 business days**. Once approved, the application appears under the **ElQube Tech** developer listing.
