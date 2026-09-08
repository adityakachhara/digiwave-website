import React, { useEffect, useRef } from 'react';

interface WhyGoogleAdsProps {
  onWorkWithUs?: () => void;
}

interface StreamLine {
  angle: number;
  length: number;
  innerRadius: number;
  speed: number;
  particlePos: number; // 0 to 1 along the line
  particleSpeed: number;
  particleSize: number;
  baseAlpha: number;
  color: string;
  hasParticle: boolean;
}

const BENEFIT_ITEMS = [
  {
    num: '01',
    title: 'Capture existing demand',
    desc: "Reach potential customers at the moment they're actively searching for a solution, product, or service like yours.",
  },
  {
    num: '02',
    title: 'Know where your money goes',
    desc: 'Track clicks, leads, purchases, revenue, and other key actions to understand what your advertising is actually producing.',
  },
  {
    num: '03',
    title: 'Target with precision',
    desc: 'Control who you reach based on searches, location, devices, audiences, products, and other signals to put your budget where it matters.',
  },
  {
    num: '04',
    title: 'Turn performance into growth',
    desc: 'Identify campaigns, products, keywords, and audiences that generate results—and allocate more of your budget toward what works.',
  },
];

export default function WhyGoogleAds({
  onWorkWithUs,
}: WhyGoogleAdsProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let isPaused = false;

    // Mouse coordinates for gentle desktop parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const colors = [
      'rgba(147, 51, 234, ', // Deep Lavender/Purple
      'rgba(168, 85, 247, ', // Soft Violet
      'rgba(99, 102, 241, ', // Indigo
      'rgba(236, 72, 153, ', // Subtle Rose Pink
      'rgba(59, 130, 246, ', // Electric Sky
    ];

    let width = 0;
    let height = 0;
    let lines: StreamLine[] = [];

    const initStreams = () => {
      lines = [];
      const isMobile = width < 640;
      const count = isMobile ? 120 : 220;
      const maxRadius = Math.min(width, height) * (isMobile ? 0.46 : 0.44);
      const innerRadius = isMobile ? 26 : 34;

      for (let i = 0; i < count; i++) {
        // Controlled organic distribution around circle
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.04;
        const length = innerRadius + Math.random() * (maxRadius - innerRadius);
        const color = colors[Math.floor(Math.random() * colors.length)];

        lines.push({
          angle,
          length,
          innerRadius,
          speed: 0.0003 + Math.random() * 0.0005,
          particlePos: Math.random(),
          particleSpeed: 0.003 + Math.random() * 0.005,
          particleSize: 0.8 + Math.random() * 1.4,
          baseAlpha: 0.08 + Math.random() * 0.22,
          color,
          hasParticle: Math.random() > 0.25,
        });
      }
    };

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initStreams();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (width < 768) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left - width / 2;
      const clientY = e.clientY - rect.top - height / 2;
      targetX = (clientX / width) * 24;
      targetY = (clientY / height) * 24;
    };

    const renderFrame = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      const centerX = width / 2 + mouseX;
      const centerY = height / 2 + mouseY;

      // Soft ambient glow behind center convergence node
      const radialGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        width * 0.42
      );
      radialGlow.addColorStop(0, 'rgba(192, 132, 252, 0.16)');
      radialGlow.addColorStop(0.35, 'rgba(232, 121, 249, 0.06)');
      radialGlow.addColorStop(0.7, 'rgba(147, 197, 253, 0.03)');
      radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Render radial lines and converging stream particles
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (!prefersReducedMotion) {
          line.angle += line.speed * (i % 2 === 0 ? 1 : -1);
          line.particlePos -= line.particleSpeed;
          if (line.particlePos <= 0) {
            line.particlePos = 1;
          }
        }

        const cosA = Math.cos(line.angle);
        const sinA = Math.sin(line.angle);

        const xStart = centerX + cosA * line.innerRadius;
        const yStart = centerY + sinA * line.innerRadius;
        const xEnd = centerX + cosA * line.length;
        const yEnd = centerY + sinA * line.length;

        // Radial ray line
        const gradient = ctx.createLinearGradient(xStart, yStart, xEnd, yEnd);
        gradient.addColorStop(0, `${line.color}${line.baseAlpha * 1.5})`);
        gradient.addColorStop(0.5, `${line.color}${line.baseAlpha})`);
        gradient.addColorStop(1, `${line.color}0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.moveTo(xStart, yStart);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();

        // Data node particle converging toward the center
        if (line.hasParticle) {
          const particleDist =
            line.innerRadius +
            line.particlePos * (line.length - line.innerRadius);
          const px = centerX + cosA * particleDist;
          const py = centerY + sinA * particleDist;

          // Fade particle as it arrives at inner threshold
          const lifeAlpha =
            Math.sin(line.particlePos * Math.PI) * (line.baseAlpha * 2.8);

          ctx.fillStyle = `${line.color}${Math.min(0.9, lifeAlpha)})`;
          ctx.beginPath();
          ctx.arc(px, py, line.particleSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Central Focal Point: Geometric Concentric Node
      const innerCoreRadius = width < 640 ? 24 : 30;

      // Outer delicate ring
      ctx.strokeStyle = 'rgba(147, 51, 234, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerCoreRadius + 6, 0, Math.PI * 2);
      ctx.stroke();

      // Main core capsule
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowColor = 'rgba(168, 85, 247, 0.25)';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerCoreRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow

      ctx.strokeStyle = 'rgba(226, 232, 240, 0.9)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Center typographic indicator: "Intent"
      ctx.fillStyle = '#0F172A';
      ctx.font = `600 ${
        width < 640 ? '10px' : '11px'
      } Inter, -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Intent', centerX, centerY);
    };

    const animate = () => {
      if (isPaused) return;
      renderFrame();
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const handleVisibilityChange = () => {
      isPaused = document.hidden;
      if (!isPaused && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    handleResize();
    renderFrame();

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onWorkWithUs) {
      e.preventDefault();
      onWorkWithUs();
    }
  };

  return (
    <section className="wga-section" aria-labelledby="wga-headline">
      <style>{STYLES}</style>

      <div className="wga-container">
        {/* Section Header */}
        <header className="wga-header">
          <div className="wga-eyebrow">WHY GOOGLE ADS</div>
          <h2 id="wga-headline" className="wga-headline">
            Reach people when they're ready to act.
          </h2>
          <p className="wga-supporting">
            Unlike interruption-based advertising, Google Ads puts your business
            in front of people actively searching for the products and services
            you offer. When the intent is already there, your advertising has an
            opportunity to turn that existing demand into measurable business
            results.
          </p>
        </header>

        {/* Central Radial Convergence Visualization */}
        <div className="wga-visual-wrapper" ref={containerRef}>
          {/* Subtle contextual anchor tags floating around the stream field */}
          <div className="wga-context-tag wga-tag-tl" aria-hidden="true">
            <span className="wga-dot" /> Search Queries
          </div>
          <div className="wga-context-tag wga-tag-tr" aria-hidden="true">
            <span className="wga-dot" /> Active Intent
          </div>
          <div className="wga-context-tag wga-tag-bl" aria-hidden="true">
            <span className="wga-dot" /> Conversion Signals
          </div>
          <div className="wga-context-tag wga-tag-br" aria-hidden="true">
            <span className="wga-dot" /> Commercial Demand
          </div>

          <canvas ref={canvasRef} className="wga-canvas" aria-hidden="true" />
        </div>

        {/* Four Strategic Advantages (Editorial Presentation) */}
        <div className="wga-benefits-grid">
          {BENEFIT_ITEMS.map((item) => (
            <article key={item.num} className="wga-benefit-block">
              <div className="wga-benefit-header">
                <span className="wga-benefit-num">{item.num}</span>
                <div className="wga-benefit-rule" />
              </div>
              <h3 className="wga-benefit-title">{item.title}</h3>
              <p className="wga-benefit-desc">{item.desc}</p>
            </article>
          ))}
        </div>

        {/* Section Bottom Conversion Banner */}
        <footer className="wga-footer">
          <div className="wga-footer-card">
            <h3 className="wga-footer-title">
              Ready to turn search intent into growth?
            </h3>
            <div className="wga-cta-action">
              <a
                href="#contact"
                className="wga-btn-primary"
                onClick={handleCtaClick}
                role="button"
              >
                <span>Work with us</span>
                <span className="wga-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
            <p className="wga-footer-meta">
              Strategy • Campaign Management • Optimization
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

.wga-section {
  --wga-bg: #FCFCFD;
  --wga-ink-primary: #0B1220;
  --wga-ink-secondary: #475569;
  --wga-ink-muted: #94A3B8;
  --wga-border: #E8EAEE;
  --wga-border-subtle: #F1F3F6;
  --wga-accent: #2563EB;
  --wga-accent-violet: #7C3AED;
  --wga-card-bg: #FFFFFF;

  background-color: var(--wga-bg);
  color: var(--wga-ink-primary);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  padding: 140px 24px;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--wga-border);
  -webkit-font-smoothing: antialiased;
}

.wga-section *, .wga-section *::before, .wga-section *::after {
  box-sizing: border-box;
}

.wga-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

/* Header Area */
.wga-header {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 64px;
}

.wga-eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wga-accent-violet);
  background: rgba(124, 58, 237, 0.06);
  border: 1px solid rgba(124, 58, 237, 0.15);
  padding: 5px 14px;
  border-radius: 9999px;
  margin-bottom: 22px;
}

.wga-headline {
  font-size: clamp(2.3rem, 4.6vw, 3.6rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 800;
  color: var(--wga-ink-primary);
  margin: 0 0 24px;
}

.wga-supporting {
  font-size: clamp(1.0625rem, 1.8vw, 1.25rem);
  line-height: 1.65;
  color: var(--wga-ink-secondary);
  font-weight: 400;
  margin: 0 auto;
  max-width: 740px;
}

/* Visualization Canvas Stage */
.wga-visual-wrapper {
  position: relative;
  width: 100%;
  max-width: 960px;
  height: 460px;
  margin: 0 auto 88px;
  border-radius: 28px;
  background: radial-gradient(
    ellipse 60% 60% at 50% 50%,
    rgba(250, 245, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.7) 65%,
    rgba(255, 255, 255, 0) 100%
  );
  border: 1px solid var(--wga-border-subtle);
  box-shadow: 0 20px 40px -20px rgba(15, 23, 42, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
}

.wga-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  pointer-events: none;
}

/* Contextual Signal Micro-Badges */
.wga-context-tag {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(226, 232, 240, 0.9);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--wga-ink-secondary);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.04);
  pointer-events: none;
  z-index: 3;
}

.wga-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--wga-accent-violet);
}

.wga-tag-tl {
  top: 24px;
  left: 28px;
}

.wga-tag-tr {
  top: 24px;
  right: 28px;
}

.wga-tag-bl {
  bottom: 24px;
  left: 28px;
}

.wga-tag-br {
  bottom: 24px;
  right: 28px;
}

/* Four Strategic Benefits (Editorial Layout) */
.wga-benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 56px 64px;
  max-width: 1080px;
  margin: 0 auto 96px;
  position: relative;
}

.wga-benefit-block {
  display: flex;
  flex-direction: column;
  position: relative;
}

.wga-benefit-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.wga-benefit-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--wga-accent-violet);
  letter-spacing: -0.02em;
}

.wga-benefit-rule {
  flex-grow: 1;
  height: 1px;
  background: var(--wga-border);
}

.wga-benefit-title {
  font-size: 1.375rem;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--wga-ink-primary);
  margin: 0 0 10px;
}

.wga-benefit-desc {
  font-size: 0.9625rem;
  line-height: 1.65;
  color: var(--wga-ink-secondary);
  margin: 0;
}

/* Footer / Bottom CTA */
.wga-footer {
  text-align: center;
}

.wga-footer-card {
  background: var(--wga-card-bg);
  border: 1px solid var(--wga-border);
  border-radius: 24px;
  padding: 56px 36px;
  max-width: 760px;
  margin: 0 auto;
  box-shadow: 0 16px 36px -12px rgba(15, 23, 42, 0.05);
}

.wga-footer-title {
  font-size: clamp(1.5rem, 2.5vw, 1.95rem);
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--wga-ink-primary);
  margin: 0 0 28px;
}

.wga-cta-action {
  margin-bottom: 18px;
}

.wga-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--wga-ink-primary);
  color: #FFFFFF;
  text-decoration: none;
  font-family: inherit;
  font-size: 0.9625rem;
  font-weight: 600;
  padding: 13px 28px;
  border-radius: 10px;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 14px rgba(11, 18, 32, 0.16);
  cursor: pointer;
}

.wga-btn-primary:hover {
  background: var(--wga-accent);
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(37, 99, 235, 0.28);
}

.wga-btn-primary:focus-visible {
  outline: 2px solid var(--wga-accent);
  outline-offset: 3px;
}

.wga-arrow {
  display: inline-block;
  transition: transform 0.18s ease;
}

.wga-btn-primary:hover .wga-arrow {
  transform: translateX(3px);
}

.wga-footer-meta {
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--wga-ink-muted);
  margin: 0;
}

/* Tablet & Mobile Responsiveness */
@media (max-width: 900px) {
  .wga-benefits-grid {
    gap: 44px 36px;
  }
  .wga-visual-wrapper {
    height: 380px;
  }
}

@media (max-width: 640px) {
  .wga-section {
    padding: 80px 18px;
  }
  .wga-header {
    margin-bottom: 44px;
  }
  .wga-visual-wrapper {
    height: 320px;
    margin-bottom: 60px;
  }
  .wga-context-tag {
    display: none; /* Keep mobile viewport uncluttered */
  }
  .wga-benefits-grid {
    grid-template-columns: 1fr;
    gap: 36px;
    margin-bottom: 64px;
  }
  .wga-benefit-title {
    font-size: 1.25rem;
  }
  .wga-footer-card {
    padding: 40px 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wga-btn-primary {
    transition: none !important;
  }
  .wga-arrow {
    transition: none !important;
  }
}
`;
