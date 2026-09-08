import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  FormEvent,
  ChangeEvent,
} from 'react';

const BOOKING_API_ENDPOINT: string =
  'https://script.google.com/macros/s/AKfycbxCAF1-SgsIXXp0bBoAuO9YIMNtPlYHcpxmfWW9vZy86DuqTYFB4axluwK9mOoU0WwP/exec';

const WHATSAPP_NUMBER = '917976906628';
const WHATSAPP_PREFILLED_MESSAGE = encodeURIComponent(
  "Hi Bluescale Ads, I'd like to discuss Google Ads management for my business."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PREFILLED_MESSAGE}`;

// ==========================================
// 1. INLINE ICONS (Zero external dependencies)
// ==========================================
function DigiwaveMark(): JSX.Element {
  return (
    <svg
      className="bs-logo-mark"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0" y="12" width="4" height="8" rx="2" fill="#38BDF8" />
      <rect x="6" y="7" width="4" height="13" rx="2" fill="#0EA5E9" />
      <rect x="12" y="3" width="4" height="17" rx="2" fill="#2563EB" />
      <rect x="18" y="0" width="4" height="20" rx="2" fill="#00F0FF" />
    </svg>
  );
}

function WhatsAppIcon({
  className = 'w-6 h-6',
}: {
  className?: string;
}): JSX.Element {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.071-2.222-.562-1.821-.757-2.996-2.617-3.087-2.738-.09-.121-.737-.981-.737-1.872 0-.891.467-1.328.633-1.509.166-.18.362-.226.483-.226.12 0 .241.002.346.007.111.005.259-.042.406.312.15.362.513 1.25.558 1.341.045.09.076.196.015.317-.06.12-.09.196-.181.302-.09.106-.19.237-.271.317-.091.09-.186.188-.08.37.106.181.47 1.229 1.458 1.839.467.288.859.377 1.11.457.199.063.39.043.535-.015.18-.073.766-.893.971-1.199.205-.306.411-.256.69-.151.278.106 1.765.832 2.066.983.302.151.503.226.578.352.075.126.075.729-.069 1.134zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.66 1.438 5.168L2 22l4.98-1.396A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.053c-1.636 0-3.15-.494-4.417-1.341l-.316-.213-2.97.779.792-2.894-.233-.37A8.006 8.006 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8.053-8 8.053z" />
    </svg>
  );
}

function SearchIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function TrendingUpIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function ArrowRightIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CheckCircleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function StarIcon(): JSX.Element {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="#F59E0B"
      stroke="#F59E0B"
      strokeWidth="1"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ShoppingBagIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function UserCheckIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

// ==========================================
// 2. HERO WEBGL FLOWING SILK BACKGROUND
// ==========================================
function RibbonBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true });
    if (!gl) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      !!window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;

      vec3 getSilkColor(float t) {
        vec3 c0 = vec3(0.00, 0.42, 1.00);
        vec3 c1 = vec3(0.38, 0.16, 0.98);
        vec3 c2 = vec3(0.70, 0.08, 0.88);
        vec3 c3 = vec3(1.00, 0.18, 0.58);
        vec3 c4 = vec3(1.00, 0.44, 0.08);
        vec3 c5 = vec3(1.00, 0.80, 0.18);

        float s = clamp(fract(t), 0.0, 0.9999) * 5.0;
        float f = smoothstep(0.0, 1.0, fract(s));

        if (s < 1.0) return mix(c0, c1, f);
        if (s < 2.0) return mix(c1, c2, f);
        if (s < 3.0) return mix(c2, c3, f);
        if (s < 4.0) return mix(c3, c4, f);
        return mix(c4, c5, f);
      }

      float getWave(float x, float t, float speed, float freq, float phase) {
        float w1 = sin(x * freq * 1.10 + t * speed * 0.9 + phase) * 0.18;
        float w2 = sin(x * freq * 2.10 - t * speed * 0.7 + phase * 1.6) * 0.09;
        float w3 = cos(x * freq * 3.30 + t * speed * 0.4 + phase * 2.4) * 0.04;
        return w1 + w2 + w3;
      }

      void renderSilkRibbon(
        vec2 p,
        float angle,
        float baseY,
        float baseWidth,
        float speed,
        float freq,
        float phase,
        float colorOffset,
        float opacity,
        inout vec3 accumColor,
        inout float accumAlpha
      ) {
        float ca = cos(angle);
        float sa = sin(angle);
        vec2 rotP = vec2(p.x * ca - p.y * sa, p.x * sa + p.y * ca);

        float u = rotP.x;
        float v = rotP.y;

        float dynamicWidth = baseWidth * (0.80 + 0.25 * sin(u * 1.6 + uTime * speed * 0.6 + phase));
        float centerWave = getWave(u, uTime, speed, freq, phase);
        float dist = v - (baseY + centerWave);
        float normDist = dist / dynamicWidth;
        float absNorm = abs(normDist);

        if (absNorm < 1.0) {
          float heightProfile = sqrt(1.0 - absNorm * absNorm);
          float edgeAlpha = smoothstep(1.0, 0.05, absNorm);

          float eps = 0.02;
          float wL = getWave(u - eps, uTime, speed, freq, phase);
          float wR = getWave(u + eps, uTime, speed, freq, phase);
          float slopeX = (wR - wL) / (2.0 * eps);

          vec3 N = normalize(vec3(-slopeX * 0.8, -normDist * 0.6, heightProfile * 0.9));
          vec3 L = normalize(vec3(0.6, 0.8, 0.6));
          vec3 V = vec3(0.0, 0.0, 1.0);
          vec3 H = normalize(L + V);

          float NdotL = max(dot(N, L), 0.0);
          float specular = pow(max(dot(N, H), 0.0), 16.0) * 0.85;
          float fresnel = pow(1.0 - max(dot(N, V), 0.0), 2.2) * 0.55;
          vec3 sheen = vec3(1.0, 0.96, 0.92) * (specular + fresnel);

          float colorT = fract(u * 0.18 + uTime * speed * 0.12 + colorOffset);
          vec3 ribbonCol = getSilkColor(colorT);
          vec3 shadeCol = getSilkColor(colorT + 0.22);
          ribbonCol = mix(ribbonCol, shadeCol, smoothstep(-0.6, 0.6, normDist));

          vec3 litColor = ribbonCol * (0.75 + 0.45 * NdotL) + sheen;

          float finalAlpha = edgeAlpha * opacity;
          accumColor += litColor * finalAlpha * (1.0 - accumAlpha * 0.35);
          accumAlpha = min(1.0, accumAlpha + finalAlpha * 0.85);
        }
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 p = uv - 0.5;
        p.x *= (uResolution.x / uResolution.y);

        vec3 color = vec3(0.0);
        float alpha = 0.0;

        renderSilkRibbon(p, -0.32, -0.36, 0.34, 0.42, 0.95, 0.5, 0.00, 0.55, color, alpha);
        renderSilkRibbon(p,  0.22, -0.12, 0.28, 0.52, 1.25, 2.3, 0.26, 0.65, color, alpha);
        renderSilkRibbon(p, -0.16,  0.10, 0.24, 0.62, 1.55, 4.1, 0.48, 0.75, color, alpha);
        renderSilkRibbon(p,  0.28,  0.26, 0.20, 0.72, 1.85, 1.2, 0.70, 0.70, color, alpha);
        renderSilkRibbon(p, -0.10,  0.42, 0.16, 0.82, 2.20, 5.4, 0.90, 0.60, color, alpha);

        float centerDist = abs(uv.x - 0.5);
        float sideBloom = mix(0.42, 1.15, smoothstep(0.06, 0.46, centerDist));
        float rightBias = mix(0.80, 1.30, uv.x);
        float edgeFadeY = smoothstep(0.0, 0.06, uv.y) * (1.0 - smoothstep(0.94, 1.0, uv.y));
        float mask = sideBloom * rightBias * edgeFadeY;

        color *= mask;
        alpha = clamp(alpha * mask, 0.0, 0.96);

        gl_FragColor = vec4(color, alpha);
      }
    `;

    function createShader(
      glCtx: WebGLRenderingContext,
      type: number,
      source: string
    ) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uResLoc = gl.getUniformLocation(program, 'uResolution');

    let rafId: number | null = null;
    let paused = false;
    const startTime = performance.now();

    function resize() {
      if (!canvas || !gl) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(canvas.clientWidth * dpr);
      const height = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      if (uResLoc) gl.uniform2f(uResLoc, canvas.width, canvas.height);
    }

    function render(now: number) {
      if (paused || !gl) return;
      resize();
      if (uTimeLoc) gl.uniform1f(uTimeLoc, (now - startTime) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!reduceMotion) {
        rafId = requestAnimationFrame(render);
      }
    }

    function handleVisibility() {
      paused = document.hidden;
      if (!paused && !reduceMotion && rafId === null) {
        rafId = requestAnimationFrame(render);
      }
    }

    resize();
    render(performance.now());

    const handleResize = () => {
      resize();
      if (reduceMotion || paused) render(performance.now());
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (rafId !== null) cancelAnimationFrame(rafId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="bs-ribbon-canvas" aria-hidden="true" />
  );
}

// ==========================================
// 3. SECTION 2: GOOGLE ADS BUSINESS MODELS
// ==========================================
function BusinessModelsSection({
  onBookAudit,
}: {
  onBookAudit: () => void;
}): JSX.Element {
  return (
    <section className="ga-section" id="services">
      <div className="ga-container">
        <div className="ga-header">
          <div className="ga-eyebrow">BUILT AROUND YOUR BUSINESS</div>
          <h2 className="ga-title">
            Google Ads, tailored to the way you do business.
          </h2>
          <p className="ga-subline">
            From strategy to campaign optimization, every part of your Google
            Ads is built around your goals, economics, and customer journey.
          </p>
          <p className="ga-intro">
            Different businesses need different Google Ads strategies. An
            ecommerce brand needs profitable product-level traffic. A service
            business needs qualified leads. We build your campaigns around the
            economics, buying journey, and growth model that matter to your
            business.
          </p>
        </div>

        <div className="ga-grid">
          {/* CARD 1: ECOMMERCE */}
          <div className="ga-card ga-card-ecomm">
            <div className="ga-card-content">
              <div className="ga-card-tag ga-tag-ecomm">
                <ShoppingBagIcon className="ga-icon-inline" />
                ECOMMERCE
              </div>
              <h3 className="ga-card-title">
                Turn product searches into profitable sales.
              </h3>
              <p className="ga-card-desc">
                From Shopping and Performance Max to Search campaigns, we
                structure and optimize your Google Ads around product margins,
                AOV, conversion rates, and target ROAS—not clicks alone.
              </p>
            </div>

            <div className="ga-visual-stage ga-stage-ecomm">
              <div className="ga-ambient-glow ga-glow-ecomm" />

              <svg className="ga-flow-lines" viewBox="0 0 480 320" fill="none">
                <path
                  d="M 120 70 C 120 140, 240 100, 240 180 C 240 230, 360 210, 370 260"
                  stroke="url(#ecommGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="ga-flow-path"
                />
                <defs>
                  <linearGradient
                    id="ecommGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="ga-float-el ga-ecomm-search">
                <div className="ga-search-bar">
                  <SearchIcon className="ga-search-ico" />
                  <span className="ga-search-query">running shoes</span>
                  <span className="ga-search-badge">High Intent</span>
                </div>
                <div className="ga-ad-preview">
                  <div className="ga-ad-top">
                    <span className="ga-ad-label">Sponsored</span>
                    <span className="ga-ad-domain">bluerun.in/shoes</span>
                  </div>
                  <div className="ga-ad-headline">
                    UltraGlide Pro • Built for Speed
                  </div>
                  <div className="ga-ad-sub">
                    From ₹6,999 • Free 2-Day Delivery • 30-Day Trial
                  </div>
                </div>
              </div>

              <div className="ga-float-el ga-ecomm-product">
                <div className="ga-prod-header">
                  <span className="ga-prod-category">Performance Running</span>
                  <span className="ga-prod-stock">● In Stock</span>
                </div>
                <div className="ga-prod-body">
                  <div className="ga-prod-art">
                    <svg viewBox="0 0 140 70" className="ga-sneaker-svg">
                      <path
                        d="M 15 45 C 30 45, 45 42, 60 30 C 75 18, 95 15, 115 22 C 128 27, 132 35, 130 45 C 125 52, 115 54, 95 54 C 65 54, 45 56, 15 52 Z"
                        fill="url(#shoeBody)"
                      />
                      <path
                        d="M 10 52 C 40 55, 90 55, 132 48 C 135 55, 125 60, 110 60 C 75 60, 35 60, 10 56 Z"
                        fill="#1E293B"
                      />
                      <path
                        d="M 65 30 Q 80 38 105 28"
                        stroke="#F59E0B"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <defs>
                        <linearGradient
                          id="shoeBody"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="ga-prod-info">
                    <div className="ga-prod-title">UltraGlide Speed V3</div>
                    <div className="ga-prod-rating">
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <span>(4.9)</span>
                    </div>
                    <div className="ga-prod-price">₹9,499</div>
                  </div>
                </div>
              </div>

              <div className="ga-float-el ga-ecomm-roas-badge">
                <div className="ga-badge-top">
                  <TrendingUpIcon className="ga-icon-green" />
                  <span>TARGET ROAS</span>
                </div>
                <div className="ga-badge-val">4.3x</div>
                <div className="ga-badge-sub">+38% vs baseline</div>
              </div>

              <div className="ga-float-el ga-ecomm-metrics">
                <div className="ga-metrics-head">
                  <span className="ga-metrics-title">Campaign Economics</span>
                  <span className="ga-live-dot">● Live</span>
                </div>
                <div className="ga-metrics-grid">
                  <div className="ga-metric-item">
                    <span className="ga-metric-label">Ad Spend</span>
                    <span className="ga-metric-value">₹42,000</span>
                  </div>
                  <div className="ga-metric-item ga-metric-highlight">
                    <span className="ga-metric-label">Revenue</span>
                    <span className="ga-metric-value ga-val-green">
                      ₹1,80,600
                    </span>
                  </div>
                  <div className="ga-metric-item">
                    <span className="ga-metric-label">Orders</span>
                    <span className="ga-metric-value">127</span>
                  </div>
                  <div className="ga-metric-item">
                    <span className="ga-metric-label">Avg Order</span>
                    <span className="ga-metric-value">₹1,422</span>
                  </div>
                </div>

                <div className="ga-sparkline-wrap">
                  <svg
                    className="ga-sparkline"
                    viewBox="0 0 200 40"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 35 Q 30 30, 60 26 T 120 18 T 160 12 T 200 4"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 0 35 Q 30 30, 60 26 T 120 18 T 160 12 T 200 4 L 200 40 L 0 40 Z"
                      fill="url(#greenGradient)"
                    />
                    <defs>
                      <linearGradient
                        id="greenGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="#10B981"
                          stopOpacity="0.25"
                        />
                        <stop
                          offset="100%"
                          stopColor="#10B981"
                          stopOpacity="0.0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: LEAD GENERATION */}
          <div className="ga-card ga-card-leadgen">
            <div className="ga-card-content">
              <div className="ga-card-tag ga-tag-leadgen">
                <UserCheckIcon className="ga-icon-inline" />
                LEAD GENERATION
              </div>
              <h3 className="ga-card-title">
                Turn high-intent searches into qualified leads.
              </h3>
              <p className="ga-card-desc">
                For service businesses, we optimize beyond clicks. Campaigns are
                built around high-intent searches, lead quality, conversion
                tracking, and the economics of acquiring a customer.
              </p>
            </div>

            <div className="ga-visual-stage ga-stage-leadgen">
              <div className="ga-ambient-glow ga-glow-leadgen" />

              <svg className="ga-flow-lines" viewBox="0 0 480 320" fill="none">
                <path
                  d="M 90 60 C 90 140, 200 110, 200 170 C 200 230, 360 210, 380 270"
                  stroke="url(#leadGrad)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="ga-flow-path"
                />
                <defs>
                  <linearGradient
                    id="leadGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="ga-float-el ga-lead-search">
                <div className="ga-search-bar">
                  <SearchIcon className="ga-search-ico" />
                  <span className="ga-search-query">
                    interior designer Bangalore
                  </span>
                </div>
                <div className="ga-ad-preview ga-lead-ad-preview">
                  <div className="ga-ad-top">
                    <span className="ga-ad-label">Sponsored</span>
                    <span className="ga-ad-domain">atelierliving.in</span>
                  </div>
                  <div className="ga-ad-headline">
                    Atelier Living • Luxury Interior Studio
                  </div>
                  <div className="ga-ad-sub">
                    Award-Winning Residential Designers • Book Free Consultation
                  </div>
                </div>
              </div>

              <div className="ga-float-el ga-lead-landing">
                <div className="ga-browser-chrome">
                  <div className="ga-browser-dots">
                    <span className="ga-dot" />
                    <span className="ga-dot" />
                    <span className="ga-dot" />
                  </div>
                  <span className="ga-browser-url">
                    atelierliving.in/consult
                  </span>
                </div>
                <div className="ga-landing-body">
                  <div className="ga-landing-tag">RESIDENTIAL & COMMERCIAL</div>
                  <div className="ga-landing-h1">
                    Transform your home into timeless luxury.
                  </div>
                  <div className="ga-landing-btn">
                    <span>Get a Free Consultation</span>
                    <ArrowRightIcon className="ga-btn-arrow" />
                  </div>
                </div>
              </div>

              <div className="ga-float-el ga-lead-notification">
                <div className="ga-notif-header">
                  <div className="ga-notif-pill">
                    <span className="ga-pulse-dot" />
                    NEW QUALIFIED INQUIRY
                  </div>
                  <span className="ga-notif-time">Just now</span>
                </div>
                <div className="ga-notif-body">
                  <div className="ga-avatar">RS</div>
                  <div className="ga-lead-details">
                    <div className="ga-lead-name">Rahul Sharma</div>
                    <div className="ga-lead-project">
                      4 BHK Penthouse • Indiranagar
                    </div>
                  </div>
                  <div className="ga-lead-val-badge">
                    <span className="ga-lead-val-sub">Est. Value</span>
                    <span className="ga-lead-val-amount">₹8,00,000</span>
                  </div>
                </div>
                <div className="ga-lead-status-bar">
                  <span className="ga-status-tag">
                    <CheckCircleIcon className="ga-icon-green-sm" />
                    Lead Quality: <strong>High Intent Match</strong>
                  </span>
                </div>
              </div>

              <div className="ga-float-el ga-lead-metrics">
                <div className="ga-lead-metrics-row">
                  <div className="ga-lead-m-item">
                    <span className="ga-m-label">Leads</span>
                    <span className="ga-m-val">124</span>
                  </div>
                  <div className="ga-lead-m-item">
                    <span className="ga-m-label">Cost / Lead</span>
                    <span className="ga-m-val">₹684</span>
                  </div>
                  <div className="ga-lead-m-item ga-highlight-m">
                    <span className="ga-m-label">Qualified</span>
                    <span className="ga-m-val ga-val-emerald">31.4%</span>
                  </div>
                  <div className="ga-lead-m-item">
                    <span className="ga-m-label">Pipeline</span>
                    <span className="ga-m-val ga-val-blue">₹42.5L</span>
                  </div>
                </div>

                <div className="ga-mini-bars">
                  <div className="ga-bar-col">
                    <div className="ga-bar-fill" style={{ height: '45%' }} />
                  </div>
                  <div className="ga-bar-col">
                    <div className="ga-bar-fill" style={{ height: '55%' }} />
                  </div>
                  <div className="ga-bar-col">
                    <div className="ga-bar-fill" style={{ height: '68%' }} />
                  </div>
                  <div className="ga-bar-col">
                    <div className="ga-bar-fill" style={{ height: '60%' }} />
                  </div>
                  <div className="ga-bar-col">
                    <div className="ga-bar-fill" style={{ height: '80%' }} />
                  </div>
                  <div className="ga-bar-col">
                    <div
                      className="ga-bar-fill ga-bar-accent"
                      style={{ height: '95%' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="ga-footer">
          <div className="ga-footer-card">
            <div className="ga-footer-eyebrow">
              ONE GOOGLE ADS PLATFORM. DIFFERENT STRATEGIES.
            </div>
            <p className="ga-footer-statement">
              Whether you're selling products online or generating high-value
              leads, your campaigns should reflect how customers discover,
              evaluate, and ultimately buy from you.
            </p>

            <div className="ga-cta-box">
              <div className="ga-cta-prompt">
                Want to see what this could look like for your business?
              </div>
              <p className="ga-cta-sub">
                Get a free Google Ads audit and uncover where your campaigns can
                perform better.
              </p>
              <button
                className="ga-cta-btn"
                type="button"
                onClick={onBookAudit}
              >
                <span>Book Free Audit</span>
                <ArrowRightIcon className="ga-cta-arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 4. SECTION 3: WHY GOOGLE ADS
// ==========================================
interface StreamLine {
  angle: number;
  length: number;
  innerRadius: number;
  speed: number;
  particlePos: number;
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

function WhyGoogleAdsSection({
  onWorkWithUs,
}: {
  onWorkWithUs: () => void;
}): JSX.Element {
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

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const colors = [
      'rgba(147, 51, 234, ',
      'rgba(168, 85, 247, ',
      'rgba(99, 102, 241, ',
      'rgba(236, 72, 153, ',
      'rgba(59, 130, 246, ',
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

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      const centerX = width / 2 + mouseX;
      const centerY = height / 2 + mouseY;

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

        if (line.hasParticle) {
          const particleDist =
            line.innerRadius +
            line.particlePos * (line.length - line.innerRadius);
          const px = centerX + cosA * particleDist;
          const py = centerY + sinA * particleDist;

          const lifeAlpha =
            Math.sin(line.particlePos * Math.PI) * (line.baseAlpha * 2.8);

          ctx.fillStyle = `${line.color}${Math.min(0.9, lifeAlpha)})`;
          ctx.beginPath();
          ctx.arc(px, py, line.particleSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const innerCoreRadius = width < 640 ? 24 : 30;

      ctx.strokeStyle = 'rgba(147, 51, 234, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerCoreRadius + 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowColor = 'rgba(168, 85, 247, 0.25)';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(centerX, centerY, innerCoreRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.strokeStyle = 'rgba(226, 232, 240, 0.9)';
      ctx.lineWidth = 1;
      ctx.stroke();

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

  return (
    <section
      className="wga-section"
      id="why-google-ads"
      aria-labelledby="wga-headline"
    >
      <div className="wga-container">
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

        <div className="wga-visual-wrapper" ref={containerRef}>
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

        <footer className="wga-footer">
          <div className="wga-footer-card">
            <h3 className="wga-footer-title">
              Ready to turn search intent into growth?
            </h3>
            <div className="wga-cta-action">
              <button
                type="button"
                className="wga-btn-primary"
                onClick={onWorkWithUs}
              >
                <span>Work with us</span>
                <span className="wga-arrow" aria-hidden="true">
                  →
                </span>
              </button>
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

// ==========================================
// 5. NEW SECTION: WHAT BLUESCALE ADS PROVIDES
// ==========================================
function WhatWeProvideSection({
  onWorkWithUs,
}: {
  onWorkWithUs: () => void;
}): JSX.Element {
  return (
    <section className="dw-provide-section" id="what-we-provide">
      <div className="dw-container">
        {/* Section Header */}
        <header className="dw-provide-header">
          <div className="dw-eyebrow">WHAT WE PROVIDE</div>
          <h2 className="dw-section-title">
            Google Ads management built around your growth.
          </h2>
          <p className="dw-section-sub">
            From account structure and tracking to ongoing optimization, we
            manage the critical parts of your Google Ads operation with one
            goal: turning your advertising budget into measurable business
            results.
          </p>
        </header>

        {/* 4 Editorial Framework Points */}
        <div className="dw-points-list">
          {/* POINT 01 */}
          <article className="dw-point-row dw-row-normal">
            <div className="dw-point-text">
              <span className="dw-point-num">01</span>
              <h3 className="dw-point-title">
                Strategic Campaign Architecture
              </h3>
              <p className="dw-point-desc">
                We structure your Google Ads account around your business goals,
                customer journey, products, services, and economics—not a
                one-size-fits-all template.
              </p>
            </div>
            <div className="dw-point-graphic">
              <div className="dw-graphic-frame dw-frame-nodes">
                <div className="dw-node-center">
                  <span className="dw-node-pulse" />
                  <span className="dw-node-label">Campaign Strategy</span>
                </div>
                <div className="dw-sat-node dw-sat-1">Search</div>
                <div className="dw-sat-node dw-sat-2">Shopping</div>
                <div className="dw-sat-node dw-sat-3">Keywords</div>
                <div className="dw-sat-node dw-sat-4">Audiences</div>
                <div className="dw-sat-node dw-sat-5">Conversions</div>
                <svg
                  className="dw-connect-svg"
                  viewBox="0 0 320 220"
                  fill="none"
                >
                  <line
                    x1="160"
                    y1="110"
                    x2="60"
                    y2="40"
                    stroke="rgba(0, 240, 255, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="160"
                    y1="110"
                    x2="260"
                    y2="40"
                    stroke="rgba(14, 165, 233, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="160"
                    y1="110"
                    x2="40"
                    y2="170"
                    stroke="rgba(37, 99, 235, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="160"
                    y1="110"
                    x2="160"
                    y2="190"
                    stroke="rgba(56, 189, 248, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1="160"
                    y1="110"
                    x2="280"
                    y2="170"
                    stroke="rgba(0, 240, 255, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                </svg>
              </div>
            </div>
          </article>

          <div className="dw-point-divider" />

          {/* POINT 02 */}
          <article className="dw-point-row dw-row-reversed">
            <div className="dw-point-text">
              <span className="dw-point-num">02</span>
              <h3 className="dw-point-title">
                Conversion Tracking & Measurement
              </h3>
              <p className="dw-point-desc">
                We make sure the actions that matter to your business are being
                measured correctly, giving optimization decisions a reliable
                foundation.
              </p>
            </div>
            <div className="dw-point-graphic">
              <div className="dw-graphic-frame dw-frame-pipeline">
                <div className="dw-pipe-step">
                  <div className="dw-pipe-icon">Ad Click</div>
                  <span className="dw-pipe-sub">High-Intent Query</span>
                </div>
                <div className="dw-pipe-arrow">
                  <span className="dw-flowing-dot" />→
                </div>
                <div className="dw-pipe-step">
                  <div className="dw-pipe-icon">Website</div>
                  <span className="dw-pipe-sub">Landing Conversion</span>
                </div>
                <div className="dw-pipe-arrow">
                  <span
                    className="dw-flowing-dot"
                    style={{ animationDelay: '0.8s' }}
                  />
                  →
                </div>
                <div className="dw-pipe-step">
                  <div className="dw-pipe-icon dw-pipe-highlight">
                    Conversion
                  </div>
                  <span className="dw-pipe-sub">Qualified Action</span>
                </div>
                <div className="dw-pipe-arrow">
                  <span
                    className="dw-flowing-dot"
                    style={{ animationDelay: '1.6s' }}
                  />
                  →
                </div>
                <div className="dw-pipe-step">
                  <div className="dw-pipe-icon dw-pipe-accent">Revenue</div>
                  <span className="dw-pipe-sub">Target ROAS</span>
                </div>
              </div>
            </div>
          </article>

          <div className="dw-point-divider" />

          {/* POINT 03 */}
          <article className="dw-point-row dw-row-normal">
            <div className="dw-point-text">
              <span className="dw-point-num">03</span>
              <h3 className="dw-point-title">Hands-On Campaign Management</h3>
              <p className="dw-point-desc">
                We actively manage your campaigns—not simply monitor them. From
                search terms and bids to budgets, targeting, ads, and product
                performance, we continuously look for opportunities to improve
                results.
              </p>
            </div>
            <div className="dw-point-graphic">
              <div className="dw-graphic-frame dw-frame-dashboard">
                <div className="dw-dash-head">
                  <span className="dw-dash-live">● ACTIVE MONITORING</span>
                  <span className="dw-dash-name">P-Max & Search Core</span>
                </div>
                <div className="dw-dash-metrics">
                  <div className="dw-dash-metric">
                    <span className="dw-dm-label">Spend</span>
                    <span className="dw-dm-val">₹84,500</span>
                  </div>
                  <div className="dw-dash-metric">
                    <span className="dw-dm-label">Conversions</span>
                    <span className="dw-dm-val">184</span>
                  </div>
                  <div className="dw-dash-metric">
                    <span className="dw-dm-label">CPA</span>
                    <span className="dw-dm-val dw-dm-green">₹459</span>
                  </div>
                  <div className="dw-dash-metric">
                    <span className="dw-dm-label">ROAS</span>
                    <span className="dw-dm-val dw-dm-cyan">4.6x</span>
                  </div>
                </div>
                <div className="dw-dash-trend">
                  <svg
                    viewBox="0 0 280 44"
                    className="dw-trend-svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 0 38 Q 40 32, 80 28 T 150 16 T 220 12 T 280 4"
                      fill="none"
                      stroke="#00F0FF"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 0 38 Q 40 32, 80 28 T 150 16 T 220 12 T 280 4 L 280 44 L 0 44 Z"
                      fill="url(#dashGrad)"
                      opacity="0.2"
                    />
                    <defs>
                      <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00F0FF" />
                        <stop
                          offset="100%"
                          stopColor="#00F0FF"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </article>

          <div className="dw-point-divider" />

          {/* POINT 04 */}
          <article className="dw-point-row dw-row-reversed">
            <div className="dw-point-text">
              <span className="dw-point-num">04</span>
              <h3 className="dw-point-title">Continuous Optimization</h3>
              <p className="dw-point-desc">
                As performance data accumulates, we identify what is working,
                cut wasted spend, and redirect budget toward campaigns,
                products, keywords, and audiences with stronger potential.
              </p>
            </div>
            <div className="dw-point-graphic">
              <div className="dw-graphic-frame dw-frame-opt">
                <div className="dw-opt-lane dw-opt-in">
                  <span className="dw-opt-tag">RAW DATA</span>
                  <div
                    className="dw-sig-dot dw-sig-bad"
                    title="Negative Search Cut"
                  />
                  <div className="dw-sig-dot dw-sig-good" title="High Intent" />
                  <div className="dw-sig-dot dw-sig-bad" />
                  <div className="dw-sig-dot dw-sig-good" />
                </div>
                <div className="dw-opt-gate">
                  <div className="dw-gate-scanner" />
                  <span className="dw-gate-label">FILTER ENGINE</span>
                </div>
                <div className="dw-opt-lane dw-opt-out">
                  <span className="dw-opt-tag dw-tag-accent">
                    GROWTH ALLOCATION
                  </span>
                  <div className="dw-growth-target">
                    <span className="dw-growth-plus">+42%</span>
                    <span className="dw-growth-txt">
                      High-ROAS Keywords & Audiences
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Section Bottom CTA */}
        <div className="dw-provide-cta-banner">
          <h3 className="dw-cta-banner-title">
            Ready to build a better-performing Google Ads operation?
          </h3>
          <button
            type="button"
            className="bs-btn bs-btn-primary bs-btn-lg"
            onClick={onWorkWithUs}
          >
            <span>Work with us</span>
            <span className="dw-cta-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 6. NEW SECTION: FREQUENTLY ASKED QUESTIONS
// ==========================================
const FAQ_DATA = [
  {
    q: 'What is Google Ads?',
    a: "Google Ads is Google's paid advertising platform that allows businesses to appear when potential customers search for relevant products, services, or solutions. Unlike many forms of advertising, it can put your business in front of people who are already expressing intent through their search.",
  },
  {
    q: 'What happens after I submit the form?',
    a: "Once you submit your details, we'll get in touch to understand your business, current advertising setup, goals, and challenges. If Google Ads looks like a good fit, we'll discuss what we'd recommend and how we could work together.",
  },
  {
    q: "What's the minimum monthly ad budget you work with?",
    a: 'The right budget depends on your industry, location, offer, average customer value, and competitive landscape. We generally prefer working with businesses that have enough budget to generate meaningful data and give campaigns room to optimize.',
  },
  {
    q: 'How long does it take to see results with Google Ads?',
    a: 'Google Ads does not produce identical results for every business. Campaign performance depends on factors such as your offer, market, competition, website, tracking, budget, and account history. We focus on establishing reliable data first and then using that data to make increasingly informed optimization decisions.',
  },
  {
    q: 'What is the difference between Meta Ads and Google Ads?',
    a: 'Google Ads primarily captures existing demand by reaching people who are actively searching. Meta Ads can be particularly effective for generating and shaping demand through visual and social discovery. Which platform makes more sense depends on your business, customer journey, and acquisition economics.',
  },
  {
    q: 'Will you need access to my Google Ads account?',
    a: 'Yes. To properly manage and optimize your campaigns, we need appropriate access to your Google Ads account and, where relevant, associated measurement platforms such as Google Analytics and Google Tag Manager.',
  },
  {
    q: 'Are there any long-term contracts?',
    a: 'Our goal is to earn your business through performance and transparency rather than lock you into a long-term commitment. The exact engagement terms can be discussed during the strategy call.',
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'Yes. Google Ads can be managed remotely, and we can work with businesses in different markets provided there is a good fit between the business, advertising opportunity, and our capabilities.',
  },
];

function FaqSection(): JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="dw-faq-section" id="faqs">
      <div className="dw-container dw-faq-container">
        <header className="dw-faq-header">
          <div className="dw-eyebrow">COMMON QUESTIONS</div>
          <h2 className="dw-section-title">Frequently Asked Questions</h2>
        </header>

        <div className="dw-faq-accordion">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className={`dw-faq-item ${isOpen ? 'dw-faq-item-open' : ''}`}
              >
                <button
                  type="button"
                  className="dw-faq-trigger"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="dw-faq-question">{item.q}</span>
                  <span className="dw-faq-toggle-icon" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="dw-faq-content">
                    <div className="dw-faq-divider" />
                    <p className="dw-faq-answer">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 7. NEW SECTION: FINAL CTA
// ==========================================
function FinalCtaSection({
  onBookStrategy,
}: {
  onBookStrategy: () => void;
}): JSX.Element {
  return (
    <section className="dw-final-cta-section" id="contact">
      <div className="dw-container">
        <div className="dw-final-cta-card">
          <div className="dw-final-glow" aria-hidden="true" />
          <div className="dw-eyebrow">READY TO GROW?</div>
          <h2 className="dw-final-headline">
            Ready to make your Google Ads work harder?
          </h2>
          <p className="dw-final-sub">
            Let's look at your current setup, understand where the biggest
            opportunities are, and determine whether Bluescale Ads can help.
          </p>

          <div className="dw-final-btn-wrap">
            <button
              type="button"
              className="bs-btn bs-btn-primary bs-btn-lg"
              onClick={onBookStrategy}
            >
              <span>Book Strategy Call</span>
              <span className="dw-cta-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>

          <ul className="dw-trust-pills">
            <li>✓ Free initial consultation</li>
            <li>✓ No long-term lock-in</li>
            <li>✓ Transparent communication</li>
            <li>✓ Performance-focused management</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ==========================================
// 8. NEW SECTION: PREMIUM FOOTER
// ==========================================
function FooterSection({
  onOpenModal,
}: {
  onOpenModal: () => void;
}): JSX.Element {
  return (
    <footer className="dw-footer">
      <div className="dw-container dw-footer-inner">
        <div className="dw-footer-brand-col">
          <div className="bs-logo">
            <DigiwaveMark />
            <span className="bs-logo-text">Bluescale Ads</span>
          </div>
          <p className="dw-footer-desc">
            Performance-focused Google Ads management for businesses ready to
            grow.
          </p>
        </div>

        <div className="dw-footer-links-col">
          <span className="dw-footer-heading">Navigation</span>
          <ul className="dw-footer-links">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#why-google-ads">Why Google Ads</a>
            </li>
            <li>
              <a href="#faqs">FAQs</a>
            </li>
            <li>
              <button
                type="button"
                className="dw-footer-link-btn"
                onClick={onOpenModal}
              >
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div className="dw-footer-links-col">
          <span className="dw-footer-heading">Focus Areas</span>
          <ul className="dw-footer-links">
            <li>
              <span>Google Ads</span>
            </li>
            <li>
              <span>Google Ads Management</span>
            </li>
            <li>
              <span>Campaign Strategy</span>
            </li>
            <li>
              <span>Conversion Tracking</span>
            </li>
            <li>
              <span>Optimization</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="dw-container dw-footer-bottom">
        <div className="dw-footer-bottom-line">
          <p>© 2026 Bluescale Ads. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ==========================================
// 9. THANK YOU PAGE VIEW
// ==========================================
function ThankYouPage({
  name,
  onBackToHome,
}: {
  name: string;
  onBackToHome: () => void;
}): JSX.Element {
  const firstName = name.trim() ? name.trim().split(' ')[0] : 'there';

  return (
    <div className="ty-root">
      <header className="ty-header">
        <div className="ty-container ty-header-inner">
          <div
            className="ty-logo"
            onClick={onBackToHome}
            role="button"
            tabIndex={0}
          >
            <DigiwaveMark />
            <span className="ty-logo-text">Bluescale Ads</span>
          </div>
        </div>
      </header>

      <main className="ty-main">
        <div className="ty-container">
          <div className="ty-card">
            <div className="ty-badge">
              <span className="ty-pulse" />
              SUBMISSION RECEIVED
            </div>

            <div className="ty-icon-wrap">
              <svg
                className="ty-check-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h1 className="ty-title">Thank you, {firstName}!</h1>
            <p className="ty-desc">
              We have received your details. A growth strategist from{' '}
              <strong>Bluescale Ads</strong> will review your information and
              reach out directly on <strong>WhatsApp / phone shortly</strong> to
              confirm a time for your strategy session.
            </p>

            <div className="ty-timeline">
              <div className="ty-step">
                <div className="ty-step-num">1</div>
                <div className="ty-step-text">
                  <strong>Initial Review</strong>
                  <span>
                    We assess your website and industry growth economics.
                  </span>
                </div>
              </div>
              <div className="ty-step">
                <div className="ty-step-num">2</div>
                <div className="ty-step-text">
                  <strong>Direct Message</strong>
                  <span>
                    Our strategist messages you to lock in a suitable call time.
                  </span>
                </div>
              </div>
              <div className="ty-step">
                <div className="ty-step-num">3</div>
                <div className="ty-step-text">
                  <strong>Action Plan</strong>
                  <span>
                    We present the customized Google Ads strategy & audit
                    insights.
                  </span>
                </div>
              </div>
            </div>

            <button
              className="ty-btn-primary"
              onClick={onBackToHome}
              type="button"
            >
              ← Return to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// 10. BOOKING FORM MODAL
// ==========================================
interface BookingModalProps {
  open: boolean;
  title: string;
  subtitle: string;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

function BookingModal({
  open,
  title,
  subtitle,
  onClose,
  onSuccess,
}: BookingModalProps): JSX.Element | null {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(
        () => nameInputRef.current && nameInputRef.current.focus(),
        10
      );
    } else {
      setName('');
      setPhone('');
      setLoading(false);
      setErrorMsg('');
    }
  }, [open]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!phone.trim() || phone.replace(/[^\d]/g, '').length < 6) {
      setErrorMsg('Please enter a valid phone number.');
      return;
    }

    setErrorMsg('');
    setLoading(true);

    fetch(BOOKING_API_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
    }).catch(() => {});

    setTimeout(() => {
      setLoading(false);
      onSuccess(name);
    }, 300);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="bs-overlay" onMouseDown={handleOverlayClick}>
      <div className="bs-modal" role="dialog" aria-modal="true">
        <button
          className="bs-modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        <h3 className="bs-modal-title">{title}</h3>
        <p className="bs-modal-sub">{subtitle}</p>

        <form className="bs-form" onSubmit={handleSubmit} noValidate>
          <div className="bs-field">
            <label htmlFor="modal-name">Name</label>
            <input
              id="modal-name"
              type="text"
              ref={nameInputRef}
              value={name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              placeholder="Jane Cooper"
              disabled={loading}
              autoComplete="name"
            />
          </div>

          <div className="bs-field">
            <label htmlFor="modal-phone">Phone number</label>
            <input
              id="modal-phone"
              type="tel"
              value={phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPhone(e.target.value)
              }
              placeholder="+91 98765 43210"
              disabled={loading}
              autoComplete="tel"
            />
          </div>

          {errorMsg && <div className="bs-error-banner">{errorMsg}</div>}

          <button
            type="submit"
            className="bs-btn bs-btn-primary bs-btn-block"
            disabled={loading}
          >
            {loading ? 'Submitting…' : 'Confirm Details →'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 11. MAIN APP COMPONENT
// ==========================================
export default function App(): JSX.Element {
  const [currentPage, setCurrentPage] = useState<'landing' | 'thank-you'>(
    'landing'
  );
  const [submittedName, setSubmittedName] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>(
    'Book your strategy call'
  );
  const [modalSubtitle, setModalSubtitle] = useState<string>(
    'Share a few details and our team will confirm a time over WhatsApp.'
  );

  const openStrategyModal = () => {
    setModalTitle('Book your strategy call');
    setModalSubtitle(
      'Share a few details and our growth team will reach out directly.'
    );
    setModalOpen(true);
  };

  const openAuditModal = () => {
    setModalTitle('Get your free Google Ads audit');
    setModalSubtitle(
      'Share your name and phone number to claim your comprehensive account audit.'
    );
    setModalOpen(true);
  };

  const handleBookingSuccess = (name: string) => {
    setModalOpen(false);
    setSubmittedName(name);
    setCurrentPage('thank-you');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentPage === 'thank-you') {
    return (
      <>
        <style>{STYLES}</style>
        <ThankYouPage
          name={submittedName}
          onBackToHome={() => {
            setCurrentPage('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </>
    );
  }

  return (
    <div className="bs-root">
      <style>{STYLES}</style>

      {/* Sticky Navigation Header */}
      <header className="bs-header">
        <div className="bs-container bs-header-inner">
          <a href="/" className="bs-logo" aria-label="Bluescale Ads home">
            <DigiwaveMark />
            <span className="bs-logo-text">Bluescale Ads</span>
          </a>
          <button
            className="bs-btn bs-btn-primary bs-btn-sm"
            onClick={openStrategyModal}
          >
            Book Strategy Call
          </button>
        </div>
      </header>

      <main>
        {/* SECTION 1: HERO */}
        <section className="bs-hero">
          <RibbonBackground />
          <div className="bs-hero-scrim" aria-hidden="true"></div>

          <div className="bs-container bs-hero-inner">
            <h1 className="bs-hero-title">
              Performance Focused Google Ads Strategies for Growing Businesses
            </h1>
            <p className="bs-hero-sub">
              Building and managing Google Ads campaigns designed to generate
              more leads, sales, and revenue for your business.
            </p>
            <button
              className="bs-btn bs-btn-primary bs-btn-lg"
              onClick={openStrategyModal}
            >
              Book Strategy Call
            </button>

            <ul className="bs-fud">
              <li>No lock-in contracts</li>
              <li>Flat-fee pricing</li>
              <li>Full transparency</li>
              <li>Free account audit</li>
            </ul>
          </div>
        </section>

        {/* SECTION 2: BUSINESS MODELS */}
        <BusinessModelsSection onBookAudit={openAuditModal} />

        {/* SECTION 3: WHY GOOGLE ADS */}
        <WhyGoogleAdsSection onWorkWithUs={openStrategyModal} />

        {/* SECTION 4: WHAT WE PROVIDE */}
        <WhatWeProvideSection onWorkWithUs={openStrategyModal} />

        {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
        <FaqSection />

        {/* SECTION 6: FINAL CALL TO ACTION */}
        <FinalCtaSection onBookStrategy={openStrategyModal} />
      </main>

      {/* SECTION 7: FOOTER */}
      <FooterSection onOpenModal={openStrategyModal} />

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="dw-whatsapp-fab"
        aria-label="Chat with Bluescale Ads on WhatsApp"
      >
        <WhatsAppIcon className="dw-wa-icon" />
        <span className="dw-wa-tooltip">Quick Chat on WhatsApp</span>
      </a>

      {/* SHARED BOOKING MODAL */}
      <BookingModal
        open={modalOpen}
        title={modalTitle}
        subtitle={modalSubtitle}
        onClose={() => setModalOpen(false)}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}

// ==========================================
// 12. UNIFIED STYLES
// ==========================================
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

/* Base */
.bs-root {
  --bs-bg: #ffffff;
  --bs-ink: #0b1220;
  --bs-ink-soft: #55606f;
  --bs-line: #e7e9ee;
  --bs-surface: #f7f8fa;
  --bs-accent: #2952ff;
  --bs-accent-ink: #17399e;
  --bs-accent-tint: #eef1ff;
  --bs-radius: 10px;
  --bs-max: 1120px;

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--bs-ink);
  background: var(--bs-bg);
  -webkit-font-smoothing: antialiased;
}

.bs-root *, .bs-root *::before, .bs-root *::after {
  box-sizing: border-box;
}

.bs-container {
  max-width: var(--bs-max);
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
.bs-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid var(--bs-line);
}

.bs-header-inner {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.bs-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
}

.bs-logo-mark {
  width: 24px;
  height: 20px;
  display: block;
  flex-shrink: 0;
}

.bs-logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--bs-ink);
}

/* Buttons */
.bs-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.bs-btn:active {
  transform: translateY(1px);
}

.bs-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.bs-btn-primary {
  background: var(--bs-accent);
  color: #ffffff;
}

.bs-btn-primary:hover:not(:disabled) {
  background: var(--bs-accent-ink);
}

.bs-btn-sm {
  padding: 8px 16px;
  font-size: 0.875rem;
}

.bs-btn-lg {
  padding: 14px 28px;
  font-size: 1rem;
}

.bs-btn-block {
  width: 100%;
}

/* Hero */
.bs-hero {
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--bs-line);
  background: #ffffff;
}

.bs-ribbon-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.bs-hero-scrim {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 65% 70% at 50% 50%,
    rgba(255, 255, 255, 0.78) 0%,
    rgba(255, 255, 255, 0.40) 55%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

.bs-hero-inner {
  position: relative;
  z-index: 1;
  padding: 128px 24px 96px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.bs-hero-title {
  margin: 0;
  max-width: 820px;
  font-size: clamp(2.35rem, 4.8vw, 3.9rem);
  line-height: 1.08;
  letter-spacing: -0.025em;
  font-weight: 700;
  color: var(--bs-ink);
}

.bs-hero-sub {
  margin: 24px 0 0;
  max-width: 560px;
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--bs-ink-soft);
}

.bs-hero .bs-btn-lg {
  margin-top: 36px;
}

.bs-fud {
  list-style: none;
  margin: 24px 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px 20px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--bs-ink-soft);
}

.bs-fud li {
  position: relative;
  padding-left: 16px;
}

.bs-fud li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--bs-accent);
}

/* Modal */
.bs-overlay {
  position: fixed;
  inset: 0;
  background: rgba(11, 18, 32, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
}

.bs-modal {
  position: relative;
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid var(--bs-line);
  box-shadow: 0 20px 60px rgba(11, 18, 32, 0.2);
  padding: 36px 32px 32px;
}

.bs-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--bs-ink-soft);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  border-radius: 6px;
}

.bs-modal-close:hover {
  background: var(--bs-surface);
  color: var(--bs-ink);
}

.bs-modal-title {
  margin: 0 0 8px;
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--bs-ink);
}

.bs-modal-sub {
  margin: 0 0 24px;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: var(--bs-ink-soft);
}

.bs-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.bs-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bs-field label {
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--bs-ink);
}

.bs-field input {
  font-family: inherit;
  font-size: 0.9375rem;
  padding: 11px 14px;
  border: 1px solid var(--bs-line);
  border-radius: 8px;
  color: var(--bs-ink);
  background: #ffffff;
  outline: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.bs-field input:focus {
  border-color: var(--bs-accent);
  box-shadow: 0 0 0 3px var(--bs-accent-tint);
}

.bs-error-banner {
  font-size: 0.8125rem;
  color: #d92d20;
  background: #fef3f2;
  border: 1px solid #fecdca;
  border-radius: 6px;
  padding: 8px 12px;
}

/* Business Models Section */
.ga-section {
  --ga-bg: #FAFBFC;
  --ga-surface: #FFFFFF;
  --ga-border: #E5E7EB;
  --ga-border-subtle: #F1F3F5;
  --ga-ink-primary: #0F172A;
  --ga-ink-secondary: #475569;
  --ga-ink-tertiary: #94A3B8;
  --ga-brand-blue: #2563EB;
  --ga-shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
  --ga-shadow-card: 0 20px 45px -15px rgba(15, 23, 42, 0.07), 0 0 0 1px rgba(229, 231, 235, 0.8);
  --ga-shadow-float: 0 12px 30px -8px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(229, 231, 235, 0.9);

  background-color: var(--ga-bg);
  padding: 120px 24px;
  position: relative;
  overflow: hidden;
}

.ga-container {
  max-width: 1280px;
  margin: 0 auto;
}

.ga-header {
  text-align: center;
  max-width: 860px;
  margin: 0 auto 72px;
}

.ga-eyebrow {
  display: inline-block;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ga-brand-blue);
  background: rgba(37, 99, 235, 0.07);
  padding: 6px 14px;
  border-radius: 9999px;
  margin-bottom: 20px;
  border: 1px solid rgba(37, 99, 235, 0.15);
}

.ga-title {
  font-size: clamp(2.25rem, 4.2vw, 3.25rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  font-weight: 800;
  color: var(--ga-ink-primary);
  margin: 0 0 20px;
}

.ga-subline {
  font-size: 1.1875rem;
  line-height: 1.6;
  color: var(--ga-ink-secondary);
  font-weight: 500;
  margin: 0 0 18px;
}

.ga-intro {
  font-size: 0.9625rem;
  line-height: 1.65;
  color: var(--ga-ink-tertiary);
  max-width: 760px;
  margin: 0 auto;
}

.ga-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  margin-bottom: 56px;
}

.ga-card {
  background: var(--ga-surface);
  border-radius: 28px;
  box-shadow: var(--ga-shadow-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  position: relative;
}

.ga-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 28px 60px -15px rgba(15, 23, 42, 0.11), 0 0 0 1px rgba(209, 213, 219, 1);
}

.ga-card-content {
  padding: 44px 44px 28px;
  position: relative;
  z-index: 2;
}

.ga-card-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 5px 11px;
  border-radius: 6px;
  margin-bottom: 16px;
}

.ga-icon-inline {
  width: 14px;
  height: 14px;
}

.ga-tag-ecomm {
  background: #EFF6FF;
  color: #1D4ED8;
  border: 1px solid #DBEAFE;
}

.ga-tag-leadgen {
  background: #ECFDF5;
  color: #047857;
  border: 1px solid #D1FAE5;
}

.ga-card-title {
  font-size: 1.625rem;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ga-ink-primary);
  margin: 0 0 14px;
}

.ga-card-desc {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--ga-ink-secondary);
  margin: 0;
}

.ga-visual-stage {
  height: 400px;
  position: relative;
  margin: 0 24px 24px;
  border-radius: 20px;
  overflow: hidden;
  background: #F8FAFC;
  border: 1px solid var(--ga-border-subtle);
}

.ga-ambient-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  filter: blur(45px);
  opacity: 0.75;
}

.ga-glow-ecomm {
  background: radial-gradient(circle at 75% 30%, rgba(219, 234, 254, 0.9) 0%, rgba(243, 232, 255, 0.7) 40%, rgba(253, 242, 248, 0.4) 75%);
}

.ga-glow-leadgen {
  background: radial-gradient(circle at 30% 70%, rgba(209, 250, 229, 0.8) 0%, rgba(224, 242, 254, 0.7) 45%, rgba(241, 245, 249, 0.4) 80%);
}

.ga-float-el {
  position: absolute;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 12px;
  box-shadow: var(--ga-shadow-float);
  z-index: 3;
}

.ga-flow-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.ga-flow-path {
  animation: gaDashMove 24s linear infinite;
}

@keyframes gaDashMove {
  to {
    stroke-dashoffset: -100;
  }
}

.ga-ecomm-search {
  top: 18px;
  left: 18px;
  width: 250px;
  padding: 10px 12px;
}

.ga-search-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F1F5F9;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.75rem;
  color: var(--ga-ink-primary);
  margin-bottom: 8px;
}

.ga-search-ico {
  width: 13px;
  height: 13px;
  color: var(--ga-ink-tertiary);
}

.ga-search-query {
  font-weight: 600;
  flex-grow: 1;
}

.ga-search-badge {
  font-size: 0.625rem;
  font-weight: 700;
  color: #2563EB;
  background: #DBEAFE;
  padding: 2px 6px;
  border-radius: 4px;
}

.ga-ad-preview {
  padding: 4px 2px;
}

.ga-ad-top {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 2px;
}

.ga-ad-label {
  font-size: 0.625rem;
  font-weight: 800;
  color: #15803D;
  background: #DCFCE7;
  padding: 1px 4px;
  border-radius: 3px;
}

.ga-ad-domain {
  font-size: 0.6875rem;
  color: var(--ga-ink-tertiary);
}

.ga-ad-headline {
  font-size: 0.75rem;
  font-weight: 700;
  color: #1E40AF;
  line-height: 1.3;
}

.ga-ad-sub {
  font-size: 0.6875rem;
  color: var(--ga-ink-secondary);
  margin-top: 2px;
}

.ga-ecomm-product {
  top: 130px;
  left: 20px;
  width: 220px;
  padding: 12px;
}

.ga-prod-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.625rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.ga-prod-category {
  color: var(--ga-ink-tertiary);
}

.ga-prod-stock {
  color: #10B981;
}

.ga-prod-body {
  display: flex;
  gap: 10px;
  align-items: center;
}

.ga-prod-art {
  width: 70px;
  height: 50px;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ga-sneaker-svg {
  width: 60px;
  height: auto;
}

.ga-prod-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--ga-ink-primary);
}

.ga-prod-rating {
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.625rem;
  color: #D97706;
  margin: 2px 0;
}

.ga-prod-price {
  font-size: 0.8125rem;
  font-weight: 800;
  color: var(--ga-ink-primary);
}

.ga-ecomm-roas-badge {
  top: 32px;
  right: 22px;
  padding: 10px 14px;
  text-align: center;
  background: #FFFFFF;
}

.ga-badge-top {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #059669;
}

.ga-icon-green {
  width: 12px;
  height: 12px;
  color: #059669;
}

.ga-badge-val {
  font-size: 1.375rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--ga-ink-primary);
  line-height: 1.1;
  margin: 3px 0 1px;
}

.ga-badge-sub {
  font-size: 0.625rem;
  font-weight: 600;
  color: #059669;
}

.ga-ecomm-metrics {
  bottom: 16px;
  right: 18px;
  width: 250px;
  padding: 14px;
}

.ga-metrics-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.ga-metrics-title {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ga-ink-secondary);
}

.ga-live-dot {
  font-size: 0.625rem;
  font-weight: 700;
  color: #10B981;
}

.ga-metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 12px;
  margin-bottom: 10px;
}

.ga-metric-item {
  display: flex;
  flex-direction: column;
}

.ga-metric-label {
  font-size: 0.625rem;
  color: var(--ga-ink-tertiary);
  font-weight: 500;
}

.ga-metric-value {
  font-size: 0.875rem;
  font-weight: 800;
  color: var(--ga-ink-primary);
}

.ga-val-green {
  color: #059669;
}

.ga-sparkline-wrap {
  width: 100%;
  height: 32px;
  border-radius: 4px;
  overflow: hidden;
}

.ga-sparkline {
  width: 100%;
  height: 100%;
}

.ga-lead-search {
  top: 18px;
  left: 18px;
  width: 260px;
  padding: 10px 12px;
}

.ga-lead-ad-preview {
  margin-top: 4px;
}

.ga-lead-landing {
  top: 142px;
  left: 24px;
  width: 220px;
  border-radius: 10px;
  overflow: hidden;
}

.ga-browser-chrome {
  background: #F1F5F9;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #E2E8F0;
}

.ga-browser-dots {
  display: flex;
  gap: 3px;
}

.ga-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #CBD5E1;
}

.ga-browser-url {
  font-size: 0.5625rem;
  color: var(--ga-ink-tertiary);
  background: #FFFFFF;
  padding: 1px 6px;
  border-radius: 3px;
  flex-grow: 1;
}

.ga-landing-body {
  padding: 10px;
  background: #FFFFFF;
}

.ga-landing-tag {
  font-size: 0.5rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  color: var(--ga-brand-blue);
  margin-bottom: 2px;
}

.ga-landing-h1 {
  font-size: 0.6875rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--ga-ink-primary);
  margin-bottom: 8px;
}

.ga-landing-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--ga-ink-primary);
  color: #FFFFFF;
  font-size: 0.5625rem;
  font-weight: 600;
  padding: 5px 8px;
  border-radius: 4px;
}

.ga-btn-arrow {
  width: 9px;
  height: 9px;
}

.ga-lead-notification {
  top: 24px;
  right: 18px;
  width: 245px;
  padding: 12px;
}

.ga-notif-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.ga-notif-pill {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: #047857;
  background: #D1FAE5;
  padding: 2px 6px;
  border-radius: 4px;
}

.ga-pulse-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #10B981;
}

.ga-notif-time {
  font-size: 0.5625rem;
  color: var(--ga-ink-tertiary);
}

.ga-notif-body {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.ga-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
}

.ga-lead-details {
  flex-grow: 1;
}

.ga-lead-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--ga-ink-primary);
}

.ga-lead-project {
  font-size: 0.625rem;
  color: var(--ga-ink-secondary);
}

.ga-lead-val-badge {
  text-align: right;
}

.ga-lead-val-sub {
  display: block;
  font-size: 0.5625rem;
  color: var(--ga-ink-tertiary);
}

.ga-lead-val-amount {
  font-size: 0.75rem;
  font-weight: 800;
  color: #059669;
}

.ga-lead-status-bar {
  border-top: 1px solid #F1F5F9;
  padding-top: 6px;
}

.ga-status-tag {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.625rem;
  color: var(--ga-ink-secondary);
}

.ga-icon-green-sm {
  width: 12px;
  height: 12px;
  color: #10B981;
}

.ga-lead-metrics {
  bottom: 16px;
  right: 18px;
  width: 250px;
  padding: 12px 14px;
}

.ga-lead-metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin-bottom: 10px;
}

.ga-lead-m-item {
  display: flex;
  flex-direction: column;
}

.ga-m-label {
  font-size: 0.5625rem;
  color: var(--ga-ink-tertiary);
  font-weight: 500;
}

.ga-m-val {
  font-size: 0.75rem;
  font-weight: 800;
  color: var(--ga-ink-primary);
}

.ga-val-emerald {
  color: #059669;
}

.ga-val-blue {
  color: #2563EB;
}

.ga-mini-bars {
  height: 30px;
  display: flex;
  align-items: flex-end;
  gap: 6px;
  padding-top: 4px;
}

.ga-bar-col {
  flex: 1;
  height: 100%;
  background: #F1F5F9;
  border-radius: 3px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.ga-bar-fill {
  width: 100%;
  background: #93C5FD;
  border-radius: 3px 3px 0 0;
  transition: height 0.5s ease;
}

.ga-bar-accent {
  background: #2563EB;
}

.ga-footer {
  margin-top: 40px;
}

.ga-footer-card {
  background: #FFFFFF;
  border: 1px solid var(--ga-border);
  border-radius: 24px;
  padding: 56px 40px;
  text-align: center;
  box-shadow: var(--ga-shadow-sm);
  max-width: 980px;
  margin: 0 auto;
}

.ga-footer-eyebrow {
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ga-ink-primary);
  margin-bottom: 12px;
}

.ga-footer-statement {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--ga-ink-secondary);
  max-width: 680px;
  margin: 0 auto 36px;
}

.ga-cta-box {
  background: #F8FAFC;
  border: 1px solid var(--ga-border);
  border-radius: 16px;
  padding: 32px 28px;
  max-width: 620px;
  margin: 0 auto;
}

.ga-cta-prompt {
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--ga-ink-primary);
  margin-bottom: 6px;
}

.ga-cta-sub {
  font-size: 0.875rem;
  color: var(--ga-ink-secondary);
  margin: 0 0 20px;
}

.ga-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #0F172A;
  color: #FFFFFF;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  padding: 13px 26px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.18);
}

.ga-cta-btn:hover {
  background: #2563EB;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.28);
}

.ga-cta-btn:active {
  transform: translateY(1px);
}

.ga-cta-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.15s ease;
}

.ga-cta-btn:hover .ga-cta-arrow {
  transform: translateX(3px);
}

/* Why Google Ads Section */
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
  padding: 140px 24px;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid var(--wga-border);
}

.wga-container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

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
  border: none;
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

/* What We Provide Section */
.dw-provide-section {
  background: #080D1A;
  color: #FFFFFF;
  padding: 140px 24px;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dw-container {
  max-width: 1160px;
  margin: 0 auto;
}

.dw-provide-header {
  text-align: center;
  max-width: 820px;
  margin: 0 auto 88px;
}

.dw-eyebrow {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #00F0FF;
  background: rgba(0, 240, 255, 0.08);
  border: 1px solid rgba(0, 240, 255, 0.25);
  padding: 5px 14px;
  border-radius: 9999px;
  margin-bottom: 22px;
}

.dw-section-title {
  font-size: clamp(2.2rem, 4.2vw, 3.4rem);
  line-height: 1.15;
  letter-spacing: -0.03em;
  font-weight: 800;
  margin: 0 0 22px;
  color: #FFFFFF;
}

.dw-section-sub {
  font-size: clamp(1.05rem, 1.8vw, 1.2rem);
  line-height: 1.65;
  color: #94A3B8;
  margin: 0;
}

.dw-points-list {
  display: flex;
  flex-direction: column;
  gap: 72px;
}

.dw-point-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 64px;
}

.dw-row-reversed .dw-point-text {
  order: 2;
}

.dw-row-reversed .dw-point-graphic {
  order: 1;
}

.dw-point-num {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.125rem;
  font-weight: 700;
  color: #00F0FF;
  letter-spacing: 0.05em;
  margin-bottom: 12px;
}

.dw-point-title {
  font-size: clamp(1.6rem, 2.5vw, 2.1rem);
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #FFFFFF;
  margin: 0 0 16px;
}

.dw-point-desc {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: #94A3B8;
  margin: 0;
}

.dw-point-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.03) 100%
  );
}

.dw-graphic-frame {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 28px;
  position: relative;
  min-height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

/* Graphic 01: Node Architecture */
.dw-frame-nodes {
  height: 260px;
}

.dw-node-center {
  background: #00F0FF;
  color: #080D1A;
  font-size: 0.8125rem;
  font-weight: 700;
  padding: 10px 18px;
  border-radius: 9999px;
  position: relative;
  z-index: 2;
  box-shadow: 0 0 25px rgba(0, 240, 255, 0.4);
}

.dw-node-pulse {
  position: absolute;
  inset: -6px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 240, 255, 0.5);
  animation: dwPulse 2.5s infinite;
}

@keyframes dwPulse {
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.2;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
}

.dw-sat-node {
  position: absolute;
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 0.75rem;
  font-weight: 600;
  color: #E2E8F0;
  padding: 6px 14px;
  border-radius: 8px;
  z-index: 2;
}

.dw-sat-1 {
  top: 22px;
  left: 24px;
}
.dw-sat-2 {
  top: 22px;
  right: 24px;
}
.dw-sat-3 {
  bottom: 24px;
  left: 20px;
}
.dw-sat-4 {
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
}
.dw-sat-5 {
  bottom: 24px;
  right: 20px;
}

.dw-connect-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Graphic 02: Pipeline Tracker */
.dw-frame-pipeline {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.dw-pipe-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  flex: 1;
}

.dw-pipe-icon {
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.12);
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 0.8125rem;
  font-weight: 700;
  color: #FFFFFF;
}

.dw-pipe-highlight {
  border-color: #0EA5E9;
  color: #38BDF8;
}

.dw-pipe-accent {
  background: rgba(0, 240, 255, 0.15);
  border-color: #00F0FF;
  color: #00F0FF;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
}

.dw-pipe-sub {
  font-size: 0.625rem;
  color: #94A3B8;
  font-weight: 500;
}

.dw-pipe-arrow {
  color: #475569;
  font-size: 1.1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dw-flowing-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #00F0FF;
  animation: dwFlow 2s infinite ease-in-out;
}

@keyframes dwFlow {
  0% {
    transform: translateX(-14px);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(14px);
    opacity: 0;
  }
}

/* Graphic 03: Dashboard */
.dw-frame-dashboard {
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
}

.dw-dash-head {
  display: flex;
  justify-content: space-between;
  font-size: 0.6875rem;
  font-weight: 700;
}

.dw-dash-live {
  color: #10B981;
  letter-spacing: 0.06em;
}

.dw-dash-name {
  color: #94A3B8;
}

.dw-dash-metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.dw-dash-metric {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.dw-dm-label {
  font-size: 0.625rem;
  color: #94A3B8;
}

.dw-dm-val {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #FFFFFF;
}

.dw-dm-green {
  color: #10B981;
}
.dw-dm-cyan {
  color: #00F0FF;
}

.dw-dash-trend {
  height: 44px;
  border-radius: 6px;
  overflow: hidden;
}

.dw-trend-svg {
  width: 100%;
  height: 100%;
}

/* Graphic 04: Signal Filter */
.dw-frame-opt {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 18px;
}

.dw-opt-lane {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.dw-opt-tag {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #64748B;
}

.dw-tag-accent {
  color: #00F0FF;
}

.dw-sig-dot {
  height: 10px;
  border-radius: 9999px;
  opacity: 0.8;
}

.dw-sig-bad {
  width: 50%;
  background: #475569;
  opacity: 0.35;
}

.dw-sig-good {
  width: 80%;
  background: #0EA5E9;
}

.dw-opt-gate {
  border: 1px dashed rgba(255, 255, 255, 0.25);
  padding: 18px 12px;
  border-radius: 12px;
  text-align: center;
  position: relative;
}

.dw-gate-scanner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #00F0FF;
  box-shadow: 0 0 10px #00F0FF;
  animation: dwScan 2.4s infinite ease-in-out;
}

@keyframes dwScan {
  0%,
  100% {
    top: 0%;
  }
  50% {
    top: 96%;
  }
}

.dw-gate-label {
  font-size: 0.625rem;
  font-weight: 800;
  color: #94A3B8;
  letter-spacing: 0.05em;
}

.dw-growth-target {
  background: rgba(0, 240, 255, 0.12);
  border: 1px solid rgba(0, 240, 255, 0.3);
  padding: 12px 14px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dw-growth-plus {
  font-size: 1.25rem;
  font-weight: 800;
  color: #00F0FF;
}

.dw-growth-txt {
  font-size: 0.6875rem;
  color: #E2E8F0;
  line-height: 1.4;
}

.dw-provide-cta-banner {
  margin-top: 100px;
  text-align: center;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(30, 58, 138, 0.25) 0%,
    rgba(15, 23, 42, 0.6) 80%
  );
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  padding: 64px 32px;
}

.dw-cta-banner-title {
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  font-weight: 800;
  color: #FFFFFF;
  margin: 0 0 32px;
}

.dw-cta-arrow {
  margin-left: 8px;
  display: inline-block;
  transition: transform 0.15s ease;
}

.bs-btn:hover .dw-cta-arrow {
  transform: translateX(4px);
}

/* FAQ Section */
.dw-faq-section {
  background: #060911;
  color: #FFFFFF;
  padding: 140px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dw-faq-container {
  max-width: 900px;
}

.dw-faq-header {
  text-align: center;
  margin-bottom: 64px;
}

.dw-faq-accordion {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dw-faq-item {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.dw-faq-item-open {
  border-color: rgba(0, 240, 255, 0.4);
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 10px 30px -10px rgba(0, 240, 255, 0.15);
}

.dw-faq-trigger {
  width: 100%;
  background: transparent;
  border: none;
  padding: 24px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  cursor: pointer;
  text-align: left;
}

.dw-faq-question {
  font-size: 1.125rem;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.4;
}

.dw-faq-toggle-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #00F0FF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 500;
  flex-shrink: 0;
}

.dw-faq-content {
  padding: 0 28px 26px;
}

.dw-faq-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
  margin-bottom: 18px;
}

.dw-faq-answer {
  font-size: 0.9625rem;
  line-height: 1.7;
  color: #94A3B8;
  margin: 0;
}

/* Final CTA Section */
.dw-final-cta-section {
  background: #080D1A;
  padding: 140px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dw-final-cta-card {
  position: relative;
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(14, 165, 233, 0.15) 0%,
    rgba(15, 23, 42, 0.8) 70%
  );
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 32px;
  padding: 88px 36px;
  text-align: center;
  max-width: 960px;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.7);
}

.dw-final-glow {
  position: absolute;
  top: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(0, 240, 255, 0.25) 0%,
    rgba(37, 99, 235, 0.1) 60%,
    rgba(0, 0, 0, 0) 80%
  );
  filter: blur(60px);
  pointer-events: none;
}

.dw-final-headline {
  font-size: clamp(2.3rem, 4.5vw, 3.6rem);
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.15;
  letter-spacing: -0.03em;
  margin: 0 0 20px;
}

.dw-final-sub {
  font-size: clamp(1.0625rem, 1.8vw, 1.25rem);
  color: #94A3B8;
  max-width: 660px;
  margin: 0 auto 40px;
  line-height: 1.65;
}

.dw-final-btn-wrap {
  margin-bottom: 36px;
}

.dw-trust-pills {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px 24px;
  color: #94A3B8;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Footer */
.dw-footer {
  background: #04060A;
  color: #FFFFFF;
  padding: 88px 24px 44px;
}

.dw-footer-inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
}

.dw-footer-desc {
  font-size: 0.9375rem;
  color: #94A3B8;
  line-height: 1.65;
  max-width: 340px;
  margin: 18px 0 0;
}

.dw-footer-heading {
  display: block;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #FFFFFF;
  margin-bottom: 20px;
}

.dw-footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.dw-footer-links a,
.dw-footer-links span,
.dw-footer-link-btn {
  font-size: 0.875rem;
  color: #94A3B8;
  text-decoration: none;
  transition: color 0.15s ease;
  background: transparent;
  border: none;
  padding: 0;
  text-align: left;
  font-family: inherit;
  cursor: pointer;
}

.dw-footer-links a:hover,
.dw-footer-link-btn:hover {
  color: #00F0FF;
}

.dw-footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 36px;
}

.dw-footer-bottom-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8125rem;
  color: #64748B;
}

/* WhatsApp Floating Button */
.dw-whatsapp-fab {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 90;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: #25D366;
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(37, 211, 102, 0.45);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;
  text-decoration: none;
}

.dw-whatsapp-fab:hover {
  transform: scale(1.08) translateY(-2px);
  box-shadow: 0 14px 30px rgba(37, 211, 102, 0.6);
}

.dw-wa-icon {
  width: 32px;
  height: 32px;
}

.dw-wa-tooltip {
  position: absolute;
  right: 68px;
  background: #0F172A;
  color: #FFFFFF;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(6px);
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.dw-whatsapp-fab:hover .dw-wa-tooltip {
  opacity: 1;
  transform: translateX(0);
}

/* Thank You Page */
.ty-root {
  min-height: 100vh;
  background: #FAFBFC;
  color: #0F172A;
  display: flex;
  flex-direction: column;
}

.ty-container {
  max-width: 840px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.ty-header {
  height: 72px;
  border-bottom: 1px solid #E5E7EB;
  background: #FFFFFF;
  display: flex;
  align-items: center;
}

.ty-header-inner {
  display: flex;
  align-items: center;
}

.ty-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.ty-logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #0B1220;
}

.ty-main {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}

.ty-card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 24px;
  padding: 56px 48px;
  text-align: center;
  box-shadow: 0 20px 45px -15px rgba(15, 23, 42, 0.08);
}

.ty-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #059669;
  background: #ECFDF5;
  border: 1px solid #D1FAE5;
  padding: 5px 12px;
  border-radius: 9999px;
  margin-bottom: 24px;
}

.ty-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10B981;
}

.ty-icon-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #EEF2FF;
  color: #2563EB;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
}

.ty-check-icon {
  width: 32px;
  height: 32px;
}

.ty-title {
  font-size: clamp(2rem, 3.5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.025em;
  margin: 0 0 16px;
  color: #0F172A;
}

.ty-desc {
  font-size: 1.0625rem;
  line-height: 1.65;
  color: #475569;
  max-width: 580px;
  margin: 0 auto 36px;
}

.ty-timeline {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 16px;
  padding: 24px;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 540px;
  margin: 0 auto 40px;
}

.ty-step {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.ty-step-num {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #2563EB;
  color: #FFFFFF;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
}

.ty-step-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ty-step-text strong {
  font-size: 0.875rem;
  color: #0F172A;
}

.ty-step-text span {
  font-size: 0.8125rem;
  color: #64748B;
}

.ty-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #0F172A;
  color: #FFFFFF;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 600;
  padding: 13px 28px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
}

.ty-btn-primary:hover {
  background: #2563EB;
  transform: translateY(-1px);
}

/* Responsiveness */
@media (max-width: 1080px) {
  .ga-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .ga-visual-stage {
    height: 380px;
  }
  .dw-point-row {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .dw-row-reversed .dw-point-text {
    order: 1;
  }
  .dw-row-reversed .dw-point-graphic {
    order: 2;
  }
  .dw-footer-inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

@media (max-width: 900px) {
  .wga-benefits-grid {
    gap: 44px 36px;
  }
  .wga-visual-wrapper {
    height: 380px;
  }
}

@media (max-width: 640px) {
  .bs-header-inner {
    height: 64px;
  }
  .bs-btn-sm {
    padding: 7px 12px;
    font-size: 0.8125rem;
  }
  .bs-hero-inner {
    padding: 76px 20px 56px;
  }
  .bs-hero-sub {
    max-width: 440px;
  }
  .bs-modal {
    padding: 28px 22px 24px;
  }

  .ga-section {
    padding: 72px 16px;
  }
  .ga-header {
    margin-bottom: 48px;
  }
  .ga-card-content {
    padding: 28px 20px 20px;
  }
  .ga-visual-stage {
    height: 480px;
    margin: 0 12px 16px;
  }
  .ga-ecomm-search {
    width: calc(100% - 24px);
    top: 12px;
    left: 12px;
  }
  .ga-ecomm-product {
    top: 136px;
    left: 12px;
    width: 180px;
  }
  .ga-ecomm-roas-badge {
    top: 136px;
    right: 12px;
  }
  .ga-ecomm-metrics {
    bottom: 12px;
    left: 12px;
    right: 12px;
    width: auto;
  }
  .ga-lead-search {
    width: calc(100% - 24px);
    top: 12px;
    left: 12px;
  }
  .ga-lead-landing {
    top: 140px;
    left: 12px;
    width: 180px;
  }
  .ga-lead-notification {
    top: 260px;
    left: 12px;
    right: 12px;
    width: auto;
  }
  .ga-lead-metrics {
    bottom: 12px;
    left: 12px;
    right: 12px;
    width: auto;
  }
  .ga-footer-card {
    padding: 36px 18px;
  }
  .ga-cta-box {
    padding: 24px 16px;
  }

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
    display: none;
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

  .dw-provide-section,
  .dw-faq-section,
  .dw-final-cta-section {
    padding: 84px 16px;
  }
  .dw-provide-header {
    margin-bottom: 48px;
  }
  .dw-provide-cta-banner {
    padding: 44px 20px;
    margin-top: 64px;
  }
  .dw-final-cta-card {
    padding: 56px 20px;
  }
  .dw-trust-pills {
    flex-direction: column;
    gap: 8px;
  }
  .dw-faq-trigger {
    padding: 18px 20px;
  }
  .dw-faq-content {
    padding: 0 20px 20px;
  }
  .dw-whatsapp-fab {
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
  }
  .dw-wa-icon {
    width: 28px;
    height: 28px;
  }
  .dw-wa-tooltip {
    display: none;
  }

  .ty-card {
    padding: 36px 20px;
  }
  .ty-timeline {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bs-root * {
    transition: none !important;
    animation: none !important;
  }
}
`;
