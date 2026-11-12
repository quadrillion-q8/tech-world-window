import { Link, useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { SEOEngine, BreadcrumbStructuredData } from '../seo/SEOEngine';
import { SITE_NAME, SITE_URL } from '../data/graph';
import { articles } from '../data/articles';
import { ArticleCard } from '../components/ArticleCard';
import { staticPageFigures, galleryPhotoUrl } from '../data/article-images';

// Public contact address shown on the Contact, Privacy and Editorial pages.
const CONTACT_EMAIL = 'quadrillion1980@gmail.com';
const POLICY_UPDATED = 'October 7, 2026';

type PageSection = {
  heading: string;
  paragraphs?: string[];
  items?: { label: string; description: string }[];
  steps?: string[];
};

type Page = {
  title: string;
  description: string;
  body: string[];
  sections?: PageSection[];
};

const content: Record<string, Page> = {
  '/about': {
    title: 'About Tech World Window',
    description: 'Who writes Tech World Window, what we cover, and how we keep our guides accurate.',
    body: [
      'Tech World Window is a practical technology site for people who want to fix a problem or understand a piece of hardware without wading through filler.',
      'It is written by Imran Natiq, a hardware repair engineer focused on PCs and laptops. The editorial focus is practical diagnosis: classify the symptom, collect evidence, isolate the likely cause, and only then change settings or replace hardware.',
      'What we cover: Windows troubleshooting, PC and laptop hardware, gaming performance, storage, buying decisions, free diagnostic tools, and technology news with context. The site is intentionally strongest where a reader needs to understand why something is happening—not just copy a list of fixes.',
      'How we work: every troubleshooting guide starts from a symptom, explains the relevant failure layers, shows how to distinguish them, and then suggests the least destructive next step. We separate manufacturer documentation, measured results, and informed guidance. If we have not tested something ourselves, we do not imply that we have.',
      'Found a mistake? Tell us and we will correct it and note the change. See our Editorial Policy for details, and the Contact page for how to reach us.',
    ],
  },
  '/contact': {
    title: 'Contact',
    description: 'Contact Tech World Window for corrections, suggestions and business enquiries.',
    body: [
      `Email: ${CONTACT_EMAIL}`,
      'Use this address for corrections, article suggestions, questions about a guide, and business or review enquiries.',
      'We read every message and aim to reply within a few working days. We cannot offer personal one-to-one repair support by email, but if a guide did not solve your problem, tell us which step failed and what you saw. That helps us improve the guide.',
      'Please do not send passwords, product keys or other sensitive information.',
    ],
  },
  '/editorial-policy': {
    title: 'Editorial Policy',
    description: 'How Tech World Window approaches accuracy, testing, corrections, and affiliate disclosures.',
    body: [
      'We aim to separate verified facts, informed analysis, and personal opinion. Time-sensitive news should link to primary sources and include publication dates.',
      'Hands-on claims must describe the device, software version, method, and relevant limitations. If we have not tested a product, we must not imply that we have.',
      'Affiliate relationships and sponsored content must be clearly disclosed. Commercial relationships do not guarantee a positive recommendation.',
      `Corrections are made transparently when a material error is identified. To report one, email ${CONTACT_EMAIL}.`,
    ],
  },
  '/affiliate-disclosure': {
    title: 'Affiliate Disclosure',
    description: 'How Tech World Window may earn commissions from product links and how commercial relationships are handled.',
    body: [
      'Tech World Window may use affiliate links in reviews, comparisons and buying guides. If you purchase through one of these links, we may receive a commission at no additional cost to you.',
      'Affiliate relationships do not determine our test results or guarantee a positive recommendation. We aim to recommend products because they fit the stated use case, not because a commission is available.',
      'When we have personally tested a product, we will say so and explain the test context. Product specifications, prices and availability can change, so readers should confirm current details with the retailer or manufacturer before purchasing.',
      'Commercial partnerships, sponsored content and affiliate links will be disclosed clearly on the relevant page. Our editorial policy explains the broader standards we use for testing, corrections and independence.',
    ],
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'What data Tech World Window collects, why, and the choices you have.',
    body: [
      `Last updated: ${POLICY_UPDATED}.`,
      'Tech World Window (techworldwindow.com) is operated by Imran Natiq. This policy explains what information the site collects and how it is used.',
      'Information you give us: if you email us, we receive your email address and whatever you write. We use it only to reply and to improve the site, and we do not sell it.',
      'Information collected automatically: like most websites, our hosting provider records technical data such as IP address, browser type, pages requested and timestamps in server logs, for security and reliability.',
      'Analytics: we use Google Analytics 4, a service provided by Google, to understand which pages are read and how visitors find the site. It is off by default. Nothing from Google is loaded and no analytics cookies are set unless you choose Accept on the cookie notice. If you accept, it uses cookies and collects information such as pages viewed, approximate location, device and browser type, and referring site. We do not use it to identify individual visitors, and advertising storage and personalisation are never enabled. A Global Privacy Control signal from your browser is treated as Decline. Your data is processed by Google, which may transfer it outside your country, including to the United States. More information is in Google\'s privacy policy at policies.google.com/privacy.',
      'Advertising and affiliate links: the site does not currently show ads. If we add advertising or affiliate links, we will update this policy first and name the providers, including any cookies they set. Affiliate links will be disclosed on the pages where they appear.',
      'Cookies: the site does not need cookies to be read. Analytics cookies are set only if you accept them. You can change your mind at any time with the Privacy choices link in the footer: choosing Decline stops analytics immediately, and you can also delete cookies in your browser settings. Your choice is stored in your browser only, so it is remembered for next time.',
      'Your choices: you can ask us to tell you what we hold about you, or to delete it, by emailing us. Depending on where you live, you may have further rights under laws such as the GDPR.',
      'Children: the site is not directed at children under 13 and we do not knowingly collect their data.',
      `Changes: if we change this policy we will update the date above. Questions: ${CONTACT_EMAIL}.`,
    ],
  },
  '/testing': {
    title: 'TWW Testing Methodology',
    description: 'How TWW documents hardware tests, PC benchmarks and troubleshooting evidence—and separates its own measurements from third-party results and technical analysis.',
    body: [
      'Tech World Window (TWW) uses this methodology to explain how technical claims are gathered, checked and presented. A guide may rely on vendor documentation, independent published testing, TWW hands-on work, or technical analysis. Those are different forms of evidence and must not be presented as interchangeable.',
      'This page describes the standard we aim to follow; it is not a claim that every product, PC configuration or workload covered by TWW has been tested in-house. Each page should make clear what evidence supports its conclusions and what remains unverified.'
    ],
    sections: [
      {
        heading: 'Evidence categories',
        paragraphs: ['Readers should be able to tell where a statement comes from. We use these categories to keep specifications, observations and conclusions separate:'],
        items: [
          { label: 'Manufacturer and software-vendor documentation', description: 'Primary sources for published specifications, supported features, firmware notes, driver releases and recommended procedures. A specification confirms what a vendor states; it does not prove how every system will perform.' },
          { label: 'TWW hands-on testing', description: 'First-hand observations made on the named device or configuration. A page should identify the tested hardware, relevant software versions, method and limitations. We use this label only when TWW actually performed the test.' },
          { label: 'Independent testing and research', description: 'Results from an identifiable external reviewer, laboratory, research paper or benchmark publication. We attribute the source and do not re-label another organisation’s measurements as TWW results.' },
          { label: 'Technical analysis', description: 'An explanation based on documented behaviour, system architecture and the available symptoms. Analysis can be useful, but it is not a measured result or proof that one specific component has failed.' }
        ]
      },
      {
        heading: 'The hardware test record',
        paragraphs: ['A useful hardware result needs enough context for another reader to understand what was tested and why a different machine might behave differently. Where a test is performed, the page should record the relevant parts of the following checklist:'],
        items: [
          { label: 'Device and configuration', description: 'Exact product or system model, key component specifications, memory and storage configuration, BIOS or UEFI version, and any configuration detail that could affect the result.' },
          { label: 'Software environment', description: 'Operating-system edition and build, application or game version, graphics driver, storage firmware and other relevant software versions.' },
          { label: 'Test conditions', description: 'Power mode, performance profile, cooling arrangement, connected devices, background workload and ambient temperature when those factors matter.' },
          { label: 'Workload and measurement', description: 'The task being run, settings, duration, measurement tool and version, units, and the point at which data was captured.' },
          { label: 'Repeatability and evidence', description: 'Repeated runs where practical, the number of samples, variation between runs, unexpected behaviour and supporting logs or captures when available.' }
        ]
      },
      {
        heading: 'Troubleshooting: reproduce, isolate, retest',
        paragraphs: [
          'A troubleshooting recommendation should follow the symptom rather than jump straight to a popular fix. The same visible problem—slow performance, a freeze, a high temperature or a failed update—can have several different causes.',
          'The preferred sequence is to define the symptom, establish a baseline, change one relevant variable, and repeat the same check. If several changes are made together, it becomes difficult to know which one helped or whether the result was simply temporary.'
        ],
        steps: [
          'Define the symptom and its scope: when it occurs, how often, and what changed shortly before it began.',
          'Collect a baseline using relevant settings, measurements, error messages or system logs before changing anything.',
          'Check low-risk explanations and authoritative documentation before recommending disruptive repairs or resets.',
          'Change one variable at a time and record exactly what was changed.',
          'Repeat the original test under comparable conditions and compare the result with the baseline.',
          'State whether the issue was reproduced, improved, unchanged or not conclusively diagnosed; do not claim a root cause without supporting evidence.'
        ]
      },
      {
        heading: 'Performance and benchmark interpretation',
        paragraphs: [
          'A single headline number rarely describes the full experience of a PC. Average frame rate, for example, can hide intermittent frame-time spikes; storage throughput does not describe every latency-sensitive workload; and a temperature reading has little meaning without its sensor, workload, power behaviour and test conditions.',
          'Where relevant, TWW explains the metric being used and why it matters. Gaming analysis may need frame-time consistency and percentile lows alongside average FPS. Hardware analysis may need clocks, power, temperatures, utilisation and workload details together rather than one isolated reading.',
          'Results are not universal thresholds. CPU and GPU limits, cooling, firmware, memory configuration, background tasks, operating-system builds and application versions can all change the outcome. Comparisons should use equivalent settings and clearly state any differences.'
        ]
      },
      {
        heading: 'Product profiles and source attribution',
        paragraphs: [
          'A product specification profile is not the same thing as a hands-on review. When TWW has not independently tested a product, the page must say so and rely on clearly attributed manufacturer specifications and external testing where available.',
          'External benchmark results remain the work of the named publisher or test lab. We may explain what those results mean for a buying decision, but we do not imply that TWW repeated the test. Model names, capacities and configurations must match the source being discussed, because similarly named products can have different revisions or specifications.',
          'Prices, stock, firmware, drivers and product specifications can change. Readers should confirm time-sensitive details with the manufacturer or retailer before making a purchase.'
        ]
      },
      {
        heading: 'Limitations, corrections and updates',
        paragraphs: [
          'A test describes the conditions observed; it cannot guarantee the same result on every device. Small sample sizes, background activity, environmental changes, measurement-tool behaviour and version changes can all affect findings. When a limitation could alter the conclusion, it should be stated rather than hidden.',
          'Troubleshooting articles provide general technical guidance, not a remote diagnosis of an individual PC. Readers should protect important data before disruptive changes and avoid electrical, battery or board-level work unless they have the appropriate training and equipment.',
          'If a material factual or methodological error is found, contact TWW through the Contact page with the affected URL and supporting details. We can correct the page and clarify what changed. Editorial standards, sourcing and commercial disclosures are explained separately in the Editorial Policy.'
        ]
      }
    ],
  },
  '/research': {
    title: 'TWW Technology Research',
    description: 'Original technical studies, benchmark data, troubleshooting observations and evidence-led research from Tech World Window.',
    body: [
      'TWW Research is the home for original measurements and technical studies that go beyond a conventional news article or buying guide.',
      'Research projects may cover Windows performance, PC gaming frame times, storage behavior, thermals, hardware compatibility, upgrade decisions, and other practical questions where controlled evidence is more useful than a generic list of tips.',
      'Each study should state its hardware, software versions, test method, variables, limitations, and conclusions. Where raw measurements are available, we aim to publish enough context for another technically minded reader to understand how the result was produced.',
      'The purpose is not to manufacture a headline. It is to create useful primary information that readers, builders, repair technicians, creators and other publications can verify, discuss and cite.',
      'Current research series: SSD capacity pressure, Windows disk active time, PC game frame-time stutter, RAM capacity decisions, SSD thermal behavior, and RAM/SSD upgrade timing. These studies separate published facts and technical analysis from measurements that still need to be run on specified hardware.'
    ],
  },
  '/authors/imran-natiq': {
    title: 'Imran Natiq',
    description: 'Imran Natiq is a hardware repair engineer and the author of Tech World Window.',
    body: [
      'Imran Natiq is a hardware repair engineer and technology writer focused on PC and laptop troubleshooting, Windows diagnostics, gaming performance, storage health, and practical hardware education.',
      'He writes Tech World Window to turn practical diagnostic routines into step-by-step explanations that readers can follow. The editorial method emphasizes symptom classification, measurement, controlled changes, verification, and clear limits.',
      'TWW does not publish invented credentials or unsupported claims of testing. Where an article depends on hands-on testing, the test context and evidence are stated on the page.',
      `Corrections or questions: ${CONTACT_EMAIL}.`,
    ],
  },
};

export function StaticPage() {
  const location = useLocation();
  const page = content[location.pathname] || { title: 'Page not found', description: 'The requested page could not be found.', body: ['This page is not available.'] };
  return (
    <section className="section static-page">
      <SEOEngine title={page.title} description={page.description} path={location.pathname} />
      <BreadcrumbStructuredData items={[
        { name: 'Home', path: '/' },
        { name: page.title, path: location.pathname },
      ]} />
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{page.title}</span></div>
      {location.pathname === '/authors/imran-natiq' && <Head><script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: 'Imran Natiq — Tech World Window',
        url: `${SITE_URL}/authors/imran-natiq`,
        mainEntity: {
          '@type': 'Person',
          name: 'Imran Natiq',
          jobTitle: 'Hardware Repair Engineer & Technology Writer',
          description: 'Hardware repair engineer and technology writer focused on PC and laptop troubleshooting, Windows diagnostics, gaming performance and practical hardware education.',
          url: `${SITE_URL}/authors/imran-natiq`,
          worksFor: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
        },
      })}</script></Head>}
      <span className="eyebrow">TECH WORLD WINDOW</span>
      <h1>{page.title}</h1>
      {page.body.map((p, i) => <p key={i}>{p}</p>)}
      {page.sections?.map(section => (
        <section className="static-page-subsection" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
          {section.items && <ul>{section.items.map(item => <li key={item.label}><strong>{item.label}:</strong> {item.description}</li>)}</ul>}
          {section.steps && <ol>{section.steps.map(step => <li key={step}>{step}</li>)}</ol>}
        </section>
      ))}
      {location.pathname === '/testing' && <section className="static-page-subsection">
        <h2>Related guides and research</h2>
        <p>These resources show how the evidence principles above apply to practical PC troubleshooting and performance analysis.</p>
        <ul>
          <li><Link to="/research">TWW Technology Research</Link> — technical investigations, study questions and published evidence.</li>
          <li><Link to="/tools/frame-time-analyzer">Frame-Time Analyzer</Link> — inspect frame-time captures and compare performance consistency.</li>
          <li><Link to="/pc-game-stuttering-fix-frame-time">PC Game Stuttering: Frame-Time Spikes</Link> — classify stutter patterns before changing settings.</li>
          <li><Link to="/nvme-ssd-temperature-too-high">NVMe SSD Temperature Guide</Link> — understand sensor readings, workload and thermal limits.</li>
          <li><Link to="/editorial-policy">Editorial Policy</Link> — accuracy, sourcing, corrections and commercial independence.</li>
        </ul>
      </section>}
      {staticPageFigures[location.pathname]?.map(fig => <figure key={fig.id} style={{ margin: '1.5rem 0' }}>
        <img src={galleryPhotoUrl(fig.id)} alt={fig.alt} loading="lazy" decoding="async" width={1400} height={1400} style={{ display: 'block', width: '100%', maxWidth: '560px', height: 'auto', borderRadius: '12px' }} />
        <figcaption style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.82 }}>{fig.caption} <Link to="/gallery">See the full repair photo gallery →</Link></figcaption>
      </figure>)}
      {location.pathname === '/research' && <div className="author-profile-links research-index">
        <h2>Research currently in the lab</h2>
        <p>These studies define the questions TWW is investigating. Pages distinguish test design from results; benchmark numbers are published only after the corresponding test has actually been run.</p>
        <div className="profile-link-grid">{articles.filter(a => a.subcategory === 'Research').map(item =>
          <ArticleCard key={item.id} article={item} />
        )}</div>
      </div>}
      {location.pathname === '/authors/imran-natiq' && <div className="author-profile-links">
        <h2>Explore the work</h2>
        <div className="profile-link-grid">
          <Link to="/testing"><strong>Testing Methodology</strong><span>How TWW handles measurements, troubleshooting and evidence.</span></Link>
          <Link to="/research"><strong>TWW Research</strong><span>Original technical studies and evidence-led investigations.</span></Link>
          <Link to="/editorial-policy"><strong>Editorial Policy</strong><span>Accuracy, corrections, sourcing and commercial independence.</span></Link>
          <Link to="/guides"><strong>Practical Guides</strong><span>Windows, gaming and hardware troubleshooting.</span></Link>
        </div>
      </div>}
      <Link className="text-link" to="/">Return to the homepage →</Link>
    </section>
  );
}
