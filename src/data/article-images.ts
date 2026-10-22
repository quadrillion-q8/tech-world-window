import type { Article } from './articles';
import { GALLERY_BASE_PATH, galleryImages } from './gallery';

/**
 * Places real repair-bench photos from /gallery inside the articles they illustrate.
 * Each placement attaches one image to the section whose heading matches `after`
 * (ArticlePage renders it right after that section's paragraphs).
 * Captions describe only what the photo shows; they never imply a product endorsement.
 * No new URLs are created by this file.
 */
type Placement = { after: string; id: string; alt: string; caption: string };

const bench = 'Photo from the TWW repair bench';

export const articleImagePlacements: Record<string, Placement[]> = {
  'laptop-wont-turn-on': [
    { after: 'Try these low-risk checks first', id: 'panasonic-cr2032-cmos-battery-replacement-laptop-motherboard', alt: 'Panasonic CR2032 CMOS battery being replaced on a laptop motherboard', caption: `${bench}: a CR2032 CMOS cell on a laptop motherboard. Not every laptop has a user-replaceable one, so check the service manual first.` },
    { after: 'When the symptoms suggest a deeper fault', id: 'dell-vostro-laptop-open-chassis-motherboard-removed', alt: 'Dell Vostro laptop with the chassis open and the motherboard removed', caption: `${bench}: a laptop with the motherboard removed for board-level inspection.` },
    { after: 'What to record before arranging a repair', id: 'hp-stream-blue-laptop-top-view-diagnostics', alt: 'HP Stream laptop on the bench during diagnostics', caption: `${bench}: a laptop on the bench during diagnosis. Notes on what the screen, LEDs and fans do help a technician.` },
  ],
  'laptop-battery-warning-signs': [
    { after: 'Urgent warning signs: stop using and charging the laptop', id: 'macbook-pro-retina-13-inch-swollen-battery-replacement', alt: 'MacBook Pro Retina 13-inch opened for a swollen battery replacement', caption: `${bench}: a MacBook Pro opened for a swollen-battery replacement. A swollen pack should be treated as a safety problem, not a performance one.` },
    { after: 'Check battery health without opening the pack', id: 'dell-grnx5-battery-label-14-8v-80wh-0v9tyf', alt: 'Dell GRNX5 laptop battery label showing 14.8V and 80Wh', caption: `${bench}: a battery label showing voltage, capacity and part number, useful when you ask for a matching replacement.` },
    { after: 'Why you should not attempt a risky DIY removal', id: 'dell-gaming-laptop-back-cover-removed-97wh-battery', alt: 'Dell gaming laptop with the back cover removed showing a 97Wh battery', caption: `${bench}: the battery sits under the bottom cover and is connected to the motherboard. Disconnect and handle it per the model's service manual.` },
  ],
  'why-8gb-ram-is-no-longer-enough-for-windows-11': [
    { after: 'When 16GB is a sensible upgrade', id: 'samsung-16gb-ddr4-3200-laptop-ram-sodimm-upgrade', alt: 'Samsung 16GB DDR4-3200 laptop SODIMM memory module', caption: `${bench}: a 16GB DDR4 SODIMM used for a laptop upgrade. Confirm your laptop's memory type and slots first.` },
  ],
  'ssd-nearly-full-windows-performance': [
    { after: 'When a larger SSD is the better solution', id: 'dell-laptop-hdd-replaced-with-crucial-bx500-240gb-ssd-upgrade', alt: 'Dell laptop with the old hard drive replaced by a Crucial BX500 240GB SSD', caption: `${bench}: a laptop hard drive replaced with a 240GB SATA SSD.` },
  ],
  'laptop-nvme-ssd-upgrade-compatibility': [
    { after: 'Check length and physical clearance', id: 'wd-sn740-512gb-nvme-m2-ssd-installed-hp-all-in-one', alt: 'WD SN740 512GB NVMe M.2 SSD installed in an HP all-in-one PC', caption: `${bench}: an M.2 2230 NVMe SSD installed in its slot. Length and mounting position vary by model.` },
  ],
  'gaming-laptop-upgradeable-ram-ssd': [
    { after: 'SSD: check bays and interfaces', id: 'asus-rog-strix-g15-g513r-opened-dual-fan-cooling-system-ram-and-ssd', alt: 'ASUS ROG Strix G15 opened showing dual-fan cooling, RAM and SSD', caption: `${bench}: an opened gaming laptop with the RAM and SSD visible. Layout differs by model.` },
    { after: 'Battery safety before opening the chassis', id: 'asus-rog-zephyrus-g16-gu605-opened-90wh-battery-triple-fan-cooling', alt: 'ASUS ROG Zephyrus G16 opened showing the 90Wh battery and triple-fan cooling', caption: `${bench}: the battery takes up much of the chassis. Disconnect it before touching other components.` },
    { after: 'Use the full model number and service manual—not the laptop family name', id: 'lenovo-legion-7-16ithg6-model-label-and-air-vents', alt: 'Lenovo Legion 7 16ITHG6 model label and air vents', caption: `${bench}: the full model label on the underside is what identifies the right service manual and parts.` },
  ],
  'gpu-overheating-gaming-pc-causes-fix': [
    { after: 'What makes a GPU run hot', id: 'graphics-card-gpu-die-old-thermal-paste-and-green-thermal-pads', alt: 'Graphics card GPU die with old thermal paste and green thermal pads', caption: `${bench}: an opened graphics card showing aged paste on the GPU die and thermal pads on the memory.` },
    { after: 'Improve airflow safely', id: 'graphics-card-disassembled-heatsink-gpu-old-thermal-paste-and-dusty-fans', alt: 'Disassembled graphics card with a dusty heatsink and fans', caption: `${bench}: dust on the fans and heatsink of a graphics card.` },
    { after: 'When the GPU itself may need service', id: 'zotac-gaming-geforce-rtx-triple-fan-graphics-card-repair', alt: 'Zotac GeForce RTX triple-fan graphics card on the repair bench', caption: `${bench}: a triple-fan graphics card during service.` },
  ],
  'how-much-ram-do-you-need-gaming': [
    { after: 'Compatibility is part of the upgrade', id: 'dell-inspiron-n4030-laptop-ram-slot-and-ssd-upgrade', alt: 'Dell Inspiron laptop RAM slot and SSD upgrade area', caption: `${bench}: a laptop memory slot. Many laptops have one or two slots, and some have memory soldered to the board.` },
  ],
  'gpu-100-percent-usage-gaming': [
    { after: 'When high usage needs investigation', id: 'graphics-card-gpu-die-old-thermal-paste-and-green-thermal-pads', alt: 'Graphics card GPU die with old thermal paste and green thermal pads', caption: `${bench}: a GPU die with aged thermal paste. Rising temperature with falling clocks, not the utilization percentage, is what points to a cooling problem.` },
  ],
  'ddr4-vs-ddr5-ram-difference': [
    { after: 'DDR4 and DDR5 are different generations', id: 'thermaltake-ddr4-3600-16gb-ram-kit-2x8gb', alt: 'Thermaltake DDR4-3600 16GB RAM kit of two 8GB modules', caption: `${bench}: a DDR4-3600 2x8GB kit. DDR4 and DDR5 modules are not interchangeable.` },
    { after: 'Upgrade path matters', id: 'asus-rog-strix-z790-a-i9-14900k-64gb-ddr5-bios', alt: 'ASUS ROG Strix Z790-A BIOS showing Core i9-14900K and 64GB DDR5', caption: `${bench}: a BIOS screen showing a DDR5 platform with 64GB installed. The motherboard decides which memory generation you can use.` },
  ],
  'how-to-check-ssd-health-windows': [
    { after: 'When to back up and replace', id: 'macbook-air-sandisk-256gb-ssd-replacement', alt: 'MacBook Air SanDisk 256GB SSD replacement', caption: `${bench}: an SSD replacement on a MacBook Air. Back up first; Apple SSD compatibility is model-specific.` },
  ],
  'why-ssd-is-slowing-down-windows': [
    { after: 'When it is the drive', id: 'dell-laptop-windows-11-running-after-repair-old-hard-drive-removed', alt: 'Dell laptop running Windows 11 after the old hard drive was removed', caption: `${bench}: a laptop running Windows 11 after a drive swap.` },
  ],
  'how-to-check-ram-for-errors-windows': [
    { after: 'If errors appear: find the faulty module', id: 'hp-desktop-pc-cpu-cooler-fan-and-ram-slots-inside-view', alt: 'Inside an HP desktop PC showing the CPU cooler and RAM slots', caption: `${bench}: RAM slots next to the CPU cooler. Test one module at a time and one slot at a time to find the faulty part.` },
  ],
  'windows-11-blue-screen-stop-code-how-to-read': [
    { after: 'When to suspect hardware', id: 'dell-desktop-pc-repair-open-case-booting', alt: 'Dell desktop PC with the case open and booting on the bench', caption: `${bench}: a desktop booted with the case open to test components one at a time.` },
  ],
  'windows-11-freezing-randomly-causes-fix': [
    { after: 'Step 4: temperatures and power', id: 'laptop-heatsink-fins-clogged-with-dust-overheating', alt: 'Laptop heatsink fins clogged with dust', caption: `${bench}: heatsink fins blocked by dust. Airflow restriction is one possible cause of heat-related freezes.` },
  ],
  'gpu-frame-time-spikes-causes-fix': [
    { after: 'Thermals and power', id: 'zotac-gaming-geforce-rtx-graphics-card-side-view', alt: 'Zotac GeForce RTX graphics card side view', caption: `${bench}: a graphics card cooler. Check temperature and clock speed together when frame times spike.` },
  ],
  'pc-game-stuttering-fix-frame-time': [
    { after: 'Thermals, power, and laptops', id: 'laptop-overheating-repair-dusty-heatsink-fins', alt: 'Laptop heatsink fins covered in dust during an overheating repair', caption: `${bench}: dusty heatsink fins on a laptop. Heat and power limits can show up as stutter during longer sessions.` },
  ],
  'pc-game-low-fps-how-to-find-the-cause': [
    { after: 'Check thermals and power behavior', id: 'dell-gaming-laptop-dust-buildup-on-fan-blades', alt: 'Dell gaming laptop fan blades with dust buildup', caption: `${bench}: dust on the fan blades of a gaming laptop.` },
  ],
  'pc-games-crashing-to-desktop-troubleshooting': [
    { after: 'Test system stability', id: 'dell-gaming-laptop-dusty-cooling-fan-before-cleaning', alt: 'Dusty cooling fan in a Dell gaming laptop before cleaning', caption: `${bench}: a dusty cooling fan before cleaning. Overheating can contribute to instability under load.` },
  ],
  'windows-11-slow-startup-fix': [
    { after: 'Check the storage path', id: 'hp-desktop-pc-opened-motherboard-psu-ssd-and-hard-drive', alt: 'Opened HP desktop PC showing the motherboard, power supply, SSD and hard drive', caption: `${bench}: a desktop with both an SSD and a hard drive. Which drive holds Windows affects startup time.` },
  ],
  'windows-11-disk-100-percent-usage': [
    { after: 'When an HDD behaves differently from an SSD', id: 'hp-desktop-pc-sata-cables-wd-green-240gb-ssd-and-hard-drive', alt: 'HP desktop PC with SATA cables, a WD Green 240GB SSD and a hard drive', caption: `${bench}: a SATA SSD beside a mechanical hard drive. Hard drives are far more likely to sit at 100% active time under load.` },
  ],
  'windows-11-high-memory-usage-how-to-find-the-cause': [
    { after: 'Step 5: check installed, usable, and hardware-reserved RAM', id: 'hp-stream-celeron-n3050-2gb-ram-windows-10-system-info', alt: 'HP Stream system information screen showing Celeron N3050 and 2GB of RAM', caption: `${bench}: the System information screen, where installed and usable RAM are shown.` },
  ],
  'windows-11-wont-start-troubleshooting': [
    { after: 'Check firmware (BIOS/UEFI)', id: 'hp-all-in-one-24-cb1xxx-bios-setup-core-i5-1235u', alt: 'HP All-in-One BIOS setup screen with Core i5-1235U', caption: `${bench}: a BIOS setup screen, where you can confirm the drive and boot order.` },
    { after: 'Boot drive not found or boot error codes', id: 'hp-all-in-one-bios-no-disks-connected-intel-rst-vmd-error', alt: 'HP All-in-One BIOS showing no disks connected because of an Intel RST VMD setting', caption: `${bench}: a BIOS showing no disks connected. On some systems an Intel RST/VMD setting hides the drive from the installer.` },
    { after: 'Common boot error codes', id: 'msi-laptop-secure-boot-violation-invalid-signature-fix', alt: 'MSI laptop secure boot violation invalid signature error screen', caption: `${bench}: a Secure Boot violation screen on an MSI laptop.` },
    { after: 'When the laptop itself will not power on', id: 'dell-vostro-laptop-motherboard-repair-disassembled', alt: 'Dell Vostro laptop disassembled for motherboard repair', caption: `${bench}: a laptop disassembled for motherboard-level repair.` },
  ],
  'windows-troubleshooting-complete-guide': [
    { after: 'When the PC will not turn on', id: 'hp-stream-blue-laptop-top-view-diagnostics', alt: 'HP Stream laptop on the bench during power-on diagnostics', caption: `${bench}: a laptop under diagnosis when it would not start.` },
    { after: 'Black screen, no display, or display glitches', id: 'hp-all-in-one-pc-lcd-screen-panel-removal-repair', alt: 'HP all-in-one PC with the LCD panel removed for repair', caption: `${bench}: a display panel removed from an all-in-one PC.` },
    { after: 'Storage, memory, thermals, and power', id: 'laptop-heatsink-fan-clogged-with-dust-needs-cleaning', alt: 'Laptop heatsink and fan clogged with dust', caption: `${bench}: dust blocking a laptop cooling fan and heatsink.` },
  ],
  'windows-11-26h2-installation-guide': [
    { after: 'Windows 11 26H2 installation problems: what to check', id: 'asus-prime-z590-p-bios-ez-mode-core-i7-10700k', alt: 'ASUS Prime Z590-P BIOS EZ Mode screen with Core i7-10700K', caption: `${bench}: a BIOS screen. Boot order, Secure Boot and TPM settings are checked here when installation media will not start.` },
  ],
  'best-ssds': [
    { after: 'Thermals and sustained performance', id: 'samsung-pm991a-512gb-nvme-m2-ssd-hp-all-in-one', alt: 'Samsung PM991A 512GB NVMe M.2 SSD from an HP all-in-one', caption: `${bench}: an NVMe M.2 SSD. This is not a product endorsement; see the buying criteria on this page.` },
  ],
  'best-gaming-laptops': [
    { after: 'Cooling and sustained performance', id: 'lenovo-legion-7-16ithg6-opened-dual-fan-cooling-system-and-battery', alt: 'Lenovo Legion 7 opened showing the dual-fan cooling system and battery', caption: `${bench}: a gaming laptop's cooling system. This is not a product endorsement; cooling design affects sustained performance.` },
  ],
  'best-ram': [
    { after: 'Two modules versus one', id: 'thermaltake-ddr4-3600-16gb-ram-kit-2x8gb', alt: 'Thermaltake DDR4-3600 16GB RAM kit of two 8GB modules', caption: `${bench}: a 2x8GB kit. This is not a product endorsement; two matched modules can run in dual channel.` },
  ],
  'best-gaming-monitors': [
    { after: 'Panel and connectivity considerations', id: 'hp-v214a-led-monitor-repair', alt: 'HP V214A LED monitor on the repair bench', caption: `${bench}: an LED monitor under repair. This is not a product endorsement.` },
  ],
  'research/how-ssd-temperature-affects-performance': [
    { after: 'How to separate thermal behavior from a failing SSD', id: 'hp-laptop-motherboard-heatsink-m2-ssd-closeup', alt: 'Close-up of a laptop motherboard with the M.2 SSD and nearby heatsink', caption: `${bench}: the M.2 SSD slot and nearby heatsink on a laptop motherboard.` },
  ],
  'research/does-more-ram-make-windows-faster': [
    { after: 'More RAM or faster RAM: which upgrade matters?', id: 'samsung-16gb-ddr4-3200-laptop-ram-sodimm-upgrade', alt: 'Samsung 16GB DDR4-3200 laptop SODIMM memory module', caption: `${bench}: a laptop SODIMM. Capacity is only one part of memory behavior.` },
  ],
  'research/upgrade-ram-ssd-now-or-wait': [
    { after: 'When more RAM is the right upgrade', id: 'samsung-16gb-ddr4-3200-laptop-ram-sodimm-upgrade', alt: 'Samsung 16GB DDR4-3200 laptop SODIMM memory module', caption: `${bench}: confirm module type and supported capacity before purchasing laptop RAM.` },
    { after: 'When an SSD upgrade is justified—and when it is not', id: 'hp-laptop-motherboard-heatsink-m2-ssd-closeup', alt: 'Close-up of a laptop motherboard with the M.2 SSD and nearby heatsink', caption: `${bench}: M.2 clearance and the fitted interface are model-specific; verify the service manual before replacing storage.` },
  ],

  'windows-11-8gb-ram-update-october-2026': [
    {
      after: 'The 200MB and 2GB figures describe different things',
      id: '8gb-ddr4-ram-memory-upgrade',
      alt: 'An 8GB DDR4 RAM module from the TWW repair-bench gallery',
      caption: 'A physical 8GB DDR4 memory module from the TWW gallery. Windows memory-efficiency changes do not add installed RAM; upgrade options depend on the exact device.',
    },
  ]
};

/**
 * Photos for static pages, rendered after the page text. */
export const staticPageFigures: Record<string, { id: string; alt: string; caption: string }[]> = {
  '/about': [
    { id: 'laptop-internal-cleaning-dust-removal-service', alt: 'Laptop opened on the bench during internal dust cleaning', caption: 'Photo from the TWW repair bench: internal cleaning on a laptop.' },
  ],
  '/testing': [
    { id: 'laptop-cpu-repaste-service-fresh-thermal-compound', alt: 'Laptop CPU with fresh thermal compound applied during a repaste', caption: 'Photo from the TWW repair bench: fresh thermal compound on a laptop CPU.' },
  ],
  '/authors/imran-natiq': [
    { id: 'acer-predator-orion-9000-gaming-pc-repair', alt: 'Acer Predator Orion 9000 gaming PC on the repair bench', caption: 'Photo from the TWW repair bench: a gaming desktop under repair.' },
  ],
};

const known = new Set(galleryImages.map(image => image.id));
export const galleryPhotoUrl = (id: string) => `${GALLERY_BASE_PATH}/${id}.webp`;

export function placeGalleryImages(list: Article[]): Article[] {
  return list.map(article => {
    const placements = articleImagePlacements[article.slug];
    if (!placements) return article;
    const content = article.content.map(section => {
      if (section.image || !section.heading) return section;
      const placement = placements.find(item => item.after === section.heading);
      if (!placement) return section;
      if (!known.has(placement.id)) throw new Error(`Unknown gallery image id: ${placement.id}`);
      return { ...section, image: { src: galleryPhotoUrl(placement.id), alt: placement.alt, caption: placement.caption } };
    });
    return { ...article, content };
  });
}
