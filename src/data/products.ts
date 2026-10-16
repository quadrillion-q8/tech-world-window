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
    summary: 'A desktop RDNA 4 graphics card with 16GB of GDDR6 memory. Published lab tests show that real street pricing and game selection matter when comparing it with the non-XT RX 9070 and NVIDIA alternatives.',
    status: 'spec-profile',
    specs: [
      { label: 'GPU architecture', value: 'AMD RDNA 4' },
      { label: 'Compute units', value: '64 (AMD specification)' },
      { label: 'Game / boost frequency', value: 'Up to 2.4GHz game clock / 2.97GHz boost clock (AMD ratings)' },
      { label: 'Memory', value: '16GB GDDR6' },
      { label: 'Memory interface', value: '256-bit; 640GB/s rated bandwidth' },
      { label: 'Power connector', value: '2 × 8-pin (AMD reference specification)' },
    ],
    strengths: ['16GB of video memory is useful for high-resolution textures and demanding games.', 'Independent reviews found strong conventional rendering performance for its segment.', 'TechSpot’s 52-game comparison published in August 2026 helps readers compare the XT and non-XT models under a more recent game set.'],
    limitations: ['Ray-tracing performance and software features differ from NVIDIA cards; compare the exact games and modes that matter to you.', 'The value proposition changes materially with real retail price and stock.', 'Partner cards differ in cooler, dimensions, noise and power limit; review results depend on the model tested.'],
    bestFor: ['High-quality 1440p gaming', 'Buyers who value 16GB VRAM and conventional rendering performance', 'Shoppers comparing real local prices for RX 9070 and RX 9070 XT cards'],
    sources: [
      { label: 'AMD Radeon RX 9070 XT official specifications', url: 'https://www.amd.com/en/products/graphics/desktops/radeon/9000-series/amd-radeon-rx-9070xt.html', kind: 'manufacturer' },
      { label: 'TechSpot: Radeon RX 9070 vs RX 9070 XT — 52-game comparison (August 2026)', url: 'https://www.techspot.com/review/3161-amd-radeon-9070-vs-9070-xt/', kind: 'independent-review' },
      { label: 'Tom’s Hardware: Radeon RX 9070 XT and RX 9070 review', url: 'https://www.tomshardware.com/pc-components/gpus/amd-radeon-rx-9070-xt-review', kind: 'independent-review' },
    ],
    independentReviewSummary: 'TechSpot’s August 2026 comparison tested 52 games and explains why the relative price of the RX 9070 and RX 9070 XT is now central to the buying decision. Tom’s Hardware’s launch review adds coverage of rasterization, ray tracing, power, thermals and noise. Those are external test results, not TWW tests.',
    lastVerified: '2026-10-17',
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
      { label: 'Memory / storage', value: '64GB DDR5-6400; 2TB NVMe SSD in the reviewed configuration' },
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
    independentReviewSummary: 'Notebookcheck’s RTX 5080 configuration review reports strong performance and a standout 240Hz OLED, balanced against higher power draw, very high CPU temperatures under gaming load, fan noise in Performance mode and a heavy adapter. These observations apply to its tested configuration and settings, not every regional SKU.',
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
];

export function getProduct(slug: string): Product | undefined {
  return products.find(product => product.slug === slug);
}

export function getProductByPath(path: string): Product | undefined {
  const normalized = path.replace(/\/$/, '');
  return products.find(product => productPath(product) === normalized);
}
