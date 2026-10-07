# Tech World Window — First Content Cluster Expansion

This expansion adapts KCROC's pillar/cluster model to TWW without copying KCROC's repair-shop positioning.

## Windows pillar
- `/windows-troubleshooting-complete-guide` — **universal Windows troubleshooting pillar**
- `/windows-11-wifi-connected-no-internet` — network connectivity diagnosis
- `/windows-11-dns-not-working-how-to-fix` — DNS diagnosis
- `/windows-11-network-adapter-reset-guide` — network reset

The universal pillar is the top-level diagnostic entry point. Cluster pages link back to it where broader Windows diagnosis is useful, while the pillar links down to the most specific problem-solving pages.

## Gaming pillar
- `/pc-game-stuttering-fix-frame-time` — existing cluster
- `/gpu-frame-time-spikes-causes-fix` — GPU frame-time diagnosis
- `/shader-compilation-stutter-pc-games` — shader compilation behavior

## Hardware pillar
- `/how-to-check-ssd-health-windows` — existing cluster
- `/nvme-ssd-temperature-too-high` — NVMe thermals
- `/why-ssd-is-slowing-down-windows` — SSD performance diagnosis

## Strategy
Each article points to its pillar and to adjacent cluster articles. This creates a small, coherent topical graph now rather than a flat list of unrelated posts.

The Windows pillar should become the parent entry point for future Windows problem clusters such as startup failures, blue screens, freezes, performance, update failures, device problems, and recovery. Next expansion should be based on Search Console impressions and actual query demand, not arbitrary article volume.

## Commercial / monetization cluster — first live guides

The commercial hubs now have substantive, indexable buying-guide content rather than placeholder copy:

- `/best-ssds` — SSD selection for Windows and gaming
- `/best-gaming-laptops` — GPU, cooling, display and upgradeability
- `/best-gaming-monitors` — resolution, refresh rate, response behavior and GPU matching
- `/best-ram` — capacity, compatibility, speed, latency and XMP/EXPO

These pages use `searchIntent: 'commercial'` so the existing disclosure system applies automatically. They deliberately do not contain fabricated affiliate URLs. Real approved merchant destinations can be inserted through `AffiliateLink` once the relevant affiliate account is active.

## Tools expansion

- `/tools/pc-bottleneck-calculator`
- `/tools/psu-wattage-calculator`
- `/tools/ram-calculator`
- `/tools/storage-calculator`

Tool-to-commercial-guide links emit `tool_conversion` analytics events so GA4 can measure movement from utility traffic toward purchase-intent content.
