export type ProductCategory = 'SSD' | 'GPU' | 'Laptop' | 'CPU';
export type ProductSourceKind = 'manufacturer' | 'independent-review';

export type ProductSource = {
  label: string;
  url: string;
  kind: ProductSourceKind;
};

export type Product = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: ProductCategory;
  summary: string;
  /** "spec-profile" pages never imply that TWW performed its own product test. */
  status: 'spec-profile' | 'hands-on-tested';
  specs: { label: string; value: string }[];
  strengths: string[];
  limitations: string[];
  bestFor: string[];
  /** Manufacturer specifications and outside lab reviews are explicitly typed. */
  sources: ProductSource[];
  /** Editorial summary of linked third-party findings; never a TWW benchmark result. */
  independentReviewSummary?: string;
  /** Clarifies any SKU/configuration difference between an official spec sheet and a review unit. */
  configurationNote?: string;
  affiliateUrl?: string;
  lastVerified: string;
};

const categorySlug: Record<ProductCategory, string> = {
  SSD: 'ssds',
  GPU: 'gpus',
  Laptop: 'laptops',
  CPU: 'cpus',
};

export function productCategorySlug(category: ProductCategory): string {
  return categorySlug[category];
}

export function productPath(product: Product): string {
  return `/reviews/${productCategorySlug(product.category)}/${product.slug}`;
}

export function productMetaDescription(product: Product): string {
  const hasIndependentReview = product.sources.some(source => source.kind === 'independent-review');
  const coverage = hasIndependentReview
    ? 'specs, buying cautions and linked independent reviews'
    : 'manufacturer specifications and buying cautions';
  return (product.brand + ' ' + product.model + ': ' + coverage + '. Not a TWW hands-on review.').slice(0, 160);
}

export function productPageTitle(product: Product): string {
  if (product.status === 'hands-on-tested') return `${product.brand} ${product.model} Review`;
  const hasIndependentReview = product.sources.some(source => source.kind === 'independent-review');
  return `${product.brand} ${product.model}: Specifications${hasIndependentReview ? ' & Independent Review Findings' : ' & Buying Notes'}`;
}

export const products: Product[] = [
  {
    id: 'samsung-990-pro-4tb', slug: 'samsung-990-pro-4tb', brand: 'Samsung', model: '990 PRO 4TB', category: 'SSD',
    summary: 'A high-end PCIe 4.0 NVMe SSD aimed at gaming, large application libraries and demanding desktop workloads.',
    status: 'spec-profile',
    specs: [
      { label: 'Interface', value: 'PCIe 4.0 x4, NVMe 2.0' },
      { label: 'Form factor', value: 'M.2 2280' },
      { label: 'NAND', value: 'Samsung V-NAND TLC' },
      { label: 'Sequential read', value: 'Up to 7,450 MB/s (manufacturer rating)' },
      { label: 'Sequential write', value: 'Up to 6,900 MB/s (manufacturer rating)' },
      { label: 'Warranty / endurance', value: '5 years or 2,400 TBW' },
    ],
    strengths: ['4TB capacity suits large game, project and media libraries.', 'Manufacturer-rated PCIe 4.0 sequential performance is high for a Gen4 drive.', 'TLC NAND, DRAM cache and Samsung Magician support are part of the product proposition.'],
    limitations: ['PCIe 5.0 drives can offer higher interface bandwidth in compatible systems.', 'Real performance varies with host platform, workload, free space and thermal conditions.', 'The listed performance figures are manufacturer specifications, not TWW measurements.'],
    bestFor: ['High-end gaming PCs', 'Large Windows application and game libraries', 'Workstations needing a high-capacity PCIe 4.0 system drive'],
    sources: [
      { label: 'Samsung 990 PRO 4TB official specifications', url: 'https://www.samsung.com/ae/memory-storage/nvme-ssd/990-pro-4tb-nvme-pcie-gen-4-mz-v9p4t0bw/', kind: 'manufacturer' },
      { label: 'Samsung 990 PRO 4TB announcement', url: 'https://news.samsung.com/global/samsung-electronics-4tb-ssd-990-pro-series-brings-ultimate-performance-and-capacity-for-gamers-and-creators', kind: 'manufacturer' },
    ],
    lastVerified: '2026-10-17',
  },
  {
    id: 'crucial-t500-2tb', slug: 'crucial-t500-2tb', brand: 'Crucial', model: 'T500 2TB', category: 'SSD',
    summary: 'A PCIe 4.0 NVMe SSD positioned for high-performance desktop and gaming use, with 2TB capacity and optional heatsink variants.',
    status: 'spec-profile',
    specs: [
      { label: 'Interface', value: 'PCIe 4.0 NVMe' },
      { label: 'Form factor', value: 'M.2 2280' },
      { label: 'Sequential read', value: 'Up to 7,400 MB/s (manufacturer rating)' },
      { label: 'Sequential write', value: 'Up to 7,000 MB/s (manufacturer rating)' },
      { label: 'Random performance', value: 'Up to 1.18M / 1.44M IOPS (2TB model; manufacturer rating)' },
      { label: 'Warranty / endurance', value: '5 years / 1,200 TBW (2TB model)' },
    ],
    strengths: ['Strong manufacturer-rated sequential performance for a PCIe 4.0 drive.', 'The 2TB model is rated for 1,200 TBW endurance.', 'Heatsink and non-heatsink versions let buyers match the installation.'],
    limitations: ['Specifications do not guarantee sustained performance in every workload.', 'A heatsink version may not fit every laptop, motherboard cover or enclosure.', 'Value depends on current street price, warranty region and capacity needs.'],
    bestFor: ['Gaming PCs', 'Windows system drives', 'Users wanting a 2TB PCIe 4.0 NVMe drive'],
    sources: [
      { label: 'Crucial T500 official product specifications', url: 'https://www.crucial.com/content/dam/crucial/ssd-products/t500/flyers/b2c/crucial-T500-b2c-product-flyer-en_combination.pdf', kind: 'manufacturer' },
    ],
    lastVerified: '2026-10-17',
  },
  {
    id: 'nvidia-geforce-rtx-5080', slug: 'nvidia-geforce-rtx-5080', brand: 'NVIDIA', model: 'GeForce RTX 5080 Founders Edition', category: 'GPU',
    summary: 'A high-end desktop graphics card using NVIDIA Blackwell, with 16GB of GDDR7 memory and support for DLSS 4 and multi-frame generation. This page combines official specifications with a clearly attributed independent lab review; TWW has not tested the card.',
    status: 'spec-profile',
    specs: [
      { label: 'GPU architecture', value: 'NVIDIA Blackwell' },
      { label: 'CUDA cores', value: '10,752 (NVIDIA specification)' },
      { label: 'Memory', value: '16GB GDDR7' },
      { label: 'Memory interface', value: '256-bit' },
      { label: 'Boost clock', value: '2.62GHz (NVIDIA specification)' },
      { label: 'Interface / features', value: 'PCIe Gen 5; DLSS 4, ray tracing and multi-frame generation support' },
    ],
    strengths: ['16GB GDDR7 memory and a 256-bit interface form a high-end graphics configuration.', 'NVIDIA’s feature stack includes DLSS 4, ray tracing, Reflex and creator-oriented software support.', 'Tom’s Hardware reported cool and quiet operation on its Founders Edition test sample.'],
    limitations: ['Tom’s Hardware found that gains over the RTX 4080 Super were modest in many non-frame-generation tests; consult the exact games and settings in the review.', '16GB VRAM can be a constraint for some high-resolution, high-texture or creator workloads.', 'Partner cards differ in cooling, dimensions, power limits and noise; Founders Edition findings do not automatically transfer to every RTX 5080.'],
    bestFor: ['High-end gaming with ray tracing and DLSS features', 'Users who specifically need NVIDIA’s CUDA / creator ecosystem', 'Buyers comparing the Founders Edition with partner models'],
    sources: [
      { label: 'NVIDIA GeForce RTX 5080 official specifications', url: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5080/', kind: 'manufacturer' },
      { label: 'Tom’s Hardware: GeForce RTX 5080 Founders Edition review and benchmarks', url: 'https://www.tomshardware.com/pc-components/gpus/nvidia-geforce-rtx-5080-review', kind: 'independent-review' },
    ],
    independentReviewSummary: 'Tom’s Hardware tested the Founders Edition across gaming, thermals, power and other workloads. Its verdict was mixed: operation was cool and quiet, while conventional raster-performance gains over the prior RTX 4080 Super were not large in many tested cases. That is the reviewer’s result on its test bench, not a TWW measurement.',
    lastVerified: '2026-10-17',
  },
  {
    id: 'amd-radeon-rx-9070-xt', slug: 'amd-radeon-rx-9070-xt', brand: 'AMD', model: 'Radeon RX 9070 XT', category: 'GPU',
    summary: 'An RDNA 4 desktop graphics card with 16GB of GDDR6 memory, 640GB/s rated bandwidth and 64MB of Infinity Cache. Recent independent testing found it closely matched with the RTX 5070 Ti in a broad 1440p suite, while individual games and retail price decide value.',
    status: 'spec-profile',
    specs: [
      { label: 'GPU architecture', value: 'AMD RDNA 4' },
      { label: 'Compute units', value: '64 (AMD specification)' },
      { label: 'Ray tracing / AI hardware', value: '64 third-generation Ray Accelerators / 128 second-generation AI Accelerators' },
      { label: 'Game / boost frequency', value: 'Up to 2.4GHz game clock / 2.97GHz boost clock (AMD ratings)' },
      { label: 'Memory', value: '16GB GDDR6' },
      { label: 'Memory interface', value: '256-bit' },
      { label: 'Memory bandwidth / cache', value: 'Up to 640GB/s GDDR6 bandwidth plus 64MB AMD Infinity Cache' },
      { label: 'PCIe interface', value: 'PCIe 5.0 x16' },
      { label: 'Display standards', value: 'DisplayPort 2.1a and HDMI 2.1b; port layout varies by board partner' },
      { label: 'Typical Board Power', value: '304W (AMD reference specification)' },
      { label: 'Recommended minimum PSU', value: '750W (AMD reference guidance; partner models may specify more)' },
      { label: 'Reference connector', value: '2 × 8-pin PCIe auxiliary connectors (AMD reference specification)' },
      { label: 'Launch price', value: '$599 USD suggested launch price (March 2025; historical, not a current retail quote)' },
      { label: 'Power connector', value: '2 × 8-pin (AMD reference specification)' },
    ],
    strengths: ['16GB of VRAM and 64MB of Infinity Cache on a 256-bit GDDR6 interface.', 'The May 2026 52-game comparison found 1440p performance effectively tied with the RTX 5070 Ti overall; Radeon wins some raster-focused games.', 'Blender Cycles supports Radeon RX 9000 through HIP on documented Windows and Linux configurations.'],
    limitations: ['Heavy path-tracing results in the direct 52-game test strongly favoured the RTX 5070 Ti in specific titles, although the gap varies by game.', 'The reference 304W TBP does not define power use for every board-partner card.', 'Connector, cooler, dimensions, board power and PSU advice vary by SKU; some partner designs use 12V-2x6 rather than the reference two 8-pin input.'],
    bestFor: ['1440p and 4K buyers who find the Radeon meaningfully cheaper in their market', 'Gamers whose favourite titles perform similarly or better on Radeon in published testing', 'Blender Cycles and other creator workloads with a supported HIP / Radeon path'],
    sources: [
      { label: 'AMD Radeon RX 9070 XT official specifications', url: 'https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9070xt.html', kind: 'manufacturer' },
      { label: 'AMD: RX 9070 XT launch specifications and $599 suggested price', url: 'https://ir.amd.com/news-events/press-releases/detail/1238/amd-unveils-next-generation-amd-rdna-4-architecture-with-the-launch-of-amd-radeon-rx-9000-series-graphics-cards', kind: 'manufacturer' },
      { label: 'TechSpot: RTX 5070 Ti vs RX 9070 XT — 52-game comparison (May 2026)', url: 'https://www.techspot.com/review/3130-geforce-rtx-5070-ti-vs-radeon-rx-9070-xt/', kind: 'independent-review' },
      { label: 'TechSpot: RX 9070 vs RX 9070 XT — 52-game comparison (August 2026)', url: 'https://www.techspot.com/review/3161-amd-radeon-9070-vs-9070-xt/', kind: 'independent-review' },
      { label: 'Tom’s Hardware: Radeon RX 9070 XT and RX 9070 review', url: 'https://www.tomshardware.com/pc-components/gpus/amd-radeon-rx-9070-xt-review', kind: 'independent-review' },
    ],
    independentReviewSummary: 'TechSpot’s May 2026 direct 52-game comparison found the RX 9070 XT close to the RTX 5070 Ti overall, with some game settings favouring Radeon and heavy path-tracing examples favouring GeForce. TechSpot measured about 20% higher power use for the Radeon in that test setup. Its August 2026 RX 9070 versus RX 9070 XT comparison helps explain the XT premium but is not the direct GeForce comparison.',
    lastVerified: '2026-10-30',
  },
  {
    id: 'amd-ryzen-7-9850x3d', slug: 'amd-ryzen-7-9850x3d', brand: 'AMD', model: 'Ryzen 7 9850X3D', category: 'CPU',
    summary: 'An 8-core, 16-thread AM5 desktop CPU with second-generation 3D V-Cache positioning for gaming. The headline clock increase needs to be weighed against the small gains and higher power measured by independent reviewers.',
    status: 'spec-profile',
    specs: [
      { label: 'Architecture / socket', value: 'Zen 5 / AM5' },
      { label: 'Cores / threads', value: '8 / 16' },
      { label: 'Base / max boost', value: '4.7GHz / up to 5.6GHz' },
      { label: 'L3 cache', value: '96MB' },
      { label: 'Default TDP', value: '120W' },
      { label: 'Memory', value: 'DDR5; two memory channels' },
      { label: 'Thermal solution', value: 'Cooler not included' },
    ],
    strengths: ['Large L3 cache and the X3D design target latency-sensitive gaming workloads.', 'AM5 provides a known desktop platform with DDR5 support.', 'Tom’s Hardware published direct gaming and power comparisons with the 9800X3D.'],
    limitations: ['Tom’s Hardware measured only a small average performance increase over the 9800X3D while reporting a substantially larger power increase in its test suite.', 'It remains a premium gaming-focused CPU; productivity value depends on the application and competing prices.', 'A compatible cooler and motherboard are additional costs; check BIOS support before an upgrade.'],
    bestFor: ['High-refresh-rate gaming builds', 'Existing AM5 builders checking CPU and BIOS compatibility', 'Buyers comparing the 9850X3D with discounted alternatives'],
    sources: [
      { label: 'AMD Ryzen 7 9850X3D official specifications', url: 'https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-7-9850x3d.html', kind: 'manufacturer' },
      { label: 'Tom’s Hardware: Ryzen 7 9850X3D review and benchmarks (January 2026)', url: 'https://www.tomshardware.com/pc-components/cpus/amd-ryzen-7-9850x3d-review', kind: 'independent-review' },
    ],
    independentReviewSummary: 'Tom’s Hardware’s January 2026 lab review described the 9850X3D’s gains over the 9800X3D as marginal relative to its additional power consumption. Review conclusions depend on the tested games, power settings and comparison set; TWW has not repeated these benchmarks.',
    lastVerified: '2026-10-17',
  },
  {
    id: 'intel-core-ultra-5-250k-plus', slug: 'intel-core-ultra-5-250k-plus', brand: 'Intel', model: 'Core Ultra 5 250K Plus', category: 'CPU',
    summary: 'A desktop Arrow Lake processor positioned around a balance of gaming and multi-threaded workloads. Independent testing is useful here because core counts and boost clocks alone do not predict real application performance.',
    status: 'spec-profile',
    specs: [
      { label: 'Product family', value: 'Intel Core Ultra Processors (Series 2), Arrow Lake' },
      { label: 'Cores / threads', value: '18 total: 6 Performance-cores + 12 Efficient-cores / 18 threads' },
      { label: 'Max turbo frequency', value: 'Up to 5.3GHz' },
      { label: 'Cache', value: '30MB Intel Smart Cache; 30MB total L2 cache' },
      { label: 'Base / maximum turbo power', value: '125W / 159W' },
      { label: 'Memory', value: 'DDR5 up to 7200 MT/s (Intel specification)' },
      { label: 'PCI Express', value: 'PCIe 5.0 and 4.0 support' },
    ],
    strengths: ['The core layout provides a substantial thread count for the price tier.', 'Tom’s Hardware found competitive gaming performance and strong multi-threaded application performance in its reviewed configuration.', 'Intel provides a detailed specification page for compatibility checks.'],
    limitations: ['Performance and value vary by motherboard, memory configuration, application and cooling.', 'Do not infer gaming performance from core count alone; use the independent reviewer’s workload-specific charts.', 'Confirm motherboard socket and BIOS compatibility before buying or upgrading.'],
    bestFor: ['Midrange desktop builds with mixed gaming and productivity workloads', 'Users choosing a new Intel platform rather than upgrading blindly', 'Buyers comparing measured application results with total platform cost'],
    sources: [
      { label: 'Intel Core Ultra 5 250K Plus official specifications', url: 'https://www.intel.com/content/www/us/en/products/sku/245694/intel-core-ultra-5-processor-250k-plus-30m-cache-up-to-5-30-ghz/specifications.html', kind: 'manufacturer' },
      { label: 'Tom’s Hardware: Core Ultra 5 250K Plus review and benchmarks (March 2026)', url: 'https://www.tomshardware.com/pc-components/cpus/intel-core-ultra-5-250k-plus-review', kind: 'independent-review' },
    ],
    independentReviewSummary: 'Tom’s Hardware’s March 2026 testing found the 250K Plus competitive in gaming and notably strong in threaded application tests within its tested comparison set. Check the review’s specific applications, settings, motherboard and memory before applying the results to another system.',
    lastVerified: '2026-10-17',
  },
  {
    id: 'lenovo-legion-pro-7i-gen-10-rtx-5080', slug: 'lenovo-legion-pro-7i-gen-10-rtx-5080', brand: 'Lenovo', model: 'Legion Pro 7i Gen 10 (RTX 5080 configuration)', category: 'Laptop',
    summary: 'A high-power 16-inch gaming laptop profile based on the reviewed Core Ultra 9 275HX / RTX 5080 configuration. The independent review praises performance and the OLED display while identifying size, power use, temperatures and servicing as trade-offs.',
    status: 'spec-profile',
    specs: [
      { label: 'Configuration reference', value: 'Legion Pro 7 16IAX10H; review configuration uses Core Ultra 9 275HX and RTX 5080 Laptop GPU' },
      { label: 'CPU', value: 'Intel Core Ultra 9 275HX, 24 cores / 24 threads' },
      { label: 'GPU', value: 'NVIDIA GeForce RTX 5080 Laptop GPU, 16GB GDDR7, up to 175W TGP in this configuration' },
      { label: 'Memory / storage', value: 'Notebookcheck test unit: 32GB DDR5-6400 and 1TB NVMe SSD; retail SKUs vary' },
      { label: 'Display', value: '16-inch 2560 × 1600 OLED, 240Hz' },
      { label: 'Battery / adapter', value: '99.9Wh battery; 400W AC adapter in the reviewed configuration' },
      { label: 'Upgradeability', value: 'Two CSODIMM memory slots and two M.2 storage positions (supported sizes vary)' },
    ],
    strengths: ['Notebookcheck found strong performance from the Core Ultra 9 / 175W RTX 5080 combination.', 'The 240Hz OLED panel supports variable refresh-rate gaming and is a key attraction of this model.', 'Memory and storage are slot-based rather than fully soldered in the reviewed configuration.'],
    limitations: ['Notebookcheck reported high power demand, high CPU temperatures during gaming and a large chassis/400W adapter.', 'Fans can be loud in Performance mode; Balanced mode reduces noise but also lowers graphics performance.', 'Model-year name covers multiple GPU, memory, storage and regional configurations; verify the exact machine SKU before applying review results.'],
    bestFor: ['Buyers prioritizing high sustained gaming performance over portability', 'Gamers who value a high-refresh-rate OLED panel', 'Users who want replaceable memory and SSDs and accept servicing complexity'],
    sources: [
      { label: 'Lenovo PSREF: Legion Pro 7 16IAX10H specifications and configuration reference', url: 'https://psref.lenovo.com/Detail/Legion_Pro_7_16IAX10H?M=83F500WXAX', kind: 'manufacturer' },
      { label: 'Notebookcheck: Legion Pro 7i Gen 10 RTX 5080 review, thermals and benchmarks', url: 'https://www.notebookcheck.net/Lenovo-Legion-Pro-7i-16-Gen-10-laptop-review-400-W-power-supply-with-almost-no-compromises.999828.0.html', kind: 'independent-review' },
      { label: 'Tom’s Hardware: Lenovo Legion Pro 7i Gen 10 review', url: 'https://www.tomshardware.com/laptops/gaming-laptops/lenovo-legion-pro-7i-gen-10-review-pricey-and-luxurious-gaming-laptop', kind: 'independent-review' },
    ],
    independentReviewSummary: 'Notebookcheck’s test unit delivered strong performance and a standout 240Hz OLED, balanced against higher power draw, very high CPU temperatures under gaming load, fan noise in Performance mode and a heavy adapter. Its listed sample used 32GB DDR5-6400 and a 1TB SSD; the separate Lenovo PSREF/SKU reference and retail configurations may differ.',
    configurationNote: 'Configuration caution: Notebookcheck’s tested sample is listed as 32GB DDR5-6400 / 1TB NVMe, while retailer and PSREF configurations can bundle different memory and storage. Confirm the exact machine type/model (MTM), GPU TGP, RAM and SSD before comparing results or purchasing.',
    lastVerified: '2026-10-17',
  },
  {
    id: 'hyperx-omen-max-16-rtx-5090', slug: 'hyperx-omen-max-16-rtx-5090', brand: 'HP / HyperX', model: 'OMEN MAX 16 (RTX 5090 configuration, 16-ah1932nr)', category: 'Laptop',
    summary: 'A large, premium 16-inch gaming laptop configuration built around a Core Ultra 9 290HX Plus and a 175W-class GeForce RTX 5090 Laptop GPU. The linked independent review is specific to the high-end configuration, not every OMEN MAX variant.',
    status: 'spec-profile',
    specs: [
      { label: 'Configuration / operating system', value: 'HyperX OMEN MAX 16-ah1932nr; Windows 11 Home' },
      { label: 'CPU', value: 'Intel Core Ultra 9 290HX Plus, 24 cores / 24 threads' },
      { label: 'GPU', value: 'NVIDIA GeForce RTX 5090 Laptop GPU, 24GB GDDR7, up to 175W TGP' },
      { label: 'Memory / storage', value: '32GB DDR5-6400; 2TB PCIe Gen 5 NVMe SSD' },
      { label: 'Display', value: '16-inch 2560 × 1600 OLED, up to 240Hz' },
      { label: 'Battery / adapter', value: '83Wh battery; 460W AC adapter' },
      { label: 'Weight', value: 'Approximately 6.56 lb for the reviewed configuration (Tom’s Hardware)' },
    ],
    strengths: ['The tested configuration combines a flagship mobile GPU with a high-end HX processor and a 240Hz OLED panel.', 'Tom’s Hardware noted a solid chassis, user-upgradeable memory and a PCIe Gen 5 SSD.', 'Its independent review documents gaming results rather than relying on the product-family marketing claims.'],
    limitations: ['Tom’s Hardware judged the tested system’s value poorly against similarly priced gaming laptops; its review reported that gaming performance did not justify the premium.', 'The RTX 5090 configuration is expensive, large and uses a substantial power adapter.', 'Do not transfer this review’s findings to lower-tier OMEN MAX variants with different CPUs, GPUs, displays or power limits.'],
    bestFor: ['Buyers considering the exact high-end RTX 5090 configuration', 'Users who need flagship mobile graphics and a high-refresh-rate OLED display', 'Readers comparing published laptop lab data before deciding what to test or buy'],
    sources: [
      { label: 'HP official product specifications: HyperX OMEN MAX 16-ah1932nr', url: 'https://www.hp.com/us-en/shop/pdp/hyperx-omen-max-16-inch-gaming-laptop-pc-16-ah1932nr', kind: 'manufacturer' },
      { label: 'Tom’s Hardware: HyperX OMEN MAX 16 review and gaming benchmarks (August 2026)', url: 'https://www.tomshardware.com/laptops/gaming-laptops/hyperx-omen-max-16-review', kind: 'independent-review' },
    ],
    independentReviewSummary: 'Tom’s Hardware’s August 2026 review tested an OMEN MAX 16 with a Core Ultra 9 290HX Plus, RTX 5090 Laptop GPU, 32GB DDR5-6400 and a 2TB PCIe 5.0 SSD. Its conclusion was critical of the price-to-performance proposition, while noting the chassis, memory access and PCIe 5.0 storage. Those are the outside publication’s observations, not TWW test results.',
    lastVerified: '2026-10-17',
  },
  {
    id: 'samsung-9100-pro-4tb', slug: 'samsung-9100-pro-4tb', brand: 'Samsung', model: '9100 PRO 4TB', category: 'SSD',
    summary: 'Samsung’s PCIe 5.0 NVMe SSD with a rated 14,800MB/s sequential read on the 4TB model. Independent reviewers found it fast and cool-running, with a premium price and few real-world gains for typical gaming.',
    status: 'spec-profile',
    specs: [
      { label: 'Interface', value: 'PCIe 5.0 x4, NVMe 2.0' },
      { label: 'Form factor', value: 'M.2 2280 (a heatsink version is also sold)' },
      { label: 'NAND / controller', value: 'Samsung V-NAND TLC (V8); in-house 5nm controller' },
      { label: 'Cache (4TB)', value: '4GB LPDDR4X' },
      { label: 'Sequential read', value: 'Up to 14,800 MB/s (4TB, manufacturer rating)' },
      { label: 'Sequential write', value: 'Up to 13,400 MB/s (4TB, manufacturer rating; measured with Intelligent TurboWrite active)' },
      { label: 'Warranty / endurance', value: '5 years or 2,400 TBW (4TB)' },
    ],
    strengths: ['PCIe 5.0 interface with very high manufacturer-rated sequential speeds and a 4TB capacity option.', 'HotHardware described the drive as relatively cool-running and low-power for a Gen 5 SSD, and noted that it led its game-storage trace tests.', 'TechRadar highlighted sequential write speed as a standout in its testing.'],
    limitations: ['TechRadar’s review measured sequential reads below the box rating at first and later reported reaching the rated figure after retesting on other hardware, so results depend on the test platform.', 'Both reviewers consider it a premium-priced drive; TechRadar did not recommend it for most general or gaming users.', 'It needs a PCIe 5.0 M.2 slot to reach its rated speeds, and consoles or PCIe 4.0 systems cannot use the extra bandwidth.'],
    bestFor: ['Workstations and creators moving very large files', 'New PCIe 5.0 builds where the budget allows a premium drive', 'Buyers comparing it with the PCIe 4.0 990 PRO on price and real workload benefit'],
    sources: [
      { label: 'Samsung 9100 PRO series announcement and specifications', url: 'https://news.samsung.com/us/samsung-announces-9100-pro-series-ssds-with-breakthrough-pcie-5-0-performance/', kind: 'manufacturer' },
      { label: 'HotHardware: Samsung 9100 Pro SSD review (4TB, August 2025)', url: 'https://hothardware.com/reviews/samsung-9100-pro-ssd-review', kind: 'independent-review' },
      { label: 'TechRadar: Samsung 9100 Pro review (4TB, March 2025)', url: 'https://www.techradar.com/computing/computing-components/samsung-9100-pro', kind: 'independent-review' },
    ],
    independentReviewSummary: 'HotHardware tested the 4TB model and found it strong and well-rounded for a PCIe 5.0 drive, with first-place results in several storage traces and relatively cool, low-power operation. TechRadar’s 4TB review praised sequential write speed but judged the drive expensive and aimed at professionals rather than typical gamers. Those are the outlets’ findings on their own test systems, not TWW measurements.',
    configurationNote: 'The reviewed samples were the 4TB model without a heatsink; the heatsink version and other capacities have different ratings and prices.',
    lastVerified: '2026-10-17',
  },
  {
    id: 'nvidia-geforce-rtx-5070-ti', slug: 'nvidia-geforce-rtx-5070-ti', brand: 'NVIDIA', model: 'GeForce RTX 5070 Ti', category: 'GPU',
    summary: 'A Blackwell graphics card with 16GB of GDDR7, 896GB/s memory bandwidth and a 300W Total Graphics Power rating. A recent direct 52-game comparison found a near tie with the RX 9070 XT in its mixed 1440p aggregate, with stronger GeForce results in demanding ray tracing and path tracing.',
    status: 'spec-profile',
    specs: [
      { label: 'GPU architecture', value: 'NVIDIA Blackwell' },
      { label: 'CUDA cores', value: '8,960 (NVIDIA specification)' },
      { label: 'Ray tracing / AI hardware', value: '4th-generation Ray Tracing Cores / 5th-generation Tensor Cores' },
      { label: 'Memory', value: '16GB GDDR7' },
      { label: 'Memory interface', value: '256-bit' },
      { label: 'Memory bandwidth / cache', value: '896GB/s GDDR7 memory bandwidth' },
      { label: 'Boost clock', value: '2.45GHz (NVIDIA specification)' },
      { label: 'PCIe interface', value: 'PCIe 5.0 x16' },
      { label: 'Display standards', value: 'DisplayPort 2.1b (UHBR20) and HDMI 2.1b; port layout varies by board partner' },
      { label: 'Total graphics power', value: '300W (NVIDIA reference specification)' },
      { label: 'Recommended system power', value: '750W (NVIDIA reference guidance; depends on the full system configuration)' },
      { label: 'Reference connector', value: 'Two PCIe 8-pin cables through the supplied adapter, or one 300W-or-greater PCIe Gen 5 cable' },
      { label: 'Launch price', value: '$749 USD launch price (February 2025; historical, not a current retail quote)' },
    ],
    strengths: ['16GB of GDDR7 on a 256-bit interface with 896GB/s rated bandwidth.', 'TechSpot’s May 2026 52-game comparison found only a small aggregate lead at 1440p and around a 4% lead at native 4K.', 'The stronger fit of the pair for demanding path tracing and workflows that specifically use CUDA or OptiX.'],
    limitations: ['The mixed 52-game test found a near tie at 1440p; do not assume a large lead in every raster game.', 'The 300W reference TGP and 750W system recommendation do not describe every factory-overclocked partner card.', 'Partner-board dimensions, cooling, noise and power behavior vary; the cited review tested one specific Asus model.'],
    bestFor: ['Players who prioritize demanding ray tracing and path tracing in supported games', 'Creators and local-AI users whose exact software stack depends on CUDA, OptiX or NVIDIA NVENC', 'Buyers who value DLSS feature support and accept the actual local price premium'],
    sources: [
      { label: 'NVIDIA GeForce RTX 5070 family official specifications', url: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5070-family/', kind: 'manufacturer' },
      { label: 'TechSpot: RTX 5070 Ti vs RX 9070 XT — 52-game comparison (May 2026)', url: 'https://www.techspot.com/review/3130-geforce-rtx-5070-ti-vs-radeon-rx-9070-xt/', kind: 'independent-review' },
      { label: 'Tom’s Hardware: GeForce RTX 5070 Ti review (ASUS Prime, February 2025)', url: 'https://www.tomshardware.com/pc-components/gpus/nvidia-geforce-rtx-5070-ti-review-asus', kind: 'independent-review' },
    ],
    independentReviewSummary: 'TechSpot’s May 22, 2026 52-game head-to-head put the RTX 5070 Ti about 1.4% ahead in its mixed 1440p aggregate and around 4% ahead at native 4K; individual game results varied substantially, with NVIDIA stronger in demanding RT / path-tracing examples. TechSpot also measured about 20% lower power use than the RX 9070 XT in its test. These are external results, not TWW measurements.',
    configurationNote: 'The NVIDIA 750W system recommendation and 300W TGP refer to the reference specification. Add-in-board dimensions, connectors, cooler and noise vary by manufacturer.',
    lastVerified: '2026-10-30',
  },
  {
    id: 'amd-ryzen-7-9800x3d', slug: 'amd-ryzen-7-9800x3d', brand: 'AMD', model: 'Ryzen 7 9800X3D', category: 'CPU',
    summary: 'An 8-core, 16-thread AM5 gaming processor with 96MB of L3 cache and a 120W default TDP. TechSpot’s 45-game test found it faster than the Ryzen 7 7800X3D by 8% on average.',
    status: 'spec-profile',
    specs: [
      { label: 'Architecture / socket', value: 'Zen 5 with 3D V-Cache / AM5' },
      { label: 'Cores / threads', value: '8 / 16' },
      { label: 'Base / max boost', value: '4.7GHz / up to 5.2GHz' },
      { label: 'L3 cache', value: '96MB' },
      { label: 'Default TDP', value: '120W' },
      { label: 'Memory', value: 'DDR5; two memory channels; up to DDR5-5600 with 1 or 2 DIMMs per channel' },
      { label: 'Thermal solution', value: 'Cooler not included; AMD recommends a liquid cooler for optimal performance' },
    ],
    strengths: ['Large L3 cache aimed at latency-sensitive gaming workloads.', 'TechSpot measured an average 8% gaming lead over the Ryzen 7 7800X3D across 45 games, and 11% across the 30 games with larger margins.', 'AM5 is a current desktop platform with DDR5 support.'],
    limitations: ['Gains varied by game; TechSpot found some titles with under 1% or no improvement.', 'TechSpot’s review did not cover productivity or power consumption, so check other sources for those.', 'A cooler and a compatible AM5 motherboard are additional costs; confirm BIOS support before upgrading.'],
    bestFor: ['High-refresh-rate gaming builds', 'AM5 builders comparing X3D options and their price differences', 'Players who are CPU-limited at 1080p or 1440p'],
    sources: [
      { label: 'AMD Ryzen 7 9800X3D official specifications', url: 'https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-7-9800x3d.html', kind: 'manufacturer' },
      { label: 'TechSpot: Ryzen 7 9800X3D review (November 2024)', url: 'https://www.techspot.com/review/2917-amd-ryzen-7-9800x3d/', kind: 'independent-review' },
    ],
    independentReviewSummary: 'TechSpot’s November 2024 review ran 45 games at 1080p with a GeForce RTX 4090 and found the 9800X3D 8% faster on average than the Ryzen 7 7800X3D, with up to 21% in some titles. The review predates later X3D models, so check newer results before comparing with them. Those are TechSpot’s findings, not TWW measurements.',
    lastVerified: '2026-10-17',
  },
  {
    id: 'nvidia-geforce-rtx-5090', slug: 'nvidia-geforce-rtx-5090', brand: 'NVIDIA', model: 'GeForce RTX 5090', category: 'GPU',
    summary: 'NVIDIA’s flagship Blackwell desktop card, with 32GB of GDDR7 on a 512-bit interface and a 575W total graphics power rating. Independent reviewers measured gains of roughly 25–27% over the RTX 4090 at 4K, far smaller gains at lower resolutions, and criticized power draw and value.',
    status: 'spec-profile',
    specs: [
      { label: 'GPU architecture', value: 'NVIDIA Blackwell' },
      { label: 'CUDA cores', value: '21,760 (NVIDIA specification)' },
      { label: 'Memory', value: '32GB GDDR7' },
      { label: 'Memory interface', value: '512-bit' },
      { label: 'Boost clock', value: '2.41GHz (NVIDIA specification)' },
      { label: 'Total graphics power', value: '575W' },
      { label: 'Interface / power connector', value: 'PCIe Gen 5; 4 × PCIe 8-pin via adapter, or one 600W PCIe Gen 5 cable' },
      { label: 'Power supply', value: 'NVIDIA lists an 850W minimum and says a higher rating may be required; its specification table lists 1,000W required system power' },
    ],
    strengths: ['32GB of GDDR7 on a 512-bit interface is a very large memory configuration for a consumer graphics card.', 'TechSpot measured a 27% average gain over the RTX 4090 at 4K across 17 games, and Tom’s Hardware measured 25% at 4K Ultra across 16 games.', 'TechSpot called the Founders Edition cooler an outstanding achievement, and Tom’s Hardware measured about 50dB of noise at a constant 575W load.'],
    limitations: ['Gains shrink at lower resolutions: Tom’s Hardware measured 13% at 1440p Ultra and 3% at 1080p Ultra, and TechSpot noted 1440p results were often CPU-limited.', 'TechSpot measured around 30% more power than the RTX 4090 and judged the value poor, calling it essentially a faster RTX 40-series card.', 'Tom’s Hardware recorded 94°C and some instability at the 575W power limit in Cyberpunk 2077, called that unacceptable for the class, and questioned whether the 12V-2x6 connector can reliably carry 575W.'],
    bestFor: ['4K high-refresh gaming with a very large budget', 'Buyers who skipped the RTX 4090 and want the fastest consumer card (TechSpot’s framing)', 'Builders with a high-end CPU and a power supply that meets NVIDIA’s requirements'],
    sources: [
      { label: 'NVIDIA GeForce RTX 5090 official specifications', url: 'https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5090/', kind: 'manufacturer' },
      { label: 'Tom’s Hardware: Nvidia GeForce RTX 5090 Founders Edition review (January 2025)', url: 'https://www.tomshardware.com/pc-components/gpus/nvidia-geforce-rtx-5090-review', kind: 'independent-review' },
      { label: 'TechSpot: Nvidia GeForce RTX 5090 review (January 2025)', url: 'https://www.techspot.com/review/2944-nvidia-geforce-rtx-5090/', kind: 'independent-review' },
      { label: 'Tom’s Hardware: DLSS 4, multi-frame generation and full ray tracing tested on RTX 5090 and RTX 5080 (February 2025)', url: 'https://www.tomshardware.com/pc-components/gpus/nvidia-dlss4-mfg-and-full-ray-tracing-tested-on-rtx-5090-and-rtx-5080', kind: 'independent-review' },
    ],
    independentReviewSummary: 'Both January 2025 reviews tested Founders Edition samples against the RTX 4090. TechSpot found a 27% average 4K gain and called the card a faster RTX 40-series part with poor value, while Tom’s Hardware found 25% at 4K Ultra, much smaller gains at lower resolutions, and raised thermal and connector concerns at full power, attributing some inconsistent results to immature drivers. Those are the outlets’ findings on their own test systems, not TWW measurements, and they predate later driver updates.',
    configurationNote: 'The reviews tested Founders Edition cards. Partner cards differ in cooling, size, noise and power behavior, so confirm the exact model before applying the findings.',
    lastVerified: '2026-10-18',
  },
  {
    id: 'amd-ryzen-9-9950x3d', slug: 'amd-ryzen-9-9950x3d', brand: 'AMD', model: 'Ryzen 9 9950X3D', category: 'CPU',
    summary: 'A 16-core, 32-thread AM5 processor with 128MB of L3 cache and a 170W default TDP. In its 12-game test TechSpot found gaming performance essentially level with the Ryzen 7 9800X3D, while Tom’s Hardware measured a large multi-threaded lead over it and concluded the 9800X3D is the better buy for gaming-only builds.',
    status: 'spec-profile',
    specs: [
      { label: 'Socket', value: 'AM5' },
      { label: 'Cores / threads', value: '16 / 32' },
      { label: 'Base / max boost', value: '4.3GHz / up to 5.7GHz' },
      { label: 'L2 / L3 cache', value: '16MB L2 / 128MB L3' },
      { label: 'Default TDP', value: '170W' },
      { label: 'Memory', value: 'DDR5 UDIMM; DDR5-5600 with two modules (1R or 2R), DDR5-3600 with four modules' },
      { label: 'PCI Express', value: 'PCIe 5.0' },
      { label: 'Thermal solution', value: 'Cooler not included; AMD recommends a liquid cooler for optimal performance' },
      { label: 'Launch date', value: 'March 12, 2025' },
    ],
    strengths: ['It pairs 16 cores and 128MB of L3 cache, so one chip targets both gaming and heavy multi-threaded work.', 'TechSpot found average gaming performance essentially level with the Ryzen 7 9800X3D and about a third faster than Intel’s Core Ultra 9 285K in its 12-game test.', 'Tom’s Hardware’s multi-threaded geomean scored 635 for the 9950X3D against 367 for the 9800X3D, with the largest gaps in rendering and encoding tests.'],
    limitations: ['Tom’s Hardware’s 16-game 1080p test found gaming effectively tied with the cheaper 9800X3D, and it recommended the 9800X3D for gaming-focused builds on value and efficiency.', 'TechSpot measured 44% more power than the 9800X3D in Cyberpunk 2077, and Tom’s Hardware recommended a 360mm all-in-one cooler.', 'Both reviews date from 2025, and TechSpot’s test used an RTX 4090 and 12 games, so check newer results and your own resolution before drawing conclusions.'],
    bestFor: ['Builders who game and also run heavy multi-threaded work such as rendering or video encoding', 'AM5 builders choosing between X3D chips, including those weighing the 9800X3D', 'Buyers who will budget for a larger cooler and a capable motherboard'],
    sources: [
      { label: 'AMD Ryzen 9 9950X3D official specifications', url: 'https://www.amd.com/en/products/processors/desktops/ryzen/9000-series/amd-ryzen-9-9950x3d.html', kind: 'manufacturer' },
      { label: 'TechSpot: AMD Ryzen 9 9950X3D review (March 2025)', url: 'https://www.techspot.com/review/2965-amd-ryzen-9-9950x3d/', kind: 'independent-review' },
      { label: 'Tom’s Hardware: Ryzen 7 9800X3D vs Ryzen 9 9950X3D faceoff (updated September 2025)', url: 'https://www.tomshardware.com/pc-components/cpus/amd-ryzen-9-9950x3d-vs-amd-ryzen-7-9800x3d-faceoff', kind: 'independent-review' },
    ],
    independentReviewSummary: 'TechSpot’s March 2025 review (12 games, GeForce RTX 4090) found the 9950X3D essentially level with the 9800X3D in games, well ahead of the Core Ultra 9 285K, and roughly matching the 285K in productivity, calling it an easy recommendation for users who need both. Tom’s Hardware’s head-to-head tested 16 games at 1080p with an RTX 5090 and found gaming tied, a much higher multi-threaded score for the 9950X3D (635 against 367 in its geomean), higher power draw, and a 4–4 scorecard overall. Those are the outlets’ results on their own systems, not TWW measurements.',
    lastVerified: '2026-10-18',
  },
  {
    id: 'amd-radeon-rx-9060-xt-16gb', slug: 'amd-radeon-rx-9060-xt-16gb', brand: 'AMD', model: 'Radeon RX 9060 XT 16GB', category: 'GPU',
    summary: 'A mainstream graphics card with 16GB of GDDR6 on a 128-bit interface and a 160W typical board power. Tom’s Hardware gave the 16GB model an Editor’s Choice and advised avoiding 8GB variants, while noting that AMD trails Nvidia on software features such as upscaling.',
    status: 'spec-profile',
    specs: [
      { label: 'Compute units', value: '32 (AMD specification)' },
      { label: 'Stream processors', value: '2,048' },
      { label: 'Game / boost frequency', value: 'Up to 2.53GHz game clock / 3.13GHz boost clock (AMD ratings)' },
      { label: 'Memory', value: '16GB GDDR6' },
      { label: 'Memory interface', value: '128-bit; up to 320GB/s rated bandwidth' },
      { label: 'Typical board power', value: '160W' },
      { label: 'Power connector', value: '1 × 8-pin (AMD specification)' },
      { label: 'Interface', value: 'PCIe 5.0 x16' },
      { label: 'Accelerators', value: '32 ray accelerators, 64 AI accelerators' },
    ],
    strengths: ['16GB of video memory in a mainstream card; Tom’s Hardware said it makes Nvidia’s 8GB RTX 5060 and 5060 Ti look weak.', 'Tom’s Hardware gave the 16GB model an Editor’s Choice and described it as a strong mainstream option with plenty of VRAM.', 'The 160W board power is lower than the 180W it lists for the RTX 5060 Ti, and it needs one 8-pin connector.'],
    limitations: ['Tom’s Hardware noted Nvidia still holds the top performance spot, and its GDDR7 memory is rated about 40% faster in bandwidth than AMD’s 20Gbps GDDR6.', 'AMD trails Nvidia on software features such as FSR versus DLSS, according to the same review.', 'At review time 16GB cards were selling above AMD’s launch price, so current local pricing and stock matter more than the launch figure.'],
    bestFor: ['Mainstream gaming builds that want 16GB of VRAM and a single 8-pin power connector', 'Buyers choosing between 16GB and 8GB cards, since the reviewer advised avoiding the 8GB variants', 'Shoppers comparing it with the RTX 5060 Ti and Intel Arc B580 by current local price'],
    sources: [
      { label: 'AMD Radeon RX 9060 XT (16GB) official specifications', url: 'https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9060xt.html', kind: 'manufacturer' },
      { label: 'Tom’s Hardware: AMD Radeon RX 9060 XT 16GB review (June 2025)', url: 'https://www.tomshardware.com/pc-components/gpus/amd-radeon-rx-9060-xt-16gb-review', kind: 'independent-review' },
    ],
    independentReviewSummary: 'Tom’s Hardware’s June 2025 review named the RX 9060 XT 16GB an Editor’s Choice for its performance and VRAM, said Nvidia keeps the top performance spot and a software-feature lead, criticized 8GB cards for running out of memory, and advised avoiding the 8GB variants. That is the reviewer’s verdict at launch pricing, not a TWW measurement.',
    configurationNote: 'This profile covers the 16GB model. AMD also sells an 8GB RX 9060 XT and a low-profile version with different specifications and pricing; do not apply this profile or the review to those variants.',
    lastVerified: '2026-10-18',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getProductByPath(path: string): Product | undefined {
  const normalized = path.replace(/\/$/, '');
  return products.find(product => productPath(product) === normalized);
}

/** Product photography lives in /public/images/reviews as 16:10 WebP (960w hero, 480w card). */
const productImageAlt: Record<string, string> = {
  'samsung-990-pro-4tb': 'Samsung 990 PRO 4TB M.2 NVMe SSD, top view of the label side',
  'crucial-t500-2tb': 'Crucial T500 2TB M.2 NVMe SSD with heatsink, shown at an angle',
  'nvidia-geforce-rtx-5080': 'NVIDIA GeForce RTX 5080 Founders Edition graphics card beside its packaging',
  'amd-radeon-rx-9070-xt': 'AMD Radeon RX 9070 XT triple-fan graphics card, side view',
  'amd-ryzen-7-9850x3d': 'AMD Ryzen 9000 Series desktop processor, top view of the heat spreader',
  'intel-core-ultra-5-250k-plus': 'Intel Core Ultra 5 250K Plus desktop processor, top view of the heat spreader',
  'lenovo-legion-pro-7i-gen-10-rtx-5080': 'Lenovo Legion Pro 7i Gen 10 gaming laptop with the lid open',
  'hyperx-omen-max-16-rtx-5090': 'HP OMEN MAX 16 gaming laptop with RGB keyboard and the lid open',
  'samsung-9100-pro-4tb': 'Samsung 9100 PRO 4TB M.2 NVMe SSD, top view of the label side',
  'nvidia-geforce-rtx-5070-ti': 'NVIDIA GeForce RTX 5070 Ti dual-fan graphics card, front view',
  'amd-ryzen-7-9800x3d': 'AMD Ryzen 7 9800X3D desktop processor seen from above on a dark surface',
};

export type ProductImage = { src: string; srcSet: string; alt: string; width: number; height: number };

/** Returns undefined for products that have no photo yet, so pages simply omit the image. */
export function productImage(product: Product): ProductImage | undefined {
  if (!productImageAlt[product.slug]) return undefined;
  const base = `/images/reviews/${product.slug}`;
  return {
    src: `${base}-960.webp`,
    srcSet: `${base}-480.webp 480w, ${base}-960.webp 960w`,
    alt: productImageAlt[product.slug],
    width: 960,
    height: 600,
  };
}
