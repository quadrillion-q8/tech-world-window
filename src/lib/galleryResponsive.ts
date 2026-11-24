import { galleryImages, galleryImageUrl, galleryThumbUrl, GALLERY_FULL_SIZE, GALLERY_THUMB_SIZE } from '../data/gallery';
const ids = new Set(galleryImages.map(image => image.id));

export function galleryResponsive(src: string, sizes: string) {
  const id = /^\/images\/gallery\/([^/?#]+?)(?:\.w640)?\.webp$/.exec(src)?.[1];
  if (!id || !ids.has(id)) return {};
  return { srcSet: galleryThumbUrl(id) + ' ' + GALLERY_THUMB_SIZE + 'w, ' + galleryImageUrl(id) + ' ' + GALLERY_FULL_SIZE + 'w', sizes, width: GALLERY_FULL_SIZE, height: GALLERY_FULL_SIZE };
}
