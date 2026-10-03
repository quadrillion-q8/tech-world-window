import { Head } from 'vite-react-ssg';
import { SITE_URL } from '../data/graph';

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

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function SEOEngine({
  title,
  description,
  path,
  type = 'website',
  publishedAt,
  updatedAt,
  image,
  robots = 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
}: SEOProps) {
  const canonical = absoluteUrl(path);
  const fullTitle = title.includes('Tech World Window') ? title : `${title} | Tech World Window`;
  const imageUrl = image ? absoluteUrl(image) : undefined;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Tech World Window" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {publishedAt && <meta property="article:published_time" content={publishedAt} />}
      {updatedAt && <meta property="article:modified_time" content={updatedAt} />}
    </Head>
  );
}

export function ArticleStructuredData({
  title,
  description,
  path,
  publishedAt,
  updatedAt,
  authorName,
}: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
  authorName: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    mainEntityOfPage: absoluteUrl(path),
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: { '@type': 'Person', name: authorName },
    publisher: { '@type': 'Organization', name: 'Tech World Window', url: SITE_URL },
  };
  return <Head><script type="application/ld+json">{JSON.stringify(data)}</script></Head>;
}

export function BreadcrumbStructuredData({ items }: { items: { name: string; path: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
  return <Head><script type="application/ld+json">{JSON.stringify(data)}</script></Head>;
}
