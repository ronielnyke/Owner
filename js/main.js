/* Boot: start effects after content is rendered, then hide the loader */
(function () {
  'use strict';
  window.FX.init();
  var hide = function () { setTimeout(function () { document.getElementById('loader').classList.add('done'); }, 450); };
  if (document.readyState === 'complete') hide(); else window.addEventListener('load', hide);
  setTimeout(hide, 3000); // safety: never leave the loader stuck if a CDN is slow
})();
