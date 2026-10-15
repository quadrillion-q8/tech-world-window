/**
 * Premium ambient background for Tech World Window.
 *
 * The effect is intentionally atmospheric rather than literal: soft light
 * fields, microscopic texture, and a few slow-moving particles. It is
 * decorative, has no pointer events, and uses CSS only.
 */
export function TechBackground() {
  return (
    <div className="tech-background tech-background-site" aria-hidden="true">
      <div className="tech-bg-atmosphere" />
      <div className="tech-bg-grid" />
      <div className="tech-bg-glow tech-bg-glow-a" />
      <div className="tech-bg-glow tech-bg-glow-b" />
      <div className="tech-bg-glow tech-bg-glow-c" />
      <div className="tech-bg-particles">
        {Array.from({ length: 16 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="tech-bg-vignette" />
    </div>
  );
}

export default TechBackground;
