(function () {
    const DEFAULT_NUMBER = '971544300910';
    const DEFAULT_MESSAGE = 'Hello IMK Technical Services, I need assistance.';

    let widgetEl = null;
    let noticeEl = null;
    let activeChatUrl = '';

    function buildChatUrl(number, message) {
        const phone = (number || DEFAULT_NUMBER).replace(/[^\d]/g, '');
        const text = encodeURIComponent(message || DEFAULT_MESSAGE);
        return 'https://web.whatsapp.com/send?phone=' + phone + '&text=' + text;
    }

    function openPopup(url) {
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

    function ensureWidget() {
        if (widgetEl) {
            return;
        }

        if (!document.getElementById('wa-widget-inline-styles')) {
            const style = document.createElement('style');
            style.id = 'wa-widget-inline-styles';
            style.textContent = [
                '.wa-chat-widget{position:fixed;right:16px;bottom:16px;width:min(360px,calc(100vw - 32px));background:#fff;border-radius:14px;box-shadow:0 20px 40px rgba(0,0,0,.2);overflow:hidden;z-index:12000;transform:translateX(calc(100% + 24px));opacity:0;pointer-events:none;transition:transform .28s ease,opacity .28s ease;font-family:"Open Sans",Arial,sans-serif}',
                '.wa-chat-widget.open{transform:translateX(0);opacity:1;pointer-events:auto}',
                '.wa-chat-header{background:#25D366;color:#fff;padding:12px 14px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px}',
                '.wa-chat-title{font-size:.98rem;font-weight:700;margin:0;line-height:1.25}',
                '.wa-chat-subtitle{font-size:.8rem;opacity:.95;margin:2px 0 0 0;line-height:1.35}',
                '.wa-chat-close{border:0;background:transparent;color:#fff;font-size:1.3rem;line-height:1;cursor:pointer;padding:0}',
                '.wa-chat-body{padding:14px;color:#1f2937}',
                '.wa-chat-copy{font-size:.9rem;line-height:1.45;margin:0 0 10px 0}',
                '.wa-chat-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}',
                '.wa-chat-action{border:0;border-radius:8px;padding:9px 12px;font-size:.88rem;cursor:pointer}',
                '.wa-chat-action.primary{background:#25D366;color:#fff;font-weight:700}',
                '.wa-chat-action.secondary{background:#eef2f7;color:#1f2937;font-weight:600}',
                '.wa-chat-notice{margin-top:10px;font-size:.8rem;color:#b91c1c}'
            ].join('');
            document.head.appendChild(style);
        }

        widgetEl = document.createElement('aside');
        widgetEl.className = 'wa-chat-widget';
        widgetEl.id = 'waChatWidget';
        widgetEl.innerHTML = '' +
            '<div class="wa-chat-header">' +
                '<div>' +
                    '<p class="wa-chat-title">WhatsApp Live Chat</p>' +
                    '<p class="wa-chat-subtitle">Opens in a compact chat popup</p>' +
                '</div>' +
                '<button type="button" class="wa-chat-close" id="waChatClose" aria-label="Close chat">&times;</button>' +
            '</div>' +
            '<div class="wa-chat-body">' +
                '<p class="wa-chat-copy">Your chat panel is open on this page. Click below to start the live WhatsApp conversation in a small window.</p>' +
                '<div class="wa-chat-actions">' +
                    '<button type="button" class="wa-chat-action primary" id="waOpenPopup">Open Chat Window</button>' +
                    '<button type="button" class="wa-chat-action secondary" id="waHideWidget">Close</button>' +
                '</div>' +
                '<p class="wa-chat-notice" id="waChatNotice" hidden>Popup blocked. Allow popups for this site to open WhatsApp chat window.</p>' +
            '</div>';

        document.body.appendChild(widgetEl);

        noticeEl = document.getElementById('waChatNotice');

        document.getElementById('waChatClose').addEventListener('click', function () {
            widgetEl.classList.remove('open');
        });

        document.getElementById('waHideWidget').addEventListener('click', function () {
            widgetEl.classList.remove('open');
        });

        document.getElementById('waOpenPopup').addEventListener('click', function () {
            if (!activeChatUrl) {
                return;
            }

            const opened = openPopup(activeChatUrl);
            if (noticeEl) {
                noticeEl.hidden = opened;
            }
        });
    }

    function openWidgetForLink(link) {
        const number = link.getAttribute('data-whatsapp-number') || DEFAULT_NUMBER;
        const message = link.getAttribute('data-message') || DEFAULT_MESSAGE;
        activeChatUrl = buildChatUrl(number, message);

        ensureWidget();
        if (noticeEl) {
            noticeEl.hidden = true;
        }
        widgetEl.classList.add('open');
    }

    function normalizeExistingLinks() {
        const links = document.querySelectorAll('a.btn-whatsapp, a[href*="wa.me/"], a[href*="api.whatsapp.com"], a[href*="web.whatsapp.com/send"], a[href*="whatsapp://"]');
        links.forEach(function (link) {
            if (!link.getAttribute('data-whatsapp-number')) {
                link.setAttribute('data-whatsapp-number', DEFAULT_NUMBER);
            }
            link.setAttribute('href', '#');
            link.removeAttribute('target');
            link.removeAttribute('rel');
        });
    }

    document.addEventListener('click', function (event) {
        const link = event.target.closest('a.btn-whatsapp, a[href*="wa.me/"], a[href*="api.whatsapp.com"], a[href*="web.whatsapp.com/send"], a[href*="whatsapp://"]');
        if (!link) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        if (typeof event.stopImmediatePropagation === 'function') {
            event.stopImmediatePropagation();
        }

        openWidgetForLink(link);
    }, true);

    document.addEventListener('DOMContentLoaded', normalizeExistingLinks);
})();
