import { Link, useLocation } from 'react-router-dom';
import { SEOEngine } from '../seo/SEOEngine';

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
      'It is written by Imran Natiq, a hardware repair engineer who works with PCs and laptops at component level. The guides on Windows troubleshooting, network faults, game stutter and SSD health come from that bench experience: the order in which problems are actually ruled out, and which fixes are worth trying first.',
      'What we cover: Windows troubleshooting, PC and laptop hardware, gaming performance, storage, and the occasional technology news item with context.',
      'How we work: every guide starts from a symptom, explains what could cause it, shows how to tell the causes apart, and only then suggests a fix. We say what we tested and what we did not, and we note when a fix changes settings or carries risk. If we have not tested something ourselves, we do not imply that we have.',
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
  '/authors/imran-natiq': {
    title: 'Imran Natiq',
    description: 'Imran Natiq is a hardware repair engineer and the author of Tech World Window.',
    body: [
      'Imran Natiq is a hardware repair engineer who works on PC and laptop hardware at component level, from storage and power faults to network and performance problems.',
      'He writes Tech World Window to turn the diagnostic routines used at the repair bench into step-by-step guides that anyone can follow. He covers Windows troubleshooting, gaming performance, SSD and storage health, and hardware explained plainly.',
      '[EDIT: add 1–2 verifiable specifics here, such as years of experience, the kind of repairs you do, certifications, or the shop or employer you may name.]',
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
      <span className="eyebrow">TECH WORLD WINDOW</span>
      <h1>{page.title}</h1>
      {page.body.map((p, i) => <p key={i}>{p}</p>)}
      <Link className="text-link" to="/">Return to the homepage →</Link>
    </section>
  );
}
