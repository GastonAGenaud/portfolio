// IIFE - To avoid flash of default theme: light
(function () {
  document.documentElement.classList.add('dark');
  // Restore the persona (engineer | creative) before paint to avoid a flash
  // of the wrong layout/palette when reloading inside the Creative persona.
  try {
    var persona = localStorage.getItem('persona');
    document.documentElement.dataset.persona =
      persona === 'creative' ? 'creative' : 'engineer';
  } catch (e) {
    document.documentElement.dataset.persona = 'engineer';
  }
})();
