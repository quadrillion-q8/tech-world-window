type TechBackgroundProps = {
  variant?: 'site' | 'hero';
};

/**
 * Lightweight decorative circuit animation. CSS/SVG only: no timers, canvas,
 * external imagery, or runtime animation loop.
 */
export function TechBackground({ variant = 'site' }: TechBackgroundProps) {
  return (
    <div className={'tech-background tech-background-' + variant} aria-hidden="true">
      <div className="tech-bg-grid" />
      <div className="tech-bg-glow tech-bg-glow-a" />
      <div className="tech-bg-glow tech-bg-glow-b" />
      <svg
        className="tech-bg-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        focusable="false"
        role="presentation"
      >
        <g className="tech-circuit-base">
          <path d="M-30 145 H180 V205 H300 V270 H430" />
          <path d="M-20 175 H145 V245 H275" />
          <path d="M1450 110 H1265 V190 H1160 V250 H1040" />
          <path d="M1470 142 H1320 V225 H1210" />
          <path d="M-25 595 H105 V520 H240 V460 H335" />
          <path d="M1465 520 H1320 V585 H1200 V655 H1085" />
          <path d="M180 920 V795 H265 V720 H380 V665" />
          <path d="M1230 920 V790 H1145 V735 H1030 V690" />
          <path d="M600 -25 V90 H680 V150 H770 V210" />
          <path d="M835 925 V810 H755 V760 H680 V700" />
          <path d="M-30 350 H85 V390 H165 V430" />
          <path d="M1470 350 H1360 V390 H1280 V430" />
        </g>
        <g className="tech-circuit-flow">
          <path d="M-30 145 H180 V205 H300 V270 H430" />
          <path d="M1450 110 H1265 V190 H1160 V250 H1040" />
          <path d="M-25 595 H105 V520 H240 V460 H335" />
          <path d="M1465 520 H1320 V585 H1200 V655 H1085" />
          <path d="M180 920 V795 H265 V720 H380 V665" />
          <path d="M1230 920 V790 H1145 V735 H1030 V690" />
          <path d="M600 -25 V90 H680 V150 H770 V210" />
          <path d="M835 925 V810 H755 V760 H680 V700" />
        </g>
        <g className="tech-circuit-nodes">
          <circle cx="180" cy="205" r="3" />
          <circle cx="300" cy="270" r="2.5" />
          <circle cx="430" cy="270" r="3" />
          <circle cx="1265" cy="190" r="3" />
          <circle cx="1160" cy="250" r="2.5" />
          <circle cx="1040" cy="250" r="3" />
          <circle cx="105" cy="520" r="3" />
          <circle cx="240" cy="460" r="2.5" />
          <circle cx="1320" cy="585" r="3" />
          <circle cx="1200" cy="655" r="2.5" />
          <circle cx="265" cy="720" r="3" />
          <circle cx="380" cy="665" r="2.5" />
          <circle cx="1145" cy="735" r="3" />
          <circle cx="1030" cy="690" r="2.5" />
          <circle cx="680" cy="150" r="3" />
          <circle cx="770" cy="210" r="2.5" />
          <circle cx="755" cy="760" r="3" />
          <circle cx="680" cy="700" r="2.5" />
          <circle cx="165" cy="430" r="2.5" />
          <circle cx="1280" cy="430" r="2.5" />
        </g>
      </svg>
      <div className="tech-bg-vignette" />
    </div>
  );
}

export default TechBackground;
