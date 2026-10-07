import { Head } from 'vite-react-ssg';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '../data/graph';

export function SiteStructuredData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    slogan: SITE_TAGLINE,
    description: 'Practical Windows troubleshooting, PC gaming performance guides, hardware analysis, buying advice and useful technology tools.',
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/tech-world-window-mark.png` },
    contactPoint: { '@type': 'ContactPoint', contactType: 'editorial', url: `${SITE_URL}/contact` },
    knowsAbout: [
      'Windows troubleshooting',
      'PC hardware diagnostics',
      'PC gaming performance',
      'SSD and RAM health',
      'Technology testing',
    ],
  };
  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: 'TWW',
    url: SITE_URL,
    description: 'Windows, PC gaming and hardware guides explained with evidence.',
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
  };
  return <Head><script type="application/ld+json">{JSON.stringify(organization)}</script><script type="application/ld+json">{JSON.stringify(website)}</script></Head>;
}
