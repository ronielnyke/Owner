/* Shared navbar, footer, active link and smooth page transitions */
(function () {
  'use strict';
  var P = window.PORTFOLIO, page = document.body.dataset.page;

  var items = P.nav.map(function (n) {
    return '<li class="nav-item"><a class="nav-link' + (n[2] === page ? ' active' : '') + '" href="' + n[1] + '">' + n[0] + '</a></li>';
  }).join('');
  document.getElementById('app-nav').innerHTML =
    '<nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="topnav"><div class="container">' +
    '<a class="navbar-brand brand" href="index.html">RNG<span>.</span></a>' +
    '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav" aria-label="Open menu"><span class="navbar-toggler-icon"></span></button>' +
    '<div class="collapse navbar-collapse" id="nav"><ul class="navbar-nav ms-auto gap-lg-2 align-items-lg-center">' + items +
    '<li class="nav-item"><a class="btn btn-glow btn-sm ms-lg-2 mt-2 mt-lg-0" href="contact.html">Hire Me</a></li></ul></div></div></nav>';

  var pages = P.nav.map(function (n) { return '<li><a href="' + n[1] + '">' + n[0] + '</a></li>'; }).join('');
  var sys = P.projects.filter(function (p) { return p.url; }).map(function (p) {
    return '<li><a href="' + p.url + '" target="_blank" rel="noopener">' + p.name + '</a></li>';
  }).join('');
  document.getElementById('app-footer').innerHTML =
    '<footer class="foot"><div class="container"><div class="row g-4">' +
    '<div class="col-lg-4"><h6 class="brand">RNG<span>.</span></h6><p>' + P.owner.name + ' is a web developer from Lambunao, Iloilo who builds real, animated web systems with HTML, CSS, JavaScript, Bootstrap and Firebase.</p></div>' +
    '<div class="col-6 col-lg-2"><h6>Pages</h6><ul>' + pages + '</ul></div>' +
    '<div class="col-6 col-lg-3"><h6>Live Systems</h6><ul>' + sys + '</ul></div>' +
    '<div class="col-lg-3"><h6>Contact</h6><ul><li><a href="mailto:' + P.owner.email + '">' + P.owner.email + '</a></li><li>' + P.owner.school + '</li><li>' + P.owner.location + '</li><li><a href="' + P.owner.github + '" target="_blank" rel="noopener">GitHub: ' + P.owner.githubName + '</a></li></ul></div>' +
    '</div><div class="copy"><p class="mb-1">Designed &amp; developed by <strong>' + P.owner.name + '</strong> - ' + P.owner.short + '</p>' +
    '<small>&copy; ' + new Date().getFullYear() + ' ' + P.owner.name + '. All rights reserved. &middot; <a href="LICENSE.txt" target="_blank" rel="noopener">License</a></small></div></div></footer>';

  // Page transitions
  document.body.classList.add('page-in');
  window.addEventListener('pageshow', function () { document.body.classList.remove('leaving'); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
    if (!/^(https?:|file:)$/.test(a.protocol) || a.origin !== location.origin) return;
    if (a.pathname === location.pathname) return;
    e.preventDefault();
    document.body.classList.add('leaving');
    setTimeout(function () { location.href = a.href; }, 380);
  });
})();
