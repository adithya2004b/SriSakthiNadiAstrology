// ===== Constants =====
const CONTACT_EMAIL = 'adithya3572@gmail.com';
emailjs.init("9l8ZxwBU8tXEWL6Bz");

const KANDAMS = [
  { id: 1, title: 'General Chapter', desc: 'Overview of your entire life, family, character, and brief predictions for all other chapters.' },
  { id: 2, title: 'Education & Wealth', desc: 'Financial prosperity, family life, eyesight, and educational achievements.' },
  { id: 3, title: 'Siblings & Courage', desc: 'Relationships with siblings, personal courage, and litigation matters.' },
  { id: 4, title: 'Mother & Assets', desc: "Mother's health, material assets, vehicles, land, and overall life happiness." },
  { id: 5, title: 'Children & Progeny', desc: 'Birth of children, their future, and reasons for any delay in parenthood.' },
  { id: 6, title: 'Health & Enemies', desc: 'Diseases, debts, enemies, court cases, and the means to overcome them.' },
  { id: 7, title: 'Marriage & Partner', desc: 'Time of marriage, details about the spouse, and marital harmony.' },
  { id: 8, title: 'Longevity & Danger', desc: 'Life span, unexpected dangers, accidents, and life-threatening situations.' },
  { id: 9, title: 'Father & Fortune', desc: 'Relationship with father, ancestral properties, spiritual inclination, and luck.' },
  { id: 10, title: 'Career & Business', desc: 'Profession, job changes, business success, and career trajectory.' },
  { id: 11, title: 'Profits & Second Marriage', desc: 'Business profits, second marriage (if any), and relationships with elder siblings.' },
  { id: 12, title: 'Foreign Travel & Losses', desc: 'Foreign settlement, financial losses, and next birth.' },
  { id: 13, title: 'Previous Birth Karma (Shanthi)', desc: 'Sins committed in previous births causing current suffering, and specific remedies (Pariharas) to neutralize them.' },
  { id: 14, title: 'Mantra Protection (Deeksha)', desc: 'Sacred mantras and talismans to protect from evil eyes, black magic, and severe doshas.' },
];
const header = document.getElementById("site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});
const swiper = new Swiper(".mySwiper", {

    loop:true,

    speed:1000,

    grabCursor:true,

    centeredSlides:true,

    slidesPerView:"auto",

    spaceBetween:30,

    autoplay:{

        delay:4500,

        disableOnInteraction:false,

    },

    effect:"coverflow",

    coverflowEffect:{

        rotate:0,

        stretch:-20,

        depth:180,

        modifier:1.2,

        scale:.88,

        slideShadows:false,

    },

    pagination:{

        el:".swiper-pagination",

        clickable:true,

    },

});
// ===== Header scroll state =====
const header = document.getElementById('site-header');
function updateHeaderState() {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

// ===== Mobile nav =====
const navToggle = document.getElementById("nav-toggle");
const navMobile = document.getElementById("nav-mobile");
const navClose = document.getElementById("nav-close");

function closeMobileNav() {
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navMobile.classList.remove("is-open");
    document.body.classList.remove("menu-open");
}

function openMobileNav() {
    navToggle.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navMobile.classList.add("is-open");
    document.body.classList.add("menu-open");
}

navToggle.addEventListener("click", () => {

    if (navMobile.classList.contains("is-open")) {
        closeMobileNav();
    } else {
        openMobileNav();
    }

});

// Close using back arrow
if (navClose) {
    navClose.addEventListener("click", closeMobileNav);
}

// Close menu when any navigation link is clicked
document.querySelectorAll(".nav-mobile a[data-scroll]").forEach(link => {
    link.addEventListener("click", closeMobileNav);
});

// Close menu with Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeMobileNav();
    }
});

// ===== Smooth scroll for in-page links =====
document.querySelectorAll('[data-scroll]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    closeMobileNav();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Scroll reveal =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
);
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ===== Counter animation =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10) || 0;
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);
document.querySelectorAll('[data-counter]').forEach((el) => counterObserver.observe(el));

// ===== Render service (kandam) cards =====
const servicesGrid = document.getElementById('services-grid');
servicesGrid.innerHTML = KANDAMS.map(
  (k) => `
    <div class="service-card reveal">
      <div class="service-card__head">
        <span class="service-card__num">${k.id}</span>
        <h3>${k.title}</h3>
      </div>
      <p>${k.desc}</p>
    </div>
  `,
).join('');
servicesGrid.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ===== Accordion (FAQ) =====
document.querySelectorAll('.accordion__trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const panel = trigger.nextElementSibling;
    const isOpen = trigger.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.accordion__trigger').forEach((t) => {
      t.setAttribute('aria-expanded', 'false');
      t.nextElementSibling.style.maxHeight = null;
    });

    if (!isOpen) {
      trigger.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

// ===== Floating actions: back to top visibility =====
const backToTop = document.getElementById('back-to-top');
window.addEventListener(
  'scroll',
  () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  },
  { passive: true },
);
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Booking modal open/close =====
const modalOverlay = document.getElementById('modal-overlay');
const bookingForm = document.getElementById('booking-form');
const bookingSuccess = document.getElementById('booking-success');

function openModal() {
  modalOverlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('is-open');
  document.body.style.overflow = '';
  setTimeout(() => {
    bookingForm.hidden = false;
    bookingSuccess.hidden = true;
    bookingForm.reset();
  }, 250);
}

document.querySelectorAll('[data-open-modal]').forEach((btn) => {
  btn.addEventListener('click', () => {
    closeMobileNav();
    openModal();
  });
});
document.querySelectorAll('[data-close-modal]').forEach((btn) => btn.addEventListener('click', closeModal));
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.getElementById('booking-return').addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay.classList.contains('is-open')) closeModal();
});

// ===== Toast =====
const toast = document.getElementById('toast');
const toastTitle = document.getElementById('toast-title');
const toastDesc = document.getElementById('toast-desc');
let toastTimer;

function showToast(title, desc, variant) {
  toastTitle.textContent = title;
  toastDesc.textContent = desc;
  toast.classList.toggle('toast--error', variant === 'error');
  toast.hidden = false;
  requestAnimationFrame(() => toast.classList.add('is-visible'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => { toast.hidden = true; }, 300);
  }, 4500);
}

// ===== Mailto helpers =====
function openMailto(subject, bodyLines) {
  const body = bodyLines.filter(Boolean).join('\n');
  const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
}

// ===== Contact form =====
const contactForm = document.getElementById('contact-form');
const contactFormCard = document.getElementById('contact-form-card');
const contactSuccess = document.getElementById('contact-success');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(contactForm).entries());

  openMailto(`Contact Form: ${data.subject}`, [
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    '',
    data.message,
  ]);

  contactForm.hidden = true;
  contactSuccess.hidden = false;
  showToast('Message Ready to Send', 'Your email app should now be open with your message pre-filled.');
});

document.getElementById('contact-reset').addEventListener('click', () => {
  contactForm.reset();
  contactForm.hidden = false;
  contactSuccess.hidden = true;
});

// ===== Booking form =====
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(bookingForm).entries());

  openMailto(`New Appointment Request - ${data.name}`, [
    'New Nadi Astrology appointment request',
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    data.whatsapp ? `WhatsApp: ${data.whatsapp}` : '',
    `Email: ${data.email}`,
    `Country: ${data.country}`,
    `City: ${data.city}`,
    `Preferred Date: ${data.appointmentDate}`,
    `Preferred Time: ${data.preferredTime}`,
    `Consultation Type: ${data.consultationType}`,
    `Language: ${data.language}`,
    data.message ? `Message: ${data.message}` : '',
  ]);

  bookingForm.hidden = true;
  bookingSuccess.hidden = false;
  showToast('Request Ready to Send', 'Your email app should now be open with your appointment request.');
});

// ===== Footer year =====
document.getElementById('footer-year').textContent = new Date().getFullYear();
