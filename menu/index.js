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
    let price = `<p class="coffee-description-price">$${this.price}</p>`;
    divWrapper.innerHTML += price;
    template += divWrapper.outerHTML;
    divDescription.innerHTML = template;
    return divDescription;
    }
}
window.onload = function() {
  // let start = 8;
  if (products) {
    renderArticlesToDom();
    // PAGINATTIION
    refreshCards();
  }
  showOnlyCoffeeCards();
  // /pag
  refreshCards();

  // Tags
  addTagsClickHandler();
  // modal
  addCardsClickHandler();
  // pag
  addRefreshButtonHandler();
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

      // Pagination
      refreshCards();
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
    divModalWrapperDescription.innerHTML += modalDescriptionText;
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
    spanS.classList.add('modal-button-active');
    const spanM = createSizeButton('M', 'M', this.sizes.m.size, this.sizes.m['add-price']);
    const spanL = createSizeButton('L', 'L', this.sizes.l.size, this.sizes.l['add-price']);
    divModalBoxSize.append(spanS, spanM, spanL);

    // <div class="modal-box" id="additives">
    let divModalBoxAdditives = document.createElement('div');
    divModalBoxAdditives.className = 'modal-box';
    divModalBoxAdditives.id = 'additives';
    let addTitle = `<h4 class="modal-box-title">Additives</h4>`;
    divModalBoxAdditives.innerHTML = addTitle;
    // // spans
    const createAdditiveButton = (id, number, name, addPrice) => {
      const button = document.createElement('span');
      button.id = id;
      button.className = 'modal-button';
      button.dataset.addPrice = addPrice;
      const spanNumber = document.createElement('span');
      spanNumber.className = 'modal-size';
      spanNumber.textContent = number;
      button.append(spanNumber, ` ${name}`);
      return button;
    };
    const span1 = createAdditiveButton( 1, 1,
      this.additives[0].name,
      this.additives[0]['add-price']
    );
    const span2 = createAdditiveButton(2, 2,
      this.additives[1].name,
      this.additives[1]['add-price']
    );
    const span3 = createAdditiveButton(3, 3,
      this.additives[2].name,
      this.additives[2]['add-price']
    );
    divModalBoxAdditives.append(span1, span2, span3);
    // <div class="modal-total-wrapper">
    let divModalTotalWrapper = document.createElement('div');
    divModalTotalWrapper.className = 'modal-total-wrapper';
    let total = `<span class="modal-total-span">Total:</span>`;
    divModalTotalWrapper.innerHTML = total;
    const modalTotalSpan = document.createElement('span');
    modalTotalSpan.id = "total";
    modalTotalSpan.className = "modal-total-span";
    modalTotalSpan.textContent = `$${this.price}`;
    divModalTotalWrapper.append(modalTotalSpan);
    // <div class="modal-info-wrapper">
    const modalInfoWrapper = document.createElement('div');
    modalInfoWrapper.className = 'modal-info-wrapper';
    let modalInfoI = `<span class="modal-info-i">i</span>`;
    modalInfoWrapper.innerHTML = modalInfoI;
    let modalInfoText = `
    <span class="modal-info-text">
        The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
    </span>`;
    modalInfoWrapper.innerHTML += modalInfoText;
// <button id="modal-close-button" class="modal-close-button">Close</button>
    const modalCloseButton = document.createElement('button');
    modalCloseButton.id="modal-close-button";
    modalCloseButton.className = "modal-close-button";
    modalCloseButton.textContent = 'Close';

    divModalWrapper.append(divModalWrapperDescription);
    divModalWrapper.append(divModalBoxSize);
    divModalWrapper.append(divModalBoxAdditives);
    divModalWrapper.append(divModalTotalWrapper);
    divModalWrapper.append(modalInfoWrapper);
    divModalWrapper.append(modalCloseButton);
    //
    divModal.append(divModalImgBox);
    divModal.append(divModalWrapper);
    divModalOverlay.append(divModal);

    return divModalOverlay;
  }
  // OPN
  openModal() {
    this.overlay = this.generateModal();
    document.body.append(this.overlay);

    const closeButton = this.overlay.querySelector('#modal-close-button');

    closeButton.addEventListener('click', () => {
      this.closeModal();
    });

    this.overlay.addEventListener('click', (event) => {
      if (event.target === this.overlay) {
        this.closeModal();
      }
    });

    document.addEventListener('keydown', this.handleEscape);
  }
// CLOS
  closeModal() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
    document.removeEventListener('keydown', this.handleEscape);
    document.body.classList.remove('no-scroll');
  }

  handleEscape = (event) => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  };
}
const addCardsClickHandler = () => {
  const menuSection = document.querySelector('.menu-section');
  menuSection.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.coffee-description');
    if (!clickedCard) return;
    const productId = Number(clickedCard.dataset.id);
    const product = products.find(product => product.id === productId);
    if (!product) return;
    const modal = new Modal(product);
    modal.openModal();
    document.body.classList.add('no-scroll');
  });
};



// P
// pagination
const refreshCards = () => {
  const cards = document.querySelectorAll('.menu-section .coffee-description');
  const button = document.querySelector('.refresh-button');
  const activeCategory = document.querySelector('.button-active').id;

  if (window.innerWidth > 1110) {
    cards.forEach(card => {
      if (card.dataset.category === activeCategory) {
        card.classList.remove('card_hidden');
      } else {
        card.classList.add('card_hidden');
      }
    });

    button.classList.add('refresh-button-hidden');
    return;
  }

  let visibleCards = 0;
  cards.forEach(card => {
    if (card.dataset.category === activeCategory) {
      visibleCards++;
      if (visibleCards <= 4) {
        card.classList.remove('card_hidden');
      } else {
        card.classList.add('card_hidden');
      }
    } else {
      card.classList.add('card_hidden');
    }
  });
  if (visibleCards > 4) {
    button.classList.remove('refresh-button-hidden');
  } else {
    button.classList.add('refresh-button-hidden');
  }
};

window.addEventListener('resize', refreshCards);

const addRefreshButtonHandler = () => {
  const button = document.querySelector('.refresh-button');
  button.addEventListener('click', () => {
    const activeCategory = document.querySelector('.button-active').id;
    const hiddenCards = document.querySelectorAll(
      `.coffee-description[data-category="${activeCategory}"].card_hidden`
    );
    hiddenCards.forEach(card => {
      card.classList.remove('card_hidden');
    });
    button.classList.add('refresh-button-hidden');
  });
};