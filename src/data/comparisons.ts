import { getProduct, type Product } from './products';

export type ComparisonRow = { label: string; a: string; b: string };

export type Comparison = {
  slug: string;
  a: string;
  b: string;
  eyebrow: string;
  dek: string;
  metaDescription: string;
  rows: ComparisonRow[];
  /** Plain-language reading of the specification differences. Never a TWW benchmark claim. */
  sections: { heading: string; paragraphs: string[] }[];
  evidenceNote: string;
  guide?: { label: string; href: string };
};

/** Each row names the spec label to read from each product, so vendor-specific wording still lines up. */
const comparisonDefs = [
  {
    slug: 'samsung-990-pro-vs-crucial-t500',
    a: 'samsung-990-pro-4tb', b: 'crucial-t500-2tb',
    eyebrow: 'SSD COMPARISON',
    dek: 'A specification-first comparison for buyers choosing between two high-performance PCIe 4.0 NVMe SSDs.',
    metaDescription: 'Compare the Samsung 990 PRO 4TB and Crucial T500 2TB by interface, rated speed, endurance, capacity and use case.',
    rows: [
      ['Interface', 'Interface', 'Interface'], ['Form factor', 'Form factor', 'Form factor'],
      ['Sequential read', 'Sequential read', 'Sequential read'], ['Sequential write', 'Sequential write', 'Sequential write'],
      ['Warranty / endurance', 'Warranty / endurance', 'Warranty / endurance'],
    ],
    sections: [{
      heading: 'Which one makes more sense?',
      paragraphs: [
        'The 990 PRO gives you a larger 4TB capacity and a 2,400 TBW rating on the 4TB model. The T500 2TB offers similar headline PCIe 4.0 sequential performance with a smaller capacity and 1,200 TBW rating.',
        'Do not choose from sequential speed alone. Current price, capacity, thermal design, workload and your motherboard or laptop constraints can matter more than a small difference in quoted peak numbers.',
      ],
    }],
    evidenceNote: 'This comparison uses manufacturer specifications. TWW has not presented either product as independently benchmarked in this comparison.',
    guide: { label: 'See the SSD buying guide →', href: '/best-ssds' },
  },
  {
    slug: 'rtx-5080-vs-rx-9070-xt',
    a: 'nvidia-geforce-rtx-5080', b: 'amd-radeon-rx-9070-xt',
    eyebrow: 'GPU COMPARISON',
    dek: 'Two 16GB high-end graphics cards from NVIDIA and AMD, compared on manufacturer specifications and what independent reviewers have published.',
    metaDescription: 'GeForce RTX 5080 Founders Edition vs Radeon RX 9070 XT: architecture, memory, clocks, power connectors and linked independent reviews.',
    rows: [
      ['GPU architecture', 'GPU architecture', 'GPU architecture'],
      ['Shader hardware', 'CUDA cores', 'Compute units'],
      ['Memory', 'Memory', 'Memory'],
      ['Memory interface', 'Memory interface', 'Memory interface'],
      ['Clock rating', 'Boost clock', 'Game / boost frequency'],
    ],
    sections: [
      {
        heading: 'What the specifications show',
        paragraphs: [
          'Both cards carry 16GB of video memory on a 256-bit interface. The RTX 5080 uses GDDR7, while the RX 9070 XT uses GDDR6 with a rated 640GB/s of bandwidth.',
          'CUDA cores and AMD compute units are different building blocks, and clock ratings are defined differently by each vendor. Treat those rows as context, not as a score; they do not predict relative game performance.',
        ],
      },
      {
        heading: 'What independent reviews add',
        paragraphs: [
          'Tom’s Hardware reviewed the RTX 5080 Founders Edition and found it cool and quiet, with modest conventional gains over the RTX 4080 Super in many non-frame-generation tests. TechSpot’s August 2026 comparison tested 52 games across the RX 9070 and RX 9070 XT and highlights how relative street price drives that decision.',
          'Those reviews do not test these two cards against each other in a single TWW-endorsed chart, so read each review’s game list, resolution and settings before drawing a head-to-head conclusion.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: [
          'Start with the exact games and resolution you play, then compare current local prices, the cooler and dimensions of the specific partner card, and the feature stack you actually use, such as DLSS 4 and CUDA versus AMD’s software features.',
        ],
      },
    ],
    evidenceNote: 'This comparison uses manufacturer specifications and attributed outside review findings. TWW has not tested either card.',
    guide: { label: 'GPU product profiles →', href: '/reviews/gpus' },
  },
  {
    slug: 'ryzen-7-9850x3d-vs-core-ultra-5-250k-plus',
    a: 'amd-ryzen-7-9850x3d', b: 'intel-core-ultra-5-250k-plus',
    eyebrow: 'CPU COMPARISON',
    dek: 'An 8-core X3D gaming processor against an 18-core Arrow Lake chip, compared on specifications and linked independent testing.',
    metaDescription: 'Ryzen 7 9850X3D vs Core Ultra 5 250K Plus: cores, boost clocks, cache, power ratings, memory and linked independent reviews.',
    rows: [
      ['Platform', 'Architecture / socket', 'Product family'],
      ['Cores / threads', 'Cores / threads', 'Cores / threads'],
      ['Maximum boost', 'Base / max boost', 'Max turbo frequency'],
      ['Cache', 'L3 cache', 'Cache'],
      ['Power rating', 'Default TDP', 'Base / maximum turbo power'],
      ['Memory', 'Memory', 'Memory'],
    ],
    sections: [
      {
        heading: 'What the specifications show',
        paragraphs: [
          'The Ryzen 7 9850X3D has 8 cores and 16 threads with 96MB of L3 cache, a design aimed at latency-sensitive gaming. The Core Ultra 5 250K Plus has 18 cores and threads, split between 6 Performance-cores and 12 Efficient-cores.',
          'TDP and Intel’s base and maximum turbo power are defined differently, so the power rows are not a like-for-like measurement of consumption.',
        ],
      },
      {
        heading: 'What independent reviews add',
        paragraphs: [
          'Tom’s Hardware described the 9850X3D’s gains over the 9800X3D as marginal relative to its extra power use, and found the 250K Plus competitive in gaming and strong in threaded application tests. These were separate reviews with their own comparison sets, so they are not a direct head-to-head.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: [
          'Check socket and BIOS compatibility first, since the two chips need different platforms. Then weigh your mix of gaming and multi-threaded work, the cooler you will need to add for the 9850X3D, and the total platform cost in your market.',
        ],
      },
    ],
    evidenceNote: 'This comparison uses manufacturer specifications and attributed outside review findings. TWW has not tested either processor.',
    guide: { label: 'CPU product profiles →', href: '/reviews/cpus' },
  },
  {
    slug: 'rtx-5070-ti-vs-rtx-5080',
    a: 'nvidia-geforce-rtx-5070-ti', b: 'nvidia-geforce-rtx-5080',
    eyebrow: 'GPU COMPARISON',
    dek: 'Two 16GB Blackwell graphics cards from NVIDIA, compared on manufacturer specifications and what independent reviewers have published.',
    metaDescription: 'GeForce RTX 5070 Ti vs RTX 5080: CUDA cores, memory, clocks and linked independent review findings side by side.',
    rows: [
      ['GPU architecture', 'GPU architecture', 'GPU architecture'],
      ['CUDA cores', 'CUDA cores', 'CUDA cores'],
      ['Memory', 'Memory', 'Memory'],
      ['Memory interface', 'Memory interface', 'Memory interface'],
      ['Boost clock', 'Boost clock', 'Boost clock'],
    ],
    sections: [
      {
        heading: 'What the specifications show',
        paragraphs: [
          'Both cards use the Blackwell architecture with 16GB of GDDR7 on a 256-bit interface, so the difference is mainly shader count and clocks: the RTX 5070 Ti lists 8,960 CUDA cores at a 2.45GHz boost clock, and the RTX 5080 lists 10,752 at 2.62GHz.',
          'Because memory capacity and interface match, the gap between the cards is smaller than a tier jump might suggest. Specifications alone do not give a performance number.',
        ],
      },
      {
        heading: 'What independent reviews add',
        paragraphs: [
          'In its RTX 5070 Ti review, Tom’s Hardware estimated that on paper the card could be up to 17% slower than the RTX 5080, and possibly only 5–10% slower in memory-dependent games. That is a reviewer’s estimate, not a measured head-to-head in this comparison.',
          'Tom’s Hardware tested an Asus RTX 5070 Ti Prime and an RTX 5080 Founders Edition, which are different cards from different reviews, so use each review’s own game list and settings.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: [
          'Compare the exact games and resolution you play, then weigh current local prices, the specific partner card’s cooling and size, and your power supply. If the price gap in your market is large and you play at 1440p, the smaller performance gap may matter more than the tier name.',
        ],
      },
    ],
    evidenceNote: 'This comparison uses manufacturer specifications and attributed outside review findings. TWW has not tested either card.',
    guide: { label: 'GPU product profiles →', href: '/reviews/gpus' },
  },
  {
    slug: 'ryzen-7-9800x3d-vs-ryzen-7-9850x3d',
    a: 'amd-ryzen-7-9800x3d', b: 'amd-ryzen-7-9850x3d',
    eyebrow: 'CPU COMPARISON',
    dek: 'Two 8-core AM5 gaming processors with 96MB of L3 cache, compared on specifications and linked independent testing.',
    metaDescription: 'Ryzen 7 9800X3D vs Ryzen 7 9850X3D: boost clocks, cache, TDP, platform and what independent reviews found.',
    rows: [
      ['Architecture / socket', 'Architecture / socket', 'Architecture / socket'],
      ['Cores / threads', 'Cores / threads', 'Cores / threads'],
      ['Base / max boost', 'Base / max boost', 'Base / max boost'],
      ['L3 cache', 'L3 cache', 'L3 cache'],
      ['Default TDP', 'Default TDP', 'Default TDP'],
      ['Thermal solution', 'Thermal solution', 'Thermal solution'],
    ],
    sections: [
      {
        heading: 'What the specifications show',
        paragraphs: [
          'Both chips list 8 cores, 16 threads, 96MB of L3 cache, a 120W default TDP and the AM5 socket, and neither ships with a cooler. The listed difference is the maximum boost clock: up to 5.2GHz for the 9800X3D and up to 5.6GHz for the 9850X3D.',
        ],
      },
      {
        heading: 'What independent reviews add',
        paragraphs: [
          'Tom’s Hardware described the 9850X3D’s average gain over the 9800X3D as small, while reporting a substantially larger power increase in its test suite, even though the default TDP rating is the same.',
          'TechSpot’s 9800X3D review compared it with the Ryzen 7 7800X3D, not the 9850X3D, and dates from November 2024, so it is useful for the 9800X3D’s own results rather than this pairing.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: [
          'If both are available, compare the current local price difference against a likely small performance gain, and check your motherboard’s BIOS support. A higher boost clock on paper is not a guaranteed gain in the games you play.',
        ],
      },
    ],
    evidenceNote: 'This comparison uses manufacturer specifications and attributed outside review findings. TWW has not tested either processor.',
    guide: { label: 'CPU product profiles →', href: '/reviews/cpus' },
  },
] as const;

export type ResolvedComparison = Comparison & { path: string; productA: Product; productB: Product; title: string };

export const comparisons: ResolvedComparison[] = comparisonDefs.map(def => {
  const productA = getProduct(def.a)!;
  const productB = getProduct(def.b)!;
  const read = (product: Product, label: string) => product.specs.find(spec => spec.label === label)?.value ?? '—';
  return {
    ...def,
    rows: def.rows.map(([label, la, lb]) => ({ label, a: read(productA, la), b: read(productB, lb) })),
    sections: def.sections.map(s => ({ heading: s.heading, paragraphs: [...s.paragraphs] })),
    path: `/compare/${def.slug}`,
    productA, productB,
    title: `${productA.brand} ${productA.model} vs ${productB.brand} ${productB.model}`,
  };
});

export function getComparisonByPath(path: string): ResolvedComparison | undefined {
  const normalized = path.replace(/\/$/, '');
  return comparisons.find(item => item.path === normalized);
}

export function comparisonsForProduct(product: Product): ResolvedComparison[] {
  return comparisons.filter(item => item.a === product.id || item.b === product.id);
}
