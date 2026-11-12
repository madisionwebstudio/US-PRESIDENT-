// Doug Jenkins for President 2028 — minimal progressive enhancement (~2 KB)
(() => {
  const doc = document.documentElement;

  // Header shadow on scroll
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile navigation
  const toggle = document.querySelector('[data-nav-toggle]');
  const panel = document.querySelector('[data-mobile-nav]');
  if (toggle && panel) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
      document.body.classList.toggle('nav-open', open);
      if (open) panel.querySelector('a')?.focus();
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
    panel.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    matchMedia('(min-width: 1080px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });
  }

  // Close desktop mega menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = document.activeElement?.closest('.has-mega');
    if (open) document.activeElement.blur();
  });

  // Reveal on scroll
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('is-visible'));
  }

  // Forms. If a form has data-endpoint (e.g. a form service URL), it POSTs there.
  // Otherwise it opens the visitor's email app addressed to the campaign.
  const CAMPAIGN_EMAIL = 'dougjenkins.1890@gmail.com';
  const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  document.querySelectorAll('[data-mailto-form]').forEach((form) => {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let firstInvalid = null;
      form.querySelectorAll('[required]').forEach((input) => {
        const ok = input.type === 'email' ? validEmail(input.value.trim()) : input.value.trim() !== '';
        input.setAttribute('aria-invalid', String(!ok));
        const err = document.getElementById(input.getAttribute('aria-describedby'));
        if (err) err.hidden = ok;
        if (!ok && !firstInvalid) firstInvalid = input;
      });
      if (firstInvalid) { firstInvalid.focus(); return; }

      const data = Object.fromEntries(new FormData(form).entries());
      const endpoint = form.dataset.endpoint;
      if (endpoint) {
        try {
          const res = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
          if (!res.ok) throw new Error(res.statusText);
          form.reset();
          status.textContent = form.hasAttribute('data-signup') ? 'Thank you for joining the movement!' : 'Thank you. Your message has been sent.';
        } catch {
          status.textContent = `Sorry, something went wrong. Please email ${CAMPAIGN_EMAIL}.`;
        }
        return;
      }
      const lines = form.hasAttribute('data-signup')
        ? [`Please add ${data.email} to the Doug Jenkins for President 2028 email list.`]
        : [`Name: ${data.name || ''}`, `Email: ${data.email}`, `Where did you hear about us?: ${data.source || ''}`, '', data.message || ''];
      const href = `mailto:${CAMPAIGN_EMAIL}?subject=${encodeURIComponent(form.dataset.subject || 'Website message')}&body=${encodeURIComponent(lines.join('\n'))}`;
      window.location.href = href;
      status.textContent = `Your email app should now open with your message to ${CAMPAIGN_EMAIL}. Press send there to deliver it.`;
    });
  });

  doc.classList.add('js-ready');
})();
