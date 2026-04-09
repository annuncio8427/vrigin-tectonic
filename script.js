const docEl = document.documentElement;
const navGroup = document.getElementById('navGroup');
const menuToggle = document.getElementById('menuToggle');
const themeToggle = document.getElementById('themeToggle');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const yearEl = document.getElementById('year');
const scrollProgress = document.getElementById('scrollProgress');
const counters = document.querySelectorAll('.counter');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

menuToggle?.addEventListener('click', () => {
  const isOpen = navGroup.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-group a').forEach((link) => {
  link.addEventListener('click', () => {
    navGroup.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const preferredTheme = localStorage.getItem('vts-theme');
if (preferredTheme) {
  docEl.setAttribute('data-theme', preferredTheme);
}

themeToggle?.addEventListener('click', () => {
  const next = docEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  docEl.setAttribute('data-theme', next);
  localStorage.setItem('vts-theme', next);
});

window.addEventListener('scroll', () => {
  if (!scrollProgress) {
    return;
  }
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const width = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${width}%`;
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const animateCount = (counter) => {
  const target = Number(counter.dataset.target);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      counter.textContent = target;
      clearInterval(timer);
      return;
    }
    counter.textContent = current;
  }, 20);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      animateCount(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = 'Sending your request...';

  setTimeout(() => {
    formStatus.textContent = 'Thank you. Your message has been received. We will contact you shortly.';
    form.reset();
  }, 900);
});
