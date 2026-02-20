// ===== MAIN JAVASCRIPT FILE =====

// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initAnimations();
    initCurrentYear();
    
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



