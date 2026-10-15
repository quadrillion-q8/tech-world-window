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
  const fallbackImageId = galleryImages[0]?.id;
  const image = imageUrl || '/images/gallery/' + (assignedImageId || fallbackImageId) + '.w640.webp';

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
