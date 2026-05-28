"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["21106"],{10339(e,a,t){t.r(a),t.d(a,{default:()=>s});var i=t(62540),r=t(63696),n=t(1419);let o=[{name:"Founder & Interim CEO",role:"Strategic Capital & Strategy",department:"Leadership",focus:"Overall business strategy, capital allocation, Singapore entity management, and final approval gate.",agentInteraction:"Interacts with Tier 0 Orchestrator (Chief of Staff Agent) for morning briefs and weekly reviews.",bio:"Overseeing transition to automated agentic operations to hit the company target of $300K/month MRR, leading the $500K M&A pipeline.",initials:"FC"},{name:"Partner & Strategic Growth",role:"M&A and Portfolio Valuations",department:"Leadership",focus:"Sourcing mobile acquisitions, strategic valuation modeling, multiple arbitrage, and capital recycling.",agentInteraction:"Works with the Portfolio PM agent to evaluate candidates and review exit listings.",bio:"Pioneering multiple arbitrage on profit multiples (1.5-2x acquisitions) and executing strategic divestments of tail assets at 3x revenue.",initials:"SG"},{name:"Mobile Portfolio Lead",role:"Product Strategy & Funnel Optimization",department:"Product",focus:"Product vision, growth roadmap orchestration, and conversion funnel optimization.",agentInteraction:"Supervises Tier 1 Growth Manager Agent and provides human reviews for A/B testing thresholds.",bio:'Leading the transition from aggressive registration walls to value-driven, "guest-first" conversion loops across the 15+ app catalog.',initials:"PL"},{name:"Monetization & AdMediation Lead",role:"Ad Revenue & Dynamic Pricing",department:"Product",focus:"AdMob and Unity mediation setup, eCPM enhancement, custom paywalls, and billing logic.",agentInteraction:"Supervises the Paywall & Pricing Agent and AdMob Mediation Agent.",bio:"Specialist in dynamic soft-to-hard paywall pipelines, mediation waterfall optimization, and reducing operational drag.",initials:"ML"},{name:"Technical Architect & CTO",role:"System Architecture & Infrastructure",department:"Engineering",focus:"Platform health, system architecture, SDK integrations, API telemetry, and developer ops.",agentInteraction:"Supervises Tier 2 Tech Manager Agent, controlling the automation deployment switch.",bio:"Guardian of tech infrastructure. Configured the bypass scripts and Node integration boundaries ensuring system robustness.",initials:"TA"},{name:"ASO & Paid UA Lead",role:"ASO Strategy & Marketing Spend",department:"Marketing",focus:"Paid user acquisition (Google Ads, Unity ads), App Store Optimization, custom store listings, and keyword rankings.",agentInteraction:"Directly guides and approves outputs from the ASO & Keyword Agent and UA Agent.",bio:"Managing the $50K+ UA marketing credit engine. Championing ad network diversification into Unity Ads to combat CPI inflation.",initials:"UL"},{name:"Senior iOS Developer",role:"iOS Application Engineering",department:"Engineering",focus:"iOS app engineering, Apple developer portal, provisioning profiles, Swift codebases, and App Store Connect.",agentInteraction:"Acts as human-in-the-loop supervisor for the iOS Dev Agent and Observability Agent.",bio:"Specializes in Swift UI architecture, maintaining high-conversion iOS clones, and resolving metadata/policy flags.",initials:"ID"},{name:"Senior Android Developer",role:"Android Application Engineering",department:"Engineering",focus:"Android application engineering, billing SDKs, Google Play Console, and Kotlin architectures.",agentInteraction:"Supervises the Android Dev Agent and Security/Compliance Agent.",bio:"Maintains native Android apps, integrating RevenueCat and Superwall SDKs to drive conversion optimizations.",initials:"AD"},{name:"Systems Engineer",role:"Database Ops & Telemetry Scripts",department:"Engineering",focus:"Database operations, release pipelines, cron job setups, and automated testing hooks.",agentInteraction:"Reviews logs and coordinates with the QA & E2E Test Agent.",bio:'Maintains portfolio server-side cron loops and ensures the "Huge Digital Clock" telemetry checks are active.',initials:"SE"}];function s(){let[e,a]=(0,r.useState)("All"),t="All"===e?o:o.filter(a=>a.department===e);return(0,i.jsxs)(n.A,{title:"Human Org Chart - KalaGato",description:"The traditional human organization, roles, and M&A leadership matrix of KalaGato.",children:[(0,i.jsx)("style",{dangerouslySetInnerHTML:{__html:`
        /* KalaGato.ai Brand Styling Integration */
        .kg-org-container {
          background-color: #030712;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.04) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.03) 0%, transparent 40%);
          color: #f3f4f6;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          padding: 4rem 2rem;
        }

        .kg-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem auto;
        }

        .kg-logo-area {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .kg-logo-kala {
          font-weight: 800;
          font-size: 2.2rem;
          letter-spacing: -0.05em;
          color: #ffffff;
        }

        .kg-logo-gato {
          font-weight: 800;
          font-size: 2.2rem;
          letter-spacing: -0.05em;
          color: #FFC107; /* Brand Accent */
        }

        .kg-logo-sub {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #9CA3AF;
          margin-top: -0.25rem;
          display: block;
        }

        .kg-tagline {
          font-size: 1.25rem;
          color: #9CA3AF;
          max-width: 600px;
          margin: 1.5rem auto 0 auto;
          line-height: 1.6;
        }

        .kg-section-title {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2rem;
          text-align: center;
          position: relative;
        }

        /* Filter Tabs */
        .kg-tabs-wrapper {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 3.5rem;
        }

        .kg-tab-btn {
          background-color: rgba(17, 24, 39, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #9CA3AF;
          padding: 0.6rem 1.5rem;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 0.9rem;
        }

        .kg-tab-btn:hover {
          border-color: rgba(255, 193, 7, 0.4);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .kg-tab-btn.active {
          background-color: #FFC107;
          border-color: #FFC107;
          color: #000000;
          box-shadow: 0 4px 20px rgba(255, 193, 7, 0.3);
        }

        /* Team Grid */
        .kg-team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Glassmorphic Card */
        .kg-member-card {
          background-color: rgba(17, 24, 39, 0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 193, 7, 0.1);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .kg-member-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, transparent, #FFC107, transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .kg-member-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 193, 7, 0.4);
          box-shadow: 
            0 20px 40px -15px rgba(255, 193, 7, 0.15),
            0 0 50px -10px rgba(59, 130, 246, 0.05);
        }

        .kg-member-card:hover::before {
          opacity: 1;
        }

        .kg-card-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .kg-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 2px solid rgba(255, 193, 7, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #FFC107;
          font-size: 1.2rem;
          letter-spacing: 0.05em;
          flex-shrink: 0;
          transition: border-color 0.3s ease;
        }

        .kg-member-card:hover .kg-avatar {
          border-color: #FFC107;
        }

        .kg-meta-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.25rem 0;
          transition: color 0.3s ease;
        }

        .kg-member-card:hover .kg-meta-title {
          color: #FFC107;
        }

        .kg-meta-role {
          font-size: 0.85rem;
          font-weight: 600;
          color: #FFC107;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .kg-dept-badge {
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          background-color: rgba(255, 255, 255, 0.05);
          color: #9CA3AF;
        }

        .kg-detail-block {
          margin-bottom: 1.25rem;
        }

        .kg-detail-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #6B7280;
          margin-bottom: 0.35rem;
          display: block;
        }

        .kg-detail-text {
          font-size: 0.9rem;
          color: #D1D5DB;
          line-height: 1.5;
        }

        .kg-bio-text {
          font-size: 0.9rem;
          color: #9CA3AF;
          line-height: 1.5;
          margin-top: auto;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        /* Valuation Banner Vibe from kalagato.ai */
        .kg-valuation-banner {
          max-width: 1200px;
          margin: 5rem auto 0 auto;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(3, 7, 18, 0.9) 100%);
          border: 1px solid rgba(255, 193, 7, 0.2);
          border-radius: 20px;
          padding: 3rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .kg-valuation-banner::after {
          content: '';
          position: absolute;
          bottom: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%);
          border-radius: 50%;
        }

        .kg-val-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .kg-val-desc {
          font-size: 1rem;
          color: #9CA3AF;
          max-width: 700px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
        }

        .kg-btn-gold {
          background-color: #FFC107;
          color: #000000;
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.85rem 2rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .kg-btn-gold:hover {
          background-color: #E6A800;
          color: #000000;
          box-shadow: 0 5px 25px rgba(255, 193, 7, 0.4);
          transform: translateY(-2px);
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .kg-org-container {
            padding: 3rem 1rem;
          }
          
          .kg-valuation-banner {
            padding: 2rem 1.5rem;
          }
        }
      `}}),(0,i.jsxs)("main",{className:"kg-org-container",children:[(0,i.jsxs)("header",{className:"kg-header",children:[(0,i.jsxs)("div",{className:"kg-logo-area",children:[(0,i.jsx)("span",{className:"kg-logo-kala",children:"Kala"}),(0,i.jsx)("span",{className:"kg-logo-gato",children:"Gato"})]}),(0,i.jsx)("span",{className:"kg-logo-sub",children:"Traditional Human Org Matrix"}),(0,i.jsx)("p",{className:"kg-tagline",children:"The core human leadership and operations matrix managing KalaGato's acquisitions, capital strategies, product scaling, and agentic workflows."})]}),(0,i.jsx)("nav",{className:"kg-tabs-wrapper","aria-label":"Department Filter",children:["All","Leadership","Product","Engineering","Marketing"].map(t=>(0,i.jsx)("button",{className:`kg-tab-btn ${e===t?"active":""}`,onClick:()=>a(t),children:t},t))}),(0,i.jsx)("section",{className:"kg-team-grid","aria-label":"Team Grid",children:t.map(e=>(0,i.jsxs)("article",{className:"kg-member-card",children:[(0,i.jsx)("span",{className:"kg-dept-badge",children:e.department}),(0,i.jsxs)("div",{className:"kg-card-header",children:[(0,i.jsx)("div",{className:"kg-avatar",children:e.initials}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{className:"kg-meta-title",children:e.name}),(0,i.jsx)("span",{className:"kg-meta-role",children:e.role})]})]}),(0,i.jsxs)("div",{className:"kg-detail-block",children:[(0,i.jsx)("span",{className:"kg-detail-label",children:"Scope & Focus"}),(0,i.jsx)("p",{className:"kg-detail-text",children:e.focus})]}),(0,i.jsxs)("div",{className:"kg-detail-block",children:[(0,i.jsx)("span",{className:"kg-detail-label",children:"Agentic Supervisions"}),(0,i.jsx)("p",{className:"kg-detail-text",style:{color:"#93C5FD",fontWeight:"500"},children:e.agentInteraction})]}),(0,i.jsx)("p",{className:"kg-bio-text",children:e.bio})]},e.name))}),(0,i.jsxs)("section",{className:"kg-valuation-banner",children:[(0,i.jsx)("h2",{className:"kg-val-title",children:"Looking to Sell Your Mobile App?"}),(0,i.jsx)("p",{className:"kg-val-desc",children:"At KalaGato, we acquire and optimize mobile apps with data-driven strategies to maximize their growth potential. We specialize in seamless transitions, 100% secure payment transactions, and exit opportunities for indie publishers."}),(0,i.jsx)("a",{href:"https://www.kalagato.ai/app-valuation-calculator",target:"_blank",rel:"noopener noreferrer",className:"kg-btn-gold",children:"Get Your Valuation Model"})]})]})]})}}}]);