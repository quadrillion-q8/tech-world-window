import React from 'react';

interface ArticleThumbnailProps {
  title: string;
  slug?: string;
  category?: string;
  imageUrl?: string;
}

/**
 * Article cards use existing editorial images when explicitly provided; otherwise,
 * choose a real photo from the site's gallery based on the article's subject.
 * These are representative repair-bench photos, not product endorsements.
 */
function resolveGalleryPhoto(title: string, slug = '', category = ''): string {
  const key = `${title} ${slug}`.toLowerCase();
  const matches: Array<[string[], string]> = [
    [['swollen battery', 'battery warning', 'battery replacement', 'laptop battery'], 'macbook-pro-retina-13-inch-swollen-battery-replacement'],
    [['ram errors', 'memory errors', 'ram upgrade', 'memory upgrade', 'ddr4', 'ddr5', 'sodimm', 'how much ram', 'high memory usage'], 'samsung-16gb-ddr4-3200-laptop-ram-sodimm-upgrade'],
    [['ssd', 'nvme', 'm.2', 'storage drive', 'hard drive'], 'hp-laptop-motherboard-heatsink-m2-ssd-closeup'],
    [['gpu', 'graphics card', 'vram', 'frame-time', 'frame time', 'shader', 'low fps', 'gaming performance'], 'zotac-gaming-geforce-rtx-triple-fan-graphics-card-repair'],
    [['overheating', 'thermal paste', 'thermal pad', 'cooling', 'fan cleaning', 'heatsink', 'hot laptop'], 'clogged-laptop-heatsink-fins-dust-removal'],
    [['blue screen', 'stop code', 'bsod', 'critical process'], 'razer-laptop-blue-screen-of-death-bsod-error'],
    [['wifi', 'wi-fi', 'network adapter', 'internet connection', 'dns', 'network reset', 'no internet'], 'wifi-wlan-card-installation-laptop-1000'],
    [['bios', 'uefi', 'boot error', 'boot drive', 'secure boot', 'windows installation', 'install windows'], 'thinkpad-laptop-installing-windows-11'],
    [['monitor', 'display', 'screen flicker', 'black screen', 'lcd', 'external screen'], 'hp-v214a-led-monitor-repair'],
    [['macbook', 'mac os', 'macos', 'apple laptop'], 'macbook-pro-16-m1-logic-board-motherboard-repair'],
    [['hinge', 'broken chassis', 'cracked lid', 'top cover'], 'broken-laptop-hinge-plastic-chassis-damage'],
    [['laptop will not turn on', 'laptop wont turn on', 'no power', 'power button', 'startup failure'], 'hp-stream-blue-laptop-top-view-diagnostics'],
    [['gaming laptop', 'gaming notebook'], 'lenovo-legion-7-16ithg6-opened-dual-fan-cooling-system-and-battery'],
    [['gaming pc', 'gaming desktop', 'desktop pc', 'custom pc', 'pc build'], 'custom-gaming-pc-teardown-and-diagnostics-workbench'],
    [['laptop', 'notebook'], 'silver-ultrabook-laptop-repair-desk'],
  ];

  for (const [keywords, id] of matches) {
    if (keywords.some(keyword => key.includes(keyword))) return id;
  }

  const cat = category.toLowerCase();
  if (cat.includes('gaming')) return 'custom-gaming-pc-teardown-and-diagnostics-workbench';
  if (cat.includes('hardware') || cat.includes('review')) return 'motherboard-repair';
  return 'windows-os-software-repair-and-installation';
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
