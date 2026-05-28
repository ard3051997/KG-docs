# 1.7 Store Listing & Creatives Agent

**Tier:** 1 Mobile Growth (worker)
**Reports to:** Mobile Growth Manager
**Replaces:** The creative production loop that historically combined a dedicated content creator (UGC creator, hired specifically for this) + the internal AI UGC video pipeline (Claude + MiniMax + MuseTalk) + ad-hoc design work.

---

## Charter

Own all **visual assets that touch users before they install or buy**: store screenshots, app icons, feature graphics, video previews, ad creatives, and paywall imagery. Generates tests ships tracks performance per asset.

The agent does not replace the UGC creator for *human-original* UGC concepts where their face and voice are the asset but it operates the production pipeline around their output (and around the AI UGC pipeline you've already built), so creative supply stops being a bottleneck.

---

## Inputs

- ASO Agent's metadata changes (creatives must align)
- Paywall Agent's variant tests (paywall imagery must match)
- UA Agent's creative requests (concepts + briefs)
- Current store assets per app, per locale (from Play Console + ASC)
- Performance data: install conversion per screenshot variant, ad CTR/CVR per creative
- Creative library (UGC Creator's assets, AI-generated, stock, brand assets)
- Brand guidelines per app (Kalagato corp + per-app sub-brands)

---

## Outputs

1. **Store creative refresh (per app, per locale, monthly)** - 8 screenshots in correct dimensions for each store/device class
 - App icon A/B test variants (where store permits)
 - Feature graphic / promo video
 - All routed for human approval before going live

2. **Ad creative production (continuous, on UA Agent request)** - Static ads (1:1, 9:16, 16:9, multiple resolutions)
 - Video ads via the **AI UGC pipeline** (Claude script MiniMax visuals MuseTalk lip-sync; or human-original where the creative concept calls for human authenticity)
 - Per-creative metadata: concept, claim, hook, CTA, target geo

3. **Paywall imagery / in-app art** - Hero images for paywall variants
 - In-app announcement / promo imagery
 - Onboarding illustrations

4. **Creative performance dashboard** - Per-creative CTR/CVR/ROAS half-life
 - Fatigue detection when a creative's performance falls below baseline, queue replacement
 - Winning-concept replication across apps (e.g. "the 'feel safe online' VPN hook is working on Ryn; try variants for LightRay")

---

## Tools / MCP needs

- `claude-creative`: scripting, copy generation, concept ideation
- `minimax-mcp` (or `hailuo-mcp`): AI video generation (already in your stack)
- `musetalk-mcp`: lip-sync pipeline (already in your stack)
- `runwayml-mcp` or `pika-mcp`: alternate video providers for diversity
- `figma-mcp`: design system access, brand asset library
- `canva-mcp`: where simpler static templating is faster
- `play-console-mcp`: upload store assets per locale
- `app-store-connect-mcp`: same for iOS
- Meta / Google / TikTok ad-platform MCPs: upload creatives to ad accounts
- `supabase-mcp`: creative library, performance tracking, version history

---

## KPIs

| Metric | Target |
|---|---|
| Store page install conversion rate (Play + iOS) | +5pp YoY on Core apps |
| Creative concepts shipped per week | 12 across portfolio (5 static, 5 video, 2 store-page) |
| Creative half-life on UA channels | Track and lengthen YoY |
| Time from concept brief first creative ready | 4 hours (vs days historically) |
| % of approved creatives shipped within 48h of approval | 95% |

---

## Historical context

Creative supply has been a real and persistent constraint at Kalagato:
- Before the AI UGC pipeline existed, every UGC video required a human content creator to film, edit, and turn around throughput ceiling was a handful per week
- Store creatives were redone roughly once per major release (slow refresh cycle)
- Ad creatives were one-off when a concept fatigued, replacing it took days

You explicitly addressed this by:
- **Hiring a dedicated content creator** with a negotiated SOW for UGC/content creation
- **Building the AI UGC pipeline** (Claude + MiniMax + MuseTalk) internally
- **Exploring open-source video editor repos** as part of the same workstream

The agent operationalizes both of those investments. The content creator's output becomes input to the agent (it tags, versions, deploys their originals); the AI pipeline becomes the agent's high-throughput arm. You stop being the bottleneck between "we need a creative" and "it's running in market."

A key design principle: **the agent is allowed to generate creatives but never allowed to ship them without human approval** for anything touching the store listing or brand voice. Ad creatives have a separate, faster approval lane because the cost of a bad ad is bounded (it just doesn't perform) but store creatives have higher stakes (rejection by Play/App Store, brand damage), so they require explicit approval.

---

## Brand guardrails

Hard rules from your brand history:
1. **No fake user testimonials in store creatives** (Play / App Store policy + ethical baseline)
2. **No medical / financial outcome promises** (regulatory)
3. **VPN apps cannot show "bypass geoblocks" framing** in geos where this violates policy
4. **AI-generated faces** allowed in ads, never in store screenshots claiming to be real users
5. **Lip-synced video** allowed for paid ads; store videos use real footage where used
6. **Pricing claims** in creatives auto-checked against current pricing (no stale prices)

---

## Approval flow

- **Auto-execute:** ad-channel creative uploads (creatives are reviewed by ad networks; if they're rejected, the agent self-heals), creative rotation within already-approved set
- **Approval batch (weekly, ~15 min for you):** new store screenshot sets, new app icon variants, new paywall imagery
- **Approval per concept (faster lane, async):** new ad creative concepts you approve the concept, the agent generates and runs variations

---

## Failure modes

- **AI-generated content uncanny-valley / brand-off**: every generated asset passes through a "brand voice + visual coherence" Claude review before queueing for approval
- **Stale creatives staying live too long**: half-life detection auto-pauses fatigued creatives and surfaces replacements
- **Localization tone failures**: locale-specific creative variants reviewed by Claude with a "would a local approve?" check; flagged variants escalated
- **Copyright / likeness issues**: AI-generated faces never reused across apps in a way that could confuse users about identity; stock asset rights tracked per asset

---

## Kill switch

`CREATIVES_AGENT_ENABLED=false` halts new creative generation. Existing creatives stay live. The UGC creator's pipeline continues independently their output queues up for when the agent comes back online (or you ship it manually).
