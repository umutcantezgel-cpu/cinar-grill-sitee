/**
 * Cinar Grill - Core JavaScript
 * Version: 1.0.0
 * WCAG 2.2 AA Compliant
 * Performance Optimized - < 10KB gzipped
 */

(function() {
  'use strict';

  /* ========================================
     CONFIGURATION
     ======================================== */

  const CONFIG = {
    selectors: {
      navToggle: '.nav-toggle',
      nav: '#main-navigation',
      langButton: '.lang-selector__button',
      langList: '.lang-selector__list',
      skipLinks: '.skip-link'
    },
    classes: {
      active: 'active',
      visible: 'visible'
    },
    attributes: {
      ariaExpanded: 'aria-expanded',
      ariaHidden: 'aria-hidden',
      ariaLabel: 'aria-label'
    }
  };

  /* ========================================
     UTILITIES
     ======================================== */

  const Utils = {
    /**
     * Query selector helper
     */
    qs(selector, context = document) {
      return context.querySelector(selector);
    },

    /**
     * Query selector all helper
     */
    qsa(selector, context = document) {
      return Array.from(context.querySelectorAll(selector));
    },

    /**
     * Add event listener with error handling
     */
    on(element, event, handler, options) {
      if (!element) return;
      try {
        element.addEventListener(event, handler, options);
      } catch (error) {
        console.error(`Error adding ${event} listener:`, error);
      }
    },

    /**
     * Debounce function
     */
    debounce(func, wait = 300) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },

    /**
     * Check if reduced motion is preferred
     */
    prefersReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    /**
     * Focus trap for modals/dialogs
     */
    createFocusTrap(element) {
      const focusableElements = element.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      return function trapFocus(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      };
    }
  };

  /* ========================================
     MOBILE NAVIGATION
     ======================================== */

  class MobileNavigation {
    constructor() {
      this.toggle = Utils.qs(CONFIG.selectors.navToggle);
      this.nav = Utils.qs(CONFIG.selectors.nav);

      if (!this.toggle || !this.nav) return;

      this.isOpen = false;
      this.init();
    }

    init() {
      Utils.on(this.toggle, 'click', () => this.toggleNav());

      // Close on Escape key
      Utils.on(document, 'keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeNav();
        }
      });

      // Close on outside click
      Utils.on(document, 'click', (e) => {
        if (
          this.isOpen &&
          !this.nav.contains(e.target) &&
          !this.toggle.contains(e.target)
        ) {
          this.closeNav();
        }
      });

      // Close on link click (mobile)
      const links = Utils.qsa('.nav__link', this.nav);
      links.forEach(link => {
        Utils.on(link, 'click', () => this.closeNav());
      });
    }

    toggleNav() {
      this.isOpen ? this.closeNav() : this.openNav();
    }

    openNav() {
      this.isOpen = true;
      this.toggle.setAttribute(CONFIG.attributes.ariaExpanded, 'true');
      this.nav.setAttribute(CONFIG.attributes.ariaHidden, 'false');
      this.toggle.setAttribute(
        CONFIG.attributes.ariaLabel,
        'Hauptmenü schließen'
      );

      // Focus first link
      const firstLink = Utils.qs('.nav__link', this.nav);
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    }

    closeNav() {
      this.isOpen = false;
      this.toggle.setAttribute(CONFIG.attributes.ariaExpanded, 'false');
      this.nav.setAttribute(CONFIG.attributes.ariaHidden, 'true');
      this.toggle.setAttribute(
        CONFIG.attributes.ariaLabel,
        'Hauptmenü öffnen'
      );
    }
  }

  /* ========================================
     LANGUAGE SELECTOR
     ======================================== */

  class LanguageSelector {
    constructor() {
      this.button = Utils.qs(CONFIG.selectors.langButton);
      this.list = Utils.qs(CONFIG.selectors.langList);

      if (!this.button || !this.list) return;

      this.isOpen = false;
      this.init();
    }

    init() {
      Utils.on(this.button, 'click', (e) => {
        e.stopPropagation();
        this.toggle();
      });

      // Close on Escape
      Utils.on(document, 'keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
          this.button.focus();
        }
      });

      // Close on outside click
      Utils.on(document, 'click', (e) => {
        if (
          this.isOpen &&
          !this.list.contains(e.target) &&
          !this.button.contains(e.target)
        ) {
          this.close();
        }
      });

      // Arrow key navigation
      const options = Utils.qsa('[role="option"]', this.list);
      options.forEach((option, index) => {
        const link = Utils.qs('a', option);

        Utils.on(link, 'keydown', (e) => {
          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              const nextLink = Utils.qs('a', options[index + 1]);
              if (nextLink) nextLink.focus();
              break;
            case 'ArrowUp':
              e.preventDefault();
              const prevLink = Utils.qs('a', options[index - 1]);
              if (prevLink) prevLink.focus();
              else this.button.focus();
              break;
          }
        });
      });
    }

    toggle() {
      this.isOpen ? this.close() : this.open();
    }

    open() {
      this.isOpen = true;
      this.button.setAttribute(CONFIG.attributes.ariaExpanded, 'true');
      this.list.setAttribute(CONFIG.attributes.ariaHidden, 'false');

      // Focus first option
      const firstLink = Utils.qs('a', this.list);
      if (firstLink) {
        setTimeout(() => firstLink.focus(), 100);
      }
    }

    close() {
      this.isOpen = false;
      this.button.setAttribute(CONFIG.attributes.ariaExpanded, 'false');
      this.list.setAttribute(CONFIG.attributes.ariaHidden, 'true');
    }
  }

  /* ========================================
     SMOOTH SCROLL
     ======================================== */

  class SmoothScroll {
    constructor() {
      this.links = Utils.qsa('a[href^="#"]');
      if (!this.links.length) return;
      this.init();
    }

    init() {
      this.links.forEach(link => {
        Utils.on(link, 'click', (e) => this.handleClick(e, link));
      });
    }

    handleClick(e, link) {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = Utils.qs(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = Utils.qs('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      if (Utils.prefersReducedMotion()) {
        window.scrollTo(0, targetPosition);
      } else {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }

      // Focus target for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus();
    }
  }

  /* ========================================
     ACTIVE SECTION HIGHLIGHT
     ======================================== */

  class ActiveSectionHighlight {
    constructor() {
      this.sections = Utils.qsa('section[id]');
      this.navLinks = Utils.qsa('.nav__link');

      if (!this.sections.length || !this.navLinks.length) return;

      this.init();
    }

    init() {
      const handleScroll = Utils.debounce(() => {
        this.updateActiveLink();
      }, 100);

      Utils.on(window, 'scroll', handleScroll, { passive: true });
    }

    updateActiveLink() {
      const scrollPosition = window.pageYOffset + 200;

      this.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          this.navLinks.forEach(link => {
            link.removeAttribute('aria-current');

            if (link.getAttribute('href') === `#${sectionId}`) {
              link.setAttribute('aria-current', 'page');
            }
          });
        }
      });
    }
  }

  /* ========================================
     SCROLL TO TOP
     ======================================== */

  class ScrollToTop {
    constructor() {
      this.threshold = 300;
      this.createButton();
    }

    createButton() {
      // Only create if doesn't exist
      if (Utils.qs('#scroll-to-top')) return;

      const button = document.createElement('button');
      button.id = 'scroll-to-top';
      button.className = 'scroll-to-top';
      button.setAttribute('aria-label', 'Nach oben scrollen');
      button.innerHTML = `
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      `;

      document.body.appendChild(button);
      this.button = button;

      this.init();
    }

    init() {
      Utils.on(this.button, 'click', () => {
        if (Utils.prefersReducedMotion()) {
          window.scrollTo(0, 0);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });

      const handleScroll = Utils.debounce(() => {
        this.toggleVisibility();
      }, 100);

      Utils.on(window, 'scroll', handleScroll, { passive: true });
    }

    toggleVisibility() {
      if (window.pageYOffset > this.threshold) {
        this.button.classList.add('visible');
        this.button.setAttribute('aria-hidden', 'false');
      } else {
        this.button.classList.remove('visible');
        this.button.setAttribute('aria-hidden', 'true');
      }
    }
  }

  /* ========================================
     LAZY LOADING
     ======================================== */

  class LazyLoad {
    constructor() {
      this.images = Utils.qsa('img[data-src], img[loading="lazy"]');
      if (!this.images.length) return;
      this.init();
    }

    init() {
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                this.loadImage(entry.target);
                observer.unobserve(entry.target);
              }
            });
          },
          { rootMargin: '50px' }
        );

        this.images.forEach(img => observer.observe(img));
      } else {
        // Fallback for older browsers
        this.images.forEach(img => this.loadImage(img));
      }
    }

    loadImage(img) {
      const src = img.getAttribute('data-src');
      if (src) {
        img.src = src;
        img.removeAttribute('data-src');
      }
    }
  }

  /* ========================================
     INITIALIZATION
     ======================================== */

  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initModules);
    } else {
      initModules();
    }
  }

  function initModules() {
    try {
      new MobileNavigation();
      new LanguageSelector();
      new SmoothScroll();
      new ActiveSectionHighlight();
      new LazyLoad();

      // Optional: Only add scroll-to-top on longer pages
      if (document.body.scrollHeight > window.innerHeight * 2) {
        new ScrollToTop();
      }

      // Log successful initialization (remove in production)
      console.log('%c✓ Cinar Grill Core JS initialized', 'color: #C41E3A; font-weight: bold;');
    } catch (error) {
      console.error('Error initializing core modules:', error);
    }
  }

  // Start initialization
  init();

})();
