/**
 * parallax.js — RAF-based scroll parallax engine
 * Each SVG layer has a data-speed attribute (0–1).
 * Lower speed = farther away (moves less).
 * Formula: translateY(scrollY * speed * -1)
 */
(function () {
  'use strict';

  const layers = [];
  let lastScrollY = 0;
  let ticking = false;

  function collectLayers() {
    document.querySelectorAll('[data-speed]').forEach(function (el) {
      layers.push({
        el: el,
        speed: parseFloat(el.dataset.speed) || 0,
      });
    });
  }

  function applyParallax(scrollY) {
    layers.forEach(function (layer) {
      var offset = scrollY * layer.speed * -1;
      layer.el.style.transform = 'translateY(' + offset + 'px)';
    });
  }

  function onScroll() {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(function () {
        applyParallax(lastScrollY);
        ticking = false;
      });
      ticking = true;
    }

    // Fade out scroll hint on first scroll
    if (lastScrollY > 10) {
      var hint = document.querySelector('.scroll-hint');
      if (hint && !hint.classList.contains('hidden')) {
        hint.classList.add('hidden');
        // Remove listener after first trigger
        window.removeEventListener('scroll', onScroll, { passive: true });
        // Re-add a lightweight listener just for parallax
        window.addEventListener('scroll', onScrollParallaxOnly, { passive: true });
      }
    }
  }

  function onScrollParallaxOnly() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        applyParallax(lastScrollY);
        ticking = false;
      });
      ticking = true;
    }
  }

  function init() {
    collectLayers();
    applyParallax(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Clear form when user navigates back from Formspree (bfcache restore)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      var form = document.querySelector('.contact-form');
      if (form) form.reset();
    }
  });
})();
