import { Head } from 'vite-react-ssg';
import { SITE_NAME, SITE_URL, siteEntity } from '../data/graph';

type SEOProps = {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
  image?: string;
  robots?: string;
};

const DEFAULT_OG_IMAGE = '/og-default.png';
function absoluteUrl(path: string) { return new URL(path, SITE_URL).toString(); }

export function SEOEngine({
  title, description, path, type = 'website', publishedAt, updatedAt, image,
  robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
}: SEOProps) {
  const canonical = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const imageUrl = absoluteUrl(image || DEFAULT_OG_IMAGE);
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {updatedAt && <meta property="article:modified_time" content={updatedAt} />}
    </Head>
  );
}

export function ArticleStructuredData({
  title, description, path, publishedAt, updatedAt, authorName, category, image,
  keywords, wordCount, authorUrl, authorJobTitle,
}: {
  title: string; description: string; path: string; publishedAt: string; updatedAt?: string;
  authorName: string; category?: string; image?: string;
  keywords?: string[]; wordCount?: number; authorUrl?: string; authorJobTitle?: string;
}) {
  const data = {
    '@context': 'https://schema.org', '@type': 'Article', headline: title, description,
    mainEntityOfPage: absoluteUrl(path), datePublished: publishedAt, dateModified: updatedAt || publishedAt,
    articleSection: category, inLanguage: 'en', isAccessibleForFree: true,
    ...(keywords?.length ? { keywords: keywords.join(', ') } : {}),
    ...(wordCount ? { wordCount } : {}),
    author: {
      '@type': 'Person', name: authorName,
      ...(authorUrl ? { url: absoluteUrl(authorUrl) } : {}),
      ...(authorJobTitle ? { jobTitle: authorJobTitle } : {}),
      worksFor: { '@type': 'Organization', name: siteEntity.name, url: SITE_URL },
    },
    publisher: { '@type': 'Organization', name: siteEntity.name, url: SITE_URL, logo: { '@type': 'ImageObject', url: absoluteUrl('/tech-world-window-mark.png') } },
    ...(image ? { image: [absoluteUrl(image)] } : {}),
  };
  return <Head><script type="application/ld+json">{JSON.stringify(data)}</script></Head>;
}


export function ProductStructuredData({ product, path }: { product: { name: string; brand: string; description: string; sku?: string }; path: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: product.brand },
    mainEntityOfPage: absoluteUrl(path),
    ...(product.sku ? { sku: product.sku } : {}),
  };
  return <Head><script type="application/ld+json">{JSON.stringify(data)}</script></Head>;
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(item.path),
    })),
  };
  return <Head><script type="application/ld+json">{JSON.stringify(data)}</script></Head>;
}

export function FAQStructuredData({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question', name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
  return <Head><script type="application/ld+json">{JSON.stringify(data)}</script></Head>;
}
