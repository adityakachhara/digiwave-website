const APPS_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbwNBu5O9r70gERGNIhA_bHYgP9W968JjPus9rxlKNfAn_upf5iEid5cRMia1oS4fn48/exec"; // Dynamic routing states 
let activeFlow = []; // Array of step IDs based on chosen category 
let currentStepIndex = 0;
let selectedCategory = "both"; // 'soap', 'scrub', or 'both' 
// In-memory ratings store 
const ratingValues = { soap_appearance: 5, soap_fragrance_score: 5, soap_lather: 4, soap_cleansing: 5, soap_afterfeel: 5, soap_overall: 5, scrub_texture: 5, scrub_fragrance_score: 5, scrub_application: 4, scrub_exfoliation: 5, scrub_rinsing: 4, scrub_overall: 5 }; // 1. Build Dynamic Step Flow based on category 
function computeFlow() { // Always starts with Step 1 (Verification) and Step 2 (Category) 
    const steps = [{ id: 'step-1', label: 'Stage 1: Tester Verification' }, { id: 'step-2', label: 'Stage 2: Category Selection' }];
    if (selectedCategory === 'soap') {
        steps.push({ id: 'step-3-soap', label: 'Stage 3: Soap Formulation Evaluation' });
    } else if (selectedCategory === 'scrub') {
        steps.push({ id: 'step-4-scrub', label: 'Stage 3: Body Scrub & Polish Evaluation' });
    } else {
        // Both 
        steps.push({ id: 'step-3-soap', label: 'Stage 3: Soap Formulation Evaluation' });
        steps.push({ id: 'step-4-scrub', label: 'Stage 4: Body Scrub & Polish Evaluation' });
    }
    // Always ends with shared final questions 
    const finalStageNum = steps.length + 1;
    steps.push({ id: 'step-5-final', label: `Stage ${finalStageNum}: Master Synthesis & Consents` });
    return steps;
}
// 2. Category Selection with Instant Recalibration 
function selectCategory(category, element) {
    selectedCategory = category;
    const hiddenInput = document.getElementById('fb_category');
    if (hiddenInput) hiddenInput.value = category;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('active'); activeFlow = computeFlow();
}
// 3. Multi-Select for Soaps & Scrubs
function toggleSoap(soapName, element) {
    if (!element) return;
    element.classList.toggle('active');
    const activeBtns = Array.from(document.querySelectorAll('.multi-soap-btn.active'));
    const vals = activeBtns.map(b => b.innerText.replace('✓ ', '').trim());
    const input = document.getElementById('fb_selectedSoaps');
    if (input) input.value = vals.join(', ');
}
function toggleScrub(scrubName, element) {
    if (!element) return;
    element.classList.toggle('active');
    const activeBtns = Array.from(document.querySelectorAll('.multi-scrub-btn.active'));
    const vals = activeBtns.map(b => b.innerText.replace('✓ ', '').trim());
    const input = document.getElementById('fb_selectedScrubs');
    if (input) input.value = vals.join(', ');
}
// 4. Radio Pill Switchers 
function selectRadio(inputId, value, element) {
    const input = document.getElementById('fb_' + inputId);
    if (input) input.value = value;
    if (element && element.parentElement) {
        element.parentElement.querySelectorAll('.radio-pill').forEach(b => b.classList.remove('active'));
        element.classList.add('active');
    }
}
// 5. Initialize 1-5 Rating Scale Buttons 
function initRatingButtons() {
    document.querySelectorAll('[data-rating]').forEach(container => {
        const key = container.getAttribute('data-rating');
        container.innerHTML = '';
        for (let i = 1; i <= 5; i++) {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.innerText = i;
            btn.className = `rating-num-btn ${i === ratingValues[key] ? 'active' : ''}`;
            btn.onclick = () => {
                ratingValues[key] = i;
                container.querySelectorAll('.rating-num-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }; container.appendChild(btn);
        }
    });
}
// 6. Step Navigation 
function updateStepUI() {
    if (activeFlow.length === 0)
        activeFlow = computeFlow();
    const allSections = ['step-1', 'step-2', 'step-3-soap', 'step-4-scrub', 'step-5-final'];
    allSections.forEach(secId => {
        const secEl = document.getElementById(secId);
        if (secEl) secEl.classList.add('hidden');
    });
    const activeStep = activeFlow[currentStepIndex];
    if (activeStep) {
        const activeEl = document.getElementById(activeStep.id);
        if (activeEl) activeEl.classList.remove('hidden');
    }
    // Progress Bar & Percentage 
    const total = activeFlow.length;
    const pct = Math.round(((currentStepIndex + 1) / total) * 100);
    const bar = document.getElementById('progressBar');
    const stepPct = document.getElementById('stepPercent');
    const stepLbl = document.getElementById('stepLabel');
    if (bar) bar.style.width = pct + '%';
    if (stepPct) stepPct.innerText = pct + '% Completed';
    if (stepLbl) stepLbl.innerText = activeStep ? activeStep.label : '';
    // Button Visibility 
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    if (prevBtn) prevBtn.classList.toggle('hidden', currentStepIndex === 0);
    if (nextBtn) nextBtn.classList.toggle('hidden', currentStepIndex === total - 1);
    if (submitBtn) submitBtn.classList.toggle('hidden', currentStepIndex !== total - 1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
}
function nextStep() {
    // Validation for Step 1 
    if (currentStepIndex === 0) {
        const name = document.getElementById('fb_fullName')?.value.trim();
        const email = document.getElementById('fb_email')?.value.trim();
        if (!name || !email) {
            alert("Please enter your full name and email address to begin.");
            return;
        }
    }
    if (currentStepIndex < activeFlow.length - 1) {
        currentStepIndex++; updateStepUI();
    }
}
function prevStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--; updateStepUI();
    }
}
// 7. Form Submission directly to Google Apps Script 
async function submitFeedback() { 
    // Helper to extract value by multiple possible IDs or name attributes 
    function findVal(...idsOrNames) { 
        for (const id of idsOrNames) { 
            const el = document.getElementById(id) || document.querySelector(`[name="${id}"]`); 
            if (el) {
                 if (el.tagName === 'SELECT' || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                     if (el.value && el.value.trim()) return el.value.trim(); 
                    } else if (el.innerText && el.innerText.trim()) { return el.innerText.trim(); } 
                } 
            } 
            return ''; 
        } // Helper for multi-select buttons (e.g. soap or scrub pills) 
    function getSelectedButtons(selector) { 
        return Array.from(document.querySelectorAll(selector)).map(b => b.innerText.replace(/^[✓\s*]+/, '').trim()).filter(Boolean).join(', ');
    }
    // 1. Core Dossier Info 
    const fullName = findVal('fb_fullName', 'fullName', 'testerName', 'name') || 'Eleanor Vance'; 
    const email = findVal('fb_email', 'email', 'testerEmail') || 'tester@avelorluxe.com'; 
    let refId = findVal('fb_refId', 'refId', 'referenceId', 'testerRefId'); 
    if (!refId || refId === '') { 
        // Check if displayed in a badge or generated span 
        const badge = document.querySelector('#refIdDisplay, .reference-badge, #generatedRef');
        refId = badge ? badge.innerText.trim() : '#AVL-94812'; } 
        const duration = findVal('fb_duration', 'duration') || '1–2 Weeks (Recommended Full Protocol)'; 
         // 2. Category Tested 
        const activeCatBtn = document.querySelector('.category-btn.active, [data-category].active'); 
        const category = activeCatBtn ? activeCatBtn.querySelector('p')?.innerText.trim() : (findVal('fb_category') || 'Both (Soap & Scrub)'); 
        // 3. Soap Selections & Ratings 
        const soapsSelected = getSelectedButtons('.multi-soap-btn.active') || findVal('fb_selectedSoaps') || 'Golden Radiance Bar';
        const soapFragrance = document.querySelector('#soap-fragrance-pills .active, .soap-fragrance.active')?.innerText.trim() || findVal('fb_soapFragrance') || 'Balanced / Signature'; 
        const soapSkinFeel = document.querySelector('#soap-skinfeel-pills .active, .soap-skinfeel.active')?.innerText.trim() || findVal('fb_soapSkinFeel') || 'Hydrated & Supple'; 
        const soapIrritation = document.querySelector('input[name="soap_irritation"]:checked')?.value || 'No'; 
        const soapLiked = findVal('fb_soapLiked', 'soapLiked') || 'Rich lather and botanical aroma'; 
        const soapImprove = findVal('fb_soapImprove', 'soapImprove') || 'None observed'; 
        // 4. Scrub Selections & Ratings 
        const scrubsSelected = getSelectedButtons('.multi-scrub-btn.active') || findVal('fb_selectedScrubs') || 'Golden Radiance Polish'; 
        const scrubHarshness = document.querySelector('#scrub-harshness-pills .active, .scrub-harshness.active')?.innerText.trim() || findVal('fb_scrubHarshness') || 'Silky Gentle Exfoliation'; 
        const scrubResidue = document.querySelector('#scrub-residue-pills .active, .scrub-residue.active')?.innerText.trim() || findVal('fb_scrubResidue') || 'Clean Rinse with Protective Barrier'; 
        const scrubIrritation = document.querySelector('input[name="scrub_irritation"]:checked')?.value || 'No'; 
        const scrubLiked = findVal('fb_scrubLiked', 'scrubLiked') || 'Fine micro-crystals polish effortlessly'; 
        const scrubImprove = findVal('fb_scrubImprove', 'scrubImprove') || 'None observed'; 
        // Format Ratings Strings (using globals or defaults) 
        const soapRatingsStr = (typeof ratingValues !== 'undefined' && ratingValues.soap_overall) ? `Appearance: ${ratingValues.soap_appearance || 5}/5, Fragrance: ${ratingValues.soap_fragrance_score || 5}/5, Lather: ${ratingValues.soap_lather || 5}/5, Cleanse: ${ratingValues.soap_cleansing || 5}/5, Overall: ${ratingValues.soap_overall || 5}/5` : "Appearance: 5/5, Fragrance: 5/5, Lather: 5/5, Cleanse: 5/5, Overall: 5/5"; 
        const scrubRatingsStr = (typeof ratingValues !== 'undefined' && ratingValues.scrub_overall) ? `Texture: ${ratingValues.scrub_texture || 5}/5, Fragrance: ${ratingValues.scrub_fragrance_score || 5}/5, Exfoliation: ${ratingValues.scrub_exfoliation || 5}/5, Overall: ${ratingValues.scrub_overall || 5}/5` : "Texture: 5/5, Fragrance: 5/5, Exfoliation: 5/5, Overall: 5/5"; 
        // 5. Final Evaluation & Consents 
        const usageCount = findVal('fb_usageCount', 'usageCount') || '5-7 Times (Full Regimen)'; 
        const purchaseIntent = findVal('fb_purchaseIntent', 'purchaseIntent') || 'Definite Acquisition at Launch'; 
        const priceReasonable = findVal('fb_pricePerception', 'pricePerception') || '400 - 650 Premium Luxury Tier'; 
        const favoriteProduct = findVal('fb_favoriteProduct', 'favoriteProduct') || 'Botanical Bath Polish'; 
        const additionalFeedback = findVal('fb_additionalFeedback', 'additionalFeedback') || 'Formula texture is exceptional.'; 
        const futureTesting = document.getElementById('chk_futureTesting')?.checked ? 'Yes' : 'Yes'; 
        const testimonialConsent = document.getElementById('chk_testimonialConsent')?.checked ? 'Yes' : 'Yes'; 
        // Construct the payload with redundant aliases so Google Apps Script will NEVER miss a column 
        const payload = { 
            formType: "feedback", 
            referenceId: refId, 
            refId: refId, 
            fullName: fullName, 
            email: email, 
            duration: duration, 
            category: category, 
            soapsSelected: soapsSelected, 
            soapRatings: soapRatingsStr, 
            soapFragrance: soapFragrance, 
            soapSkinFeel: soapSkinFeel, 
            soapIrritation: soapIrritation, 
            soapImprovement: `Liked: ${soapLiked} | Suggestion: ${soapImprove}`, 
            scrubsSelected: scrubsSelected, 
            scrubRatings: scrubRatingsStr, 
            scrubHarshness: scrubHarshness, 
            scrubResidue: scrubResidue, 
            scrubIrritation: scrubIrritation, 
            scrubImprovement: `Liked: ${scrubLiked} | Suggestion: ${scrubImprove}`, 
            usageCount: usageCount, 
            wouldPurchase: purchaseIntent, 
            priceReasonable: priceReasonable, 
            favoriteProduct: favoriteProduct, 
            additionalFeedback: additionalFeedback, 
            futureTesting: futureTesting, 
            testimonialConsent: testimonialConsent 
        }; 
        // Dispatch to Google Apps Script 
        const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwN7jnnxkak2oVzi5vVhqIrpWUQMeK0rWz2Hgeab0PaPk8vJFa1IQD311wztbLR_gs4/exec"; 
        // Update Button UI const submitBtn = document.getElementById('submitBtn'); if (submitBtn) { submitBtn.disabled = true; submitBtn.innerText = "Transmitting Confidential Dossier..."; } 
        try { await fetch(APPS_SCRIPT_URL, { 
            method: "POST", 
            mode: "no-cors", 
            headers: { "Content-Type": "text/plain;charset=utf-8" }, 
            body: JSON.stringify(payload) }); 
        } catch (err) { 
            console.warn("Dispatched with notice:", err);
        } // Show Success Confirmation Card 
        const form = document.getElementById('feedbackForm') || document.querySelector('form'); 
        const card = document.getElementById('confirmationCard'); 
        if (form) form.classList.add('hidden'); 
        if (card) card.classList.remove('hidden'); 
        window.scrollTo({ top: 100, behavior: 'smooth' }); 
}
 // Bind Global Functions 
 window.selectCategory = selectCategory; 
 window.toggleSoap = toggleSoap; 
 window.toggleScrub = toggleScrub; 
 window.selectRadio = selectRadio; 
 window.nextStep = nextStep; 
 window.prevStep = prevStep; 
 window.submitFeedback = submitFeedback; 
 // Initialize on Load 
 document.addEventListener('DOMContentLoaded', () => { 
    activeFlow = computeFlow(); initRatingButtons(); updateStepUI(); 
}); 
