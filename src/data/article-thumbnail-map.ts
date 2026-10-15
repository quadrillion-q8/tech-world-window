import { articles } from './articles';
import { staticPageFigures } from './article-images';
import { galleryImages, type GalleryCategoryId, type GalleryImage } from './gallery';

const STOP_WORDS = new Set([
  'a', 'about', 'after', 'all', 'also', 'an', 'and', 'are', 'as', 'at', 'be',
  'before', 'best', 'between', 'by', 'can', 'common', 'computer', 'could',
  'does', 'each', 'for', 'from', 'get', 'guide', 'how', 'in', 'into', 'is',
  'it', 'its', 'just', 'make', 'many', 'more', 'most', 'new', 'not', 'of',
  'on', 'one', 'or', 'our', 'pc', 'problem', 'problems', 'repair', 'right',
  'safe', 'should', 'solution', 'step', 'steps', 'the', 'their', 'this',
  'through', 'to', 'use', 'using', 'what', 'when', 'where', 'which', 'while',
  'why', 'with', 'windows', 'your'
]);

const CATEGORY_RULES: Array<{ category: GalleryCategoryId; keywords: string[] }> = [
  { category: 'battery', keywords: ['battery', 'swollen battery', 'charging', 'charge', 'cmos', 'power'] },
  { category: 'thermal', keywords: ['thermal', 'paste', 'thermal pad', 'temperature', 'overheat', 'overheating', 'cooling', 'cpu temperature', 'gpu temperature'] },
  { category: 'cleaning', keywords: ['dust', 'fan', 'heatsink', 'cleaning', 'airflow', 'vent', 'blocked fins'] },
  { category: 'storage', keywords: ['ssd', 'nvme', 'storage', 'drive', 'disk', 'ram', 'memory', 'upgrade', 'hdd', 'm.2'] },
  { category: 'desktop', keywords: ['desktop', 'graphics', 'gpu', 'pc build', 'all-in-one', 'all in one', 'video card', 'gaming', 'game stutter', 'stuttering', 'fps', 'frame time', 'frame-time'] },
  { category: 'macbook', keywords: ['macbook', 'macos', 'mac os', 'apple silicon', 'logic board'] },
  { category: 'bios', keywords: ['bios', 'uefi', 'boot', 'startup', 'windows install', 'windows installation', 'boot error', 'secure boot', 'blue screen'] },
  { category: 'internals', keywords: ['motherboard', 'teardown', 'internals', 'chip', 'logic board', 'diagnostic', 'network adapter', 'wifi', 'wi-fi', 'wireless', 'ethernet', 'dns', 'internet', 'networking'] },
  { category: 'other', keywords: ['hinge', 'keyboard', 'screen', 'display', 'monitor', 'cracked', 'chassis', 'lcd'] },
];

const FALLBACK_CATEGORY: Record<string, GalleryCategoryId> = {
  Gaming: 'desktop',
  Hardware: 'internals',
  Windows: 'bios',
  Guides: 'internals',
  News: 'desktop',
  Reviews: 'desktop',
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\bwi[\s-]*fi\b/g, 'wifi')
    .replace(/\bm\.?\s*2\b/g, 'm2')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function meaningfulTokens(value: string): Set<string> {
  return new Set(
    normalize(value)
      .split(/\s+/)
      .filter(token => (token.length >= 3 || token === 'm2') && !STOP_WORDS.has(token))
  );
}

function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function inferGalleryCategory(text: string): GalleryCategoryId | undefined {
  const paddedText = ' ' + normalize(text) + ' ';
  let best: { category: GalleryCategoryId; score: number } | undefined;

  for (const rule of CATEGORY_RULES) {
    let score = 0;
    for (const keyword of rule.keywords) {
      const normalizedKeyword = normalize(keyword);
      if (paddedText.includes(' ' + normalizedKeyword + ' ')) {
        score += normalizedKeyword.includes(' ') ? 2 : 1;
      }
    }
    if (!best || score > best.score) best = { category: rule.category, score };
  }

  return best && best.score > 0 ? best.category : undefined;
}

export function galleryPhotoIdFromUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return url.match(/\/images\/gallery\/([^/?#]+?)(?:\.w640)?\.webp(?:[?#].*)?$/i)?.[1];
}

function getArticleText(article: (typeof articles)[number]): string {
  return [
    article.title,
    article.slug.replace(/[/-]+/g, ' '),
    article.category,
    article.subcategory ?? '',
    article.dek,
    article.excerpt,
    ...(article.tags ?? []),
  ].join(' ');
}

function getPhotoScore(
  article: (typeof articles)[number],
  photo: GalleryImage,
  preferredCategory: GalleryCategoryId | undefined,
  fallbackCategory: GalleryCategoryId | undefined
): number {
  const primaryTokens = meaningfulTokens(article.title + ' ' + article.slug.replace(/[/-]+/g, ' '));
  const supportingTokens = meaningfulTokens([
    article.dek,
    article.excerpt,
    article.subcategory ?? '',
    ...(article.tags ?? []),
  ].join(' '));
  const photoTokens = meaningfulTokens(photo.title + ' ' + photo.id.replace(/-/g, ' '));

  let score = 0;
  for (const token of primaryTokens) {
    if (photoTokens.has(token)) score += token.length >= 6 ? 5 : 3;
  }
  for (const token of supportingTokens) {
    if (!primaryTokens.has(token) && photoTokens.has(token)) {
      score += token.length >= 6 ? 2 : 1;
    }
  }

  if (preferredCategory && photo.category === preferredCategory) score += 8;
  else if (!preferredCategory && fallbackCategory && photo.category === fallbackCategory) score += 2;

  return score;
}

/**
 * Maximum-weight, one-photo-per-article assignment.
 *
 * A global assignment is important here: independent thumbnail components can
 * all choose the same "best" photo. This assigns distinct photos across article
 * cards while reserving gallery images already used as curated article-body or
 * static-page figures. Keyword matching uses whole tokens/phrases so "ram"
 * never matches the middle of "frame".
 */
function minimumCostAssignment(costs: number[][]): number[] {
  const rowCount = costs.length;
  const columnCount = costs[0]?.length ?? 0;
  if (!rowCount || !columnCount) return [];

  // The Hungarian algorithm requires no more rows than columns.
  if (rowCount > columnCount) {
    throw new Error('Gallery thumbnail assignment has fewer available images than articles.');
  }

  const u = new Array<number>(rowCount + 1).fill(0);
  const v = new Array<number>(columnCount + 1).fill(0);
  const p = new Array<number>(columnCount + 1).fill(0);
  const way = new Array<number>(columnCount + 1).fill(0);

  for (let i = 1; i <= rowCount; i += 1) {
    p[0] = i;
    let j0 = 0;
    const minv = new Array<number>(columnCount + 1).fill(Number.POSITIVE_INFINITY);
    const used = new Array<boolean>(columnCount + 1).fill(false);

    do {
      used[j0] = true;
      const i0 = p[j0];
      let delta = Number.POSITIVE_INFINITY;
      let j1 = 0;

      for (let j = 1; j <= columnCount; j += 1) {
        if (used[j]) continue;
        const current = costs[i0 - 1][j - 1] - u[i0] - v[j];
        if (current < minv[j]) {
          minv[j] = current;
          way[j] = j0;
        }
        if (minv[j] < delta) {
          delta = minv[j];
          j1 = j;
        }
      }

      for (let j = 0; j <= columnCount; j += 1) {
        if (used[j]) {
          u[p[j]] += delta;
          v[j] -= delta;
        } else {
          minv[j] -= delta;
        }
      }
      j0 = j1;
    } while (p[j0] !== 0);

    do {
      const j1 = way[j0];
      p[j0] = p[j1];
      j0 = j1;
    } while (j0 !== 0);
  }

  const assignment = new Array<number>(rowCount).fill(-1);
  for (let j = 1; j <= columnCount; j += 1) {
    if (p[j] > 0) assignment[p[j] - 1] = j - 1;
  }
  return assignment;
}

function buildThumbnailAssignments(): Record<string, string> {
  const knownIds = new Set(galleryImages.map(photo => photo.id));
  const reservedIds = new Set<string>();

  // Do not reuse photos that are already explicitly assigned to article content.
  for (const article of articles) {
    const heroId = galleryPhotoIdFromUrl(article.heroImage);
    if (heroId && knownIds.has(heroId)) reservedIds.add(heroId);

    for (const section of article.content) {
      const sectionId = galleryPhotoIdFromUrl(section.image?.src);
      if (sectionId && knownIds.has(sectionId)) reservedIds.add(sectionId);
    }
  }

  for (const figures of Object.values(staticPageFigures)) {
    for (const figure of figures) {
      if (knownIds.has(figure.id)) reservedIds.add(figure.id);
    }
  }

  const autoArticles = articles
    .filter(article => !article.heroImage)
    .slice()
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const availablePhotos = galleryImages.filter(photo => !reservedIds.has(photo.id));
  if (autoArticles.length > availablePhotos.length) {
    throw new Error(
      'The gallery has fewer unreserved images than article thumbnails. Add images or review explicit image reuse.'
    );
  }

  const scoredPairs = autoArticles.map(article => {
    const text = getArticleText(article);
    const preferred = inferGalleryCategory(text);
    const fallback = FALLBACK_CATEGORY[article.category];
    return availablePhotos.map(photo => getPhotoScore(article, photo, preferred, fallback));
  });

  let maxScore = 0;
  for (const row of scoredPairs) {
    for (const score of row) if (score > maxScore) maxScore = score;
  }

  // Keep score differences more important than every combined tie-breaker.
  const scoreUnit = autoArticles.length * 1000 + 1;
  const costs = scoredPairs.map((row, rowIndex) =>
    row.map((score, columnIndex) => {
      const tie = hashString(autoArticles[rowIndex].slug + '::' + availablePhotos[columnIndex].id) % 1000;
      return (maxScore - score) * scoreUnit + tie;
    })
  );

  const chosenColumns = minimumCostAssignment(costs);
  const assignments: Record<string, string> = {};
  chosenColumns.forEach((photoIndex, articleIndex) => {
    if (photoIndex >= 0) assignments[autoArticles[articleIndex].slug] = availablePhotos[photoIndex].id;
  });
  return assignments;
}

export const articleThumbnailImageBySlug = buildThumbnailAssignments();
