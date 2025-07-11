import Swiper from 'swiper';
import { Navigation, Pagination,Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const eventsSwiper = new Swiper('.events-swiper', {
  modules: [Navigation , Pagination,Keyboard],
  slidesPerView: 1,
  loop: false,
  roundLengths: true,

  navigation: {
    nextEl: '.events-swiper-button-next',
    prevEl: '.events-swiper-button-prev',
  },
  pagination: {
    el: '.events-swiper-pagination',
    clickable: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24,
 
    },
    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 24,
      
    },
  },
  on: {
    init: updateButtonsState,
    slideChange: updateButtonsState,
    resize: function() {
      this.update(); 
      updateButtonsState(this);
    }
  },
});

function updateButtonsState(swiper) {
  const prevBtn = document.querySelector('.events-swiper-button-prev');
  const nextBtn = document.querySelector('.events-swiper-button-next');
  
  if (!prevBtn || !nextBtn) return;
  
  const totalSlides = swiper.slides.length;
  
  const visibleSlides = swiper.params.slidesPerView;
  
  if (swiper.isBeginning) {
    prevBtn.classList.add('swiper-button-disabled');
    prevBtn.setAttribute('aria-disabled', 'true');
  } else {
    prevBtn.classList.remove('swiper-button-disabled');
    prevBtn.setAttribute('aria-disabled', 'false');
  }
  
  if (totalSlides <= visibleSlides) {
    nextBtn.classList.add('swiper-button-disabled');
    nextBtn.setAttribute('aria-disabled', 'true');
  } else {
    if (swiper.isEnd) {
      nextBtn.classList.add('swiper-button-disabled');
      nextBtn.setAttribute('aria-disabled', 'true');
    } else {
      nextBtn.classList.remove('swiper-button-disabled');
      nextBtn.setAttribute('aria-disabled', 'false');
    }
  }
}