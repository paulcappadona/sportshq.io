(function () {
  var LABELS = {
    '/': 'EN', '/ar/': 'AR', '/de/': 'DE', '/el/': 'EL',
    '/en-AU/': 'EN·AU', '/en-CA/': 'EN·CA', '/en-GB/': 'EN·GB',
    '/en-IN/': 'EN·IN', '/en-SG/': 'EN·SG',
    '/es/': 'ES', '/es-419/': 'ES·LAT', '/es-MX/': 'ES·MX', '/fr/': 'FR',
    '/hi/': 'HI', '/id/': 'ID', '/it/': 'IT', '/ja/': 'JA',
    '/ko/': 'KO', '/nl/': 'NL', '/pt-BR/': 'PT·BR', '/pt-PT/': 'PT·PT',
    '/ru/': 'RU', '/sv/': 'SV', '/zh-HK/': 'ZH·HK',
    '/zh-Hant/': 'ZH·TW', '/zh-Hans/': 'ZH'
  };

  // Normalise current pathname to always have trailing slash
  var currentPath = window.location.pathname.replace(/\/?$/, '/');

  // For sub-pages (e.g. /fr/pp.html/), derive the locale root path (/fr/)
  var localePath = LABELS[currentPath] ? currentPath : (function () {
    var m = currentPath.match(/^(\/[^/]+\/)/);
    return (m && LABELS[m[1]]) ? m[1] : '/';
  }());

  // Set current label in nav button
  var labelEl = document.getElementById('navLocaleLabel');
  if (labelEl) labelEl.textContent = LABELS[localePath] || 'EN';

  // Mark active option in dropdown
  document.querySelectorAll('.locale-opt').forEach(function (opt) {
    if (opt.dataset.localePath === localePath) {
      opt.classList.add('locale-opt--active');
      opt.setAttribute('aria-selected', 'true');
    }
  });

  // Dropdown open / close
  var trigger = document.getElementById('navLocaleBtnTrigger');
  var dropdown = document.getElementById('navLocaleDropdown');

  if (trigger && dropdown) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(open));
    });

    document.addEventListener('click', function () {
      if (dropdown.classList.contains('is-open')) {
        dropdown.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    dropdown.addEventListener('click', function (e) {
      e.stopPropagation();
    });

    // Handle locale selection
    dropdown.querySelectorAll('.locale-opt').forEach(function (opt) {
      opt.addEventListener('click', function (e) {
        e.preventDefault();
        var path = this.dataset.localePath;
        try { localStorage.setItem('shq_locale', path); } catch (err) {}
        window.location.href = path;
      });
    });
  }
})();
