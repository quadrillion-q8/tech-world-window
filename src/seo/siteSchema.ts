import { authors } from '../data/authors';
import { SITE_NAME, SITE_TAGLINE, SITE_URL, siteEntity } from '../data/graph';

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

const organizationId = SITE_URL + '/#organization';
const websiteId = SITE_URL + '/#website';
const author = authors.imranNatiq;
const personId = absoluteUrl(author.url) + '#person';

const featuredHomepageItems = [
  { name: 'Windows troubleshooting and updates', path: '/windows' },
  { name: 'Complete Windows troubleshooting guide', path: '/windows-troubleshooting-complete-guide' },
  { name: 'PC gaming performance and frame-time guides', path: '/gaming' },
  { name: 'GPU at 100% usage while gaming', path: '/gpu-100-percent-usage-gaming' },
  { name: 'GPU frame-time spikes: causes and diagnosis', path: '/gpu-frame-time-spikes-causes-fix' },
  { name: 'PC and laptop hardware diagnostics', path: '/hardware' },
  { name: 'How to check SSD health in Windows', path: '/how-to-check-ssd-health-windows' },
  { name: 'PC power-supply problems and safe tests', path: '/pc-power-supply-problems-symptoms' },
  { name: 'PC Bottleneck Calculator: CPU vs GPU', path: '/tools/pc-bottleneck-calculator' },
  { name: 'Frame-Time Analyzer', path: '/tools/frame-time-analyzer' },
  { name: 'BSOD Error Code Lookup', path: '/tools/bsod-error-code-lookup' },
  { name: 'RAM calculator', path: '/tools/ram-calculator' },
  { name: 'SSD and HDD storage calculator', path: '/tools/storage-calculator' },
  { name: 'PSU wattage calculator', path: '/tools/psu-wattage-calculator' },
  { name: 'TWW testing methodology', path: '/testing' },
  { name: 'Editorial policy', path: '/editorial-policy' },
];

export function buildSiteSchemaGraph(includeHomepageItems: boolean) {
  const organization = {
    '@type': 'Organization',
    '@id': organizationId,
    name: SITE_NAME,
    url: SITE_URL,
    description: siteEntity.description,
    slogan: SITE_TAGLINE,
    logo: {
      '@type': 'ImageObject',
      '@id': SITE_URL + '/#logo',
      url: absoluteUrl('/tech-world-window-mark.png'),
      contentUrl: absoluteUrl('/tech-world-window-mark.png'),
    },
    publishingPrinciples: absoluteUrl('/editorial-policy'),
    correctionsPolicy: absoluteUrl('/editorial-policy'),
    founder: { '@id': personId },
    knowsAbout: [
      'Windows troubleshooting',
      'Windows 11 and Windows 10 updates',
      'PC gaming performance',
      'Frame-time analysis',
      'Computer hardware diagnostics',
      'SSD and RAM diagnostics',
      'PC and laptop repair',
    ],
  };

  const person = {
    '@type': 'Person',
    '@id': personId,
    name: author.name,
    url: absoluteUrl(author.url),
    jobTitle: author.role,
    description: author.bio,
    knowsAbout: author.expertise,
    worksFor: { '@id': organizationId },
  };

  const website: Record<string, unknown> = {
    '@type': 'WebSite',
    '@id': websiteId,
    name: SITE_NAME,
    alternateName: 'TWW',
    url: SITE_URL,
    description: 'Evidence-led Windows troubleshooting, PC gaming performance analysis, hardware guidance and free interactive tools.',
    inLanguage: 'en',
    publisher: { '@id': organizationId },
    about: [
      { '@type': 'Thing', name: 'Windows troubleshooting' },
      { '@type': 'Thing', name: 'PC gaming performance and frame-time analysis' },
      { '@type': 'Thing', name: 'Computer hardware diagnostics and upgrades' },
    ],
  };

  const graph: Record<string, unknown>[] = [organization, person, website];

  if (includeHomepageItems) {
    const itemListId = SITE_URL + '/#featured-resources';
    website.hasPart = { '@id': itemListId };
    graph.push({
      '@type': 'ItemList',
      '@id': itemListId,
      name: 'Featured Tech World Window guides and interactive tools',
      description: 'Direct paths from the homepage to TWW topic hubs, priority technical guides, free diagnostic tools and editorial trust resources.',
      numberOfItems: featuredHomepageItems.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: featuredHomepageItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph.map(node => ({ ...node, ...(node === organization || node === person || node === website ? {} : {}) })),
  };
}
