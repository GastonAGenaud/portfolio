// IIFE - To avoid flash of default theme: light
(function () {
  document.documentElement.classList.add('dark');
  // Persona (engineer | creative) is resolved server-side from the cookie and
  // rendered onto <html data-persona> directly — no client restore needed.
})();
