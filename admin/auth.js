(() => {
    const authOverlay = document.getElementById('adminAuth');
    const adminLayout = document.getElementById('adminLayout');
    const authForm = document.getElementById('authForm');
    const passwordInput = document.getElementById('authPassword');
    const confirmField = document.getElementById('authConfirmField');
    const confirmInput = document.getElementById('authConfirm');
    const authTitle = document.getElementById('authTitle');
    const authSubtitle = document.getElementById('authSubtitle');
    const authSubmit = document.getElementById('authSubmit');
    const authError = document.getElementById('authError');
    const authReset = document.getElementById('authReset');
    const logoutBtn = document.getElementById('logoutBtn');

    if (!authOverlay || !adminLayout || !authForm || !passwordInput) {
        return;
    }

    const HASH_KEY = 'imk.admin.hash';
    const SESSION_KEY = 'imk.admin.session';
    const DEFAULT_PASSWORD = 'IMK@2026';

    const showError = (message) => {
        if (!authError) return;
        authError.textContent = message;
        authError.hidden = false;
    };

    const clearError = () => {
        if (!authError) return;
        authError.hidden = true;
        authError.textContent = '';
    };

    const setAuthMode = (mode) => {
        const isSetup = mode === 'setup';
        if (authTitle) authTitle.textContent = isSetup ? 'Set Admin Password' : 'Admin Login';
        if (authSubtitle) authSubtitle.textContent = isSetup
            ? 'Create a password to protect this admin panel.'
            : 'Secure access for authorized team members.';
        if (authSubmit) authSubmit.textContent = isSetup ? 'Create Password' : 'Login';
        if (confirmField) confirmField.hidden = !isSetup;
        if (confirmInput) confirmInput.required = isSetup;
    };

    const setAuthenticated = (value) => {
        if (value) {
            sessionStorage.setItem(SESSION_KEY, 'true');
            authOverlay.style.display = 'none';
            adminLayout.style.display = 'flex';
        } else {
            sessionStorage.removeItem(SESSION_KEY);
            authOverlay.style.display = 'flex';
            adminLayout.style.display = 'none';
        }
    };

    const hashPassword = async (password) => {
        if (!window.crypto || !crypto.subtle) {
            return btoa(password);
        }
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    };

    const hasPassword = () => {
        return !!localStorage.getItem(HASH_KEY);
    };

    const initAuth = () => {
        const sessionActive = sessionStorage.getItem(SESSION_KEY) === 'true';
        if (sessionActive) {
            setAuthenticated(true);
            return;
        }

        setAuthenticated(false);
        if (hasPassword()) {
            setAuthMode('login');
        } else {
            setAuthMode(DEFAULT_PASSWORD ? 'login' : 'setup');
        }
    };

    authForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearError();

        const password = passwordInput.value.trim();
        if (password.length < 8) {
            showError('Password must be at least 8 characters.');
            return;
        }

        if (!hasPassword()) {
            if (DEFAULT_PASSWORD) {
                if (password !== DEFAULT_PASSWORD) {
                    showError('Incorrect password. Please try again.');
                    return;
                }
                const hash = await hashPassword(password);
                localStorage.setItem(HASH_KEY, hash);
                passwordInput.value = '';
                confirmInput.value = '';
                setAuthenticated(true);
                return;
            }
            const confirm = confirmInput.value.trim();
            if (password !== confirm) {
                showError('Passwords do not match.');
                return;
            }

            const hash = await hashPassword(password);
            localStorage.setItem(HASH_KEY, hash);
            passwordInput.value = '';
            confirmInput.value = '';
            setAuthenticated(true);
            return;
        }

        const storedHash = localStorage.getItem(HASH_KEY);
        const hash = await hashPassword(password);
        if (hash !== storedHash) {
            showError('Incorrect password. Please try again.');
            return;
        }

        passwordInput.value = '';
        setAuthenticated(true);
    });

    authReset.addEventListener('click', () => {
        if (!confirm('Reset admin password? You will need to set a new password.')) return;
        localStorage.removeItem(HASH_KEY);
        sessionStorage.removeItem(SESSION_KEY);
        passwordInput.value = '';
        confirmInput.value = '';
        setAuthMode('setup');
        setAuthenticated(false);
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            setAuthenticated(false);
        if (hasPassword()) {
            setAuthMode('login');
        } else {
            setAuthMode(DEFAULT_PASSWORD ? 'login' : 'setup');
        }
        });
    }

    initAuth();
})();
