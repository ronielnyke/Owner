/* Renders page content from data.js. Every block only runs if its container exists on the page. */
(function () {
  'use strict';
  var P = window.PORTFOLIO;
  var $ = function (s) { return document.querySelector(s); };
  function fill(sel, arr, fn) { var el = $(sel); if (el) el.innerHTML = arr.map(fn).join(''); }

  // Typing effect
  var out = $('#typed');
  if (out) {
    var wi = 0, ci = 0, del = false;
    (function type() {
      var w = P.words[wi];
      ci += del ? -1 : 1;
      out.textContent = w.substring(0, ci);
      var t = del ? 45 : 95;
      if (!del && ci === w.length) { del = true; t = 1400; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % P.words.length; t = 350; }
      setTimeout(type, t);
    })();
  }

  // Owner photo: place owner.jpg (or .jpeg / .png / .webp) in the portfolio folder
  var img = $('#ownerImg'), st = $('#portrait');
  if (img && st) {
    var list = ['assets/owner.jpg', 'assets/owner.jpeg', 'assets/owner.png', 'assets/owner.webp', 'owner.jpg', 'owner.png'], k = 0;
    var next = function () { if (k < list.length) img.src = list[k++]; };
    img.addEventListener('load', function () { if (img.naturalWidth > 0) st.classList.add('has-photo'); });
    img.addEventListener('error', next);
    next();
  }

  // Tech marquee
  var mq = $('#marquee');
  if (mq) {
    var one = P.tech.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    mq.innerHTML = '<div class="marquee-track">' + one + one + '</div>';
  }

  fill('#serviceList', P.services, function (s) {
    return '<div class="col-md-6 col-lg-3 reveal"><div class="glass svc tilt"><div class="ic">' + s[0] + '</div><h5>' + s[1] + '</h5><p>' + s[2] + '</p></div></div>';
  });
  fill('#skillList', P.skills, function (s) {
    return '<div class="col-md-6 reveal"><div class="glass skill"><div class="d-flex justify-content-between"><strong>' + s[0] + '</strong><span>' + s[1] + '%</span></div><div class="bar"><i data-w="' + s[1] / 100 + '"></i></div></div></div>';
  });
  fill('#focusList', P.focus, function (s) {
    return '<div class="col-md-6 col-lg-3 reveal"><div class="glass svc tilt"><div class="ic">' + s[0] + '</div><h5>' + s[1] + '</h5><p>' + s[2] + '</p></div></div>';
  });
  fill('#otherList', P.others, function (s) {
    return '<div class="col-md-6 col-lg-4 reveal"><div class="glass svc tilt"><div class="ic">' + s[0] + '</div><h5>' + s[1] + ' <span class="ver">' + s[2] + '</span></h5><p>' + s[3] + '</p></div></div>';
  });
  fill('#stepList', P.steps, function (s) {
    return '<div class="col-md-6 col-lg reveal"><div class="glass step tilt"><b>' + s[0] + '</b><h5>' + s[1] + '</h5><p>' + s[2] + '</p></div></div>';
  });
  fill('#whyList', P.why, function (s) {
    return '<div class="col-md-6 col-lg-3 reveal"><div class="glass why"><h6>' + s[0] + '</h6><p>' + s[1] + '</p></div></div>';
  });

  function thumb(p) {
    return '<div class="thumb ' + p.cls + '"><img class="logo" src="' + p.logo + '" alt="' + p.name + ' logo" loading="lazy" onload="this.parentNode.classList.add(\'has-logo\')" onerror="this.remove()"><span>' + p.icon + '</span></div>';
  }
  var ver = function (p) { return '<span class="ver">' + p.ver + '</span>'; };

  // Featured systems (home): only the ones that have a live link
  var live = P.projects.filter(function (p) { return p.url; });
  fill('#featured', live, function (p) {
    return '<div class="col-lg-4 reveal"><a class="glass mini tilt" href="' + p.url + '" target="_blank" rel="noopener">' + thumb(p) +
      '<div><h5>' + p.name + ' ' + ver(p) + '</h5><p>' + p.role + '</p><p class="text-info">' + p.host + '</p></div><span class="go">&#8599;</span></a></div>';
  });

  // Flip cards (systems page)
  fill('#projectList', P.projects, function (p) {
    var btn = p.url
      ? '<a class="btn btn-glow w-100 mt-auto" href="' + p.url + '" target="_blank" rel="noopener">Visit ' + p.host + ' &#8599;</a>'
      : '<span class="btn btn-outline-glow w-100 mt-auto disabled">Coming Soon</span>';
    var links = p.links.length ? '<div class="d-flex flex-wrap gap-2 mb-3">' + p.links.map(function (l) {
      return '<a class="btn btn-sm btn-outline-glow" href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + '</a>';
    }).join('') + '</div>' : '';
    return '<div class="col-md-6 col-xl-3 reveal"><div class="flip" tabindex="0"><div class="flip-in">' +
      '<div class="side front">' + thumb(p) + '<h3>' + p.name + ' ' + ver(p) + '</h3><p class="role">' + p.role + '</p><p>' + p.desc + '</p>' +
      '<div class="tags">' + p.tags.map(function (t) { return '<em>' + t + '</em>'; }).join('') + '</div>' + btn + '<span class="hint">&#8635; Flip to see what it can do</span></div>' +
      '<div class="side back"><h4>' + p.name + ' ' + ver(p) + '</h4><ul>' + p.can.map(function (c) { return '<li>' + c + '</li>'; }).join('') + '</ul>' + links + btn + '</div>' +
      '</div></div></div>';
  });

  // Contact form (opens the visitor's email app)
  var form = $('#contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var n = $('#cName').value.trim(), m = $('#cEmail').value.trim(), msg = $('#cMsg').value.trim(), o = $('#formMsg');
      if (!n || !/^\S+@\S+\.\S+$/.test(m) || !msg) {
        o.className = 'mt-3 text-center text-danger';
        o.textContent = 'Please enter your name, a valid email and a message.';
        return;
      }
      window.location.href = 'mailto:' + P.owner.email + '?subject=' + encodeURIComponent('Portfolio message from ' + n) +
        '&body=' + encodeURIComponent(msg + '\n\nFrom: ' + n + ' (' + m + ')');
      o.className = 'mt-3 text-center text-info';
      o.textContent = 'Opening your email app... thank you!';
      form.reset();
    });
  }
})();
