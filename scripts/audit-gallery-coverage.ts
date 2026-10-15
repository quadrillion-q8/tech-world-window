import { mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { articles } from '../src/data/articles';
import { articleThumbnailImageBySlug, galleryPhotoIdFromUrl } from '../src/data/article-thumbnail-map';
import { staticPageFigures } from '../src/data/article-images';
import { galleryImages } from '../src/data/gallery';

const galleryDirectory = resolve('public/images/gallery');
const physicalFiles = new Set(readdirSync(galleryDirectory));
const manifestIds = new Set(galleryImages.map(photo => photo.id));
const thumbnailIdsOnDisk = new Set(
  [...physicalFiles]
    .filter(file => file.endsWith('.w640.webp'))
    .map(file => file.slice(0, -'.w640.webp'.length))
);
const fullSizeIdsOnDisk = new Set(
  [...physicalFiles]
    .filter(file => file.endsWith('.webp') && !file.endsWith('.w640.webp'))
    .map(file => file.slice(0, -'.webp'.length))
);

const missingThumbnailAssets = galleryImages
  .filter(photo => !thumbnailIdsOnDisk.has(photo.id))
  .map(photo => photo.id);
const missingFullSizeAssets = galleryImages
  .filter(photo => !fullSizeIdsOnDisk.has(photo.id))
  .map(photo => photo.id);
const unlistedPhysicalIds = [...thumbnailIdsOnDisk].filter(id => !manifestIds.has(id)).sort();

const automaticEntries = Object.entries(articleThumbnailImageBySlug);
const automaticIds = automaticEntries.map(([, id]) => id);
const automaticIdCounts = new Map<string, number>();
for (const id of automaticIds) automaticIdCounts.set(id, (automaticIdCounts.get(id) ?? 0) + 1);
const duplicateAutomaticAssignments = [...automaticIdCounts.entries()]
  .filter(([, count]) => count > 1)
  .map(([id, count]) => ({ id, count }));

const missingArticleAssignments = articles
  .filter(article => !article.heroImage && !articleThumbnailImageBySlug[article.slug])
  .map(article => article.slug);

const heroImageIds = articles
  .map(article => galleryPhotoIdFromUrl(article.heroImage))
  .filter((id): id is string => Boolean(id && manifestIds.has(id)));
const articleBodyImageIds = articles.flatMap(article =>
  article.content
    .map(section => galleryPhotoIdFromUrl(section.image?.src))
    .filter((id): id is string => Boolean(id && manifestIds.has(id)))
);
const staticImageIds = Object.values(staticPageFigures)
  .flat()
  .map(figure => figure.id)
  .filter(id => manifestIds.has(id));

const contextualImageIds = new Set([
  ...automaticIds,
  ...heroImageIds,
  ...articleBodyImageIds,
  ...staticImageIds,
]);
const notContextuallyAssigned = galleryImages
  .filter(photo => !contextualImageIds.has(photo.id))
  .map(photo => photo.id)
  .sort();

const report = {
  generatedAt: new Date().toISOString(),
  inventory: {
    manifestImageCount: galleryImages.length,
    uniqueManifestIds: manifestIds.size,
    physicalThumbnailAssetCount: thumbnailIdsOnDisk.size,
    physicalFullSizeAssetCount: fullSizeIdsOnDisk.size,
    unlistedPhysicalIds,
    missingThumbnailAssets,
    missingFullSizeAssets,
  },
  articleThumbnails: {
    articleCount: articles.length,
    explicitHeroImages: articles.filter(article => Boolean(article.heroImage)).length,
    automaticAssignments: automaticEntries.length,
    uniqueAutomaticPhotos: new Set(automaticIds).size,
    duplicateAutomaticAssignments,
    missingArticleAssignments,
  },
  contextualUse: {
    articleBodyImagePlacements: articleBodyImageIds.length,
    uniqueArticleBodyPhotos: new Set(articleBodyImageIds).size,
    staticPageFigures: staticImageIds.length,
    uniquePhotosUsedOutsideGalleryPage: contextualImageIds.size,
    notContextuallyAssignedCount: notContextuallyAssigned.length,
    notContextuallyAssigned,
  },
};

const reportPath = resolve('reports/gallery-coverage.json');
mkdirSync(resolve('reports'), { recursive: true });
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n', 'utf8');

console.log('Gallery image coverage audit');
console.log('----------------------------');
console.log('Gallery manifest images: ' + report.inventory.manifestImageCount);
console.log('Article records: ' + report.articleThumbnails.articleCount);
console.log('Automatic thumbnail assignments: ' + report.articleThumbnails.automaticAssignments);
console.log('Unique automatic thumbnail photos: ' + report.articleThumbnails.uniqueAutomaticPhotos);
console.log('Unique article-body photos: ' + report.contextualUse.uniqueArticleBodyPhotos);
console.log('Static-page figures: ' + report.contextualUse.staticPageFigures);
console.log('Unique gallery photos assigned outside /gallery: ' + report.contextualUse.uniquePhotosUsedOutsideGalleryPage);
console.log('Photos not assigned outside /gallery: ' + report.contextualUse.notContextuallyAssignedCount);
console.log('Full report: reports/gallery-coverage.json');

if (
  report.inventory.uniqueManifestIds !== report.inventory.manifestImageCount ||
  missingThumbnailAssets.length ||
  missingFullSizeAssets.length ||
  unlistedPhysicalIds.length ||
  missingArticleAssignments.length ||
  duplicateAutomaticAssignments.length
) {
  console.error(JSON.stringify({
    missingThumbnailAssets,
    missingFullSizeAssets,
    unlistedPhysicalIds,
    missingArticleAssignments,
    duplicateAutomaticAssignments,
  }, null, 2));
  process.exitCode = 1;
}
