/**
 * =============================================================================
 * Link Pro - Clean Architecture JavaScript (2026 Standards)
 * Modern ES6+, modular, performant, and accessible
 * =============================================================================
 */

'use strict';

// =============================================================================
// Application State & Configuration
// =============================================================================

const APP_CONFIG = {
    version: '1.0.0',
    analytics: {
        enabled: true,
        trackingKey: 'linkpro_analytics',
        sessionDuration: 30 * 60 * 1000, // 30 minutes
    },
    animations: {
        enabled: true,
        duration: 300,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    performance: {
        lazyLoading: true,
        prefetchLinks: true,
        imageOptimization: true,
    },
    accessibility: {
        reducedMotion: true,
        focusManagement: true,
        keyboardNavigation: true,
    }
};

// =============================================================================
// Utilities
// =============================================================================

const Utils = {
    /**
     * Debounce function calls
     */
    debounce(func, wait) {
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
     * Check if user prefers reduced motion
     */
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    /**
     * Generate unique ID
     */
    generateId() {
        return `linkpro_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Format number with animation
     */
    animateNumber(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    },

    /**
     * Get device information
     */
    getDeviceInfo() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
            },
            pixelRatio: window.devicePixelRatio,
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
            } : null,
        };
    }
};

// =============================================================================
// Analytics Module
// =============================================================================

const Analytics = {
    /**
     * Initialize analytics tracking
     */
    init() {
        if (!APP_CONFIG.analytics.enabled) return;
        
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        this.events = [];
        
        // Track page view
        this.trackEvent('page_view', {
            url: window.location.href,
            referrer: document.referrer,
            device: Utils.getDeviceInfo(),
        });

        // Track performance
        this.trackPerformance();
        
        // Setup unload tracking
        window.addEventListener('beforeunload', () => this.trackSessionEnd());
    },

    /**
     * Generate unique session ID
     */
    generateSessionId() {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Track user interaction events
     */
    trackEvent(eventName, data = {}) {
        if (!APP_CONFIG.analytics.enabled) return;

        const event = {
            id: Utils.generateId(),
            sessionId: this.sessionId,
            name: eventName,
            data: {
                ...data,
                timestamp: Date.now(),
                url: window.location.href,
            },
        };

        this.events.push(event);
        this.saveToStorage();
        console.log('Analytics Event:', event);
    },

    /**
     * Track link clicks
     */
    trackLinkClick(link, category) {
        this.trackEvent('link_click', {
            linkUrl: link.href,
            linkText: link.querySelector('.link-title')?.textContent,
            category: category,
            position: this.getLinkPosition(link),
        });
    },

    /**
     * Get link position in grid
     */
    getLinkPosition(link) {
        const parent = link.closest('.links-grid');
        if (!parent) return null;
        
        const siblings = Array.from(parent.querySelectorAll('.link-card'));
        return siblings.indexOf(link) + 1;
    },

    /**
     * Track performance metrics
     */
    trackPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    this.trackEvent('performance', {
                        loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        firstPaint: performance.getEntriesByType('paint')[0]?.startTime,
                        firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime,
                    });
                }, 0);
            });
        }
    },

    /**
     * Track session end
     */
    trackSessionEnd() {
        this.trackEvent('session_end', {
            duration: Date.now() - this.startTime,
            eventsCount: this.events.length,
        });
    },

    /**
     * Save analytics to local storage
     */
    saveToStorage() {
        try {
            localStorage.setItem(APP_CONFIG.analytics.trackingKey, JSON.stringify(this.events));
        } catch (e) {
            console.warn('Analytics storage failed:', e);
        }
    },

    /**
     * Load analytics from storage
     */
    loadFromStorage() {
        try {
            const data = localStorage.getItem(APP_CONFIG.analytics.trackingKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.warn('Analytics load failed:', e);
            return [];
        }
    },

    /**
     * Get analytics summary
     */
    getSummary() {
        const events = this.loadFromStorage();
        const clicks = events.filter(e => e.name === 'link_click');
        const categories = {};
        
        clicks.forEach(click => {
            const category = click.data.category;
            categories[category] = (categories[category] || 0) + 1;
        });

        return {
            totalEvents: events.length,
            totalClicks: clicks.length,
            categories,
            averageSessionTime: this.calculateAverageSessionTime(events),
        };
    },

    /**
     * Calculate average session time
     */
    calculateAverageSessionTime(events) {
        const sessions = events.filter(e => e.name === 'session_end');
        if (sessions.length === 0) return 0;
        
        const totalTime = sessions.reduce((sum, session) => sum + session.data.duration, 0);
        return Math.round(totalTime / sessions.length / 1000); // Convert to seconds
    }
};

// =============================================================================
// Animation Module
// =============================================================================

const Animations = {
    /**
     * Initialize animations
     */
    init() {
        if (Utils.prefersReducedMotion()) {
            document.body.classList.add('reduced-motion');
            return;
        }

        this.setupIntersectionObserver();
        this.setupNumberAnimations();
        this.setupScrollAnimations();
    },

    /**
     * Setup intersection observer for fade-in animations
     */
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe elements
        document.querySelectorAll('.link-card, .links-group').forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    },

    /**
     * Setup number counter animations
     */
    setupNumberAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    if (!isNaN(target)) {
                        Utils.animateNumber(entry.target, target);
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(el => {
            observer.observe(el);
        });
    },

    /**
     * Setup scroll-based animations
     */
    setupScrollAnimations() {
        let ticking = false;
        
        const updateScrollAnimations = () => {
            const scrollY = window.scrollY;
            const header = document.querySelector('.header');
            
            // Header background opacity based on scroll
            if (header) {
                const opacity = Math.min(scrollY / 100, 1);
                header.style.background = `rgba(255, 255, 255, ${0.8 + opacity * 0.2})`;
            }
            
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        };

        window.addEventListener('scroll', Utils.debounce(onScroll, 16));
    }
};

// =============================================================================
// Theme Module
// =============================================================================

const Theme = {
    /**
     * Initialize theme system
     */
    init() {
        this.currentTheme = this.getStoredTheme() || 'system';
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
        this.watchSystemTheme();
    },

    /**
     * Get stored theme preference
     */
    getStoredTheme() {
        return localStorage.getItem('linkpro_theme');
    },

    /**
     * Store theme preference
     */
    storeTheme(theme) {
        localStorage.setItem('linkpro_theme', theme);
    },

    /**
     * Apply theme
     */
    applyTheme(theme) {
        const html = document.documentElement;
        
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            html.setAttribute('data-theme', systemTheme);
        } else {
            html.setAttribute('data-theme', theme);
        }

        this.updateThemeIcon(theme);
    },

    /**
     * Update theme toggle icon
     */
    updateThemeIcon(theme) {
        const icon = document.querySelector('#themeToggle i');
        if (!icon) return;

        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    },

    /**
     * Setup theme toggle
     */
    setupThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;

        toggle.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.storeTheme(this.currentTheme);
            this.applyTheme(this.currentTheme);
            
            // Track theme change
            Analytics.trackEvent('theme_change', {
                theme: this.currentTheme,
            });
        });
    },

    /**
     * Watch system theme changes
     */
    watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            if (this.currentTheme === 'system') {
                this.applyTheme('system');
            }
        });
    }
};

// =============================================================================
// Performance Module
// =============================================================================

const Performance = {
    /**
     * Initialize performance optimizations
     */
    init() {
        this.setupImageLazyLoading();
        this.setupLinkPrefetching();
        this.setupResourceHints();
    },

    /**
     * Setup lazy loading for images
     */
    setupImageLazyLoading() {
        if (!('IntersectionObserver' in window)) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    },

    /**
     * Setup link prefetching on hover
     */
    setupLinkPrefetching() {
        const links = document.querySelectorAll('.link-card');
        const prefetched = new Set();

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.href;
                if (!prefetched.has(href)) {
                    const prefetchLink = document.createElement('link');
                    prefetchLink.rel = 'prefetch';
                    prefetchLink.href = href;
                    document.head.appendChild(prefetchLink);
                    prefetched.add(href);
                }
            }, { once: true });
        });
    },

    /**
     * Setup resource hints
     */
    setupResourceHints() {
        // DNS prefetch for external domains
        const domains = ['fonts.googleapis.com', 'cdnjs.cloudflare.com'];
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = `//${domain}`;
            document.head.appendChild(link);
        });
    }
};

// =============================================================================
// Accessibility Module
// =============================================================================

const Accessibility = {
    /**
     * Initialize accessibility features
     */
    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLabels();
        this.setupSkipLinks();
    },

    /**
     * Setup keyboard navigation
     */
    setupKeyboardNavigation() {
        // Handle Tab key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        // Handle mouse events
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Handle Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.handleEscape(e);
            }
        });
    },

    /**
     * Setup focus management
     */
    setupFocusManagement() {
        // Trap focus in modals (if any are added later)
        // Ensure focus is visible
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid var(--color-accent);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    },

    /**
     * Setup ARIA labels
     */
    setupAriaLabels() {
        // Add aria labels to link cards
        document.querySelectorAll('.link-card').forEach((card, index) => {
            const title = card.querySelector('.link-title')?.textContent;
            if (title) {
                card.setAttribute('aria-label', `${title}, ${card.querySelector('.link-description')?.textContent || ''}`);
            }
        });
    },

    /**
     * Setup skip links
     */
    setupSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    },

    /**
     * Handle Escape key
     */
    handleEscape(e) {
        // Close any open modals or dropdowns
        // Implementation depends on what interactive elements are added
    }
};

// =============================================================================
// Application Controller
// =============================================================================

class LinkProApp {
    constructor() {
        this.version = APP_CONFIG.version;
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     */
    async init() {
        try {
            console.log(`🚀 Link Pro v${this.version} initializing...`);
            
            // Hide loading screen
            this.hideLoadingScreen();
            
            // Initialize modules
            Analytics.init();
            Animations.init();
            Theme.init();
            Performance.init();
            Accessibility.init();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Mark as initialized
            this.isInitialized = true;
            
            console.log('✅ Link Pro initialized successfully');
            
            // Track app load
            Analytics.trackEvent('app_initialized', {
                loadTime: performance.now(),
                userAgent: navigator.userAgent,
            });
            
        } catch (error) {
            console.error('❌ Link Pro initialization failed:', error);
            this.showError('Application failed to initialize');
        }
    }

    /**
     * Hide loading screen
     */
    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Link click tracking
        document.querySelectorAll('.link-card').forEach(link => {
            link.addEventListener('click', (e) => {
                const category = link.dataset.category || 'unknown';
                Analytics.trackLinkClick(link, category);
            });
        });

        // Page visibility tracking
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                Analytics.trackEvent('page_hidden');
            } else {
                Analytics.trackEvent('page_visible');
            }
        });

        // Error handling
        window.addEventListener('error', (e) => {
            Analytics.trackEvent('error', {
                message: e.message,
                filename: e.filename,
                lineno: e.lineno,
            });
        });

        // Performance monitoring
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    Analytics.trackEvent('performance_entry', {
                        name: entry.name,
                        value: entry.value,
                        type: entry.entryType,
                    });
                }
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 16px;
            border-radius: 8px;
            z-index: 9999;
            max-width: 300px;
        `;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    /**
     * Get analytics summary
     */
    getAnalytics() {
        return Analytics.getSummary();
    }

    /**
     * Export analytics data
     */
    exportAnalytics() {
        const data = Analytics.loadFromStorage();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `linkpro_analytics_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }
}

// =============================================================================
// Initialize Application
// =============================================================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.LinkPro = new LinkProApp();
        window.LinkPro.init();
    });
} else {
    window.LinkPro = new LinkProApp();
    window.LinkPro.init();
}

// =============================================================================
// Global Error Handling
// =============================================================================

window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    Analytics.trackEvent('global_error', {
        message: e.message,
        source: e.source,
        lineno: e.lineno,
        colno: e.colno,
    });
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    Analytics.trackEvent('promise_rejection', {
        reason: e.reason,
    });
});

// =============================================================================
// Export for debugging
// =============================================================================

if (typeof window !== 'undefined') {
    window.LinkProDebug = {
        Analytics,
        Animations,
        Theme,
        Performance,
        Accessibility,
        Utils,
        APP_CONFIG,
    };
}