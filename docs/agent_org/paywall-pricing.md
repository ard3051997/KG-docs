# 1.3 Paywall & Pricing Agent

**Tier:** 1 Mobile Growth (worker)
**Reports to:** Mobile Growth Manager
**Replaces:** The manual paywall design + price testing loop most concretely, the Superwall workflow that drove the 158% revenue lift on Ryn VPN.

---

## Charter

Maximize subscription/IAP revenue per app via paywall design, pricing, plan structure, trial mechanics, and segmentation. Owns Superwall (or RevenueCat Paywalls) at the configuration layer you should not have to touch a paywall builder again for routine experiments.

---

## Inputs

- Paywall view trial start trialpaid renewal funnel per app (from RevenueCat + Superwall)
- Cohort revenue and LTV by `(geo, plan, paywall_variant, acquisition_source)`
- Subscription churn reasons (cancellation surveys where available)
- Price elasticity data per market (PPP bands)
- A/B test history (Supabase `paywall_experiments` table)
- Current paywall code and Superwall placement configs

---

## Outputs

1. **Paywall variant proposals (per app, monthly)** - New paywall designs (copy, layout, plan emphasis, trial structure)
 - Sample size pre-calc and test duration
 - Specific hypothesis ("Shifting yearly to default and emphasizing per-day price will lift trial-to-paid by X%")
 - Generated using Claude with constraints from the Superwall design system + Kalagato brand guidelines

2. **Price proposals (per app, per geo, per plan)** - PPP-band-corrected pricing recommendations
 - Elasticity-based experiments (small price ladders, e.g. $9.99 vs $11.99 vs $14.99 yearly)
 - Bundling experiments (lifetime, family plans, annual+addon)

3. **Segmentation rules** - Different paywalls by acquisition source, geo, app version, or behavior (e.g. power users get the higher-anchor paywall; casual users get the trial-forward paywall)
 - Coordinated with Attribution Agent for source-level segmentation

4. **Renewal & winback campaigns** (coordinated with CRM Agent)
 - Identifies high-LTV cohorts whose renewal is at risk
 - Designs winback offers (discount % + plan change + comms timing)

---

## Tools / MCP needs

- `superwall-mcp`: read/write placements, variants, audience rules
- `revenuecat-mcp`: pricing config, offerings, entitlements, cohort revenue
- `app-store-connect-mcp`: IAP price tier config (Apple's pricing tiers)
- `play-console-mcp`: in-app product pricing
- `firebase-mcp`: user properties, custom events
- `supabase-mcp`: experiment ledger, paywall versioning
- `claude-design`: paywall copy + layout generation (constrained to Superwall components)

---

## KPIs

| Metric | Target |
|---|---|
| Trial-to-paid conversion lift | +5pp YoY on Core apps |
| Paywall view trial start | +10% YoY |
| ARPU on Core apps | +15% YoY |
| Test cycle time (idea conclusion) | 21 days |
| % of paywall changes via experiment (not blind ship) | 100% |

---

## Historical context

The paywall function exists at Kalagato because of one specific win: the **Superwall three-tier paywall on Ryn VPN that delivered a 158% revenue lift** and became a Superwall-published case study. That work established:
- Three-tier anchor architecture (low / recommended / premium) is the workhorse pattern
- Yearly-as-default with prominent per-day math wins more often than weekly-as-default
- Trial duration is more sensitive than headline price in most VPN/utility verticals
- Geo-segmented pricing using PPP bands captures meaningful upside that uniform USD pricing leaves on the table

The agent inherits this playbook and applies it systematically across the portfolio. Most non-VPN Kalagato apps **have never had a real paywall experiment run** they ship with whatever the dev wrote initially. That's the biggest gap the agent closes.

Other historical context driving the design:
- **AdMob + paywall hybrid apps** are where most pricing decisions stall the tradeoff between ad ARPDAU and IAP ARPU is real and human PMs don't reason about it well. The agent coordinates with the Mediation Agent on this explicitly: when a paywall test runs on a hybrid app, the agent freezes mediation changes on that app for the test window.
- **RevenueCat is already in the stack** for OpenHire/VibeHire so the integration debt is low.
- The **GST Calculator PRD** specifically called out paywall via RevenueCat as a core monetization layer; the agent picks this up rather than each app being a one-off.

---

## Approval flow

- **Auto-execute (no approval):** Audience rule changes within Superwall (segmentation), variant rotation in already-running tests, restart of failed test runs
- **Approval required (per change):** New paywall variant going live, price changes >10% from current, new SKU creation, app store IAP product additions
- **Approval batch (weekly):** Standard variant test launches on Core apps

Each approval includes: hypothesis, current vs proposed (visual diff for paywalls, table for prices), expected impact, sample size, test duration, and historical comparable.

---

## Failure modes

- **Confounded by simultaneous ASO/UA changes**: hard cross-worker rule no paywall test runs concurrently with ASO creative changes or UA scale-up on the same app
- **Local pricing legal/tax issues**: pricing changes in regulated geos (e.g. India GST, EU VAT inclusivity rules) routed through a compliance check before going live
- **Race-to-bottom pricing**: floor prices configured per app per geo; agent cannot propose below them
- **Underpowered tests on low-DAU apps**: agent automatically picks longer test windows or multi-app pooled tests when single-app traffic is insufficient

---

## Kill switch

`PAYWALL_AGENT_ENABLED=false` freezes Superwall configs and price proposals. In-flight tests continue (RevenueCat/Superwall keep serving variants), but no new variants ship and no new prices change.
