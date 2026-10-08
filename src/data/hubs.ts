/**
 * Title + meta description for the commercial hub pages (/reviews, /best and the review sub-hubs).
 * Shared by CommercialHubPage (runtime head) and ssgSeo (build-time HTML) so both always agree
 * and each hub keeps its own description instead of falling back to the site-wide one.
 */
export const hubSeo: Record<string, { title: string; description: string }> = {
  '/reviews': {
    title: 'Technology Reviews',
    description: 'Evidence-led technology reviews, comparisons and buying advice from Tech World Window.',
  },
  '/best': {
    title: 'Best Technology Picks',
    description: 'Practical technology buying guides built around use cases, compatibility, performance and value.',
  },
  '/reviews/ssds': {
    title: 'SSD Reviews',
    description: 'SSD coverage focused on specifications, thermals, endurance and real-world buying decisions.',
  },
  '/reviews/gpus': {
    title: 'GPU Reviews',
    description: 'Graphics-card reviews covering gaming performance, frame times, thermals and value.',
  },
  '/reviews/laptops': {
    title: 'Laptop Reviews',
    description: 'Laptop reviews focused on performance, thermals, battery behavior and upgradeability.',
  },
  '/reviews/cpus': {
    title: 'CPU Reviews',
    description: 'CPU reviews and comparisons for gaming, productivity, thermals and platform decisions.',
  },
};
