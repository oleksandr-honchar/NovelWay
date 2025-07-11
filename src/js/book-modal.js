import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { renderBookModal } from './render-functions';
import { refs } from './refs';

function onEscPress(e) {
  if (e.key === 'Escape') closeModal();
  refs.scrollUpBtn.classList.add('show');
}

export function openModalBook(bookData) {
  renderBookModal(bookData);

  refs.backdrop.classList.add('is-open-book-modal');
  document.body.classList.add('no-scroll');
  refs.scrollUpBtn.classList.remove('show');
  new Accordion('.accordeon-container', {
    showMultiple: true,
  
  });

  const inputSum = refs.backdrop.querySelector('.form-input-sum');
  const minus = refs.backdrop.querySelector('.minus');
  const plus = refs.backdrop.querySelector('.plus');
  const addToCartBtn = refs.backdrop.querySelector('.add-to-cart');
  const formBookModal = refs.backdrop.querySelector('.form-book-modal');
  const closeBtn = refs.backdrop.querySelector('.close-btn');

  inputSum.value = 1;
  let value = 1;
  let number;
  minus.addEventListener('click', () => {
    if (+inputSum.value > 1) {
      inputSum.value = +inputSum.value - 1;
    } else {
      iziToast.error({
        message: 'Enter the correct format',
        position: 'topRight',
      });
      inputSum.value = 1;
      return;
    }
  });

  plus.addEventListener('click', () => {
    if (+inputSum.value >= 1) {
      inputSum.value = +inputSum.value + 1;
    } else {
      iziToast.error({
        message: 'Enter the correct format',
        position: 'topRight',
      });
      inputSum.value = 1;
      return;
    }
  });

  addToCartBtn.addEventListener('click', addToCart);

  function addToCart(event) {
    value = inputSum.value.trim();
    number = Number(value);
    if (!value || isNaN(number) || number < 1) {
      iziToast.error({
        message: 'Enter the correct format',
        position: 'topRight',
      });
      inputSum.value = 1;
      return;
    } else {
      iziToast.success({
        message: `Number of selected products: ${number}`,
        position: 'topRight',
      });
    }
  }

  formBookModal.addEventListener('submit', buyNow);

  function buyNow(event) {
    event.preventDefault();

    value = inputSum.value.trim();
    number = Number(value);
    if (!value || isNaN(number) || number < 1) {
      iziToast.error({
        message: 'Enter the correct format',
        position: 'topRight',
      });
      inputSum.value = 1;
      alert('inputSum:' + inputSum);

      return;
    } else {
      iziToast.success({
        message: 'Thank you for your purchase.',
        position: 'topRight',
      });
    }
  }

  closeBtn.addEventListener('click', closeModal);
  refs.backdrop.addEventListener('click', e => {
    if (e.target === refs.backdrop) closeModal();
    refs.scrollUpBtn.classList.add('show');
  });

  document.addEventListener('keydown', onEscPress);
}

function closeModal() {
  refs.backdrop.classList.remove('is-open-book-modal');
  document.body.classList.remove('no-scroll');
  refs.backdrop.innerHTML = '';
  refs.scrollUpBtn.classList.add('show');
  document.removeEventListener('keydown', onEscPress);
}
