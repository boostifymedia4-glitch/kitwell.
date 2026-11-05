/* Runs before the page is painted so there is no flash of the wrong theme.
   A saved choice wins; otherwise the system preference is used. */
(function () {
  var t = null;
  try { t = localStorage.getItem('kitwell-theme'); } catch (e) {}
  if (t !== 'light' && t !== 'dark') t = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
  var m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute('content', t === 'dark' ? '#0c1413' : '#0f766e');
})();
