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

// ---------- Info popup ----------
const infoButtons = Array.from(document.querySelectorAll('.info-btn'));

infoButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    const popup = btn.nextElementSibling;
    if (!popup || !popup.classList.contains('info-popup')) return;

    const isOpen = !popup.hasAttribute('hidden');

    // close all popups first
    document.querySelectorAll('.info-popup').forEach((p) => {
      p.setAttribute('hidden', '');
    });
    document.querySelectorAll('.info-btn').forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
    });

    // open clicked popup if it was closed
    if (!isOpen) {
      popup.removeAttribute('hidden');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// close popup when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.info-btn') && !e.target.closest('.info-popup')) {
    document.querySelectorAll('.info-popup').forEach((p) => {
      p.setAttribute('hidden', '');
    });
    document.querySelectorAll('.info-btn').forEach((b) => {
      b.setAttribute('aria-expanded', 'false');
    });
  }
});

// ---------- Resource Hub ----------
const resourceScroll = document.getElementById("resourceScroll");
const resourcePrev = document.getElementById("resourcePrev");
const resourceNext = document.getElementById("resourceNext");
const resourceDotsContainer = document.getElementById("resourceDots");

const CARDS_PER_PAGE = 3;

function getCards() {
  return Array.from(document.querySelectorAll(".resource-card"));
}

function getCardWidth() {
  const card = resourceScroll?.querySelector(".resource-card");
  if (!card) return 200;
  return card.offsetWidth + 18;
}

function getPageWidth() {
  return getCardWidth() * CARDS_PER_PAGE;
}

function getTotalPages() {
  return Math.ceil(getCards().length / CARDS_PER_PAGE);
}

function getCurrentPage() {
  if (!resourceScroll) return 0;
  return Math.round(resourceScroll.scrollLeft / getPageWidth());
}

// ---------- Create dots dynamically ----------
function createDots() {
  if (!resourceDotsContainer) return;

  const pages = getTotalPages();
  resourceDotsContainer.innerHTML = "";

  for (let i = 0; i < pages; i++) {
    const dot = document.createElement("span");
    dot.className = "resource-dot";

    if (i === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      scrollToPage(i);
    });

    resourceDotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = Array.from(document.querySelectorAll(".resource-dot"));
  const page = getCurrentPage();

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === page);
  });
}

function scrollToPage(page) {
  if (!resourceScroll) return;

  const maxPage = getTotalPages() - 1;
  const safePage = Math.max(0, Math.min(page, maxPage));

  resourceScroll.scrollTo({
    left: safePage * getPageWidth(),
    behavior: "smooth"
  });
}

// ---------- Arrow controls ----------
resourcePrev?.addEventListener("click", () => {
  scrollToPage(getCurrentPage() - 1);
});

resourceNext?.addEventListener("click", () => {
  scrollToPage(getCurrentPage() + 1);
});

// ---------- Events ----------
resourceScroll?.addEventListener("scroll", updateDots);

window.addEventListener("load", () => {
  createDots();
  updateDots();
});

window.addEventListener("resize", updateDots);

// Download as PDF//
function downloadSidebarPDF() {
  window.print();
}