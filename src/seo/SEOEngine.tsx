import { Head } from 'vite-react-ssg';
import { fitTitle } from './title';
import { canonicalForPath, isIndexablePath, robotsForPath, INDEX_ROBOTS } from './indexingPolicy';
import { SITE_NAME, SITE_URL } from '../data/graph';
import { getSeoData, DEFAULT_OG_IMAGE } from './ssgSeo';

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

export function SEOEngine(props: SEOProps) {
  const { path, robots = INDEX_ROBOTS } = props;
  const indexable = isIndexablePath(path);
  const seo = indexable ? getSeoData(path) : {
    title: fitTitle(props.title), description: props.description, canonical: canonicalForPath(path),
    type: props.type || 'website', image: props.image, publishedAt: props.publishedAt, updatedAt: props.updatedAt,
    imageWidth: undefined, imageHeight: undefined,
  };
  const imageUrl = new URL(seo.image || DEFAULT_OG_IMAGE, SITE_URL).href;
  return (
    <Head>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="robots" content={robotsForPath(path, robots)} />
      {indexable && <link rel="canonical" href={seo.canonical} />}
      <meta property="og:type" content={seo.type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:image" content={imageUrl} />
      {seo.imageWidth && seo.imageHeight ? <meta property="og:image:width" content={String(seo.imageWidth)} /> : null}
      {seo.imageWidth && seo.imageHeight ? <meta property="og:image:height" content={String(seo.imageHeight)} /> : null}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={imageUrl} />
      {seo.publishedAt && <meta property="article:published_time" content={seo.publishedAt} />}
      {seo.updatedAt && <meta property="article:modified_time" content={seo.updatedAt} />}
    </Head>
  );
}
