import React from 'react';
import { galleryImages, type GalleryCategoryId, type GalleryImage } from '../data/gallery';

interface ArticleThumbnailProps {
  title: string;
  slug?: string;
  category?: string;
  imageUrl?: string;
}

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'best', 'by', 'can', 'common',
  'computer', 'does', 'fix', 'for', 'from', 'guide', 'how', 'in', 'is', 'it',
  'laptop', 'many', 'most', 'of', 'on', 'or', 'pc', 'problem', 'problems',
  'repair', 'solution', 'the', 'to', 'troubleshooting', 'what', 'when', 'why',
  'with', 'your', 'you', 'windows'
]);

const CATEGORY_RULES: Array<{ category: GalleryCategoryId; keywords: string[] }> = [
  { category: 'battery', keywords: ['battery', 'swollen', 'charging', 'charge', 'cmos', 'power'] },
  { category: 'thermal', keywords: ['thermal', 'paste', 'pad', 'temperature', 'overheat', 'overheating', 'hot', 'cooling'] },
  { category: 'cleaning', keywords: ['dust', 'fan', 'heatsink', 'cleaning', 'airflow', 'vent'] },
  { category: 'storage', keywords: ['ssd', 'nvme', 'storage', 'drive', 'disk', 'ram', 'memory', 'upgrade', 'hdd'] },
  { category: 'desktop', keywords: ['desktop', 'graphics', 'gpu', 'pc build', 'all-in-one', 'all in one', 'video card'] },
  { category: 'macbook', keywords: ['macbook', 'macos', 'mac os', 'apple silicon', 'logic board'] },
  { category: 'bios', keywords: ['bios', 'uefi', 'boot', 'startup', 'windows install', 'windows installation'] },
  { category: 'internals', keywords: ['motherboard', 'teardown', 'internals', 'chip', 'logic board', 'diagnostic'] },
  { category: 'other', keywords: ['hinge', 'keyboard', 'screen', 'display', 'monitor', 'cracked', 'chassis', 'lcd'] },
];

function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function meaningfulTokens(value: string): Set<string> {
  return new Set(
    value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(/\s+/)
      .filter(token => token.length > 2 && !STOP_WORDS.has(token))
  );
}

function inferGalleryCategory(text: string): GalleryCategoryId | undefined {
  const normalized = text.toLowerCase();
  let best: { category: GalleryCategoryId; score: number } | undefined;

  for (const rule of CATEGORY_RULES) {
    const score = rule.keywords.reduce((sum, keyword) => sum + (normalized.includes(keyword) ? 1 : 0), 0);
    if (!best || score > best.score) best = { category: rule.category, score };
  }

  return best && best.score > 0 ? best.category : undefined;
}

/**
 * Selects from the full gallery inventory instead of a short hard-coded list.
 * Topic/category relevance is scored first; a stable hash then rotates among
 * similarly relevant photos so adjacent articles do not all reuse one image.
 */
function resolveGalleryPhoto(title: string, slug = '', category = ''): string {
  const articleText = `${title} ${slug} ${category}`.toLowerCase();
  const articleTokens = meaningfulTokens(articleText);
  const preferredCategory = inferGalleryCategory(articleText);

  const scored = galleryImages.map((photo: GalleryImage) => {
    const imageTokens = meaningfulTokens(`${photo.title} ${photo.id.replace(/-/g, ' ')}`);
    let score = 0;
    for (const token of articleTokens) {
      if (imageTokens.has(token)) score += token.length >= 6 ? 3 : 1;
    }
    if (preferredCategory && photo.category === preferredCategory) score += 4;
    return { photo, score };
  });

  const categoryPool = preferredCategory
    ? scored.filter(item => item.photo.category === preferredCategory)
    : scored;
  const pool = categoryPool.length ? categoryPool : scored;
  const bestScore = Math.max(...pool.map(item => item.score));
  const relevantPool = pool.filter(item => item.score >= Math.max(0, bestScore - 2));

  // The article-specific seed spreads selections across ties while remaining
  // deterministic across renders and builds (no hydration or random-state issues).
  relevantPool.sort((a, b) => {
    const aHash = hashString(`${slug || title}::${a.photo.id}`);
    const bHash = hashString(`${slug || title}::${b.photo.id}`);
    return aHash - bHash;
  });

  const index = hashString(`${slug}::${title}::${category}`) % relevantPool.length;
  return relevantPool[index]?.photo.id || galleryImages[0].id;
}

export const ArticleThumbnail: React.FC<ArticleThumbnailProps> = ({
  title,
  slug,
  category,
  imageUrl,
}) => {
  const image = imageUrl || `/images/gallery/${resolveGalleryPhoto(title, slug, category)}.w640.webp`;

  return (
    <div
      className="article-thumbnail"
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        backgroundColor: '#0f172a',
        display: 'block',
      }}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        width="640"
        height="640"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
  );
};

export default ArticleThumbnail;
