import { articles, categories } from '../data/articles';
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
};

const staticSeo: Record<string, Pick<SeoData, 'title' | 'description'>> = {
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
    return {
      title: article.title.includes('Tech World Window') ? article.title : `${article.title} | Tech World Window`,
      description: article.dek,
      canonical: absoluteUrl(normalizedPath),
      type: 'article',
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      authorName: authors[article.authorId]?.name || 'Tech World Window Editorial Team',
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
      title: 'Tech World Window — Your Window Into Technology',
      description: 'Technology news, practical fixes, real-world testing and useful tools — clearly explained.',
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
      author: { '@type': 'Person', name: seo.authorName || 'Tech World Window Editorial Team' },
      publisher: { '@type': 'Organization', name: 'Tech World Window', url: SITE_URL },
    });
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
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
  ];

  if (seo.publishedAt) headTags.push(`<meta property="article:published_time" content="${escapeHtml(seo.publishedAt)}" />`);
  if (seo.updatedAt) headTags.push(`<meta property="article:modified_time" content="${escapeHtml(seo.updatedAt)}" />`);

  for (const schema of schemas) {
    headTags.push(`<script type="application/ld+json">${safeJson(schema)}</script>`);
  }

  const newHead = `${head.trim()}\n    ${headTags.join('\n    ')}\n  `;
  return renderedHtml.replace(/<head[^>]*>[\s\S]*?<\/head>/i, `<head>${newHead}</head>`);
}
