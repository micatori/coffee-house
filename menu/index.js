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
console.log(products[0].sizes)
console.log(products[0].sizes.s);
console.log(products[0].sizes.m);
console.log(products[0].sizes.l);
console.log(products[0].additives);
console.log(products[0].additives[0]);
console.log(products[0].additives[1]);
console.log(products[0].additives[2]);


class Modal {
  constructor({ id, name, description, price, category, sizes, additives }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.sizes = sizes;
        this.additives = additives;
  }
  generateModal() {
    let template = '';
    // <div class="modal-overlay">
    let divModalOverlay = document.createElement('div');
    divModalOverlay.className = 'modal-overlay';
    divModalOverlay.setAttribute('data-id', this.id);
    divModalOverlay.setAttribute('data-category', this.category);
    // <div class="modal">
    let divModal = document.createElement('div');
    divModal.className = 'modal';
    // <div class="modal-img-box">
    let divModalImgBox = document.createElement('div');
    divModalImgBox.className = 'modal-img-box';
    let image = `<img class="modal-img" src="../assets/img_menu/prod${this.id}.png" alt="${this.name}">`;
    divModalImgBox.innerHTML = image;

    // <div class="modal-wrapper">
    let divModalWrapper = document.createElement('div');
    divModalWrapper.className = 'modal-wrapper';

    // <div class="modal-wrapper-description">
    let divModalWrapperDescription = document.createElement('div');
    divModalWrapperDescription.className = 'modal-wrapper-description';
    let modalTitle = `<h3 class="modal-title">${this.name}</h3>`;
    let modalDescriptionText = `<p class="modal-description-text">${this.description}</p>`
    divModalWrapperDescription.innerHTML = modalTitle;
    divModalWrapperDescription.innerHTML = modalDescriptionText;
    // <div class="modal-box" id="size">
    let divModalBoxSize = document.createElement('div');
    divModalBoxSize.className = 'modal-box';
    divModalBoxSize.id = 'size';
    let sizeTitle = `<h4 class="modal-box-title">Size</h4>`;
    divModalBoxSize.innerHTML = sizeTitle;
    // spans
    const createSizeButton = (id, size, volume, addPrice) => {
      const button = document.createElement('span');
      button.id = id;
      button.className = 'modal-button';
      button.dataset.addPrice = addPrice;
      const spanSize = document.createElement('span');
      spanSize.className = 'modal-size';
      spanSize.textContent = size;
      button.append(spanSize, ` ${volume}`);
      return button;
    };
    const spanS = createSizeButton('S', 'S', this.sizes.s.size, this.sizes.s['add-price']);
    spanS.classList.add('modal-size-active');
    const spanM = createSizeButton('M', 'M', this.sizes.m.size, this.sizes.m['add-price']);
    const spanL = createSizeButton('L', 'L', this.sizes.l.size, this.sizes.l['add-price']);
    divModalBoxSize.append(spanS, spanM, spanL);

    // <div class="modal-box" id="additives">
    let divModalBoxAdditives = document.createElement('div');
    divModalBoxSize.className = 'modal-box';
    divModalBoxSize.id = 'additives';
    let addTitle = `<h4 class="modal-box-title">Additives</h4>`;
    divModalBoxSize.innerHTML = addTitle;
    // // spans

    divModalWrapper.append(divModalBoxSize);
    divModalWrapper.append(divModalWrapperDescription);
    //
    divModal.append(divModalWrapper);
    divModal.append(divModalImgBox);
    divModalOverlay.append(divModal);
  }
}
    // this.id &&
    // (template +=

    // let divWrapper = document.createElement('div');
    // divWrapper.className = 'wrapper-coffee-article';
    // divWrapper.innerHTML = `
    //   <h3 class="coffee-description-title">${this.name}</h3>
    //   <p class="coffee-description-text">${this.description}</p>
    //   `;
    // template += divWrapper.outerHTML;
    // template += `<p class="coffee-description-price">$${this.price}</p>`

    // divDescription.innerHTML = template;
    // return divDescription;