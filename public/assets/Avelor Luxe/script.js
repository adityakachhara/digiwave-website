// ==========================================
// Avelor Luxe — Product Testing Application
// script.js
// ==========================================

// Google Apps Script Web App Endpoint
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwqsipRQyEfCqMitVVT9NxBg63jOgt0u0IwMfuzyQYr6vh3auzuf9Th-mQaa0Yh_HOt/exec";

let currentStep = 1;
const totalSteps = 5;

const stepLabels = [
  "Section 1 of 5: About You",
  "Section 2 of 5: Body Care Habits",
  "Section 3 of 5: Skin Profile & Preferences",
  "Section 4 of 5: Testing Criteria & Consent",
  "Section 5 of 5: Contact Information"
];

// Single-choice option pills
function selectSingle(inputId, value, element) {
  const hiddenInput = document.getElementById('input_' + inputId);
  if (hiddenInput) hiddenInput.value = value;
  if (element && element.parentElement) {
    element.parentElement.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
  }
}

// Multi-choice toggles
function toggleMulti(inputId, value, element) {
  if (!element) return;
  element.classList.toggle('active');
  if (element.parentElement) {
    const activeBtns = Array.from(element.parentElement.querySelectorAll('.checkbox-btn.active'));
    const values = activeBtns.map(btn => btn.innerText.replace('✓ ', '').trim());
    const hiddenInput = document.getElementById('input_' + inputId);
    if (hiddenInput) hiddenInput.value = values.join(', ');
  }
}

// Step UI & Navigation updates
function updateStepUI() {
  for (let i = 1; i <= totalSteps; i++) {
    const sec = document.getElementById('section-' + i);
    if (sec) sec.classList.toggle('hidden', i !== currentStep);
  }

  // Update Nav Pills styling
  document.querySelectorAll('.step-nav').forEach((btn, idx) => {
    const stepNum = idx + 1;
    if (stepNum === currentStep) {
      btn.className = "step-nav py-2 rounded-lg border border-brand-gold/40 text-brand-gold bg-brand-gold/10 font-medium transition-all";
    } else if (stepNum < currentStep) {
      btn.className = "step-nav py-2 rounded-lg border border-brand-gold/20 text-brand-goldLight/70 bg-brand-card font-normal transition-all";
    } else {
      btn.className = "step-nav py-2 rounded-lg border border-white/5 text-zinc-400 bg-brand-card hover:text-white transition-all";
    }
  });

  const pct = Math.round((currentStep / totalSteps) * 100);
  const bar = document.getElementById('progressBar');
  const stepPct = document.getElementById('stepPercent');
  const stepLbl = document.getElementById('stepLabel');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');

  if (bar) bar.style.width = pct + '%';
  if (stepPct) stepPct.innerText = pct + '% Completed';
  if (stepLbl) stepLbl.innerText = stepLabels[currentStep - 1];

  if (prevBtn) prevBtn.classList.toggle('hidden', currentStep === 1);
  if (nextBtn) nextBtn.classList.toggle('hidden', currentStep === totalSteps);
  if (submitBtn) submitBtn.classList.toggle('hidden', currentStep !== totalSteps);

  window.scrollTo({ top: 100, behavior: 'smooth' });
}

function goToStep(step) {
  currentStep = step;
  updateStepUI();
}

function nextStep() {
  if (currentStep < totalSteps) {
    currentStep++;
    updateStepUI();
  }
}

function prevStep() {
  if (currentStep > 1) {
    currentStep--;
    updateStepUI();
  }
}

function validateStep5() {
            const fields = [
              { id: 'input_fullName', label: 'Full Name' },
              { id: 'input_phone', label: 'Phone / WhatsApp' },
              { id: 'input_instagram', label: 'Instagram Handle' }
            ];
            const missing = [];
            let first = null;
            fields.forEach(f => {
              const el = document.getElementById(f.id);
              const empty = !el || !el.value.trim();
              if (el) el.style.borderColor = empty ? '#ef4444' : '';
              if (empty) { missing.push(f.label); if (!first && el) first = el; }
            });
            const box = document.getElementById('formError');
            if (missing.length) {
              const msg = 'Please fill in: ' + missing.join(', ');
              if (box) { box.textContent = msg; box.style.display = 'block'; }
              if (first) first.focus();
              return false;
            }
            if (box) box.style.display = 'none';
            return true;
          }

// Form Submission directly to Google Apps Script
async function submitApplication() {
  if (!validateStep5()) return;
  const getVal = (id, fallback) => {
    const el = document.getElementById(id);
    return (el && el.value.trim()) ? el.value.trim() : fallback;
  };

  const fullName = getVal('input_fullName', 'Avelor Applicant');
  const email = getVal('input_email', 'Unspecified');
  const phone = getVal('input_phone', 'Unspecified');
  const city = getVal('input_city', 'Global');
  const age = getVal('input_age', '25–30');
  const instagram = getVal('input_instagram', 'N/A');
  const frequency = getVal('input_frequency', 'Daily (1–2 times/day)');
  const products = getVal('input_products', 'Body Moisturizer / Lotion');
  const spend = getVal('input_spend', '$50 – $100');
  const interest = getVal('input_interest', 'Normal / Balanced');
  const matters = getVal('input_matters', 'Deep Nourishment without Stickiness');
  const why = getVal('input_why', 'Interested in testing unreleased formulations.');

  const instructions = document.getElementById('chk_instructions')?.checked ? 'Yes' : 'No';
  const feedback = document.getElementById('chk_feedback')?.checked ? 'Yes' : 'No';
  const contactConsent = document.getElementById('chk_consent')?.checked ? 'Yes' : 'No';

  // 1. Generate Reference ID BEFORE sending payload
  const generatedRefId = '#AVL-' + Math.floor(10000 + Math.random() * 90000);

  const submitBtn = document.getElementById('submitBtn');
  const submitSpinner = document.getElementById('submitSpinner');
  const submitText = document.getElementById('submitText');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
  }
  if (submitSpinner) submitSpinner.classList.remove('hidden');
  if (submitText) submitText.innerText = "Submitting Application...";

  // 2. Pass referenceId into payload
  const payload = {
    formType: "tester",
    referenceId: generatedRefId,
    fullName: fullName,
    age: age,
    city: city,
    instagram: instagram,
    email: email,
    phone: phone,
    frequency: frequency,
    products: products,
    spend: spend,
    purchase: "Online & Luxury Retail",
    matters: matters,
    interest: interest,
    polish: "Rich Cream Polish",
    instructions: instructions,
    feedback: feedback,
    reject: "No",
    best: "Balanced Hydration",
    why: why,
    honesty: "Agreed",
    selection: "Pending",
    contactConsent: contactConsent
  };

  try {
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(payload)
    });
  } catch (err) {
    console.warn("Dispatched with client acknowledgment:", err);
  }

  // 3. Display the exact matching Reference ID on the confirmation card
  const form = document.getElementById('testerForm');
  const card = document.getElementById('confirmationCard');
  const confName = document.getElementById('confName');
  const refCode = document.getElementById('refCode');

  if (form) form.classList.add('hidden');
  if (card) card.classList.remove('hidden');
  if (confName) confName.innerText = fullName;
  if (refCode) refCode.innerText = generatedRefId;
  window.scrollTo({ top: 100, behavior: 'smooth' });
}

// Explicit global window bindings for inline HTML onclick attributes
window.selectSingle = selectSingle;
window.toggleMulti = toggleMulti;
window.goToStep = goToStep;
window.nextStep = nextStep;
window.prevStep = prevStep;
window.submitApplication = submitApplication;

// Initialize on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateStepUI);
} else {
  updateStepUI();
}