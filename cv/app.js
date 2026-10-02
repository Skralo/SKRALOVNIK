(() => {
  'use strict';
  const posts = window.PORTFOLIO_POSTS || [];
  const grid = document.querySelector('#post-grid');
  const dialog = document.querySelector('#post-dialog');
  const image = document.querySelector('#dialog-image');
  const previous = document.querySelector('#previous-slide');
  const next = document.querySelector('#next-slide');
  let activePost = null;
  let activeSlide = 0;
  let opener = null;
  let previousOverflow = '';

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function postUrl(url) {
    try {
      const parsed = new URL(url);
      if (parsed.protocol === 'https:' && ['instagram.com', 'www.instagram.com'].includes(parsed.hostname)) return parsed.href;
    } catch (_) { /* Absent links use the verified profile. */ }
    return 'https://www.instagram.com/anzeskralovnik/';
  }
  function renderMetrics(container, metrics) {
    container.replaceChildren();
    if (!metrics) return;
    const labels = { views: 'Ogledov', interactions: 'interakcije ljudi' };
    for (const [key, label] of Object.entries(labels)) {
      const value = metrics[key];
      const known = Number.isFinite(value) && value >= 0;
      const stat = element('div', 'dialog-metric');
      stat.append(element('strong', '', known ? value.toLocaleString('sl-SI') : '—'), element('span', '', label));
      if (key === 'interactions' && known) stat.title = `${metrics.interactionSource} En račun lahko prispeva več odzivov.`;
      if (key === 'views' && known) stat.title = `Instagram Insights · ${metrics.asOf}. Vključuje lahko ponovitve in oglase.`;
      if (!known) stat.title = 'Instagram tega podatka v spletnem vpogledu ne prikazuje.';
      container.append(stat);
    }

  }
  function showSlide(index) {
    activeSlide = (index + activePost.images.length) % activePost.images.length;
    image.src = activePost.images[activeSlide];
    const description = activePost.alts?.[activeSlide] || activePost.description;
    image.alt = `${activePost.title} — slika ${activeSlide + 1} od ${activePost.images.length}. ${description}`;
    document.querySelector('#slide-counter').textContent = `${activeSlide + 1} / ${activePost.images.length}`;
    previous.disabled = next.disabled = activePost.images.length < 2;
  }
  function openPost(post, trigger) {
    activePost = post;
    opener = trigger;
    document.querySelector('#dialog-title').textContent = post.title;
    document.querySelector('#dialog-description').textContent = post.description;
    const link = document.querySelector('#dialog-instagram');
    link.href = postUrl(post.url);
    link.textContent = post.url ? 'Odpri objavo na Instagramu ↗' : 'Obišči moj Instagram ↗';
    renderMetrics(document.querySelector('#dialog-metrics'), post.metrics);
    showSlide(0);
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    document.querySelector('#close-dialog').focus();
  }
  posts.filter(post => Array.isArray(post.images) && post.images.length).forEach(post => {
    const article = element('article', 'post-card');
    const preview = element('button', 'post-preview');
    preview.type = 'button';
    const countLabel = post.images.length === 1 ? '1 slika' : post.images.length === 2 ? '2 sliki' : post.images.length < 5 ? `${post.images.length} slike` : `${post.images.length} slik`;
    preview.setAttribute('aria-label', `Oglej si objavo ${post.title}, ${countLabel}`);
    const cover = element('img');
    cover.src = post.cover || post.images[0];
    const coverIndex = post.images.indexOf(cover.getAttribute('src'));
    cover.alt = post.alts?.[coverIndex] || post.title;
    cover.loading = 'lazy';
    cover.width = 1080; cover.height = 1350;
    const count = element('span', 'post-count', post.images.length > 1 ? `▱ ${countLabel}` : '01');
    count.setAttribute('aria-hidden', 'true');
    const expand = element('span', 'post-open', '↗');
    expand.setAttribute('aria-hidden', 'true');
    preview.append(cover, count, expand);
    preview.addEventListener('click', () => openPost(post, preview));
    const info = element('div', 'post-info');
    if (post.url) {
      const link = element('a', '', 'POVEZAVA ↗');
      link.href = postUrl(post.url); link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${post.title} na Instagramu`);
      info.append(link);
    }
    article.append(preview, info);
    if (post.metrics) {
      const metrics = element('div', 'post-metrics');
      renderMetrics(metrics, post.metrics); article.append(metrics);
    }
    grid.append(article);
  });
  previous.addEventListener('click', () => showSlide(activeSlide - 1));
  next.addEventListener('click', () => showSlide(activeSlide + 1));
  document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); showSlide(activeSlide + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus();
  });

  const hero = document.querySelector('#hero-video');
  const reel = document.querySelector('#reel-video');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!motionPreference.matches && !navigator.connection?.saveData) hero.play().catch(() => {});
  motionPreference.addEventListener('change', event => { if (event.matches) hero.pause(); });
  hero.addEventListener('play', () => reel.pause());
  reel.addEventListener('play', () => hero.pause());
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { hero.pause(); reel.pause(); }
  });
})();
