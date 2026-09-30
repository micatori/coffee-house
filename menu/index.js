console.log(products);

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

// CARDS
class Product {
    constructor({ id, name, description, price, category }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
  }
  generateProduct() {
    let template = '';
    let divDescription = document.createElement('div');
    divDescription.className = 'coffee-description';
    divDescription.setAttribute('data-id', this.id);
    divDescription.setAttribute('data-category', this.category);

    this.id &&
    (template += `<img class="image-background" src="../assets/img_menu/prod${this.id}.png" alt="${this.name}">`);

    let divWrapper = document.createElement('div');
    divWrapper.className = 'wrapper-coffee-article';
    divWrapper.innerHTML = `
      <h3 class="coffee-description-title">${this.name}</h3>
      <p class="coffee-description-text">${this.description}</p>
      `;
    template += divWrapper.outerHTML;
    template += `<p class="coffee-description-price">$${this.price}</p>`

    divDescription.innerHTML = template;
    return divDescription;
    }
}
window.onload = function() {
  let start = 8;
  if (products) {
    renderArticlesToDom();
  }
  showOnlyCoffeeCards();
  // Tags
  addTagsClickHandler();
}
const generateArticles = (prod) => {
  let cards = [];
  prod.forEach(card => {
    cards.push(new Product(card))
  })
  return cards;
}
const renderArticlesToDom = () => {
  const menuSection = document.querySelector('.menu-section');
  generateArticles(products).forEach(card => {
    let articleAnotherOne = card.generateProduct();
    menuSection.append(articleAnotherOne);
  })
}

const addTagsClickHandler = () => {
  document.querySelector('.buttons-wrapper').addEventListener('click', (event) => {
      const clickedBtn = event.target.closest('.button');
      if (!clickedBtn) return;

      removeSelectedBtn();
      selectClickBtn(clickedBtn);
      if (clickedBtn) {
        fiterCardsBySelectedBtn(clickedBtn.id);
      }
  })
}
const removeSelectedBtn = () => {
  let btn = document.querySelector('.button-active');
  btn.classList.remove('button-active');
  btn.classList.add('button-inactive');
}
const selectClickBtn = (clickedBtn) => {
  clickedBtn.classList.remove('button-inactive');
  clickedBtn.classList.add('button-active');
}
const showOnlyCoffeeCards = () => {
  let cards = document.querySelectorAll('.menu-section .coffee-description')
  console.log(cards[0].dataset.category);
  console.log(cards[0].dataset.id);
  cards.forEach((card) => {
    if (card.dataset.category !== "coffee") {
      card.classList.add('card_hidden');
    }
  })
}
const fiterCardsBySelectedBtn = (selectedId) => {
  let cards = document.querySelectorAll('.menu-section .coffee-description');
  cards.forEach(card => {
    card.classList.add('card_hidden');
    if (selectedId === card.dataset.category) {
          card.classList.remove('card_hidden');
    }
  })
}


// MODAL
