/**
 * Contact Page Interactivity Script
 * Handles Tabs, FAQ Accordion, and Form Submissions
 */

console.log('Contact script loaded');

/**
 * Initialize Tab Functionality
 * Handles switching between different inquiry forms
 */
function initContactTabs() {
    console.log('Initializing Tabs...');
    const tabHeaders = document.querySelectorAll('.tab-header');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabHeaders.length || !tabContents.length) {
        console.warn('Tabs not found:', tabHeaders.length, tabContents.length);
        return;
    }

    tabHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default button behavior
            console.log('Tab clicked:', header.innerText);

            // Remove active class from all headers and contents
            tabHeaders.forEach(h => h.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked header
            header.classList.add('active');

            // Show corresponding content
            const targetId = header.getAttribute('data-tab');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            } else {
                console.error('Target content not found:', targetId);
            }
        });
    });

    // Check for hash in URL to activate specific tab on load
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const targetTab = document.querySelector(`.tab-header[data-tab="${hash}"]`);
        if (targetTab) {
            targetTab.click();
        }
    }
}

/**
 * Initialize FAQ Accordion
 * Handles expanding and collapsing FAQ answers
 */
function initFAQ() {
    console.log('Initializing FAQ...');
    const faqItems = document.querySelectorAll('.faq-item');

    if (!faqItems.length) {
        console.warn('No FAQ items found');
        return;
    }

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', () => {
                console.log('FAQ clicked');
                // Check if currently active
                const isActive = item.classList.contains('active');

                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));

                // If it wasn't active, open it
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/**
 * Initialize Contact Forms
 * Handles form submission and success modal
 */
function initContactForms() {
    console.log('Initializing Forms...');
    const forms = document.querySelectorAll('.contact-form');
    const modal = document.getElementById('contactModal');
    const modalClose = document.getElementById('modalClose');

    if (!forms.length) return;

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submitting:', form.id);

            // Simulate form submission
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<img src="icons/arrow-repeat.svg" class="icon-svg spin" alt="loading"> Sending...';
            btn.disabled = true;

            // Simulate API delay
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;

                // Show success modal if it exists
                if (modal) {
                    modal.classList.add('active');
                } else {
                    alert('Message Sent Successfully!');
                }

                // Reset form
                form.reset();
            }, 1500);
        });
    });

    // Close modal handlers
    if (modal && modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close on click outside
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

// Add CSS for spinner if not exists
const style = document.createElement('style');
style.innerHTML = `
    @keyframes spin { 
        100% { transform: rotate(360deg); } 
    }
    .spin { 
        animation: spin 1s linear infinite; 
        display: inline-block;
    }
`;
document.head.appendChild(style);

// Expose functions globally
window.initContactTabs = initContactTabs;
window.initFAQ = initFAQ;
window.initContactForms = initContactForms;

// Auto-initialize on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initContactTabs();
    initFAQ();
    initContactForms();
});
