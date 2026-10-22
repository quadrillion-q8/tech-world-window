import React from 'react';
import { articleThumbnailImageBySlug } from '../data/article-thumbnail-map';
import { galleryImages } from '../data/gallery';

interface ArticleThumbnailProps {
  title: string;
  slug?: string;
  category?: string;
  imageUrl?: string;
}

export const ArticleThumbnail: React.FC<ArticleThumbnailProps> = ({
  title,
  slug,
  imageUrl,
}) => {
  // Every article in the editorial data has a site-wide unique assignment.
  // The stable fallback only covers components rendered without a known slug.
  const assignedImageId = slug ? articleThumbnailImageBySlug[slug] : undefined;
  const imageIdFromUrl = imageUrl?.includes('/images/gallery/')
    ? imageUrl.split('/images/gallery/')[1]?.split(/[?#]/)[0]?.replace('.w640', '').split('.webp')[0]
    : undefined;
  const fallbackImageId = galleryImages[0]?.id;
  const displayedImageId = imageIdFromUrl || assignedImageId || fallbackImageId;
  const displayedGalleryImage = galleryImages.find(item => item.id === displayedImageId);
  const image = imageUrl || '/images/gallery/' + (assignedImageId || fallbackImageId) + '.w640.webp';
  const imageAlt = displayedGalleryImage?.title || title;

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
        alt={imageAlt}
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
