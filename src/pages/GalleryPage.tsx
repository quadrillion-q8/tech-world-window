import { useCallback, useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { SEOEngine, BreadcrumbStructuredData } from '../seo/SEOEngine';
import { SITE_NAME, SITE_URL } from '../data/graph';
import {
  GALLERY_FULL_SIZE,
  GALLERY_THUMB_SIZE,
  galleryCategories,
  galleryImages,
  galleryImageUrl,
  galleryThumbUrl,
} from '../data/gallery';

export const GALLERY_PATH = '/gallery';
export const GALLERY_TITLE = 'Repair Bench Photo Gallery';
export const GALLERY_DESCRIPTION = 'Photos from real laptop and PC repair work: fan and heatsink cleaning, thermal paste, SSD and RAM upgrades, batteries, BIOS screens, MacBooks and desktops.';

const absolute = (path: string) => new URL(path, SITE_URL).toString();
const safeJson = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

export function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);
  const close = useCallback(() => setActive(null), []);
  const step = useCallback((delta: number) => {
    setActive(current => (current === null ? current : (current + delta + galleryImages.length) % galleryImages.length));
  }, []);

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active, close, step]);

  const open = (index: number) => (event: MouseEvent<HTMLAnchorElement>) => {
    // Keep modified clicks (new tab, etc.) working; the href is the full-size image.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    setActive(index);
  };

  const current = active === null ? null : galleryImages[active];
  const indexById = new Map(galleryImages.map((image, index) => [image.id, index]));

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${GALLERY_TITLE} | ${SITE_NAME}`,
    description: GALLERY_DESCRIPTION,
    url: absolute(GALLERY_PATH),
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
    image: galleryImages.map(image => ({
      '@type': 'ImageObject',
      name: image.title,
      contentUrl: absolute(galleryImageUrl(image.id)),
      thumbnailUrl: absolute(galleryThumbUrl(image.id)),
      width: GALLERY_FULL_SIZE,
      height: GALLERY_FULL_SIZE,
      encodingFormat: 'image/webp',
    })),
  };

  return (
    <section className="section gallery-page">
      <SEOEngine title={GALLERY_TITLE} description={GALLERY_DESCRIPTION} path={GALLERY_PATH} />
      <BreadcrumbStructuredData items={[
        { name: 'Home', path: '/' },
        { name: GALLERY_TITLE, path: GALLERY_PATH },
      ]} />
      <Head><script type="application/ld+json">{safeJson(schema)}</script></Head>
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{GALLERY_TITLE}</span></div>
      <span className="eyebrow">TECH WORLD WINDOW</span>
      <h1>{GALLERY_TITLE}</h1>
      <p className="page-intro">
        {galleryImages.length} photos from hands-on laptop and PC repair work. They show what dust, dried thermal paste, worn parts and failing hardware actually look like, which is the evidence behind many of the diagnostic steps in our <Link className="inline-link" to="/guides">guides</Link> and <Link className="inline-link" to="/hardware">hardware articles</Link>.
      </p>
      <p className="gallery-note">
        Brand and model names only identify the hardware shown. They do not imply endorsement or any affiliation with the manufacturers. Select a photo to enlarge it.
      </p>

      <nav className="gallery-jump" aria-label="Gallery categories">
        {galleryCategories.map(category => {
          const count = galleryImages.filter(image => image.category === category.id).length;
          return <a key={category.id} href={`#${category.id}`}>{category.name} <span>{count}</span></a>;
        })}
      </nav>

      {galleryCategories.map(category => {
        const images = galleryImages.filter(image => image.category === category.id);
        return (
          <section key={category.id} id={category.id} className="gallery-section" aria-labelledby={`${category.id}-heading`}>
            <h2 id={`${category.id}-heading`}>{category.name}</h2>
            <p>{category.description}</p>
            <ul className="gallery-grid">
              {images.map(image => (
                <li key={image.id}>
                  <figure>
                    <a href={galleryImageUrl(image.id)} onClick={open(indexById.get(image.id) ?? 0)} aria-label={`Enlarge photo: ${image.title}`}>
                      <img
                        src={galleryThumbUrl(image.id)}
                        width={GALLERY_THUMB_SIZE}
                        height={GALLERY_THUMB_SIZE}
                        alt={image.title}
                        loading="lazy"
                        decoding="async"
                      />
                    </a>
                    <figcaption>{image.title}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <div className="gallery-footer-links">
        <Link className="text-link" to="/testing">How TWW tests and documents hardware →</Link>
        <Link className="text-link" to="/">Return to the homepage →</Link>
      </div>

      {current && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={current.title} onClick={close}>
          <div className="gallery-lightbox-inner" onClick={event => event.stopPropagation()}>
            <img src={galleryImageUrl(current.id)} width={GALLERY_FULL_SIZE} height={GALLERY_FULL_SIZE} alt={current.title} />
            <p>{current.title} <span>({(active ?? 0) + 1} of {galleryImages.length})</span></p>
          </div>
          <button type="button" className="gallery-lightbox-close" onClick={event => { event.stopPropagation(); close(); }} aria-label="Close photo">×</button>
          <button type="button" className="gallery-lightbox-prev" onClick={event => { event.stopPropagation(); step(-1); }} aria-label="Previous photo">‹</button>
          <button type="button" className="gallery-lightbox-next" onClick={event => { event.stopPropagation(); step(1); }} aria-label="Next photo">›</button>
        </div>
      )}
    </section>
  );
}
