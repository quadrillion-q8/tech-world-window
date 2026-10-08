import { articles, articleWordCount, categories } from '../data/articles';
import { hubSeo } from '../data/hubs';
import { authors } from '../data/authors';
import { routeGraph, SITE_URL, SITE_NAME, SITE_TAGLINE, siteEntity, type RouteNode } from '../data/graph';

type SeoData = {
  title: string;
  description: string;
  canonical: string;
  type: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
  authorName?: string;
  image?: string;
};

const DEFAULT_OG_IMAGE = '/og-default.png';

const staticSeo: Record<string, Pick<SeoData, 'title' | 'description'>> = {
  '/affiliate-disclosure': {
    title: 'Affiliate Disclosure | Tech World Window',
    description: 'How Tech World Window may earn commissions from product links and how commercial relationships are handled.',
  },
  '/tools/psu-wattage-calculator': {
    title: 'PSU Wattage Calculator | Tech World Window',
    description: 'Estimate a sensible power supply range from your GPU, CPU and other system load before you buy a PSU.',
  },
  '/tools/ram-calculator': {
    title: 'RAM Calculator | Tech World Window',
    description: 'Estimate a practical memory capacity from Windows, application and gaming use before you buy or upgrade RAM.',
  },
  '/tools/storage-calculator': {
    title: 'Storage Calculator | Tech World Window',
    description: 'Estimate how much SSD or HDD capacity your games, apps and files will need before choosing a drive.',
  },
  '/reviews/ssds/samsung-990-pro-4tb': {
    title: 'Samsung 990 PRO 4TB Review | Tech World Window',
    description: 'Samsung 990 PRO 4TB specification profile: PCIe 4.0 interface, 4TB capacity and a 2,400 TBW endurance rating.',
  },
  '/reviews/ssds/crucial-t500-2tb': {
    title: 'Crucial T500 2TB Review | Tech World Window',
    description: 'Crucial T500 2TB specification profile: PCIe 4.0 interface with up to 7,400/7,000 MB/s rated sequential speeds.',
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
    description: 'How Tech World Window approaches hands-on testing, measurements, troubleshooting evidence, repeatability and technical limitations.',
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
  const normalizedPath = path === '' ? '/' : path.replace(/\/$/, '') || '/';
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
      description: 'Free technology tools from Tech World Window, including practical calculators and troubleshooting helpers.',
      canonical: absoluteUrl(normalizedPath),
      type: 'website',
    };
  }

  if (normalizedPath === '/tools/pc-bottleneck-calculator') {
    return {
      title: 'PC Bottleneck Calculator | Tech World Window',
      description: 'A simple educational PC pairing estimator. Learn why CPU and GPU bottlenecks depend on resolution, games, settings, and target frame rate.',
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

function safeJson(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

function breadcrumbSchema(path: string, seo: SeoData) {
  const items = [{ name: 'Home', path: '/' }];
  const article = articles.find(item => `/${item.slug}` === path);
  const category = getCategory(path);

  if (article) {
    items.push({ name: article.category, path: `/${article.category.toLowerCase()}` });
    items.push({ name: article.title, path });
  } else if (category) {
    items.push({ name: category.name, path });
  } else if (path !== '/') {
    const route = routeGraph.find(item => item.path === path);
    items.push({ name: route?.title || seo.title.replace(/ \| Tech World Window$/, ''), path });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function injectSsgSeo(renderedHtml: string, route: string) {
  const path = route === '' ? '/' : route.replace(/\/$/, '') || '/';
  const seo = getSeoData(path);
  const article = articles.find(item => `/${item.slug}` === path);
  const author = article ? authors[article.authorId] : undefined;

  const schemas: unknown[] = [breadcrumbSchema(path, seo)];
  if (path === '/') {
    schemas.unshift({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      description: seo.description,
    });
  }
  schemas.unshift({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteEntity.name,
    url: SITE_URL,
    description: siteEntity.description,
    slogan: SITE_TAGLINE,
    logo: { '@type': 'ImageObject', url: absoluteUrl('/tech-world-window-mark.png') },
  });
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.dek,
      mainEntityOfPage: seo.canonical,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      articleSection: article.category,
      inLanguage: 'en',
      isAccessibleForFree: true,
      keywords: article.tags.join(', '),
      wordCount: articleWordCount(article),
      author: {
        '@type': 'Person',
        name: seo.authorName || 'Tech World Window Editorial Team',
        ...(author ? { url: absoluteUrl(author.url), jobTitle: author.role } : {}),
      },
      publisher: { '@type': 'Organization', name: 'Tech World Window', url: SITE_URL, logo: { '@type': 'ImageObject', url: absoluteUrl('/tech-world-window-mark.png') } },
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
    '<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />',
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    '<meta property="og:site_name" content="Tech World Window" />',
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${escapeHtml(seo.canonical)}" />`,
    `<meta property="og:image" content="${escapeHtml(absoluteUrl(seo.image || DEFAULT_OG_IMAGE))}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
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
