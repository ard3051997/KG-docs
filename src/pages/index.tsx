import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function HeroSection() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroTagline}>Human Data SG Pte. Ltd.</div>
        <Heading as="h1" className={styles.heroTitle}>
          The Mobile App Portfolio <span className={styles.heroTitleGradient}>Scaling Engine</span>
        </Heading>
        <p className={styles.heroSubtitle}>
          Governing globally optimized security, entertainment, and utility apps serving millions of active users.
        </p>
        
        <div className={styles.indexCtas}>
          <Link className={styles.primaryCta} to="/docs/human_org">
            Explore Human Org Chart & SOPs
          </Link>
          <Link className={styles.secondaryCta} to="/docs/agent_org">
            View Agentic Blueprint
          </Link>
          <Link className={styles.secondaryCta} to="/editor">
            Launch Live Editor
          </Link>
        </div>


      </div>
    </div>
  );
}

function PillarsSection() {
  const pillars = [
    {
      num: '01',
      title: 'Human Strategic Layer',
      desc: 'Elite standard operating procedures, strict release pipelines, M&A appraisals, and manual due diligence matrices governed by domain owners.',
    },
    {
      num: '02',
      title: 'Agentic Operational Layer',
      desc: 'Machine orchestration architectures, automated ASO keyword tools, admob floor managers, and real-time incident reporting for global mobile systems.',
    },
    {
      num: '03',
      title: 'Quantitative Scaling',
      desc: 'Rigorous unit economic checks (RoAS and cohort LTV metrics), inverse pyramid organic optimizations, and algorithmic paid user acquisition.',
    },
  ];

  return (
    <div className={styles.section}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Our Core Pillars</h2>
        <div className={styles.featuresGrid}>
          {pillars.map((p, idx) => (
            <div className={styles.featureCard} key={idx}>
              <span className={styles.featureNum}>{p.num}</span>
              <Heading as="h3" className={styles.featureTitle}>
                {p.title}
              </Heading>
              <p className={styles.featureDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioSection() {
  const portfolios = [
    {
      name: 'Ryn VPN',
      category: 'Security & Privacy',
      desc: 'High-speed secure proxy engine serving high-concurrency global user loads.',
      letter: 'R',
    },
    {
      name: 'Voice Changer',
      category: 'Entertainment',
      desc: 'Flagship voice modulation and conversion audio application with millions of sessions.',
      letter: 'V',
    },
    {
      name: 'Hammer Security',
      category: 'Utility & Safety',
      desc: 'Personal safety mobile anti-theft suite delivering client protection tools.',
      letter: 'H',
    },
    {
      name: 'Clone Armies',
      category: 'Gaming & Fun',
      desc: 'Fast-paced tactical action shooter utilizing cloned strategy mechanics.',
      letter: 'C',
    },
  ];

  return (
    <div className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <h2 className={styles.sectionTitle}>Featured App Portfolio</h2>
        <div className={styles.portfolioGrid}>
          {portfolios.map((app, idx) => (
            <div className={styles.appCard} key={idx}>
              <div className={styles.appHeader}>
                <div className={styles.appIcon}>{app.letter}</div>
                <div>
                  <div className={styles.appCategory}>{app.category}</div>
                  <div className={styles.appName}>{app.name}</div>
                </div>
              </div>
              <p className={styles.appDesc}>{app.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="KalaGato App Portfolio Scaling Portal">
      <main>
        <HeroSection />
        <PillarsSection />
        <PortfolioSection />
      </main>
    </Layout>
  );
}
