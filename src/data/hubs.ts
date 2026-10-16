/**
 * Titles and descriptions for the reviews and buying-guide hubs.
 * Shared by runtime SEO and build-time SSG output.
 */
export const hubSeo: Record<string, { title: string; description: string }> = {
  '/reviews': {
    title: 'Technology Reviews & Product Research',
    description: 'Product profiles, manufacturer specifications, independent hardware reviews and transparent buying notes from Tech World Window.',
  },
  '/best': {
    title: 'Best Technology Picks',
    description: 'Practical technology buying guides built around use cases, compatibility, performance and value.',
  },
  '/reviews/ssds': {
    title: 'SSD Product Profiles & Reviews',
    description: 'SSD specifications, endurance ratings, compatibility notes and independent testing from named review sources.',
  },
  '/reviews/gpus': {
    title: 'GPU Product Profiles & Reviews',
    description: 'GPU specifications and linked independent lab findings covering gaming, frame times, thermals, power and value.',
  },
  '/reviews/laptops': {
    title: 'Laptop Product Profiles & Reviews',
    description: 'Exact laptop configurations, display, performance, thermals, upgradeability and independent review findings.',
  },
  '/reviews/cpus': {
    title: 'CPU Product Profiles & Reviews',
    description: 'CPU platform specifications alongside independent gaming, productivity, power and thermal reviews.',
  },
};
