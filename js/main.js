/* =========================================================
   Praia Mar Pousada — interações
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- aviso do topo ---------- */
  const topbar = document.getElementById('topbar');
  topbar.querySelector('.topbar__close').addEventListener('click', () => {
    topbar.classList.add('is-hidden');
    document.body.classList.add('no-topbar');
    syncTopbarHeight();
  });

  function syncTopbarHeight() {
    const h = topbar.classList.contains('is-hidden') ? 0 : topbar.offsetHeight;
    document.documentElement.style.setProperty('--topbar-h', h + 'px');
  }
  syncTopbarHeight();
  window.addEventListener('resize', syncTopbarHeight);

  /* ---------- header: sólido no scroll + esconde ao descer ---------- */
  const header = document.getElementById('header');
  const toTop = document.getElementById('to-top');
  let lastY = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    document.body.classList.toggle('is-scrolled', y > 60);
    header.classList.toggle('is-solid', y > window.innerHeight * 0.75);
    header.classList.toggle('is-hidden', y > lastY && y > 400);
    lastY = y;
    toTop.classList.toggle('is-visible', y > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- menu fullscreen ---------- */
  const menu = document.getElementById('menu');
  const openMenu = () => { menu.hidden = false; document.body.classList.add('is-locked'); };
  const closeMenu = () => { menu.hidden = true; document.body.classList.remove('is-locked'); };

  document.querySelector('.js-open-menu').addEventListener('click', openMenu);
  document.querySelector('.js-close-menu').addEventListener('click', closeMenu);
  menu.querySelectorAll('.menu__nav a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ---------- botão reservar -> barra de reserva ---------- */
  document.querySelector('.js-open-booking').addEventListener('click', () => {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth', block: 'center' });
    document.getElementById('destino').focus({ preventScroll: true });
  });

  /* ---------- abas dos pilares ---------- */
  const tabs = document.querySelectorAll('.pillars__tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      document.querySelectorAll('.pillars__panel').forEach(p => {
        p.hidden = true;
        p.classList.remove('is-active');
      });
      const panel = document.getElementById('panel-' + tab.dataset.tab);
      panel.hidden = false;
      panel.classList.add('is-active');
    });
  });

  /* ---------- carrossel ---------- */
  const track = document.getElementById('carousel-track');
  const step = () => track.querySelector('.slide').getBoundingClientRect().width + 26;
  document.getElementById('next').addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  document.getElementById('prev').addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));

  /* ---------- reveal on scroll ---------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ---------- formulários (demo, sem backend) ---------- */
  const bookingForm = document.getElementById('booking-form');
  bookingForm.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(bookingForm);
    const destino = data.get('destino') || 'um de nossos resorts';
    document.getElementById('booking-msg').textContent =
      `Pedido enviado para ${destino}. Nosso concierge responde em até 24h.`;
  });

  const newsForm = document.getElementById('news-form');
  newsForm.addEventListener('submit', e => {
    e.preventDefault();
    newsForm.reset();
    document.getElementById('news-msg').textContent = 'Inscrição confirmada. Até logo!';
  });

  /* ---------- voltar ao topo + ano ---------- */
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('year').textContent = new Date().getFullYear();

  onScroll();
});
