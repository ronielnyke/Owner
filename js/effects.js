/* Scroll reveal, counters, 3D tilt, flip cards, pointer parallax, progress bar */
(function () {
  'use strict';
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var M = window.MOUSE = { x: 0, y: 0, px: 0, py: 0 };
  var isTouch = window.matchMedia('(hover: none)').matches;

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

  function reveal() {
    $$('.reveal:not(.seen)').forEach(function (el, i) {
      el.classList.add('seen');
      el.style.transitionDelay = (i % 4) * 0.1 + 's';
      io.observe(el);
    });
  }

  function tilt() {
    $$('.tilt:not(.tilted)').forEach(function (el) {
      el.classList.add('tilted');
      var raf = 0, tx = 0, ty = 0;
      function apply() {
        el.style.transform = 'perspective(900px) rotateY(' + (tx * 14) + 'deg) rotateX(' + (-ty * 14) + 'deg) translateZ(10px)';
        raf = 0;
      }
      el.addEventListener('pointermove', function (e) {
        if (e.pointerType === 'touch') return;
        var r = el.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5;
        el.style.transition = 'transform .12s ease-out, box-shadow .3s';
        if (!raf) raf = requestAnimationFrame(apply);
      });
      el.addEventListener('pointerleave', function () {
        el.style.transition = 'box-shadow .3s, transform .5s';
        el.style.transform = '';
      });
    });
  }

  function flips() {
    $$('.flip:not(.flipped)').forEach(function (c) {
      c.classList.add('flipped');
      c.addEventListener('click', function (e) { if (!e.target.closest('a') && isTouch) c.classList.toggle('on'); });
      c.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.classList.toggle('on'); }
      });
    });
  }

  // Pointer parallax: eased every frame so the 3D movement is smooth, never jumpy
  var glow = document.getElementById('glow'), running = false;
  function frame() {
    var moving = false;
    if (glow) glow.style.transform = 'translate3d(' + M.px + 'px,' + M.py + 'px,0)';
    $$('[data-parallax]').forEach(function (el) {
      var k = +el.dataset.parallax || 20, s = el._s || (el._s = { x: 0, y: 0 });
      var tx = M.x * k, ty = -M.y * k;
      s.x += (tx - s.x) * 0.08; s.y += (ty - s.y) * 0.08;
      if (Math.abs(tx - s.x) > 0.01 || Math.abs(ty - s.y) > 0.01) moving = true;
      el.style.transform = 'rotateY(' + s.x.toFixed(2) + 'deg) rotateX(' + s.y.toFixed(2) + 'deg)';
      el.style.setProperty('--sx', (50 + s.x * 3.8).toFixed(1) + '%');
      el.style.setProperty('--sy', (30 - s.y * 3.8).toFixed(1) + '%');
    });
    if (moving) requestAnimationFrame(frame); else running = false;
  }
  document.addEventListener('pointermove', function (e) {
    M.px = e.clientX; M.py = e.clientY;
    M.x = e.clientX / window.innerWidth - 0.5; M.y = e.clientY / window.innerHeight - 0.5;
    if (!running) { running = true; requestAnimationFrame(frame); }
  }, { passive: true });

  // Navbar state and progress bar
  var tick = false;
  function onScroll() {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    var nav = document.getElementById('topnav'), bar = document.getElementById('progress');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
    if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
    tick = false;
  }
  window.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });

  window.FX = { init: function () { reveal(); tilt(); flips(); onScroll(); } };
})();
