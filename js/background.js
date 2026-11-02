/* 3D animated background (Three.js) with adaptive quality; pauses when the tab is hidden */
(function () {
  'use strict';
  var canvas = document.getElementById('bg3d');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canvas || !window.THREE || reduce) { if (canvas) canvas.style.display = 'none'; return; }
  try {
    var small = window.innerWidth < 768, M = window.MOUSE;
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
      camera.position.x += (M.x * 1.6 - camera.position.x) * 0.05;
      camera.position.y += (-M.y * 1.6 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }
    loop();
  } catch (err) { canvas.style.display = 'none'; }
})();
