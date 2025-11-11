/**
 * Cinar Grill - Consent Management
 * Version: 1.0.0
 * GDPR/DSGVO Compliant
 * Privacy-First Approach - Essential Cookies Only by Default
 */

(function() {
  'use strict';

  /* ========================================
     CONFIGURATION
     ======================================== */

  const CONSENT_CONFIG = {
    cookieName: 'cinar_grill_consent',
    cookieExpiry: 365, // days
    categories: {
      essential: true, // Always enabled
      analytics: false,
      marketing: false
    },
    selectors: {
      banner: '#consent-banner',
      acceptBtn: '#consent-accept',
      settingsBtn: '#consent-settings',
      modal: '#consent-modal'
    }
  };

  /* ========================================
     CONSENT MANAGER
     ======================================== */

  class ConsentManager {
    constructor() {
      this.consent = this.loadConsent();
      this.banner = document.querySelector(CONSENT_CONFIG.selectors.banner);
      this.acceptBtn = document.querySelector(CONSENT_CONFIG.selectors.acceptBtn);
      this.settingsBtn = document.querySelector(CONSENT_CONFIG.selectors.settingsBtn);

      if (!this.banner) {
        console.warn('Consent banner not found');
        return;
      }

      this.init();
    }

    init() {
      // Show banner if no consent given
      if (!this.consent) {
        this.showBanner();
      }

      // Event listeners
      if (this.acceptBtn) {
        this.acceptBtn.addEventListener('click', () => this.acceptAll());
      }

      if (this.settingsBtn) {
        this.settingsBtn.addEventListener('click', () => this.openSettings());
      }

      // Keyboard support
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isBannerVisible()) {
          this.hideBanner();
        }
      });

      // Log consent status
      this.logConsentStatus();
    }

    /**
     * Load consent from cookie
     */
    loadConsent() {
      const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith(CONSENT_CONFIG.cookieName + '='));

      if (!cookie) return null;

      try {
        const value = cookie.split('=')[1];
        return JSON.parse(decodeURIComponent(value));
      } catch (error) {
        console.error('Error parsing consent cookie:', error);
        return null;
      }
    }

    /**
     * Save consent to cookie
     */
    saveConsent(consent) {
      const expires = new Date();
      expires.setDate(expires.getDate() + CONSENT_CONFIG.cookieExpiry);

      const cookieValue = encodeURIComponent(JSON.stringify(consent));
      const cookieString = `${CONSENT_CONFIG.cookieName}=${cookieValue}; expires=${expires.toUTCString()}; path=/; SameSite=Strict; Secure`;

      document.cookie = cookieString;
      this.consent = consent;

      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('consentUpdated', {
        detail: consent
      }));

      this.logConsentStatus();
    }

    /**
     * Accept all cookies
     */
    acceptAll() {
      const consent = {
        essential: true,
        analytics: true,
        marketing: true,
        timestamp: Date.now(),
        version: '1.0.0'
      };

      this.saveConsent(consent);
      this.hideBanner();

      // Initialize analytics if accepted (placeholder)
      if (consent.analytics) {
        this.initAnalytics();
      }
    }

    /**
     * Accept essential only
     */
    acceptEssential() {
      const consent = {
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: Date.now(),
        version: '1.0.0'
      };

      this.saveConsent(consent);
      this.hideBanner();
    }

    /**
     * Open settings modal (placeholder)
     */
    openSettings() {
      // For now, just accept essential
      // In production, this would open a modal with granular controls
      this.acceptEssential();

      console.log('Consent settings opened');
      alert('Einstellungen: Aktuell verwenden wir nur essentielle Cookies für die Grundfunktionen der Website.');
    }

    /**
     * Show consent banner
     */
    showBanner() {
      if (!this.banner) return;

      this.banner.setAttribute('aria-hidden', 'false');

      // Focus management
      setTimeout(() => {
        const firstButton = this.banner.querySelector('button');
        if (firstButton) {
          firstButton.focus();
        }
      }, 100);

      // Create focus trap
      this.focusTrap = this.createFocusTrap(this.banner);
      document.addEventListener('keydown', this.focusTrap);
    }

    /**
     * Hide consent banner
     */
    hideBanner() {
      if (!this.banner) return;

      this.banner.setAttribute('aria-hidden', 'true');

      // Remove focus trap
      if (this.focusTrap) {
        document.removeEventListener('keydown', this.focusTrap);
        this.focusTrap = null;
      }
    }

    /**
     * Check if banner is visible
     */
    isBannerVisible() {
      return this.banner && this.banner.getAttribute('aria-hidden') === 'false';
    }

    /**
     * Create focus trap for accessibility
     */
    createFocusTrap(element) {
      const focusableElements = element.querySelectorAll(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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

    /**
     * Initialize analytics (placeholder)
     */
    initAnalytics() {
      // Placeholder for analytics initialization
      // In production, load analytics scripts here
      console.log('Analytics initialized');

      // Example: Google Analytics (commented out)
      /*
      if (typeof gtag === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y';
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-XXXXX-Y', {
          anonymize_ip: true,
          cookie_flags: 'SameSite=Strict;Secure'
        });
      }
      */
    }

    /**
     * Log consent status to console
     */
    logConsentStatus() {
      if (this.consent) {
        console.log('%c✓ Consent Status', 'color: #2E7D32; font-weight: bold;', this.consent);
      } else {
        console.log('%c⚠ No consent given yet', 'color: #F57C00; font-weight: bold;');
      }
    }

    /**
     * Public API: Check if category is consented
     */
    hasConsent(category) {
      if (!this.consent) return category === 'essential';
      return this.consent[category] === true;
    }

    /**
     * Public API: Revoke all consent
     */
    revokeConsent() {
      // Delete cookie
      document.cookie = `${CONSENT_CONFIG.cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      this.consent = null;

      // Show banner again
      this.showBanner();

      console.log('%c⚠ Consent revoked', 'color: #C62828; font-weight: bold;');
    }
  }

  /* ========================================
     INITIALIZATION
     ======================================== */

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initConsent);
    } else {
      initConsent();
    }
  }

  function initConsent() {
    try {
      const consentManager = new ConsentManager();

      // Make API available globally
      window.ConsentManager = consentManager;

      console.log('%c✓ Consent Manager initialized', 'color: #C41E3A; font-weight: bold;');
    } catch (error) {
      console.error('Error initializing consent manager:', error);
    }
  }

  // Start initialization
  init();

})();
