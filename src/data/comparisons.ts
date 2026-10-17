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
  /** One or two sentences that answer the query directly. Built only from facts already on the product pages. */
  quickAnswer?: string;
  /** Visible FAQ; also emitted as FAQPage JSON-LD at build time. Never contains benchmark claims TWW did not source. */
  faq?: { question: string; answer: string }[];
};

type ComparisonDef = Omit<Comparison, 'rows'> & { rows: [string, string, string][] };

/** Each row names the spec label to read from each product, so vendor-specific wording still lines up. */
const comparisonDefs: ComparisonDef[] = [
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
    quickAnswer: 'On paper the Samsung 990 PRO 4TB offers twice the capacity and twice the endurance rating of the Crucial T500 2TB, while both are PCIe 4.0 NVMe drives with similar headline sequential speeds.',
    faq: [
      { question: 'Are the Samsung 990 PRO and Crucial T500 both PCIe 4.0 drives?', answer: 'Yes. Both are listed as PCIe 4.0 NVMe M.2 2280 SSDs, so neither needs a PCIe 5.0 slot. Check the comparison table above for the rated speeds and endurance of the exact capacities TWW lists.' },
      { question: 'Which has the higher endurance rating?', answer: 'The 990 PRO 4TB is rated for 2,400 TBW and the Crucial T500 2TB for 1,200 TBW. Endurance ratings scale with capacity, so compare drives of the same size before treating this as a quality difference.' },
      { question: 'Has TWW benchmarked either SSD?', answer: 'No. This comparison uses manufacturer specifications only. Real performance depends on your platform, free space and cooling.' },
    ],
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
    quickAnswer: 'Both cards carry 16GB of video memory on a 256-bit interface. The RTX 5080 uses GDDR7 and the RX 9070 XT uses GDDR6, and no single independent review in TWW’s library tests the two head to head.',
    faq: [
      { question: 'Do the RTX 5080 and RX 9070 XT have the same amount of VRAM?', answer: 'Yes. Both list 16GB of video memory on a 256-bit interface. The RTX 5080 uses GDDR7 and the RX 9070 XT uses GDDR6.' },
      { question: 'Which card is faster, the RTX 5080 or the RX 9070 XT?', answer: 'TWW does not publish its own benchmark, and the linked reviews were run separately with different comparison sets. Read each review’s games, resolution and settings, then compare current local prices.' },
      { question: 'Is this a TWW test?', answer: 'No. The page combines manufacturer specifications with attributed findings from outside reviewers.' },
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
    quickAnswer: 'The Ryzen 7 9850X3D is an 8-core, 16-thread chip with 96MB of L3 cache aimed at gaming, while the Core Ultra 5 250K Plus has 18 cores and threads. They use different platforms, so check motherboard compatibility first.',
    faq: [
      { question: 'How many cores do the Ryzen 7 9850X3D and Core Ultra 5 250K Plus have?', answer: 'The Ryzen 7 9850X3D has 8 cores and 16 threads. The Core Ultra 5 250K Plus has 18 cores and 18 threads, split between 6 Performance-cores and 12 Efficient-cores.' },
      { question: 'Can I use both on the same motherboard?', answer: 'No. They use different platforms, so confirm socket and BIOS support for whichever chip you choose.' },
      { question: 'Is the power rating a like-for-like comparison?', answer: 'No. AMD’s default TDP and Intel’s base and maximum turbo power are defined differently, so they are not a direct measure of consumption.' },
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
    quickAnswer: 'Both cards have 16GB of GDDR7 on a 256-bit interface, so the difference is mainly shader count and clocks. Tom’s Hardware estimated the RTX 5070 Ti could be up to 17% slower on paper, and possibly only 5–10% slower in memory-dependent games.',
    faq: [
      { question: 'Do the RTX 5070 Ti and RTX 5080 have the same VRAM?', answer: 'Yes. Both list 16GB of GDDR7 on a 256-bit interface.' },
      { question: 'How many CUDA cores does each card have?', answer: 'The RTX 5070 Ti lists 8,960 CUDA cores at a 2.45GHz boost clock, and the RTX 5080 lists 10,752 at 2.62GHz.' },
      { question: 'How much slower is the RTX 5070 Ti?', answer: 'Tom’s Hardware estimated up to 17% on paper and possibly 5–10% in memory-dependent games. That is a reviewer’s estimate, not a measured head-to-head or a TWW result.' },
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
    quickAnswer: 'The two chips match on cores, cache, default TDP and socket. The listed difference is boost clock, up to 5.2GHz on the 9800X3D versus 5.6GHz on the 9850X3D, and Tom’s Hardware found only a small gain at much higher measured power.',
    faq: [
      { question: 'What is the difference between the Ryzen 7 9800X3D and 9850X3D?', answer: 'On the manufacturer specifications the main listed difference is maximum boost clock: up to 5.2GHz for the 9800X3D and up to 5.6GHz for the 9850X3D.' },
      { question: 'Do both use the AM5 socket?', answer: 'Yes. Both are AM5 chips with 8 cores, 16 threads, 96MB of L3 cache and a 120W default TDP. Confirm BIOS support on your motherboard.' },
      { question: 'Is the 9850X3D worth the extra cost?', answer: 'Tom’s Hardware described the average gain as small relative to a substantially larger power increase. Compare the current price difference in your market before paying a premium.' },
    ],
    evidenceNote: 'This comparison uses manufacturer specifications and attributed outside review findings. TWW has not tested either processor.',
    guide: { label: 'CPU product profiles →', href: '/reviews/cpus' },
  },
  {
    slug: 'rtx-5070-ti-vs-rx-9070-xt',
    a: 'nvidia-geforce-rtx-5070-ti', b: 'amd-radeon-rx-9070-xt',
    eyebrow: 'GPU COMPARISON',
    dek: 'Two 16GB graphics cards aimed at high-refresh 1440p gaming, compared on manufacturer specifications and what independent reviewers have published.',
    metaDescription: 'GeForce RTX 5070 Ti vs Radeon RX 9070 XT: memory type, shader hardware, clocks, power and linked independent review findings side by side.',
    quickAnswer: 'Both cards carry 16GB of video memory on a 256-bit interface. The RTX 5070 Ti uses GDDR7 and lists a 300W total graphics power, while the RX 9070 XT uses GDDR6 with a rated 640GB/s of bandwidth. The two were reviewed separately, so there is no head-to-head result to quote.',
    rows: [
      ['GPU architecture', 'GPU architecture', 'GPU architecture'],
      ['Shader hardware', 'CUDA cores', 'Compute units'],
      ['Memory', 'Memory', 'Memory'],
      ['Memory interface', 'Memory interface', 'Memory interface'],
      ['Clock rating', 'Boost clock', 'Game / boost frequency'],
      ['Power', 'Total graphics power', 'Power connector'],
    ],
    sections: [
      {
        heading: 'What the specifications show',
        paragraphs: [
          'Both cards list 16GB of video memory on a 256-bit interface. The RTX 5070 Ti uses GDDR7 on NVIDIA’s Blackwell architecture, while the RX 9070 XT uses GDDR6 on AMD’s RDNA 4 architecture with a rated 640GB/s of bandwidth.',
          'CUDA cores and AMD compute units are different building blocks, and each vendor defines its clock ratings differently. Treat the shader and clock rows as context rather than a score, because they do not predict relative game performance. The power row also mixes two kinds of figure: NVIDIA’s total graphics power rating and AMD’s reference power connectors.',
        ],
      },
      {
        heading: 'What independent reviews add',
        paragraphs: [
          'Tom’s Hardware’s February 2025 review of an Asus RTX 5070 Ti Prime called it a great 1440p native card, or a 4K card with upscaling, but only an incremental upgrade over the RTX 4070 Ti Super and worth buying near the launch price. For the RX 9070 XT, Tom’s Hardware’s launch review covers rasterization, ray tracing, power, thermals and noise, and TechSpot’s August 2026 comparison tested 52 games across the RX 9070 and RX 9070 XT.',
          'These reviews used different test benches, game lists and comparison cards, and they tested specific partner models. They are not a head-to-head between these two products, so check each review’s settings before drawing a conclusion.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: [
          'Start with the games and resolution you play, then compare current local prices and stock, since both reviewers tied their verdicts to price. Next, weigh the features you will actually use: NVIDIA’s DLSS, ray-tracing and CUDA ecosystem against AMD’s feature set. Finally, check the dimensions, cooler and power connector requirements of the exact partner card you are considering.',
        ],
      },
    ],
    faq: [
      { question: 'Do the RTX 5070 Ti and RX 9070 XT have the same VRAM?', answer: 'Both list 16GB on a 256-bit interface. The RTX 5070 Ti uses GDDR7 and the RX 9070 XT uses GDDR6.' },
      { question: 'Which is better for 1440p gaming?', answer: 'Tom’s Hardware called the RTX 5070 Ti a great 1440p native card, and independent reviews found the RX 9070 XT strong for its segment. TWW has no head-to-head test, so compare the exact games you play and current local prices.' },
      { question: 'How much power does each card use?', answer: 'NVIDIA lists 300W total graphics power for the RTX 5070 Ti. AMD’s reference RX 9070 XT specification lists two 8-pin power connectors. These are different kinds of figure, so check the exact partner card’s requirements.' },
      { question: 'Is this a TWW benchmark?', answer: 'No. The page uses manufacturer specifications and attributed findings from outside reviewers. TWW has not tested either card.' },
    ],
    evidenceNote: 'This comparison uses manufacturer specifications and attributed outside review findings. TWW has not tested either card.',
    guide: { label: 'GPU product profiles →', href: '/reviews/gpus' },
  },
  {
    slug: 'samsung-9100-pro-vs-990-pro',
    a: 'samsung-9100-pro-4tb', b: 'samsung-990-pro-4tb',
    eyebrow: 'SSD COMPARISON',
    dek: 'Samsung’s PCIe 5.0 flagship against its PCIe 4.0 predecessor, both in 4TB, compared on rated specifications and linked reviews.',
    metaDescription: 'Samsung 9100 PRO 4TB vs 990 PRO 4TB: interface, rated sequential speeds, endurance and what HotHardware and TechRadar found.',
    quickAnswer: 'Both 4TB drives carry a 2,400 TBW endurance rating and a 5-year warranty. The 9100 PRO moves to PCIe 5.0 with a rated 14,800MB/s sequential read, against 7,450MB/s for the PCIe 4.0 990 PRO, but reviewers found it premium-priced with few real-world gains for typical gaming.',
    rows: [
      ['Interface', 'Interface', 'Interface'],
      ['Form factor', 'Form factor', 'Form factor'],
      ['Sequential read', 'Sequential read', 'Sequential read'],
      ['Sequential write', 'Sequential write', 'Sequential write'],
      ['Warranty / endurance', 'Warranty / endurance', 'Warranty / endurance'],
    ],
    sections: [
      {
        heading: 'What the specifications show',
        paragraphs: [
          'The 9100 PRO 4TB is a PCIe 5.0 x4 drive with a manufacturer-rated 14,800MB/s sequential read and up to 13,400MB/s sequential write. The 990 PRO 4TB is PCIe 4.0 x4 with ratings of 7,450MB/s read and 6,900MB/s write. On paper the newer drive roughly doubles the sequential figures.',
          'Both list the same 5-year warranty and 2,400 TBW endurance rating for the 4TB model, so endurance does not separate them. Rated speeds are manufacturer figures, and the 9100 PRO’s write rating is measured with Intelligent TurboWrite active.',
        ],
      },
      {
        heading: 'What independent reviews add',
        paragraphs: [
          'HotHardware tested the 4TB 9100 PRO and found it well-rounded for a PCIe 5.0 drive, with relatively cool, low-power operation and first-place results in several storage traces. TechRadar praised its sequential write speed but judged the drive expensive and aimed at professionals rather than typical gamers, and noted that its measured reads started below the box rating before reaching it on other hardware.',
          'Those reviews examined the 9100 PRO on its own. They are not a direct comparison with the 990 PRO, so use them to judge the newer drive rather than to size a gap between the two.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: [
          'The extra bandwidth only helps if your system has a PCIe 5.0 M.2 slot, and consoles or PCIe 4.0 systems cannot use it. Compare the current price difference in your market against how often you move very large files, since gaming and everyday use rarely hit sequential limits. For many builds the PCIe 4.0 990 PRO already covers the workload.',
        ],
      },
    ],
    faq: [
      { question: 'Is the Samsung 9100 PRO faster than the 990 PRO?', answer: 'On manufacturer ratings, yes: up to 14,800MB/s sequential read for the 9100 PRO 4TB against 7,450MB/s for the 990 PRO 4TB. Real-world gains for typical gaming are small according to the reviews TWW links.' },
      { question: 'Do they have the same endurance?', answer: 'Yes. Both 4TB models list 2,400 TBW and a 5-year warranty.' },
      { question: 'Will the 9100 PRO work in a PCIe 4.0 slot?', answer: 'It needs a PCIe 5.0 M.2 slot to reach its rated speeds. PCIe 4.0 systems and consoles cannot use the extra bandwidth, so check your motherboard or laptop first.' },
      { question: 'Has TWW benchmarked either drive?', answer: 'No. The page uses Samsung’s specifications and attributed findings from HotHardware and TechRadar.' },
    ],
    evidenceNote: 'This comparison uses manufacturer specifications and attributed outside review findings of the 9100 PRO. TWW has not tested either drive.',
    guide: { label: 'See the SSD buying guide →', href: '/best-ssds' },
  },
  {
    slug: 'ryzen-7-9800x3d-vs-core-ultra-5-250k-plus',
    a: 'amd-ryzen-7-9800x3d', b: 'intel-core-ultra-5-250k-plus',
    eyebrow: 'CPU COMPARISON',
    dek: 'An 8-core X3D gaming processor against an 18-core Arrow Lake chip, compared on specifications and linked independent testing.',
    metaDescription: 'Ryzen 7 9800X3D vs Core Ultra 5 250K Plus: cores, boost clocks, cache, power ratings, memory and linked independent reviews.',
    quickAnswer: 'The Ryzen 7 9800X3D has 8 cores and 16 threads with 96MB of L3 cache, built for gaming. The Core Ultra 5 250K Plus has 18 cores and threads and was found strong in threaded applications. They use different platforms, and their reviews were run separately.',
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
          'The Ryzen 7 9800X3D has 8 cores and 16 threads with 96MB of L3 cache, a design aimed at latency-sensitive gaming. The Core Ultra 5 250K Plus has 18 cores and threads, split between 6 Performance-cores and 12 Efficient-cores, with 30MB of Intel Smart Cache.',
          'AMD’s default TDP and Intel’s base and maximum turbo power are defined differently, so the power rows are not a like-for-like measurement of consumption.',
        ],
      },
      {
        heading: 'What independent reviews add',
        paragraphs: [
          'TechSpot’s November 2024 review ran 45 games at 1080p with a GeForce RTX 4090 and found the 9800X3D 8% faster on average than the Ryzen 7 7800X3D. It did not cover productivity or power consumption. Tom’s Hardware’s March 2026 review found the 250K Plus competitive in gaming and notably strong in threaded application tests within its own comparison set.',
          'The two reviews used different hardware, games and comparison chips, so they are not a head-to-head. Neither TWW nor these reviewers published a direct 9800X3D versus 250K Plus result in this library.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: [
          'Check socket and BIOS compatibility first, since the two chips need different platforms. Then weigh your mix of gaming and multi-threaded work, the cooler you will add, and the total platform cost in your market, including the motherboard and memory.',
        ],
      },
    ],
    faq: [
      { question: 'Which has more cores, the Ryzen 7 9800X3D or the Core Ultra 5 250K Plus?', answer: 'The Core Ultra 5 250K Plus has 18 cores (6 Performance and 12 Efficient). The Ryzen 7 9800X3D has 8 cores and 16 threads.' },
      { question: 'How much L3 cache does the 9800X3D have?', answer: 'AMD lists 96MB of L3 cache for the Ryzen 7 9800X3D. Intel lists 30MB of Smart Cache for the Core Ultra 5 250K Plus.' },
      { question: 'Do I need a cooler for either chip?', answer: 'AMD lists no cooler with the 9800X3D and recommends a liquid cooler for optimal performance. Check Intel’s box contents and your cooler’s compatibility for the 250K Plus.' },
      { question: 'Is this a TWW benchmark?', answer: 'No. The page uses manufacturer specifications and attributed findings from TechSpot and Tom’s Hardware. TWW has not tested either processor.' },
    ],
    evidenceNote: 'This comparison uses manufacturer specifications and attributed outside review findings. TWW has not tested either processor.',
    guide: { label: 'CPU product profiles →', href: '/reviews/cpus' },
  },
  {
    slug: 'legion-pro-7i-gen-10-vs-omen-max-16',
    a: 'lenovo-legion-pro-7i-gen-10-rtx-5080', b: 'hyperx-omen-max-16-rtx-5090',
    eyebrow: 'LAPTOP COMPARISON',
    dek: 'Two 16-inch OLED gaming laptops in specific configurations, compared on specifications and what independent reviewers reported.',
    metaDescription: 'Lenovo Legion Pro 7i Gen 10 (RTX 5080) vs HyperX OMEN MAX 16 (RTX 5090): CPU, GPU, display, battery, adapter and linked reviews.',
    quickAnswer: 'Both are 16-inch 2560 × 1600 OLED gaming laptops with 175W-class GPUs. The Legion Pro 7i configuration pairs a Core Ultra 9 275HX with an RTX 5080, and the OMEN MAX 16 configuration a Core Ultra 9 290HX Plus with an RTX 5090. Notebookcheck praised the Legion’s performance and OLED, while Tom’s Hardware criticised the OMEN’s price-to-performance.',
    rows: [
      ['CPU', 'CPU', 'CPU'],
      ['GPU', 'GPU', 'GPU'],
      ['Memory / storage', 'Memory / storage', 'Memory / storage'],
      ['Display', 'Display', 'Display'],
      ['Battery / adapter', 'Battery / adapter', 'Battery / adapter'],
    ],
    sections: [
      {
        heading: 'What the specifications show',
        paragraphs: [
          'The reviewed Legion Pro 7i Gen 10 configuration uses a Core Ultra 9 275HX and an RTX 5080 Laptop GPU with 16GB of GDDR7 at up to 175W, with a 99.9Wh battery and a 400W adapter. The OMEN MAX 16 configuration uses a Core Ultra 9 290HX Plus and an RTX 5090 Laptop GPU with 24GB of GDDR7 at up to 175W, with an 83Wh battery and a 460W adapter.',
          'Both pair a 16-inch 2560 × 1600 OLED panel with up to 240Hz refresh. The memory and storage rows are not directly comparable: the Legion row describes the Notebookcheck test unit and notes that retail SKUs vary, while the OMEN row lists the HP configuration.',
        ],
      },
      {
        heading: 'What independent reviews add',
        paragraphs: [
          'Notebookcheck found strong performance from the Legion’s Core Ultra 9 and 175W RTX 5080 combination and a standout 240Hz OLED, balanced against high power draw, very high CPU temperatures under gaming load, fan noise in Performance mode and a heavy adapter. Tom’s Hardware’s August 2026 review of the OMEN MAX 16 noted a solid chassis, user-upgradeable memory and a PCIe Gen 5 SSD, but judged the price-to-performance poor against similarly priced gaming laptops.',
          'These are separate reviews of specific configurations. Do not transfer either verdict to other variants of the same product family.',
        ],
      },
      {
        heading: 'How to decide',
        paragraphs: [
          'Confirm the exact machine configuration before comparing prices or reviews, since CPU, GPU power limits, memory, storage and region can all differ. Weigh the premium for the RTX 5090 configuration against the value criticism, and check weight, adapter size and noise against how and where you will use the laptop.',
        ],
      },
    ],
    faq: [
      { question: 'Which laptop has the faster GPU?', answer: 'The reviewed OMEN MAX 16 configuration has an RTX 5090 Laptop GPU with 24GB of GDDR7, and the Legion Pro 7i configuration has an RTX 5080 Laptop GPU with 16GB. Both list up to 175W, and TWW has not measured either.' },
      { question: 'Do both laptops have OLED screens?', answer: 'Yes. Both configurations list a 16-inch 2560 × 1600 OLED display with up to 240Hz refresh.' },
      { question: 'Can I upgrade the memory and storage?', answer: 'The Legion Pro 7i profile lists two memory slots and two M.2 storage positions, and Tom’s Hardware noted user-upgradeable memory and a PCIe Gen 5 SSD on the OMEN MAX 16. Supported sizes vary, so check the exact model before buying parts.' },
      { question: 'Can I rely on these reviews for any Legion Pro 7i or OMEN MAX 16?', answer: 'No. Each review is specific to the configuration it tested. Verify the exact model, GPU power limit, memory and storage before applying the findings.' },
    ],
    evidenceNote: 'This comparison uses manufacturer specifications and attributed outside review findings of specific configurations. TWW has not tested either laptop.',
    guide: { label: 'Best gaming laptops guide →', href: '/best-gaming-laptops' },
  },
];

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
