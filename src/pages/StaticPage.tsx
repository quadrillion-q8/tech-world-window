import { Link, useLocation } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { SEOEngine } from '../seo/SEOEngine';
import { SITE_NAME, SITE_URL } from '../data/graph';

// Public contact address shown on the Contact, Privacy and Editorial pages.
const CONTACT_EMAIL = 'quadrillion1980@gmail.com';
const POLICY_UPDATED = 'October 7, 2026';

type Page = { title: string; description: string; body: string[] };

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
      'Analytics: we use Google Analytics 4, a service provided by Google, to understand which pages are read and how visitors find the site. It uses cookies and collects information such as pages viewed, approximate location, device and browser type, and referring site. We do not use it to identify individual visitors. You can opt out with the Google Analytics Opt-out Browser Add-on or by blocking cookies in your browser. More information is in Google\'s privacy policy at policies.google.com/privacy.',
      'Advertising and affiliate links: the site does not currently show ads. If we add advertising or affiliate links, we will update this policy first and name the providers, including any cookies they set. Affiliate links will be disclosed on the pages where they appear.',
      'Cookies: the site does not need cookies to be read. Google Analytics sets cookies to distinguish visitors and sessions, and you can block or delete cookies in your browser settings. If you are in the EU, UK or a similar region, you can decline analytics cookies by blocking them in your browser or using the opt-out add-on above.',
      'Your choices: you can ask us to tell you what we hold about you, or to delete it, by emailing us. Depending on where you live, you may have further rights under laws such as the GDPR.',
      'Children: the site is not directed at children under 13 and we do not knowingly collect their data.',
      `Changes: if we change this policy we will update the date above. Questions: ${CONTACT_EMAIL}.`,
    ],
  },
  '/testing': {
    title: 'TWW Testing Methodology',
    description: 'How Tech World Window approaches hands-on hardware testing, software troubleshooting, measurements, repeatability, and evidence.',
    body: [
      'Tech World Window separates three kinds of evidence: documented facts from manufacturers or software vendors, TWW measurements from controlled testing, and informed guidance based on technical reasoning.',
      'When we test hardware, the useful context includes the device or component, operating system, driver or firmware version, workload, settings, measurement tool, ambient conditions where relevant, and any limitations that could change the result.',
      'For troubleshooting, our preferred method is symptom classification → reproduction → measurement → isolation → one-variable change → retest → confirmation. The goal is to avoid stacking fixes until nobody knows which change actually helped.',
      'Benchmarks are not treated as universal truths. Results can vary with firmware, drivers, cooling, power limits, silicon, application versions and test settings. A TWW result is therefore presented with its test context rather than as a promise for every system.',
      'We do not label specification profiles as hands-on reviews. If a product has not been independently tested by TWW, the page should say so clearly.'
    ],
  },
  '/research': {
    title: 'TWW Technology Research',
    description: 'Original technical studies, benchmark data, troubleshooting observations and evidence-led research from Tech World Window.',
    body: [
      'TWW Research is the home for original measurements and technical studies that go beyond a conventional news article or buying guide.',
      'Research projects may cover Windows performance, PC gaming frame times, storage behavior, thermals, hardware compatibility, upgrade decisions, and other practical questions where controlled evidence is more useful than a generic list of tips.',
      'Each study should state its hardware, software versions, test method, variables, limitations, and conclusions. Where raw measurements are available, we aim to publish enough context for another technically minded reader to understand how the result was produced.',
      'The purpose is not to manufacture a headline. It is to create useful primary information that readers, builders, repair technicians, creators and other publications can verify, discuss and cite.'
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
      <Link className="text-link" to="/">Return to the homepage →</Link>
    </section>
  );
}
