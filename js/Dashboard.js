// ---------- HSA Eligibility Rules: click to expand ----------
const rulePanels = Array.from(document.querySelectorAll('.rule-panel'));
const prevRule = document.getElementById('prevRule');
const nextRule = document.getElementById('nextRule');

let activeIndex = rulePanels.findIndex(p => p.classList.contains('is-active'));
if (activeIndex < 0) activeIndex = 0;

function setActiveRule(index) {
  activeIndex = index;
  rulePanels.forEach((p, i) => {
    p.classList.toggle('is-active', i === activeIndex);
  });
}

rulePanels.forEach((panel, index) => {
  panel.addEventListener('click', () => setActiveRule(index));
});

prevRule?.addEventListener('click', () => {
  const next = (activeIndex - 1 + rulePanels.length) % rulePanels.length;
  setActiveRule(next);
});

nextRule?.addEventListener('click', () => {
  const next = (activeIndex + 1) % rulePanels.length;
  setActiveRule(next);
});

// ---------- FAQ accordion ----------
const faqRows = Array.from(document.querySelectorAll('.faq-row'));

faqRows.forEach((row) => {
  const panel = row.nextElementSibling;

  row.addEventListener('click', () => {
    const isOpen = panel.classList.contains('is-open');

    // close all
    document.querySelectorAll('.faq-panel').forEach(p => p.classList.remove('is-open'));
    document.querySelectorAll('.faq-row').forEach(r => r.setAttribute('aria-expanded', 'false'));

    // open current if it was closed
    if (!isOpen) {
      panel.classList.add('is-open');
      row.setAttribute('aria-expanded', 'true');
    }
  });
});