import { articles, articleWordCount, categories } from '../data/articles';
import { buildSiteSchemaGraph, organizationId, websiteId, personId } from './siteSchema';
import { hubSeo } from '../data/hubs';
import { authors } from '../data/authors';
import { BSOD_BASE_PATH } from '../data/bsod';
import { getToolPageData, HUB_SEO_DESCRIPTION } from '../data/tools';
import { getProductByPath, productCategorySlug, productImage, productMetaDescription, productPageTitle, productPath, products, type ProductCategory } from '../data/products';
import { getComparisonByPath } from '../data/comparisons';
import { fitTitle } from './title';
import { robotsForPath, isIndexablePath, cleanPath } from './indexingPolicy';
import { routeGraph, SITE_URL, type RouteNode } from '../data/graph';

type SeoData = {
  title: string;
  description: string;
  canonical: string;
  type: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export const DEFAULT_OG_IMAGE = '/og-default.png';

const staticSeo: Record<string, Pick<SeoData, 'title' | 'description'>> = {
  '/gallery': {
    title: 'Repair Bench Photo Gallery | Tech World Window',
    description: 'Photos from real laptop and PC repair work: fan and heatsink cleaning, thermal paste, SSD and RAM upgrades, batteries, BIOS screens, MacBooks and desktops.',
  },
  '/affiliate-disclosure': {
    title: 'Affiliate Disclosure | Tech World Window',
    description: 'How Tech World Window may earn commissions from product links and how commercial relationships are handled.',
  },
  '/compare/samsung-990-pro-vs-crucial-t500': {
    title: 'Samsung 990 PRO 4TB vs Crucial T500 2TB | Tech World Window',
    description: 'Compare the Samsung 990 PRO 4TB and Crucial T500 2TB by capacity, rated performance, endurance and best use case.',
  },
  '/about': {
    title: 'About Tech World Window',
    description: 'Learn about Tech World Window, its editorial mission, and its approach to practical technology coverage.',
  },
  '/contact': {
    title: 'Contact Tech World Window',
    description: 'Contact the Tech World Window editorial team for corrections, editorial suggestions, testing opportunities, and business enquiries.',
  },
  '/editorial-policy': {
    title: 'Editorial Policy',
    description: 'How Tech World Window approaches accuracy, testing, corrections, sourcing, and affiliate disclosures.',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'Privacy information for Tech World Window, including data collection and service-use disclosures before launch.',
  },
  '/testing': {
    title: 'TWW Testing Methodology',
    description: 'How TWW documents hardware tests, PC benchmarks and troubleshooting evidence—and separates its own measurements from third-party results and technical analysis.',
  },
  '/research': {
    title: 'TWW Technology Research',
    description: 'Original technical studies, benchmark data and evidence-led research from Tech World Window.',
  },
  '/authors/imran-natiq': {
    title: 'Imran Natiq',
    description: 'Hardware Repair Engineer and Tech World Window contributor focused on practical PC and laptop troubleshooting.',
  },
};

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function getCategory(path: string) {
  const slug = path.replace(/^\//, '').replace(/\/$/, '');
  return categories.find(category => category.slug === slug);
}

export function getSeoData(path: string): SeoData {
  const data = buildSeoData(path);
  return { ...data, title: fitTitle(data.title) };
}

function buildSeoData(path: string): SeoData {
  const normalizedPath = cleanPath(path || '/');
  const article = articles.find(item => `/${item.slug}` === normalizedPath);
  if (article) {
    const pageTitle = article.seoTitle ?? article.title;
    return {
      title: pageTitle.includes('Tech World Window') ? pageTitle : `${pageTitle} | Tech World Window`,
      description: article.metaDescription ?? article.dek,
      canonical: absoluteUrl(normalizedPath),
      type: 'article',
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      authorName: authors[article.authorId]?.name || 'Tech World Window Editorial Team',
      image: article.heroImage || DEFAULT_OG_IMAGE,
    };
  }

  const product = getProductByPath(normalizedPath);
  if (product) {
    return {
      title: `${productPageTitle(product)} | Tech World Window`,
      description: productMetaDescription(product),
      canonical: absoluteUrl(normalizedPath),
      type: 'website',
      ...(productImage(product) ? { image: productImage(product)!.src, imageWidth: productImage(product)!.width, imageHeight: productImage(product)!.height } : {}),
    };
  }

  const comparison = getComparisonByPath(normalizedPath);
  if (comparison) {
    return {
      title: `${comparison.title}: Specifications Compared | Tech World Window`,
      description: comparison.metaDescription,
      canonical: absoluteUrl(normalizedPath),
      type: 'website',
      ...(productImage(comparison.productA) ? { image: productImage(comparison.productA)!.src, imageWidth: productImage(comparison.productA)!.width, imageHeight: productImage(comparison.productA)!.height } : {}),
    };
  }

  const toolPage = getToolPageData(normalizedPath);
  if (toolPage) {
    return {
      title: toolPage.title,
      description: toolPage.description,
      canonical: absoluteUrl(normalizedPath),
      type: 'website',
    };
  }

  const hub = hubSeo[normalizedPath];
  if (hub) {
    return {
      title: `${hub.title} | Tech World Window`,
      description: hub.description,
      canonical: absoluteUrl(normalizedPath),
      type: 'website',
    };
  }

  const category = getCategory(normalizedPath);
  if (category) {
    return {
      title: `${category.name} | Tech World Window`,
      description: category.description,
      canonical: absoluteUrl(normalizedPath),
      type: 'website',
    };
  }

  if (normalizedPath === '/tools') {
    return {
      title: 'Free Tech Tools | Tech World Window',
      description: HUB_SEO_DESCRIPTION,
      canonical: absoluteUrl(normalizedPath),
      type: 'website',
    };
  }

  if (normalizedPath === '/') {
    return {
      title: 'Tech World Window: Windows, PC Gaming & Hardware Guides',
      description: 'Practical Windows troubleshooting, PC gaming performance guides, hardware analysis, buying advice and free PC tools — explained with evidence.',
      canonical: SITE_URL,
      type: 'website',
    };
  }

  if (staticSeo[normalizedPath]) {
    const page = staticSeo[normalizedPath];
    return {
      ...page,
      canonical: absoluteUrl(normalizedPath),
      type: 'website',
    };
  }

  const route: RouteNode | undefined = routeGraph.find(item => item.path === normalizedPath);
  return {
    title: `${route?.title || 'Tech World Window'} | Tech World Window`,
    description: 'Technology news, practical fixes, real-world testing and useful tools — clearly explained.',
    canonical: absoluteUrl(normalizedPath),
    type: 'website',
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function safeJson(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export function getBreadcrumbItems(path: string, seo = getSeoData(path)) {
  path = cleanPath(path || '/');
  const items = [{ name: 'Home', path: '/' }];
  const article = articles.find(item => `/${item.slug}` === path);
  const category = getCategory(path);
  const product = getProductByPath(path);
  const comparison = getComparisonByPath(path);

  if (article) {
    items.push({ name: article.category, path: `/${article.category.toLowerCase()}` });
    items.push({ name: article.title, path });
  } else if (product) {
    items.push({ name: 'Reviews & Product Research', path: '/reviews' });
    items.push({ name: product.category + ' Profiles', path: `/reviews/${productCategorySlug(product.category)}` });
    items.push({ name: product.brand + ' ' + product.model, path });
  } else if (comparison) {
    items.push({ name: 'Reviews', path: '/reviews' });
    items.push({ name: `${comparison.productA.category} Profiles`, path: `/reviews/${productCategorySlug(comparison.productA.category)}` });
    items.push({ name: comparison.title, path });
  } else if (path.startsWith('/reviews/')) {
    items.push({ name: 'Reviews', path: '/reviews' });
    items.push({ name: routeGraph.find(item => item.path === path)?.title || seo.title, path });
  } else if (category) {
    items.push({ name: category.name, path });
  } else if (path.startsWith('/tools/')) {
    items.push({ name: 'Tools', path: '/tools' });
    if (path.startsWith(`${BSOD_BASE_PATH}/`)) items.push({ name: 'BSOD Error Code Lookup', path: BSOD_BASE_PATH });
    const route = routeGraph.find(item => item.path === path);
    items.push({ name: route?.title || seo.title.replace(/ \| Tech World Window$/, ''), path });
  } else if (path !== '/') {
    const route = routeGraph.find(item => item.path === path);
    items.push({ name: route?.title || seo.title.replace(/ \| Tech World Window$/, ''), path });
  }

  return items;
}

function breadcrumbSchema(path: string, seo: SeoData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': seo.canonical + '#breadcrumb',
    itemListElement: getBreadcrumbItems(path, seo).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

const reviewHubCategories: Record<string, ProductCategory | null> = {
  '/reviews': null,
  '/reviews/ssds': 'SSD',
  '/reviews/gpus': 'GPU',
  '/reviews/laptops': 'Laptop',
  '/reviews/cpus': 'CPU',
};

export function getRouteSchemas(route: string): Record<string, unknown>[] {
  const path = cleanPath(route || '/');
  if (!isIndexablePath(path)) return [];
  const seo = getSeoData(path);
  const article = articles.find(item => `/${item.slug}` === path);
  const author = article ? authors[article.authorId] : undefined;

  const schemas: Record<string, unknown>[] = [buildSiteSchemaGraph(path === '/'), breadcrumbSchema(path, seo)];
  const pageId = seo.canonical + '#webpage';
  const routeNode = routeGraph.find(item => item.path === path);
  const pageFields = { '@id': pageId, url: seo.canonical, name: seo.title, description: seo.description, inLanguage: 'en', isPartOf: { '@id': websiteId }, breadcrumb: { '@id': seo.canonical + '#breadcrumb' } };
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': seo.canonical + '#article',
      headline: article.title,
      description: article.dek,
      mainEntityOfPage: { '@id': pageId },
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      articleSection: article.category,
      inLanguage: 'en',
      isAccessibleForFree: true,
      keywords: article.tags.join(', '),
      wordCount: articleWordCount(article),
      ...(path !== '/gamebar-presence-writer-fix' && article.sources?.length ? { citation: article.sources.map(source => ({ '@type': 'CreativeWork', name: source.label, url: source.url })) } : {}),
      author: {
        '@type': author ? 'Person' : 'Organization',
        name: seo.authorName || 'Tech World Window Editorial Team',
        ...(author ? { '@id': absoluteUrl(author.url) + '#person', url: absoluteUrl(author.url), jobTitle: author.role } : { '@id': organizationId }),
      },
      publisher: { '@id': organizationId },
      image: [absoluteUrl(article.heroImage || DEFAULT_OG_IMAGE)],
    });
    if (article.howTo?.steps.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: article.howTo.name,
        step: article.howTo.steps.map((text, index) => ({ '@type': 'HowToStep', position: index + 1, name: text })),
      });
    }
    if (article.faq?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      });
    }
  }

  const product = getProductByPath(path);
  if (product) {
    const image = productImage(product);
    const imageObject = image ? { '@type': 'ImageObject', url: absoluteUrl(image.src), width: image.width, height: image.height, caption: image.alt } : undefined;
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      ...pageFields,
      ...(imageObject ? { primaryImageOfPage: imageObject } : {}),
      about: { '@type': 'Thing', name: `${product.brand} ${product.model}`, description: product.summary, ...(image ? { image: absoluteUrl(image.src) } : {}) },
    });
  }

  const comparisonPage = getComparisonByPath(path);
  if (comparisonPage) {
    const image = productImage(comparisonPage.productA);
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      ...pageFields,
      ...(image ? { primaryImageOfPage: { '@type': 'ImageObject', url: absoluteUrl(image.src), width: image.width, height: image.height, caption: image.alt } } : {}),
      about: [comparisonPage.productA, comparisonPage.productB].map(item => ({ '@type': 'Thing', name: `${item.brand} ${item.model}`, description: item.summary })),
    });
    if (comparisonPage.faq?.length) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: comparisonPage.faq.map(item => ({ '@type': 'Question', name: item.question, acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
      });
    }
  }

  const hubCategory = reviewHubCategories[path];
  if (hubCategory !== undefined) {
    const items = hubCategory ? products.filter(item => item.category === hubCategory) : products;
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      ...pageFields,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: absoluteUrl(productPath(item)),
          name: `${item.brand} ${item.model}`,
          ...(productImage(item) ? { image: absoluteUrl(productImage(item)!.src) } : {}),
        })),
      },
    });
  }

  const toolPage = getToolPageData(path);
  if (toolPage?.webApp) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      '@id': seo.canonical + '#application',
      mainEntityOfPage: { '@id': pageId },
      name: toolPage.webApp.name,
      description: toolPage.webApp.description,
      url: seo.canonical,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      publisher: { '@id': organizationId },
    });
  }
  if (toolPage?.faq.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: toolPage.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  if (!product && !comparisonPage && hubCategory === undefined) {
    const pageType = path === '/authors/imran-natiq' ? 'ProfilePage' : path === '/about' ? 'AboutPage' : path === '/contact' ? 'ContactPage' : path === '/gallery' ? 'ImageGallery' : routeNode?.kind === 'category' || routeNode?.kind === 'tools' ? 'CollectionPage' : 'WebPage';
    schemas.push({
      '@context': 'https://schema.org',
      '@type': pageType,
      ...pageFields,
      ...(pageType === 'AboutPage' || pageType === 'ContactPage' ? { mainEntity: { '@id': organizationId } } : pageType === 'ProfilePage' ? { mainEntity: { '@id': personId } } : article ? { mainEntity: { '@id': seo.canonical + '#article' } } : toolPage?.webApp ? { mainEntity: { '@id': seo.canonical + '#application' } } : {}),
    });
  }
  return schemas;
}

export function injectSsgSeo(renderedHtml: string, route: string) {
  const path = cleanPath(route || '/');
  const seo = getSeoData(path);
  const schemas = getRouteSchemas(path);
  const managedPatterns = [
    /<title[\s\S]*?<\/title>/gi,
    /<meta\s+[^>]*name=["']description["'][^>]*>\s*/gi,
    /<meta\s+[^>]*name=["']robots["'][^>]*>\s*/gi,
    /<meta\s+[^>]*name=["']twitter:[^"']+["'][^>]*>\s*/gi,
    /<meta\s+[^>]*property=["']og:[^"']+["'][^>]*>\s*/gi,
    /<meta\s+[^>]*property=["']article:(?:published|modified)_time["'][^>]*>\s*/gi,
    /<link\s+[^>]*rel=["']canonical["'][^>]*>\s*/gi,
    /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>\s*/gi,
  ];

  let head = renderedHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  if (head == null) return renderedHtml;
  for (const pattern of managedPatterns) head = head.replace(pattern, '');

  const headTags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="robots" content="${robotsForPath(path)}" />`,
    ...(isIndexablePath(path) ? [`<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`] : []),
    `<meta property="og:type" content="${seo.type}" />`,
    '<meta property="og:site_name" content="Tech World Window" />',
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(absoluteUrl(seo.image || DEFAULT_OG_IMAGE))}" />`,
    ...(seo.imageWidth && seo.imageHeight ? [`<meta property="og:image:width" content="${seo.imageWidth}" />`, `<meta property="og:image:height" content="${seo.imageHeight}" />`] : []),
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(absoluteUrl(seo.image || DEFAULT_OG_IMAGE))}" />`,
  ];

  if (seo.publishedAt) headTags.push(`<meta property="article:published_time" content="${escapeHtml(seo.publishedAt)}" />`);
  if (seo.updatedAt) headTags.push(`<meta property="article:modified_time" content="${escapeHtml(seo.updatedAt)}" />`);

  for (const schema of schemas) {
    headTags.push(`<script type="application/ld+json">${safeJson(schema)}</script>`);
  }

  const newHead = `${head.trim()}\n    ${headTags.join('\n    ')}\n  `;
  return renderedHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/i, `<head>${newHead}</head>`);
}
