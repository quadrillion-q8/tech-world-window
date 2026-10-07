import React from 'react';

interface ArticleThumbnailProps {
  title: string;
  slug?: string;
  category?: string;
  imageUrl?: string;
}

type VisualKey =
  | 'windows-pillar'
  | 'no-internet'
  | 'dns-not-working'
  | 'network-reset'
  | 'game-stuttering'
  | 'gpu-spikes'
  | 'shader-stutter'
  | 'ssd-health'
  | 'nvme-temp'
  | 'ssd-slowdown'
  | 'ram-errors'
  | 'blue-screen'
  | 'freezing-randomly'
  | 'default-windows'
  | 'default-gaming'
  | 'default-hardware';

function resolveVisualKey(title: string, slug = '', category = ''): VisualKey {
  const key = `${title} ${slug}`.toLowerCase();

  if (key.includes('windows troubleshooting')) return 'windows-pillar';
  if (key.includes('connected but no internet') || key.includes('no-internet')) return 'no-internet';
  if (key.includes('dns not working') || key.includes('dns-not-working')) return 'dns-not-working';
  if (key.includes('network adapter reset') || key.includes('network-adapter-reset')) return 'network-reset';
  if (key.includes('pc game stuttering') || key.includes('game-stuttering')) return 'game-stuttering';
  if (key.includes('gpu frame-time spikes') || key.includes('gpu-frame-time')) return 'gpu-spikes';
  if (key.includes('shader compilation') || key.includes('shader-compilation')) return 'shader-stutter';
  if (key.includes('check ssd health') || key.includes('ssd-health')) return 'ssd-health';
  if (key.includes('nvme ssd temperature') || key.includes('nvme-ssd-temperature')) return 'nvme-temp';
  if (key.includes('ssd can slow down') || key.includes('ssd-slow')) return 'ssd-slowdown';
  if (key.includes('check ram for errors') || key.includes('ram-for-errors') || key.includes('memtest86')) return 'ram-errors';
  if (key.includes('blue screen') || key.includes('stop code') || key.includes('bsod')) return 'blue-screen';
  if (key.includes('freezing randomly') || key.includes('freezing-randomly')) return 'freezing-randomly';

  const cat = category.toLowerCase();
  if (cat.includes('gaming')) return 'default-gaming';
  if (cat.includes('hardware')) return 'default-hardware';
  return 'default-windows';
}

export const ArticleThumbnail: React.FC<ArticleThumbnailProps> = ({
  title,
  slug,
  category,
  imageUrl,
}) => {
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    overflow: 'hidden',
    backgroundColor: '#0f172a',
    display: 'block',
  };

  if (imageUrl) {
    return (
      <div className="article-thumbnail" style={containerStyle}>
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }

  const visual = resolveVisualKey(title, slug, category);
  const uid = (slug || title).replace(/[^a-zA-Z0-9]/g, '').slice(0, 16) || 'card';

  return (
    <div
      className="article-thumbnail"
      style={containerStyle}
      role="img"
      aria-label={`Diagnostic illustration for ${title}`}
    >
      <svg
        viewBox="0 0 800 450"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="800" y2="450" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#090D16" />
            <stop offset="55%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <pattern id={`grid-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.7" strokeOpacity="0.35" />
          </pattern>
          <radialGradient id={`glow-blue-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`glow-cyan-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`glow-amber-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`glow-emerald-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="800" height="450" fill={`url(#bg-${uid})`} />
        <rect width="800" height="450" fill={`url(#grid-${uid})`} />

        {/* 1. WINDOWS TROUBLESHOOTING PILLAR */}
        {visual === 'windows-pillar' && (
          <g>
            <circle cx="400" cy="225" r="240" fill={`url(#glow-blue-${uid})`} />
            <rect x="190" y="75" width="420" height="62" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <text x="220" y="112" fill="#E2E8F0" fontSize="18" fontFamily="monospace" fontWeight="bold">LAYER 04 · OS &amp; APPS</text>
            <circle cx="570" cy="106" r="8" fill="#38BDF8" />

            <rect x="190" y="155" width="420" height="62" rx="10" fill="#0F172A" stroke="#2563EB" strokeWidth="2" />
            <text x="220" y="192" fill="#E2E8F0" fontSize="18" fontFamily="monospace" fontWeight="bold">LAYER 03 · DRIVERS &amp; KERNEL</text>
            <circle cx="570" cy="186" r="8" fill="#F59E0B" />

            <rect x="190" y="235" width="420" height="62" rx="10" fill="#0F172A" stroke="#0284C7" strokeWidth="2" />
            <text x="220" y="272" fill="#E2E8F0" fontSize="18" fontFamily="monospace" fontWeight="bold">LAYER 02 · NETWORK &amp; STORAGE</text>
            <circle cx="570" cy="266" r="8" fill="#10B981" />

            <rect x="190" y="315" width="420" height="62" rx="10" fill="#0F172A" stroke="#64748B" strokeWidth="2" />
            <text x="220" y="352" fill="#E2E8F0" fontSize="18" fontFamily="monospace" fontWeight="bold">LAYER 01 · HARDWARE &amp; POWER</text>
            <circle cx="570" cy="346" r="8" fill="#10B981" />
          </g>
        )}

        {/* 2. WINDOWS CONNECTED BUT NO INTERNET */}
        {visual === 'no-internet' && (
          <g>
            <circle cx="400" cy="225" r="230" fill={`url(#glow-blue-${uid})`} />
            <rect x="100" y="170" width="140" height="110" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
            <text x="170" y="220" textAnchor="middle" fill="#E2E8F0" fontSize="18" fontFamily="monospace" fontWeight="bold">WIN 11 PC</text>
            <text x="170" y="246" textAnchor="middle" fill="#38BDF8" fontSize="13" fontFamily="monospace">LINK: UP</text>

            <line x1="240" y1="225" x2="330" y2="225" stroke="#10B981" strokeWidth="4" />

            <rect x="330" y="170" width="140" height="110" rx="12" fill="#0F172A" stroke="#10B981" strokeWidth="2.5" />
            <text x="400" y="220" textAnchor="middle" fill="#E2E8F0" fontSize="18" fontFamily="monospace" fontWeight="bold">GATEWAY</text>
            <text x="400" y="246" textAnchor="middle" fill="#10B981" fontSize="13" fontFamily="monospace">LAN OK</text>

            <line x1="470" y1="225" x2="560" y2="225" stroke="#F59E0B" strokeWidth="4" strokeDasharray="8 8" />
            <circle cx="515" cy="225" r="16" fill="#F59E0B" />
            <text x="515" y="231" textAnchor="middle" fill="#0F172A" fontSize="18" fontFamily="monospace" fontWeight="bold">!</text>

            <rect x="560" y="170" width="140" height="110" rx="12" fill="#0F172A" stroke="#F59E0B" strokeWidth="2.5" />
            <text x="630" y="220" textAnchor="middle" fill="#E2E8F0" fontSize="18" fontFamily="monospace" fontWeight="bold">INTERNET</text>
            <text x="630" y="246" textAnchor="middle" fill="#F59E0B" fontSize="13" fontFamily="monospace">NO ROUTE</text>
          </g>
        )}

        {/* 3. WINDOWS 11 DNS NOT WORKING */}
        {visual === 'dns-not-working' && (
          <g>
            <circle cx="400" cy="225" r="230" fill={`url(#glow-blue-${uid})`} />
            <rect x="130" y="100" width="540" height="80" rx="10" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <text x="165" y="147" fill="#38BDF8" fontSize="20" fontFamily="monospace" fontWeight="bold">QUERY: example.com → [DNS TIMEOUT]</text>

            <rect x="130" y="210" width="250" height="130" rx="10" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
            <text x="255" y="260" textAnchor="middle" fill="#F59E0B" fontSize="18" fontFamily="monospace" fontWeight="bold">DNS RESOLVER</text>
            <text x="255" y="295" textAnchor="middle" fill="#94A3B8" fontSize="15" fontFamily="monospace">PORT 53 · SERVFAIL</text>

            <rect x="420" y="210" width="250" height="130" rx="10" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
            <text x="545" y="260" textAnchor="middle" fill="#10B981" fontSize="18" fontFamily="monospace" fontWeight="bold">DIRECT IP PING</text>
            <text x="545" y="295" textAnchor="middle" fill="#E2E8F0" fontSize="15" fontFamily="monospace">1.1.1.1 · 12ms OK</text>
          </g>
        )}

        {/* 4. WINDOWS 11 NETWORK ADAPTER RESET */}
        {visual === 'network-reset' && (
          <g>
            <circle cx="400" cy="225" r="220" fill={`url(#glow-blue-${uid})`} />
            <rect x="210" y="125" width="380" height="200" rx="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
            <rect x="260" y="325" width="140" height="18" rx="3" fill="#F59E0B" />
            <rect x="420" y="325" width="60" height="18" rx="3" fill="#F59E0B" />
            <path d="M 400 165 A 55 55 0 1 1 348 205" stroke="#22D3EE" strokeWidth="6" strokeLinecap="round" fill="none" />
            <polygon points="348,182 330,212 365,212" fill="#22D3EE" />
            <text x="400" y="295" textAnchor="middle" fill="#E2E8F0" fontSize="16" fontFamily="monospace" fontWeight="bold">NIC STACK &amp; WINSOCK RESET</text>
          </g>
        )}

        {/* 5. PC GAME STUTTERING PILLAR */}
        {visual === 'game-stuttering' && (
          <g>
            <circle cx="450" cy="225" r="240" fill={`url(#glow-amber-${uid})`} />
            <rect x="90" y="80" width="620" height="290" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            <line x1="120" y1="270" x2="680" y2="270" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="6 6" />
            <text x="130" y="258" fill="#22D3EE" fontSize="14" fontFamily="monospace">16.6 ms (60 FPS TARGET)</text>
            <polyline
              points="120,270 180,268 230,272 270,270 290,115 310,270 380,269 440,271 465,140 485,270 540,268 565,105 585,270 670,270"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <text x="130" y="125" fill="#F59E0B" fontSize="16" fontFamily="monospace" fontWeight="bold">FRAME-TIME SPIKE: 68.4 ms</text>
          </g>
        )}

        {/* 6. GPU FRAME-TIME SPIKES */}
        {visual === 'gpu-spikes' && (
          <g>
            <circle cx="400" cy="225" r="230" fill={`url(#glow-cyan-${uid})`} />
            <rect x="140" y="110" width="520" height="230" rx="16" fill="#0F172A" stroke="#22D3EE" strokeWidth="2.5" />
            <circle cx="275" cy="225" r="78" fill="#1E293B" stroke="#38BDF8" strokeWidth="3" />
            <circle cx="275" cy="225" r="22" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
            <circle cx="525" cy="225" r="78" fill="#1E293B" stroke="#F59E0B" strokeWidth="3" />
            <circle cx="525" cy="225" r="22" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
            <polyline
              points="160,315 340,315 375,145 405,315 470,315 505,165 535,315 640,315"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="4"
            />
            <text x="400" y="92" textAnchor="middle" fill="#E2E8F0" fontSize="16" fontFamily="monospace" fontWeight="bold">GPU CORE · VRAM · DRIVER TELEMETRY</text>
          </g>
        )}

        {/* 7. SHADER COMPILATION STUTTER */}
        {visual === 'shader-stutter' && (
          <g>
            <circle cx="400" cy="225" r="230" fill={`url(#glow-cyan-${uid})`} />
            <rect x="120" y="95" width="250" height="260" rx="12" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
            <polygon points="245,145 175,275 315,275" fill="none" stroke="#22D3EE" strokeWidth="2.5" />
            <line x1="245" y1="145" x2="245" y2="275" stroke="#22D3EE" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="245" y="325" textAnchor="middle" fill="#22D3EE" fontSize="15" fontFamily="monospace">RAW SHADER CODE</text>

            <line x1="400" y1="75" x2="400" y2="375" stroke="#F59E0B" strokeWidth="4" strokeDasharray="8 6" />

            <rect x="430" y="95" width="250" height="260" rx="12" fill="#0F172A" stroke="#10B981" strokeWidth="2" />
            <polygon points="555,145 485,275 625,275" fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2.5" />
            <text x="555" y="325" textAnchor="middle" fill="#10B981" fontSize="15" fontFamily="monospace">CACHED PSO READY</text>
          </g>
        )}

        {/* 8. HOW TO CHECK SSD HEALTH IN WINDOWS */}
        {visual === 'ssd-health' && (
          <g>
            <circle cx="400" cy="225" r="230" fill={`url(#glow-emerald-${uid})`} />
            <rect x="120" y="135" width="560" height="180" rx="12" fill="#0F172A" stroke="#10B981" strokeWidth="2.5" />
            <rect x="155" y="170" width="95" height="110" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="2" />
            <text x="202" y="230" textAnchor="middle" fill="#38BDF8" fontSize="14" fontFamily="monospace" fontWeight="bold">CTRL</text>

            <rect x="275" y="170" width="115" height="110" rx="6" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
            <text x="332" y="230" textAnchor="middle" fill="#E2E8F0" fontSize="14" fontFamily="monospace">NAND 01</text>

            <rect x="415" y="170" width="230" height="110" rx="8" fill="#090D16" stroke="#10B981" strokeWidth="2" />
            <text x="530" y="212" textAnchor="middle" fill="#10B981" fontSize="22" fontFamily="monospace" fontWeight="bold">SMART: 99% OK</text>
            <text x="530" y="248" textAnchor="middle" fill="#94A3B8" fontSize="14" fontFamily="monospace">0 MEDIA ERRORS</text>
          </g>
        )}

        {/* 9. NVME SSD TEMPERATURE TOO HIGH */}
        {visual === 'nvme-temp' && (
          <g>
            <circle cx="400" cy="225" r="230" fill={`url(#glow-amber-${uid})`} />
            <rect x="120" y="135" width="560" height="180" rx="12" fill="#0F172A" stroke="#F97316" strokeWidth="2.5" />
            <rect x="155" y="165" width="150" height="120" rx="8" fill="#7C2D12" stroke="#F97316" strokeWidth="3" />
            <text x="230" y="218" textAnchor="middle" fill="#FFEDD5" fontSize="24" fontFamily="monospace" fontWeight="bold">78°C</text>
            <text x="230" y="248" textAnchor="middle" fill="#FDBA74" fontSize="13" fontFamily="monospace">CONTROLLER HOT</text>

            <rect x="335" y="165" width="150" height="120" rx="8" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
            <text x="410" y="218" textAnchor="middle" fill="#D1FAE5" fontSize="24" fontFamily="monospace" fontWeight="bold">52°C</text>
            <text x="410" y="248" textAnchor="middle" fill="#6EE7B7" fontSize="13" fontFamily="monospace">NAND FLASH</text>

            <text x="590" y="215" textAnchor="middle" fill="#F97316" fontSize="16" fontFamily="monospace" fontWeight="bold">THERMAL</text>
            <text x="590" y="242" textAnchor="middle" fill="#F97316" fontSize="16" fontFamily="monospace" fontWeight="bold">THROTTLE</text>
          </g>
        )}

        {/* 10. WHY AN SSD CAN SLOW DOWN OVER TIME */}
        {visual === 'ssd-slowdown' && (
          <g>
            <circle cx="400" cy="225" r="230" fill={`url(#glow-amber-${uid})`} />
            <rect x="110" y="85" width="580" height="280" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="2" />
            <path
              d="M 150 145 L 360 145 L 410 295 L 650 295"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <text x="255" y="128" textAnchor="middle" fill="#22D3EE" fontSize="15" fontFamily="monospace" fontWeight="bold">SLC CACHE: 6,800 MB/s</text>
            <text x="535" y="275" textAnchor="middle" fill="#F59E0B" fontSize="15" fontFamily="monospace" fontWeight="bold">FULL DRIVE / QLC: 450 MB/s</text>
          </g>
        )}

        {/* 11. HOW TO CHECK RAM FOR ERRORS */}
        {visual === 'ram-errors' && (
          <g>
            <circle cx="400" cy="225" r="230" fill={`url(#glow-emerald-${uid})`} />
            <rect x="130" y="115" width="540" height="90" rx="8" fill="#0F172A" stroke="#10B981" strokeWidth="2.5" />
            {[160, 235, 310, 385, 460, 535].map((x, idx) => (
              <rect
                key={x}
                x={x}
                y="135"
                width="55"
                height="50"
                rx="4"
                fill={idx === 4 ? '#7C2D12' : '#1E293B'}
                stroke={idx === 4 ? '#F59E0B' : '#10B981'}
                strokeWidth="2"
              />
            ))}
            <rect x="130" y="235" width="540" height="100" rx="8" fill="#090D16" stroke="#38BDF8" strokeWidth="2" />
            <text x="165" y="278" fill="#38BDF8" fontSize="18" fontFamily="monospace" fontWeight="bold">MEMTEST86 · PASS 4/4</text>
            <text x="165" y="310" fill="#F59E0B" fontSize="15" fontFamily="monospace">ADDR 0x004F8A20 · BIT FLIP DETECTED</text>
          </g>
        )}

        {/* 12. WINDOWS 11 BLUE SCREEN STOP CODE */}
        {visual === 'blue-screen' && (
          <g>
            <circle cx="400" cy="225" r="240" fill={`url(#glow-blue-${uid})`} />
            <rect x="130" y="75" width="540" height="300" rx="14" fill="#1E3A8A" stroke="#38BDF8" strokeWidth="3" />
            <text x="180" y="165" fill="#FFFFFF" fontSize="64" fontFamily="monospace" fontWeight="bold">:(</text>
            <rect x="180" y="200" width="360" height="14" rx="7" fill="#93C5FD" fillOpacity="0.6" />
            <rect x="180" y="228" width="280" height="14" rx="7" fill="#93C5FD" fillOpacity="0.4" />
            <rect x="170" y="275" width="460" height="58" rx="8" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
            <text x="195" y="310" fill="#22D3EE" fontSize="17" fontFamily="monospace" fontWeight="bold">STOP CODE: CRITICAL_PROCESS_DIED</text>
          </g>
        )}

        {/* 13. WINDOWS 11 FREEZING RANDOMLY */}
        {visual === 'freezing-randomly' && (
          <g>
            <circle cx="400" cy="225" r="230" fill={`url(#glow-blue-${uid})`} />
            <rect x="110" y="90" width="580" height="270" rx="12" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
            <polyline
              points="145,225 220,225 245,155 270,295 295,190 315,225 385,225"
              fill="none"
              stroke="#22D3EE"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            <line x1="385" y1="225" x2="650" y2="225" stroke="#F59E0B" strokeWidth="4" strokeDasharray="10 6" />
            <circle cx="385" cy="225" r="9" fill="#F59E0B" />
            <text x="385" y="135" textAnchor="middle" fill="#F59E0B" fontSize="17" fontFamily="monospace" fontWeight="bold">SYSTEM CLOCK LOCKUP · IO WAIT</text>
          </g>
        )}

        {/* FALLBACK FOR FUTURE ARTICLES */}
        {(visual === 'default-windows' || visual === 'default-gaming' || visual === 'default-hardware') && (
          <g>
            <circle cx="400" cy="225" r="220" fill={`url(#glow-cyan-${uid})`} />
            <rect x="180" y="120" width="440" height="210" rx="14" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
            <text x="400" y="232" textAnchor="middle" fill="#E2E8F0" fontSize="22" fontFamily="monospace" fontWeight="bold">
              TECH WORLD WINDOW
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

export default ArticleThumbnail;
