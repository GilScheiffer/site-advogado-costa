document.addEventListener('DOMContentLoaded', () => {

  /* ===== Ano no rodapé ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ===== Banner de protótipo (fecha e some pra sempre nesta sessão) ===== */
  const banner = document.getElementById('protoBanner');
  const bannerClose = document.getElementById('protoBannerClose');
  if (banner && bannerClose) {
    if (sessionStorage.getItem('protoBannerClosed') === '1') {
      banner.classList.add('hidden');
    }
    bannerClose.addEventListener('click', () => {
      banner.classList.add('hidden');
      sessionStorage.setItem('protoBannerClosed', '1');
    });
  }

  /* ===== Header: sombra/blur ao rolar ===== */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ===== Menu mobile ===== */
  const hamburger = document.getElementById('hamburger');
  hamburger.addEventListener('click', () => {
    header.classList.toggle('nav-open');
    hamburger.classList.toggle('active');
  });
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('nav-open');
      hamburger.classList.remove('active');
    });
  });

  /* ===== Reveal on scroll ===== */
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));

  /* ===== Contadores animados (stats do hero) ===== */
  const counters = document.querySelectorAll('.stat__num');
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterIO.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterIO.observe(el));

  /* ===== Slider de depoimentos ===== */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  if (track && dotsWrap) {
    const slides = track.children.length;
    let current = 0;

    for (let i = 0; i < slides; i++) {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
    const dots = dotsWrap.querySelectorAll('button');

    function goTo(index) {
      current = (index + slides) % slides;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    let autoplay = setInterval(() => goTo(current + 1), 5000);
    const slider = track.closest('.testimonial-slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoplay));
    slider.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => goTo(current + 1), 5000);
    });
  }

  /* ===== Toast ===== */
  const toast = document.getElementById('toast');
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }

  /* ===== Formulário de contato (demo, não envia nada) ===== */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Formulário de demonstração — conecte a um e-mail/WhatsApp real depois 😉');
      form.reset();
    });
  }

  /* ===== Smooth scroll com offset do header fixo ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length <= 1) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

});
