// Mobile Navigation Toggle
(function() {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');
  const mobileQuery = window.matchMedia('(max-width: 768px)');

  if (!navToggle || !siteNav) {
    return; // Elements not found, exit
  }

  if (!siteNav.id) {
    siteNav.id = 'site-nav';
  }

  navToggle.setAttribute('aria-controls', siteNav.id);

  function setMenuState(isOpen) {
    const shouldOpen = Boolean(isOpen) && mobileQuery.matches;
    siteNav.classList.toggle('is-open', shouldOpen);
    siteNav.hidden = mobileQuery.matches ? !shouldOpen : false;
    navToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
  }

  function toggleMenu() {
    setMenuState(!siteNav.classList.contains('is-open'));
  }

  function syncMenuToViewport() {
    setMenuState(false);
    if (!mobileQuery.matches) {
      siteNav.hidden = false;
    }
  }

  navToggle.addEventListener('click', toggleMenu);

  const navLinks = siteNav.querySelectorAll('.nav-link');
  navLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (mobileQuery.matches) {
        setMenuState(false);
      }
    });
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      setMenuState(false);
      navToggle.focus();
    }
  });

  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', syncMenuToViewport);
  } else if (typeof mobileQuery.addListener === 'function') {
    mobileQuery.addListener(syncMenuToViewport);
  }

  syncMenuToViewport();
})();
