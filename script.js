// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Detect system preference on first load
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme, persist = true) {
    html.setAttribute('data-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    
    if (persist) {
        localStorage.setItem('theme-preference', theme);
    }
}

// Get saved theme or use system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme-preference');
    const systemTheme = getSystemTheme();
    const theme = savedTheme || systemTheme;
    applyTheme(theme, !!savedTheme); // Only persist if user set it manually
}

// Initialize theme on load
initTheme();

// Theme toggle button click
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme, true);
});

// Listen for system theme changes (if no user preference set)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const noUserPreference = !localStorage.getItem('theme-preference');
    if (noUserPreference) {
        applyTheme(e.matches ? 'dark' : 'light', false);
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and elements with fade-in animation
document.querySelectorAll('.experience-card, .competency-group, .skill-category, .metric-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
