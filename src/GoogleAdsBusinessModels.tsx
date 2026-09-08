interface GoogleAdsBusinessModelsProps {
  onBookAudit?: () => void;
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

export default function GoogleAdsBusinessModels({
  onBookAudit,
}: GoogleAdsBusinessModelsProps): JSX.Element {
  return (
    <section className="ga-section">
      <style>{STYLES}</style>

      <div className="ga-container">
        {/* Section Header */}
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

        {/* The Two Main Cards */}
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

              {/* 1. Search Query */}
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

              {/* 2. Product Card */}
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

              {/* 3. ROAS Callout */}
              <div className="ga-float-el ga-ecomm-roas-badge">
                <div className="ga-badge-top">
                  <TrendingUpIcon className="ga-icon-green" />
                  <span>TARGET ROAS</span>
                </div>
                <div className="ga-badge-val">4.3x</div>
                <div className="ga-badge-sub">+38% vs baseline</div>
              </div>

              {/* 4. Dashboard Metrics */}
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

              {/* 1. Lead Search */}
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

              {/* 2. Mini Landing Page */}
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

              {/* 3. Inbound Lead Event */}
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

              {/* 4. Lead Dashboard Metrics */}
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

        {/* Section Footer / Synthesis */}
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

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

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
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: var(--ga-ink-primary);
  padding: 120px 24px;
  position: relative;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
}

.ga-section *, .ga-section *::before, .ga-section *::after {
  box-sizing: border-box;
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
  transition: transform 0.2s ease;
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

@media (max-width: 1080px) {
  .ga-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .ga-visual-stage {
    height: 380px;
  }
}

@media (max-width: 640px) {
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
}

@media (prefers-reduced-motion: reduce) {
  .ga-flow-path {
    animation: none;
  }
  .ga-card {
    transition: none;
  }
}
`;
