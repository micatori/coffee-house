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
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const menuLink = document.getElementById('menu-link');

const addMenuLink = () => {
    if (window.innerWidth <= 768 && !document.getElementById('mobile-menu-link')) {
        const mobileMenuLink = menuLink.cloneNode(true);

        mobileMenuLink.id = 'mobile-menu-link';
        mobileMenuLink.classList.remove('menu-link');
        mobileMenuLink.classList.add('nav-link');

        navList.append(mobileMenuLink);
    }
};

const removeMenuLink = () => {
    const mobileMenuLink = document.getElementById('mobile-menu-link');

    if (mobileMenuLink) {
        mobileMenuLink.remove();
    }
};

const closeMenu = () => {
    burgerButton.classList.remove('closed');
    nav.classList.remove('nav-open');
    document.body.classList.remove('no-scroll');
    removeMenuLink();
}

burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('closed');
    nav.classList.toggle('nav-open');
    document.body.classList.toggle('no-scroll');

    if (nav.classList.contains('nav-open')) {
        addMenuLink();
    } else {
        removeMenuLink();
    }
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

// SLIDER
const slider = document.getElementById('slider');
const sliderItems = document.querySelectorAll('.slider-item');
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const bars = document.querySelectorAll('.coffee-bar');

let currentSlide = 0;

const showSlide = (index) => {
    slider.style.transform = `translateX(-${index * 100}%)`;
    bars.forEach((bar, i) => {
        bar.classList.toggle('bar-active', i === index);
    });
}
btnRight.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide >= sliderItems.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
});
btnLeft.addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = sliderItems.length - 1;
    }
    showSlide(currentSlide);
});
showSlide(currentSlide);