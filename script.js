(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var isTouch = window.matchMedia('(hover: none)').matches;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  $('#yr').textContent = new Date().getFullYear();
  window.addEventListener('load', function () { setTimeout(function () { $('#loader').classList.add('done'); }, 600); });

  // Data-driven sections
  var services = [
    ['\u{1F4BB}', 'Full Web Systems', 'Complete systems with pages, dashboards and logic that work for real users, not just demos.'],
    ['\u{1F510}', 'Login, Register and Google Sign-In', 'Secure authentication with Firebase, including confirm-password, show/hide password and one-click Google login.'],
    ['\u2601\uFE0F', 'Cloud Data on Any Device', 'User data stored online so it follows them on every device through the same link.'],
    ['\u2709\uFE0F', 'Automatic Email Letters', 'Welcome and thank-you emails sent to the real inbox of each user using EmailJS and Apps Script.'],
    ['\u2728', 'UX/UI and Animation', 'Professional Bootstrap interfaces with smooth JavaScript and CSS animation and 3D effects.'],
    ['\u{1F3AE}', 'Gamified Platforms', 'XP, levels, worlds, locked challenges and certificates that make learning feel like a game.'],
    ['\u{1F6D2}', 'Marketplace and Payments Flow', 'Buy and sell systems with a payment-reference check, owner-only uploads and hidden code until purchase.'],
    ['\u{1F680}', 'Deployment and Protection', 'Hosting on Vercel with a custom flow, plus a real license to protect the work from copying.']
  ];
  var skills = [
    ['HTML5', 92], ['CSS3 and Animations', 90], ['JavaScript', 88], ['Bootstrap 5', 90],
    ['Firebase (Auth and Database)', 80], ['Vercel Deployment', 82], ['EmailJS and Google Apps Script', 75], ['UX/UI Design', 85]
  ];
  var steps = [
    ['1', 'Plan', 'I define the system, its users and the features it must have.'],
    ['2', 'Design', 'I create a clean UX/UI with Bootstrap and animation in mind.'],
    ['3', 'Build', 'I write separate, organized HTML, CSS and JavaScript files.'],
    ['4', 'Test and Fix', 'Every error I find is fixed right away until the system runs clean.'],
    ['5', 'Deploy', 'I publish it on Vercel and connect Firebase so it works on any device.']
  ];
  function fill(id, arr, fn) {
    var box = $(id);
    box.innerHTML = arr.map(fn).join('');
  }
  fill('#serviceList', services, function (s) {
    return '<div class="col-md-6 col-lg-3 reveal"><div class="glass svc tilt"><div class="ic">' + s[0] + '</div><h5>' + s[1] + '</h5><p>' + s[2] + '</p></div></div>';
  });
  fill('#skillList', skills, function (s) {
    return '<div class="col-md-6 reveal"><div class="glass skill"><div class="d-flex justify-content-between"><strong>' + s[0] + '</strong><span>' + s[1] + '%</span></div><div class="bar"><i data-w="' + s[1] / 100 + '"></i></div></div></div>';
  });
  fill('#stepList', steps, function (s) {
    return '<div class="col-md-6 col-lg reveal"><div class="glass step tilt"><b>' + s[0] + '</b><h5>' + s[1] + '</h5><p>' + s[2] + '</p></div></div>';
  });


  // Owner photo: put your picture in this folder as owner.jpg (or .jpeg / .png / .webp)
  (function () {
    var img = $('#ownerImg'), st = $('#portrait'), list = ['owner.jpg', 'owner.jpeg', 'owner.png', 'owner.webp'], k = 0;
    function next() { if (k < list.length) img.src = list[k++]; }
    img.addEventListener('load', function () { if (img.naturalWidth > 0) st.classList.add('has-photo'); });
    img.addEventListener('error', next);
    next();
  })();

  // Typing effect
  var words = ['Web Developer', 'UX/UI Designer', 'JavaScript Animator', 'System Builder'];
  var wi = 0, ci = 0, del = false, out = $('#typed');
  (function type() {
    var w = words[wi];
    ci += del ? -1 : 1;
    out.textContent = w.substring(0, ci);
    var t = del ? 45 : 95;
    if (!del && ci === w.length) { del = true; t = 1400; }
    else if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; t = 350; }
    setTimeout(type, t);
  })();

  // Reveal, counters, skill bars
  function count(el) {
    var target = +el.dataset.count, start = null;
    function f(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      el.classList.add('in');
      $$('[data-count]', el).forEach(count);
      $$('.bar i', el).forEach(function (b) { b.style.transform = 'scaleX(' + b.dataset.w + ')'; });
      io.unobserve(el);
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 0.1 + 's'; io.observe(el); });

  // Navbar + progress (batched with rAF)
  var nav = $('#topnav'), bar = $('#progress'), tick = false;
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    nav.classList.toggle('scrolled', window.scrollY > 40);
    bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
    tick = false;
  }
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  $$('#nav .nav-link').forEach(function (a) {
    a.addEventListener('click', function () {
      var c = $('#nav');
      if (c.classList.contains('show') && window.bootstrap) bootstrap.Collapse.getOrCreateInstance(c).hide();
    });
  });

  // Mouse effects (rAF-throttled): glow, hero cube parallax, 3D tilt
  var mxp = 0, myp = 0, mq = false, glow = $('#glow'), stage = $('#portrait'), mx = 0, my = 0;
  document.addEventListener('pointermove', function (e) {
    mxp = e.clientX; myp = e.clientY;
    mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5;
    if (!mq) {
      mq = true;
      requestAnimationFrame(function () {
        glow.style.transform = 'translate3d(' + mxp + 'px,' + myp + 'px,0)';
        stage.style.transform = 'rotateY(' + (mx * 26) + 'deg) rotateX(' + (-my * 26) + 'deg)';
        stage.style.setProperty('--sx', (50 + mx * 100) + '%');
        stage.style.setProperty('--sy', (30 + my * 100) + '%');
        mq = false;
      });
    }
  }, { passive: true });

  $$('.tilt').forEach(function (el) {
    var raf = 0, tx = 0, ty = 0;
    function apply() {
      el.style.transform = 'perspective(900px) rotateY(' + (tx * 14) + 'deg) rotateX(' + (-ty * 14) + 'deg) translateZ(10px)';
      raf = 0;
    }
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5;
      el.style.transitionProperty = 'box-shadow';
      if (!raf) raf = requestAnimationFrame(apply);
    });
    el.addEventListener('mouseleave', function () {
      el.style.transitionProperty = 'box-shadow, transform';
      el.style.transitionDuration = '.5s';
      el.style.transform = '';
    });
  });

  // Flip cards (tap on touch devices; keyboard supported)
  $$('.flip').forEach(function (c) {
    c.addEventListener('click', function (e) {
      if (e.target.closest('a')) return;
      if (isTouch) c.classList.toggle('on');
    });
    c.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.classList.toggle('on'); }
    });
  });

  // Three.js background (adaptive quality, pauses when hidden)
  var canvas = $('#bg3d');
  if (window.THREE && !reduce) {
    try {
      var small = window.innerWidth < 768;
      var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: !small, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.75));
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 8;
      function wire(geo, color, op) {
        return new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: op }));
      }
      var knot = wire(new THREE.TorusKnotGeometry(1.7, 0.42, small ? 90 : 140, small ? 10 : 16), 0x6c5ce7, 0.3);
      var ico = wire(new THREE.IcosahedronGeometry(1, 1), 0x00d2ff, 0.28);
      var octa = wire(new THREE.OctahedronGeometry(0.8, 0), 0xff4d9d, 0.35);
      ico.position.set(-4, -1.6, -1); octa.position.set(4.2, 2.4, -2);
      scene.add(knot, ico, octa);
      var N = small ? 350 : 800, pos = new Float32Array(N * 3);
      for (var i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 30;
      var pg = new THREE.BufferGeometry();
      pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      var pts = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x9fb0ff, size: 0.05, transparent: true, opacity: 0.8 }));
      scene.add(pts);

      var sy = 0;
      window.addEventListener('scroll', function () { sy = window.scrollY; }, { passive: true });
      function resize() {
        var w = window.innerWidth, h = window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
        knot.position.set(w < 992 ? 0 : 3.2, w < 992 ? 2.6 : 0, -2);
      }
      window.addEventListener('resize', resize);
      resize();

      var clock = new THREE.Clock(), running = true;
      document.addEventListener('visibilitychange', function () {
        running = !document.hidden;
        if (running) { clock.getDelta(); loop(); }
      });
      function loop() {
        if (!running) return;
        var t = clock.getElapsedTime();
        knot.rotation.x = t * 0.2 + sy * 0.0008; knot.rotation.y = t * 0.3;
        ico.rotation.x = t * 0.4; ico.rotation.y = t * 0.25;
        octa.rotation.y = t * 0.5; octa.rotation.z = t * 0.3;
        pts.rotation.y = t * 0.02 + sy * 0.0003;
        camera.position.x += (mx * 1.6 - camera.position.x) * 0.05;
        camera.position.y += (-my * 1.6 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        requestAnimationFrame(loop);
      }
      loop();
    } catch (err) { canvas.style.display = 'none'; }
  } else { canvas.style.display = 'none'; }

  // Contact form (opens the visitor's email app)
  $('#contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var n = $('#cName').value.trim(), m = $('#cEmail').value.trim(), msg = $('#cMsg').value.trim();
    var o = $('#formMsg');
    if (!n || !/^\S+@\S+\.\S+$/.test(m) || !msg) {
      o.className = 'mt-3 text-center text-danger';
      o.textContent = 'Please enter your name, a valid email and a message.';
      return;
    }
    window.location.href = 'mailto:ronielnyke@gmail.com?subject=' + encodeURIComponent('Portfolio message from ' + n) +
      '&body=' + encodeURIComponent(msg + '\n\nFrom: ' + n + ' (' + m + ')');
    o.className = 'mt-3 text-center text-info';
    o.textContent = 'Opening your email app... thank you!';
    this.reset();
  });
})();
