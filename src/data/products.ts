export type Product = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  category: 'SSD';
  summary: string;
  status: 'spec-profile' | 'hands-on-tested';
  specs: { label: string; value: string }[];
  strengths: string[];
  limitations: string[];
  bestFor: string[];
  sources: { label: string; url: string }[];
  affiliateUrl?: string;
  lastVerified: string;
};

export const products: Product[] = [
  {
    id: 'samsung-990-pro-4tb', slug: 'samsung-990-pro-4tb', brand: 'Samsung', model: '990 PRO 4TB', category: 'SSD',
    summary: 'A high-end PCIe 4.0 NVMe SSD aimed at gaming, large application libraries and demanding desktop workloads.',
    status: 'spec-profile',
    specs: [
      { label: 'Interface', value: 'PCIe 4.0 x4, NVMe 2.0' },
      { label: 'Form factor', value: 'M.2 2280' },
      { label: 'NAND', value: 'Samsung V-NAND TLC' },
      { label: 'Sequential read', value: 'Up to 7,450 MB/s' },
      { label: 'Sequential write', value: 'Up to 6,900 MB/s' },
      { label: 'Warranty / endurance', value: '5 years or 2,400 TBW' },
    ],
    strengths: ['Very high PCIe 4.0-class sequential performance.', '4TB capacity is useful for large game and media libraries.', 'TLC NAND, DRAM cache and Samsung Magician management software.'],
    limitations: ['PCIe 5.0 drives can offer higher interface bandwidth in supported systems.', 'Actual performance depends on the host platform, workload and thermal conditions.', 'The listed performance figures are manufacturer specifications, not TWW measurements.'],
    bestFor: ['High-end gaming PCs', 'Large Windows application and game libraries', 'Workstations needing strong PCIe 4.0 performance'],
    sources: [
      { label: 'Samsung 990 PRO 4TB official specifications', url: 'https://www.samsung.com/ae/memory-storage/nvme-ssd/990-pro-4tb-nvme-pcie-gen-4-mz-v9p4t0bw/' },
      { label: 'Samsung 990 PRO 4TB announcement', url: 'https://news.samsung.com/global/samsung-electronics-4tb-ssd-990-pro-series-brings-ultimate-performance-and-capacity-for-gamers-and-creators' },
    ],
    lastVerified: '2026-10-07',
  },
  {
    id: 'crucial-t500-2tb', slug: 'crucial-t500-2tb', brand: 'Crucial', model: 'T500 2TB', category: 'SSD',
    summary: 'A PCIe 4.0 NVMe SSD positioned for high-performance desktop and gaming use, with a 2TB option and optional heatsink variants.',
    status: 'spec-profile',
    specs: [
      { label: 'Interface', value: 'PCIe 4.0 NVMe' },
      { label: 'Form factor', value: 'M.2 2280' },
      { label: 'Sequential read', value: 'Up to 7,400 MB/s' },
      { label: 'Sequential write', value: 'Up to 7,000 MB/s' },
      { label: 'Random performance', value: 'Up to 1.18M / 1.44M IOPS (2TB)' },
      { label: 'Warranty / endurance', value: '5 years / 1,200 TBW (2TB)' },
    ],
    strengths: ['Strong manufacturer-rated PCIe 4.0 performance.', '2TB model is rated for 1,200 TBW.', 'Available in versions with and without a heatsink.'],
    limitations: ['Specifications are not the same as independently measured sustained performance.', 'A heatsink version may not suit every laptop or M.2 enclosure.', 'Value depends on the current street price.'],
    bestFor: ['Gaming PCs', 'Windows system drives', 'Users wanting a 2TB PCIe 4.0 option'],
    sources: [
      { label: 'Crucial T500 official product specifications', url: 'https://www.crucial.com/content/dam/crucial/ssd-products/t500/flyers/b2c/crucial-T500-b2c-product-flyer-en_combination.pdf' },
    ],
    lastVerified: '2026-10-07',
  },
];

export function getProduct(slug: string) {
  return products.find(product => product.slug === slug);
}
