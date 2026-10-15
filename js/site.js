/* Wild Hog Vineyard — small progressive enhancements (no dependencies). */
(function () {
  document.documentElement.classList.remove('no-js');

  /* Mobile navigation toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus();
      }
    });
  }

  /* Photo lightbox */
  var links = Array.prototype.slice.call(document.querySelectorAll('.gallery a'));
  var box = document.getElementById('lightbox');
  if (links.length && box && typeof box.showModal === 'function') {
    var img = box.querySelector('img'), cap = box.querySelector('.lightbox-caption'), i = 0;
    function show(n) {
      i = (n + links.length) % links.length;
      img.src = links[i].getAttribute('href');
      img.alt = links[i].dataset.caption || '';
      cap.textContent = links[i].dataset.caption || '';
      // preload neighbours
      [i + 1, i - 1].forEach(function (k) { var p = new Image(); p.src = links[(k + links.length) % links.length].getAttribute('href'); });
    }
    links.forEach(function (a, n) {
      a.addEventListener('click', function (e) { e.preventDefault(); show(n); box.showModal(); });
    });
    box.querySelector('.prev').addEventListener('click', function () { show(i - 1); });
    box.querySelector('.next').addEventListener('click', function () { show(i + 1); });
    box.querySelector('.close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
    box.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(i + 1);
      if (e.key === 'ArrowLeft') show(i - 1);
    });
    var x0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.changedTouches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1);
    }, { passive: true });
  }

  /* Past releases filter */
  var filter = document.getElementById('wine-filter');
  if (filter) {
    var groups = Array.prototype.slice.call(document.querySelectorAll('.year-group'));
    var empty = document.querySelector('.no-results');
    filter.addEventListener('input', function () {
      var q = filter.value.trim().toLowerCase();
      var any = false;
      groups.forEach(function (g) {
        var visible = 0;
        Array.prototype.forEach.call(g.querySelectorAll('.wine'), function (w) {
          var hit = !q || w.textContent.toLowerCase().indexOf(q) !== -1;
          w.hidden = !hit; if (hit) visible++;
        });
        g.hidden = visible === 0; if (visible) any = true;
      });
      if (empty) empty.classList.toggle('is-visible', !any);
    });
  }
})();
