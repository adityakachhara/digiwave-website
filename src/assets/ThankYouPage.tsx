interface ThankYouPageProps {
  name?: string;
  onBackToHome: () => void;
}

function BluescaleMark(): JSX.Element {
  return (
    <svg
      className="bs-logo-mark"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0" y="12" width="4" height="8" rx="2" fill="#B8E6FE" />
      <rect x="6" y="7" width="4" height="13" rx="2" fill="#7CD4FD" />
      <rect x="12" y="3" width="4" height="17" rx="2" fill="#38BDF8" />
      <rect x="18" y="0" width="4" height="20" rx="2" fill="#0284C7" />
    </svg>
  );
}

export default function ThankYouPage({
  name,
  onBackToHome,
}: ThankYouPageProps): JSX.Element {
  const firstName = name ? name.trim().split(' ')[0] : 'there';

  return (
    <div className="ty-root">
      <style>{TY_STYLES}</style>

      {/* Header */}
      <header className="ty-header">
        <div className="ty-container ty-header-inner">
          <div
            className="ty-logo"
            onClick={onBackToHome}
            role="button"
            tabIndex={0}
          >
            <BluescaleMark />
            <span className="ty-logo-text">Bluescale</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
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
              We have received your details. A Google Ads growth strategist will
              review your information and reach out directly on{' '}
              <strong>WhatsApp / phone shortly</strong> to confirm a time for
              your session.
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

const TY_STYLES = `
.ty-root {
  min-height: 100vh;
  background: #FAFBFC;
  color: #0F172A;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
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

@media (max-width: 640px) {
  .ty-card {
    padding: 36px 20px;
  }
  .ty-timeline {
    padding: 16px;
  }
}
`;
