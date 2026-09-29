// DARK__MODE
const modeToggle = document.getElementById('mode-toggle');
const modeWrapper = modeToggle;
const sunBox = modeToggle.querySelector('.sun__box');
const moonBox = modeToggle.querySelector('.moon__box');
const moonIcon = modeToggle.querySelector('.moon-icon');
function setTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark-mode', isDark);

    modeWrapper.classList.toggle('mode__wrapper_dark', isDark);
    modeWrapper.classList.toggle('mode__wrapper_light', !isDark);
    sunBox.classList.toggle('sun__box_dark', isDark);
    sunBox.classList.toggle('sun__box_light', !isDark);
    moonBox.classList.toggle('moon__box_dark', isDark);
    moonBox.classList.toggle('moon__box_light', !isDark);
    moonIcon.classList.toggle('moon-icon_dark', isDark);
    moonIcon.classList.toggle('moon-icon_light', !isDark);

    localStorage.setItem('theme', theme);
}
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

modeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
});

// BURGER_MENU
const burgerButton = document.getElementById('burger-button');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

const closeMenu = () => {
    burgerButton.classList.remove('closed');
    nav.classList.remove('nav-open');
    document.body.classList.remove('no-scroll');
}

burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('closed');
    nav.classList.toggle('nav-open');
    document.body.classList.toggle('no-scroll');
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});