// ===== MAIN JAVASCRIPT FILE =====

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initAnimations();
    initCurrentYear();
    initMobileStickyCTA();
    initThemeToggle();
    initLanguageToggle();
    initRevealAnimations();
    initAiAssist();
    
    // Security: Prevent inline script execution
    sanitizeInputs();
    
    // Performance: Lazy load images
    initLazyLoading();
    initWhatsAppWebChat();
});

// ===== MOBILE MENU TOGGLE =====
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}
// Enhanced functionality for leadership section
document.addEventListener('DOMContentLoaded', function() {
    // Add expertise badges dynamically
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        const position = card.querySelector('.team-position').textContent;
        let badgeText = '';
        
        if (position.includes('Founder')) badgeText = 'Founder';
        else if (position.includes('Operations')) badgeText = 'Operations';
        else if (position.includes('HSE')) badgeText = 'Safety';
        else if (position.includes('Finance')) badgeText = 'Finance';
        
        if (badgeText) {
            const badge = document.createElement('div');
            badge.className = 'expertise-badge';
            badge.textContent = badgeText;
            card.querySelector('.team-image').appendChild(badge);
        }
    });
    
    // Equalize card heights
    function equalizeCardHeights(selector) {
        const cards = document.querySelectorAll(selector);
        let maxHeight = 0;
        
        // Reset heights
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Find max height
        cards.forEach(card => {
            const height = card.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });
        
        // Apply max height
        cards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    }
    
    // Run on load and resize
    equalizeCardHeights('.team-card');
    equalizeCardHeights('.value-card');
    
    window.addEventListener('resize', function() {
        setTimeout(() => {
            equalizeCardHeights('.team-card');
            equalizeCardHeights('.value-card');
        }, 100);
    });
    
    // Add click to expand bio functionality
    teamCards.forEach(card => {
        const bio = card.querySelector('.team-bio');
        const originalBio = bio.textContent;
        const shortBio = originalBio.substring(0, 100) + '...';
        
        // Truncate bio for mobile
        if (window.innerWidth < 768) {
            bio.textContent = shortBio;
            bio.setAttribute('data-full', originalBio);
            bio.setAttribute('data-short', shortBio);
            
            bio.addEventListener('click', function() {
                if (this.textContent === this.getAttribute('data-short')) {
                    this.textContent = this.getAttribute('data-full');
                    this.style.cursor = 'text';
                } else {
                    this.textContent = this.getAttribute('data-short');
                    this.style.cursor = 'pointer';
                }
            });
            
            bio.style.cursor = 'pointer';
            bio.title = 'Click to expand/collapse';
        }
    });
});

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const menuToggle = document.getElementById('menuToggle');
                const navMenu = document.getElementById('navMenu');
                if (menuToggle && navMenu) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
                
                // Smooth scroll to target
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    document.querySelectorAll('.feature-card, .service-card, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== STATISTICS COUNTER =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-count'));
                    const suffix = statNumber.textContent.includes('%') ? '%' : '';
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        statNumber.textContent = Math.floor(current) + suffix;
                    }, 16);
                    
                    observer.unobserve(statNumber);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
}

// ===== CURRENT YEAR =====
function initCurrentYear() {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

// ===== SECURITY: INPUT SANITIZATION =====
function sanitizeInputs() {
    // Sanitize form inputs to prevent XSS
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[type="text"], input[type="email"], textarea');
            
            inputs.forEach(input => {
                // Basic sanitization
                input.value = input.value
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#x27;')
                    .replace(/\//g, '&#x2F;');
            });
        });
    });
}

// ===== LAZY LOADING IMAGES =====
function initLazyLoading() {
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading') && !img.closest('.hero-section')) {
            img.setAttribute('loading', 'lazy');
        }
    });

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }
}

// ===== FORM VALIDATION =====
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        // Remove previous error messages
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
        
        // Remove error class
        input.classList.remove('error');
        
        // Validate based on input type
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        } else if (input.type === 'tel' && !isValidPhone(input.value)) {
            showError(input, 'Please enter a valid phone number');
            isValid = false;
        }
    });
    
    return isValid;
}

function showError(input, message) {
    input.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    `;
    
    input.parentNode.insertBefore(errorElement, input.nextSibling);
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone);
}

// ===== COOKIE CONSENT =====
function initCookieConsent() {
    if (!localStorage.getItem('cookiesAccepted')) {
        const consentBanner = document.createElement('div');
        consentBanner.id = 'cookie-consent';
        consentBanner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--primary-dark);
            color: white;
            padding: 1rem;
            z-index: 1000;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        `;
        
        consentBanner.innerHTML = `
            <div>
                <p style="margin: 0; font-size: 0.9rem;">
                    We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                </p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button id="accept-cookies" style="
                    background: var(--primary-orange);
                    color: white;
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                ">Accept</button>
                <button id="reject-cookies" style="
                    background: transparent;
                    color: white;
                    border: 1px solid white;
                    padding: 0.5rem 1rem;
                    border-radius: 4px;
                    cursor: pointer;
                ">Reject</button>
            </div>
        `;
        
        document.body.appendChild(consentBanner);
        
        document.getElementById('accept-cookies').addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            consentBanner.style.display = 'none';
        });
        
        document.getElementById('reject-cookies').addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'false');
            consentBanner.style.display = 'none';
        });
    }
}
// Enhanced functionality for leadership section
document.addEventListener('DOMContentLoaded', function() {
    // Add expertise badges dynamically
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        const position = card.querySelector('.team-position').textContent;
        let badgeText = '';
        
        if (position.includes('Founder')) badgeText = 'Founder';
        else if (position.includes('Operations')) badgeText = 'Operations';
        else if (position.includes('HSE')) badgeText = 'Safety';
        else if (position.includes('Finance')) badgeText = 'Finance';
        
        if (badgeText) {
            const badge = document.createElement('div');
            badge.className = 'expertise-badge';
            badge.textContent = badgeText;
            card.querySelector('.team-image').appendChild(badge);
        }
    });
    
    // Equalize card heights
    function equalizeCardHeights(selector) {
        const cards = document.querySelectorAll(selector);
        let maxHeight = 0;
        
        // Reset heights
        cards.forEach(card => {
            card.style.height = 'auto';
        });
        
        // Find max height
        cards.forEach(card => {
            const height = card.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });
        
        // Apply max height
        cards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    }
    
    // Run on load and resize
    equalizeCardHeights('.team-card');
    equalizeCardHeights('.value-card');
    
    window.addEventListener('resize', function() {
        setTimeout(() => {
            equalizeCardHeights('.team-card');
            equalizeCardHeights('.value-card');
        }, 100);
    });
    
    // Add click to expand bio functionality
    teamCards.forEach(card => {
        const bio = card.querySelector('.team-bio');
        const originalBio = bio.textContent;
        const shortBio = originalBio.substring(0, 100) + '...';
        
        // Truncate bio for mobile
        if (window.innerWidth < 768) {
            bio.textContent = shortBio;
            bio.setAttribute('data-full', originalBio);
            bio.setAttribute('data-short', shortBio);
            
            bio.addEventListener('click', function() {
                if (this.textContent === this.getAttribute('data-short')) {
                    this.textContent = this.getAttribute('data-full');
                    this.style.cursor = 'text';
                } else {
                    this.textContent = this.getAttribute('data-short');
                    this.style.cursor = 'pointer';
                }
            });
            
            bio.style.cursor = 'pointer';
            bio.title = 'Click to expand/collapse';
        }
    });
});

// ===== WHATSAPP WEB CHAT =====
function initWhatsAppWebChat() {
    const defaultNumber = '971544300910';
    const defaultMessage = 'Hello IMK Technical Services, I need assistance.';

    let activeChatUrl = '';
    let chatWidget = null;
    let chatNotice = null;

    function buildWebChatUrl(number, message) {
        const chatNumber = number || defaultNumber;
        const text = encodeURIComponent(message || defaultMessage);
        return 'https://web.whatsapp.com/send?phone=' + chatNumber + '&text=' + text;
    }

    function openChatPopup(url) {
        const popupWidth = 420;
        const popupHeight = Math.min(760, Math.max(520, window.screen.availHeight - 120));

        const screenLeft = typeof window.screenX !== 'undefined' ? window.screenX : window.screenLeft;
        const screenTop = typeof window.screenY !== 'undefined' ? window.screenY : window.screenTop;

        const left = screenLeft + Math.max(0, window.outerWidth - popupWidth - 20);
        const top = screenTop + Math.max(20, Math.floor((window.outerHeight - popupHeight) / 2));

        const features = [
            'popup=yes',
            'width=' + popupWidth,
            'height=' + popupHeight,
            'left=' + left,
            'top=' + top,
            'resizable=yes',
            'scrollbars=yes'
        ].join(',');

        const popup = window.open(url, 'IMKWhatsAppChat', features);
        if (popup) {
            popup.focus();
            return true;
        }
        return false;
    }

    function closeWidget() {
        if (chatWidget) {
            chatWidget.classList.remove('open');
        }
    }

    function ensureWidget() {
        if (chatWidget) {
            return;
        }

        const style = document.createElement('style');
        style.id = 'wa-chat-widget-styles';
        style.textContent = `
            .wa-chat-widget {
                position: fixed;
                right: 16px;
                bottom: 16px;
                width: min(360px, calc(100vw - 32px));
                background: #ffffff;
                border-radius: 14px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                z-index: 12000;
                transform: translateX(calc(100% + 24px));
                opacity: 0;
                pointer-events: none;
                transition: transform 0.28s ease, opacity 0.28s ease;
                font-family: "Open Sans", Arial, sans-serif;
            }

            .wa-chat-widget.open {
                transform: translateX(0);
                opacity: 1;
                pointer-events: auto;
            }

            .wa-chat-header {
                background: #25D366;
                color: #ffffff;
                padding: 12px 14px;
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 10px;
            }

            .wa-chat-title {
                font-size: 0.98rem;
                font-weight: 700;
                margin: 0;
                line-height: 1.25;
            }

            .wa-chat-subtitle {
                font-size: 0.8rem;
                opacity: 0.95;
                margin: 2px 0 0 0;
                line-height: 1.35;
            }

            .wa-chat-close {
                border: 0;
                background: transparent;
                color: #ffffff;
                font-size: 1.3rem;
                line-height: 1;
                cursor: pointer;
                padding: 0;
            }

            .wa-chat-body {
                padding: 14px;
                color: #1f2937;
            }

            .wa-chat-copy {
                font-size: 0.9rem;
                line-height: 1.45;
                margin: 0 0 10px 0;
            }

            .wa-chat-actions {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                margin-top: 10px;
            }

            .wa-chat-action {
                border: 0;
                border-radius: 8px;
                padding: 9px 12px;
                font-size: 0.88rem;
                cursor: pointer;
            }

            .wa-chat-action.primary {
                background: #25D366;
                color: #ffffff;
                font-weight: 700;
            }

            .wa-chat-action.secondary {
                background: #eef2f7;
                color: #1f2937;
                font-weight: 600;
            }

            .wa-chat-notice {
                margin-top: 10px;
                font-size: 0.8rem;
                color: #b91c1c;
            }
        `;

        if (!document.getElementById('wa-chat-widget-styles')) {
            document.head.appendChild(style);
        }

        chatWidget = document.createElement('aside');
        chatWidget.className = 'wa-chat-widget';
        chatWidget.id = 'waChatWidget';
        chatWidget.innerHTML = `
            <div class="wa-chat-header">
                <div>
                    <p class="wa-chat-title">WhatsApp Live Chat</p>
                    <p class="wa-chat-subtitle">Opens in a compact chat popup</p>
                </div>
                <button type="button" class="wa-chat-close" id="waChatClose" aria-label="Close chat">&times;</button>
            </div>
            <div class="wa-chat-body">
                <p class="wa-chat-copy">Your chat panel is open on this page. Click below to start the live WhatsApp conversation in a small window.</p>
                <div class="wa-chat-actions">
                    <button type="button" class="wa-chat-action primary" id="waOpenPopup">Open Chat Window</button>
                    <button type="button" class="wa-chat-action secondary" id="waHideWidget">Close</button>
                </div>
                <p class="wa-chat-notice" id="waChatNotice" hidden>Popup blocked. Allow popups for this site to open WhatsApp chat window.</p>
            </div>
        `;

        document.body.appendChild(chatWidget);
        chatNotice = document.getElementById('waChatNotice');

        document.getElementById('waChatClose').addEventListener('click', closeWidget);
        document.getElementById('waHideWidget').addEventListener('click', closeWidget);

        document.getElementById('waOpenPopup').addEventListener('click', function () {
            if (!activeChatUrl) {
                return;
            }

            const opened = openChatPopup(activeChatUrl);
            if (chatNotice) {
                chatNotice.hidden = opened;
            }
        });
    }

    function openWidgetForLink(link) {
        const number = link.getAttribute('data-whatsapp-number') || defaultNumber;
        const message = link.getAttribute('data-message');
        activeChatUrl = buildWebChatUrl(number, message);

        ensureWidget();
        if (chatNotice) {
            chatNotice.hidden = true;
        }
        chatWidget.classList.add('open');
    }

    const whatsappLinks = document.querySelectorAll(
        'a.btn-whatsapp, a[href*="wa.me/"], a[href*="api.whatsapp.com"], a[href*="whatsapp://"], a[href*="web.whatsapp.com/send"]'
    );

    whatsappLinks.forEach(link => {
        if (link.dataset.whatsappBound === '1') {
            return;
        }

        link.dataset.whatsappBound = '1';
        link.setAttribute('href', '#');
        link.removeAttribute('target');
        link.removeAttribute('rel');

        link.addEventListener('click', function (event) {
            event.preventDefault();
            openWidgetForLink(this);
        });
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const tools = ensureNavTools();
    if (!tools) return;

    const button = tools.querySelector('[data-theme-toggle]');
    if (!button) return;

    const storageKey = 'imk.theme';
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const saved = localStorage.getItem(storageKey);
    const initialTheme = saved || (systemPrefersDark && systemPrefersDark.matches ? 'dark' : 'light');

    const applyTheme = (theme, persist = true) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (persist) {
            localStorage.setItem(storageKey, theme);
        }
        updateThemeToggleLabel();
    };

    applyTheme(initialTheme, !!saved);

    button.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
    });

    if (systemPrefersDark) {
        systemPrefersDark.addEventListener('change', (event) => {
            if (!localStorage.getItem(storageKey)) {
                applyTheme(event.matches ? 'dark' : 'light', false);
            }
        });
    }
}

// ===== LANGUAGE TOGGLE & RTL =====
const IMK_I18N = {
    en: {
        nav_home: 'Home',
        nav_about: 'About Us',
        nav_services: 'Our Services',
        nav_how: 'How We Work',
        nav_projects: 'Projects & Partners',
        nav_jobs: 'Jobs & Career',
        nav_contact: 'Contact Us',
        cta_request: 'Request Manpower',
        hero1_title: 'Reliable Technical Services & Skilled Manpower Solutions',
        hero1_desc: 'Your compliant, safety-driven subcontractor and manpower partner for construction and infrastructure projects in UAE.',
        hero1_primary: 'Get Skilled Workforce',
        hero1_secondary: 'View Services',
        hero2_title: 'Company-Sponsored Workforce & Skilled Trades',
        hero2_desc: 'Fully compliant with MOHRE, WPS, visa, and insurance requirements for peace of mind.',
        hero2_primary: 'Our Approach',
        hero2_secondary: 'Get Inquiry',
        hero3_title: 'Strong HSE & Quality Systems',
        hero3_desc: 'Safety-first approach with structured quality controls for consistent service delivery.',
        hero3_primary: 'Our Values',
        hero3_secondary: 'Contact Us',
        hero4_title: 'Skilled & Semi-Skilled Labour Supply',
        hero4_desc: 'Electricians, Plumbers, HVAC Technicians, Masons, Steel Fixers, Carpenters and more.',
        hero4_primary: 'Join Our Team',
        hero4_secondary: 'View Services',
        hero5_title: 'Integrated On-Site Supervision',
        hero5_desc: 'Dedicated IMK supervisors ensuring quality, safety, and productivity on site.',
        hero5_primary: 'Learn More',
        hero5_secondary: 'Our Projects',
        hero6_title: 'Scalable Manpower Solutions',
        hero6_desc: 'Flexible workforce scaling based on project needs with full management support.',
        hero6_primary: 'Get Started',
        hero6_secondary: 'About IMK',
        features_title: 'Why Choose IMK',
        features_subtitle: 'Professional, compliance-focused, contractor-friendly, and trust-driven solutions',
        services_title: 'Our Services',
        services_subtitle: 'Comprehensive technical services and manpower solutions for construction and infrastructure projects',
        trust_title: 'Trusted by UAE Project Teams',
        trust_subtitle: 'Reliable manpower delivery for contractors, consultants, and facility teams.',
        testimonials_title: 'What Clients Say',
        testimonials_subtitle: 'Consistent delivery, safety compliance, and clear communication on every project.',
        cta_title: 'Ready to Scale Your Workforce?',
        cta_subtitle: 'Contact us today to discuss your project manpower requirements and get a customized solution.',
        cta_primary: 'Request Manpower',
        cta_secondary: 'Call Now',
        whatsapp_label: 'Chat on WhatsApp',
        theme_dark: 'Dark',
        theme_light: 'Light',
        lang_switch: 'AR',
        ai_label: 'IMK Assist',
        ai_title: 'IMK Assist (Automated)',
        ai_greeting: 'Hello! I can guide you to manpower requests, job openings, and project support details.',
        ai_action_manpower: 'Request Manpower',
        ai_action_jobs: 'Job Openings',
        ai_action_hse: 'HSE & Quality',
        ai_placeholder: 'Ask a quick question...',
        ai_send: 'Send',
        ai_note: 'This is an automated assistant. For official quotes, our team will respond via contact form.',
        ai_reply_jobs: 'You can view openings on the Jobs & Career page and apply online.',
        ai_reply_rates: 'Rates depend on trade, duration, and headcount. Share your scope and timeline via the Request Manpower form.',
        ai_reply_hse: 'Our teams follow project-specific HSE plans, toolbox talks, and ongoing compliance audits.',
        ai_reply_contact: 'Please use the Contact page to reach our team. We reply quickly during business hours.',
        ai_reply_default: 'Thanks! Please share your project scope or the role you need, and our team will follow up.',
        ai_reply_action_manpower: 'Use the Request Manpower form on the Contact page to send project details.',
        ai_reply_action_jobs: 'Openings are listed on the Jobs & Career page with full position details.',
        ai_reply_action_hse: 'IMK enforces HSE planning, site inductions, and continuous monitoring.',
        page_about_title: 'About IMK Technical Services',
        page_about_desc: 'Learn about our company, leadership, and values.',
        page_services_title: 'Our Technical Services',
        page_services_desc: 'Integrated manpower and technical service solutions for UAE projects.',
        page_how_title: 'How We Work',
        page_how_desc: 'From requirements analysis to successful project delivery.',
        page_projects_title: 'Projects & Partners',
        page_projects_desc: 'Trusted collaborations across construction and infrastructure teams.',
        page_jobs_title: 'Jobs & Career',
        page_jobs_desc: 'Explore career opportunities and apply online.',
        page_contact_title: 'Contact Us',
        page_contact_desc: 'Reach our team for manpower requests or enquiries.'
    },
    ar: {
        nav_home: 'الرئيسية',
        nav_about: 'من نحن',
        nav_services: 'خدماتنا',
        nav_how: 'كيف نعمل',
        nav_projects: 'المشاريع والشركاء',
        nav_jobs: 'الوظائف والمسار المهني',
        nav_contact: 'اتصل بنا',
        cta_request: 'طلب عمالة',
        hero1_title: 'خدمات فنية موثوقة وحلول عمالة ماهرة',
        hero1_desc: 'شريككم المعتمد في الإمارات لتوفير عمالة ملتزمة بالسلامة لمشاريع الإنشاء والبنية التحتية.',
        hero1_primary: 'اطلب عمالة ماهرة',
        hero1_secondary: 'عرض الخدمات',
        hero2_title: 'عمالة مكفولة ومهن فنية ماهرة',
        hero2_desc: 'امتثال كامل لمتطلبات وزارة الموارد البشرية والرواتب والتأشيرات والتأمين لراحة بالكم.',
        hero2_primary: 'منهجنا',
        hero2_secondary: 'إرسال استفسار',
        hero3_title: 'أنظمة قوية للسلامة والجودة',
        hero3_desc: 'منهج سلامة أولاً مع رقابة جودة منظمة لضمان تسليم ثابت.',
        hero3_primary: 'قيمنا',
        hero3_secondary: 'اتصل بنا',
        hero4_title: 'توريد عمالة ماهرة ونصف ماهرة',
        hero4_desc: 'كهربائيون، سباكون، فنيّو تكييف، بناؤون، حدادو تسليح، نجّارون وغيرهم.',
        hero4_primary: 'انضم لفريقنا',
        hero4_secondary: 'عرض الخدمات',
        hero5_title: 'إشراف موقعي متكامل',
        hero5_desc: 'مشرفو IMK يضمنون الجودة والسلامة والإنتاجية في الموقع.',
        hero5_primary: 'اعرف المزيد',
        hero5_secondary: 'مشاريعنا',
        hero6_title: 'حلول عمالة قابلة للتوسع',
        hero6_desc: 'توسيع مرن للقوى العاملة حسب احتياجات المشروع مع دعم إداري كامل.',
        hero6_primary: 'ابدأ الآن',
        hero6_secondary: 'عن IMK',
        features_title: 'لماذا IMK؟',
        features_subtitle: 'حلول احترافية تركّز على الامتثال وتراعي متطلبات المقاولين.',
        services_title: 'خدماتنا',
        services_subtitle: 'خدمات فنية وحلول عمالة متكاملة لمشاريع الإنشاء والبنية التحتية.',
        trust_title: 'موثوق من فرق المشاريع في الإمارات',
        trust_subtitle: 'تسليم عمالة موثوق للمقاولين والاستشاريين وفرق إدارة المرافق.',
        testimonials_title: 'ماذا يقول عملاؤنا',
        testimonials_subtitle: 'تسليم ثابت، امتثال للسلامة، وتواصل واضح في كل مشروع.',
        cta_title: 'هل أنت جاهز لتوسيع فريقك؟',
        cta_subtitle: 'تواصل معنا لمناقشة احتياجات العمالة والحصول على حل مخصص.',
        cta_primary: 'طلب عمالة',
        cta_secondary: 'اتصل الآن',
        whatsapp_label: 'تواصل عبر واتساب',
        theme_dark: 'داكن',
        theme_light: 'فاتح',
        lang_switch: 'EN',
        ai_label: 'مساعد IMK',
        ai_title: 'مساعد IMK (آلي)',
        ai_greeting: 'مرحبًا! يمكنني إرشادك إلى طلب العمالة والوظائف ودعم المشاريع.',
        ai_action_manpower: 'طلب عمالة',
        ai_action_jobs: 'الوظائف المتاحة',
        ai_action_hse: 'السلامة والجودة',
        ai_placeholder: 'اكتب سؤالك هنا...',
        ai_send: 'إرسال',
        ai_note: 'هذا مساعد آلي. للحصول على عرض رسمي يرجى التواصل عبر نموذج الاتصال.',
        ai_reply_jobs: 'يمكنك مشاهدة الوظائف المتاحة في صفحة الوظائف والتقديم عبر الإنترنت.',
        ai_reply_rates: 'الأسعار تعتمد على التخصص والمدة وعدد الأفراد. شارك نطاق العمل والجدول عبر نموذج طلب العمالة.',
        ai_reply_hse: 'نتبع خطط سلامة خاصة بالمشروع وجلسات توعوية ومراجعات امتثال مستمرة.',
        ai_reply_contact: 'يرجى استخدام صفحة التواصل للوصول إلى فريقنا. نرد بسرعة خلال ساعات العمل.',
        ai_reply_default: 'شكرًا لك! يرجى مشاركة نطاق المشروع أو الوظيفة المطلوبة وسنتواصل معك.',
        ai_reply_action_manpower: 'استخدم نموذج طلب العمالة في صفحة التواصل لإرسال التفاصيل.',
        ai_reply_action_jobs: 'الوظائف متاحة في صفحة الوظائف مع تفاصيل كاملة لكل وظيفة.',
        ai_reply_action_hse: 'تطبق IMK التخطيط للسلامة والتعريف بالموقع والمتابعة المستمرة.',
        page_about_title: 'نبذة عن IMK للخدمات الفنية',
        page_about_desc: 'تعرّف على شركتنا وقيادتها وقيمها الأساسية.',
        page_services_title: 'خدماتنا الفنية',
        page_services_desc: 'حلول متكاملة للعمالة والخدمات الفنية لمشاريع الإمارات.',
        page_how_title: 'كيف نعمل',
        page_how_desc: 'من تحليل المتطلبات إلى التنفيذ الناجح للمشروع.',
        page_projects_title: 'المشاريع والشركاء',
        page_projects_desc: 'شراكات موثوقة مع فرق الإنشاء والبنية التحتية.',
        page_jobs_title: 'الوظائف والمسار المهني',
        page_jobs_desc: 'استكشف فرص العمل وقدّم طلبك عبر الإنترنت.',
        page_contact_title: 'اتصل بنا',
        page_contact_desc: 'تواصل مع فريقنا لطلبات العمالة أو الاستفسارات.'
    }
};

function initLanguageToggle() {
    const tools = ensureNavTools();
    if (!tools) return;

    const button = tools.querySelector('[data-lang-toggle]');
    if (!button) return;

    const storageKey = 'imk.lang';
    const browserLang = (navigator.language || 'en').toLowerCase();
    const saved = localStorage.getItem(storageKey);
    const initialLang = saved || (browserLang.startsWith('ar') ? 'ar' : 'en');

    applyTranslations(initialLang, false);

    button.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('lang') || initialLang;
        const next = current === 'ar' ? 'en' : 'ar';
        applyTranslations(next, true);
    });
}

function applyTranslations(lang, persist = true) {
    const strings = IMK_I18N[lang] || IMK_I18N.en;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.classList.toggle('is-rtl', lang === 'ar');

    if (persist) {
        localStorage.setItem('imk.lang', lang);
    }

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (strings[key]) {
            element.textContent = strings[key];
        }
    });

    const navMap = {
        'index.html': 'nav_home',
        'about.html': 'nav_about',
        'services.html': 'nav_services',
        'how-we-work.html': 'nav_how',
        'projects-partners.html': 'nav_projects',
        'jobs-career.html': 'nav_jobs',
        'contact.html': 'nav_contact'
    };

    document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
        const href = link.getAttribute('href') || '';
        const base = href.split('#')[0];
        const key = navMap[base];
        if (key && strings[key]) {
            link.textContent = strings[key];
        }
    });

    document.querySelectorAll('.cta-nav .btn').forEach(btn => {
        const label = btn.querySelector('.cta-text');
        if (label && strings.cta_request) {
            label.textContent = strings.cta_request;
        }
    });

    document.querySelectorAll('.mobile-cta-text').forEach(span => {
        if (strings.cta_request) {
            span.textContent = strings.cta_request;
        }
    });

    document.querySelectorAll('.btn-whatsapp').forEach(btn => {
        const icon = btn.querySelector('img');
        let label = btn.querySelector('.whatsapp-text');
        if (!label) {
            label = document.createElement('span');
            label.className = 'whatsapp-text';
            Array.from(btn.childNodes).forEach(node => {
                if (node.nodeType === Node.TEXT_NODE) {
                    node.remove();
                }
            });
            if (icon) {
                icon.insertAdjacentElement('afterend', label);
            } else {
                btn.appendChild(label);
            }
        }
        label.textContent = strings.whatsapp_label;
    });

    const pageKey = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const pageMap = {
        'about.html': { title: 'page_about_title', desc: 'page_about_desc', label: 'nav_about' },
        'services.html': { title: 'page_services_title', desc: 'page_services_desc', label: 'nav_services' },
        'how-we-work.html': { title: 'page_how_title', desc: 'page_how_desc', label: 'nav_how' },
        'projects-partners.html': { title: 'page_projects_title', desc: 'page_projects_desc', label: 'nav_projects' },
        'jobs-career.html': { title: 'page_jobs_title', desc: 'page_jobs_desc', label: 'nav_jobs' },
        'contact.html': { title: 'page_contact_title', desc: 'page_contact_desc', label: 'nav_contact' }
    };

    if (pageKey !== 'index.html' && pageMap[pageKey]) {
        const map = pageMap[pageKey];
        const titleEl = document.querySelector('.hero-section .slide-title');
        const descEl = document.querySelector('.hero-section .slide-description');
        if (titleEl && strings[map.title]) {
            titleEl.textContent = strings[map.title];
        }
        if (descEl && strings[map.desc]) {
            descEl.textContent = strings[map.desc];
        }
        const breadcrumbCurrent = document.querySelector('.hero-breadcrumb .current');
        if (breadcrumbCurrent && strings[map.label]) {
            breadcrumbCurrent.textContent = strings[map.label];
        }
    }

    const aiLaunch = document.getElementById('aiChatLaunch');
    const aiPanel = document.getElementById('aiChatPanel');
    if (aiLaunch) {
        aiLaunch.textContent = strings.ai_label;
    }
    if (aiPanel) {
        const title = aiPanel.querySelector('.ai-chat-title');
        const greeting = aiPanel.querySelector('.ai-chat-body .ai-chat-message.bot');
        const placeholder = aiPanel.querySelector('#aiChatInput');
        const note = aiPanel.querySelector('.ai-chat-note');
        const sendButton = aiPanel.querySelector('#aiChatSend');
        const actions = aiPanel.querySelectorAll('.ai-chat-action');

        if (title) title.textContent = strings.ai_title;
        if (greeting) greeting.textContent = strings.ai_greeting;
        if (placeholder) placeholder.setAttribute('placeholder', strings.ai_placeholder);
        if (sendButton) sendButton.textContent = strings.ai_send;
        if (note) note.textContent = strings.ai_note;
        if (actions.length >= 3) {
            actions[0].textContent = strings.ai_action_manpower;
            actions[1].textContent = strings.ai_action_jobs;
            actions[2].textContent = strings.ai_action_hse;
        }
    }

    updateThemeToggleLabel(strings);
    updateLangToggleLabel(strings);
}

function updateThemeToggleLabel(stringsOverride) {
    const strings = stringsOverride || IMK_I18N[document.documentElement.getAttribute('lang')] || IMK_I18N.en;
    const button = document.querySelector('[data-theme-toggle]');
    if (!button) return;
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const label = current === 'dark' ? strings.theme_light : strings.theme_dark;
    button.textContent = label;
}

function updateLangToggleLabel(stringsOverride) {
    const strings = stringsOverride || IMK_I18N[document.documentElement.getAttribute('lang')] || IMK_I18N.en;
    const button = document.querySelector('[data-lang-toggle]');
    if (!button) return;
    button.textContent = strings.lang_switch;
}

function ensureNavTools() {
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return null;
    let tools = navMenu.querySelector('.nav-tools');
    if (!tools) {
        const item = document.createElement('li');
        item.className = 'nav-item nav-tools';
        item.innerHTML = `
            <button class="nav-tool-btn" type="button" data-theme-toggle aria-label="Toggle theme">Dark</button>
            <button class="nav-tool-btn" type="button" data-lang-toggle aria-label="Toggle language">AR</button>
        `;
        const cta = navMenu.querySelector('.cta-nav');
        if (cta) {
            navMenu.insertBefore(item, cta);
        } else {
            navMenu.appendChild(item);
        }
        tools = item;
    }
    return tools;
}

// ===== SCROLL REVEAL =====
function initRevealAnimations() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    targets.forEach(target => observer.observe(target));
}

// ===== AI ASSIST WIDGET =====
function initAiAssist() {
    if (document.getElementById('aiChatLaunch')) return;

    const lang = document.documentElement.getAttribute('lang') || 'en';
    const strings = IMK_I18N[lang] || IMK_I18N.en;

    const launch = document.createElement('button');
    launch.id = 'aiChatLaunch';
    launch.className = 'ai-chat-launch';
    launch.type = 'button';
    launch.textContent = strings.ai_label;

    const panel = document.createElement('div');
    panel.id = 'aiChatPanel';
    panel.className = 'ai-chat-panel';
    panel.innerHTML = `
        <div class="ai-chat-header">
            <div class="ai-chat-title">${strings.ai_title}</div>
            <button class="ai-chat-close" type="button" aria-label="Close">&times;</button>
        </div>
        <div class="ai-chat-body" id="aiChatBody">
            <div class="ai-chat-message bot">${strings.ai_greeting}</div>
        </div>
        <div class="ai-chat-actions" id="aiChatActions">
            <button class="ai-chat-action" data-action="manpower">${strings.ai_action_manpower}</button>
            <button class="ai-chat-action" data-action="jobs">${strings.ai_action_jobs}</button>
            <button class="ai-chat-action" data-action="hse">${strings.ai_action_hse}</button>
        </div>
        <div class="ai-chat-input">
            <input type="text" id="aiChatInput" placeholder="${strings.ai_placeholder}">
            <button type="button" id="aiChatSend">${strings.ai_send}</button>
        </div>
        <div class="ai-chat-note">${strings.ai_note}</div>
    `;

    document.body.appendChild(launch);
    document.body.appendChild(panel);

    const body = panel.querySelector('#aiChatBody');
    const closeBtn = panel.querySelector('.ai-chat-close');
    const sendBtn = panel.querySelector('#aiChatSend');
    const input = panel.querySelector('#aiChatInput');

    const addMessage = (text, type = 'bot') => {
        const message = document.createElement('div');
        message.className = `ai-chat-message ${type}`;
        message.textContent = text;
        body.appendChild(message);
        body.scrollTop = body.scrollHeight;
    };

    const respond = (text) => {
        const currentStrings = IMK_I18N[document.documentElement.getAttribute('lang')] || IMK_I18N.en;
        const lower = text.toLowerCase();
        if (lower.includes('job') || lower.includes('career')) {
            addMessage(currentStrings.ai_reply_jobs);
            return;
        }
        if (lower.includes('price') || lower.includes('rate') || lower.includes('cost')) {
            addMessage(currentStrings.ai_reply_rates);
            return;
        }
        if (lower.includes('hse') || lower.includes('safety')) {
            addMessage(currentStrings.ai_reply_hse);
            return;
        }
        if (lower.includes('contact') || lower.includes('call')) {
            addMessage(currentStrings.ai_reply_contact);
            return;
        }
        addMessage(currentStrings.ai_reply_default);
    };

    launch.addEventListener('click', () => {
        panel.classList.toggle('open');
    });

    closeBtn.addEventListener('click', () => {
        panel.classList.remove('open');
    });

    sendBtn.addEventListener('click', () => {
        const value = input.value.trim();
        if (!value) return;
        addMessage(value, 'user');
        input.value = '';
        respond(value);
    });

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendBtn.click();
        }
    });

    panel.querySelectorAll('.ai-chat-action').forEach(button => {
        button.addEventListener('click', () => {
            const currentStrings = IMK_I18N[document.documentElement.getAttribute('lang')] || IMK_I18N.en;
            const action = button.getAttribute('data-action');
            if (action === 'manpower') {
                addMessage(currentStrings.ai_action_manpower, 'user');
                addMessage(currentStrings.ai_reply_action_manpower);
            } else if (action === 'jobs') {
                addMessage(currentStrings.ai_action_jobs, 'user');
                addMessage(currentStrings.ai_reply_action_jobs);
            } else if (action === 'hse') {
                addMessage(currentStrings.ai_action_hse, 'user');
                addMessage(currentStrings.ai_reply_action_hse);
            }
        });
    });
}

// ===== MOBILE STICKY CTA =====
function initMobileStickyCTA() {
    if (document.querySelector('.mobile-cta')) {
        return;
    }

    const cta = document.createElement('div');
    cta.className = 'mobile-cta';
    cta.innerHTML = `
        <a href="contact.html#request-form" class="btn btn-primary">
            <img src="icons/telephone.svg" class="icon-svg icon-inline" alt="phone"> <span class="mobile-cta-text">Request Manpower</span>
        </a>
    `;
    document.body.appendChild(cta);
}
// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for use in other modules
window.IMK = {
    validateForm,
    initStatsCounter,
    initCookieConsent
};



