(() => {
  const grid = document.getElementById('grid');
  const tiles = Array.from(grid.querySelectorAll('.tile'));

  const toggleBtn = document.getElementById('filterToggle');
  const panel = document.getElementById('filterPanel');
  const closeBtn = document.getElementById('filterClose');
  const backdrop = document.getElementById('filterBackdrop');
  const searchInput = document.getElementById('searchInput');
  const chips = Array.from(document.querySelectorAll('#tagChips .chip'));

  let activeTag = 'all';
  let q = '';

  const openPanel = () => {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    backdrop.hidden = false;
  };

  const closePanel = () => {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    backdrop.hidden = true;
  };

  const apply = () => {
    const query = q.trim().toLowerCase();

    tiles.forEach(tile => {
      const title = (tile.dataset.title || '').toLowerCase();
      const desc = (tile.dataset.desc || '').toLowerCase();
      const tags = (tile.dataset.tags || '').toLowerCase();

      const okTag = activeTag === 'all' ? true : tags.split(/\s+/).includes(activeTag);
      const okQ = !query ? true : (title.includes(query) || desc.includes(query) || tags.includes(query));

      tile.style.display = (okTag && okQ) ? '' : 'none';
    });
  };

  toggleBtn?.addEventListener('click', openPanel);
  closeBtn?.addEventListener('click', closePanel);
  backdrop?.addEventListener('click', closePanel);

  searchInput?.addEventListener('input', (e) => {
    q = e.target.value || '';
    apply();
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeTag = chip.dataset.tag || 'all';
      apply();
    });
  });

  apply();
})();
