// Theme Manager - Dark/Light Mode with Persistence
const ThemeManager = {
    STORAGE_KEY: 'dibuatin-cv-theme',

    init() {
        // Check for saved preference or default to dark
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        this.applyTheme(theme, false);

        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.applyTheme(e.matches ? 'dark' : 'light', true);
            }
        });
    },

    applyTheme(theme, animate = true) {
        const html = document.documentElement;

        if (animate) {
            html.classList.add('theme-transitioning');
        }

        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        // Update toggle button icon
        this.updateToggleIcon(theme);

        if (animate) {
            setTimeout(() => {
                html.classList.remove('theme-transitioning');
            }, 300);
        }
    },

    updateToggleIcon(theme) {
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');

        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                // Dark mode: show moon icon
                moonIcon.classList.remove('hidden');
                sunIcon.classList.add('hidden');
            } else {
                // Light mode: show sun icon
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
        }
    },

    toggle() {
        const isDark = document.documentElement.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';

        localStorage.setItem(this.STORAGE_KEY, newTheme);
        this.applyTheme(newTheme, true);
    },

    getCurrentTheme() {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
};

window.ThemeManager = ThemeManager;
