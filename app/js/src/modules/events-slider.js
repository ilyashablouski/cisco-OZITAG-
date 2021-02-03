import Swiper, {Navigation, Pagination, Scrollbar} from "swiper";

class EventsSlider extends Widget {
  constructor(node) {
    super(node, '.js-events-slider');

    this.$wrapper = this.$node.firstElementChild;
    this.$slides = this.$wrapper.children;

    this.$navPrev = null;
    this.$navNext = null;
    this.$pagination = null;

    this.init();
  }

  initSwiper() {
    this.$node.classList.add('swiper-container');
    this.$wrapper.classList.add('swiper-wrapper');
    this.$slides.forEach($slide => $slide.classList.add('swiper-slide'));

    this.swiper = new Swiper(this.$node, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      simulateTouch: false,
      noSwiping: true,
      navigation: {
        prevEl: this.$navPrev,
        nextEl: this.$navNext,
      },
      pagination: {
        el: this.$pagination,
        clickable: true,
      },
    });
  }

  createSliderElements() {
    this.$navPrev = document.createElement('button');
    this.$navPrev.classList.add('events-slider__nav');
    this.$navPrev.classList.add('events-slider__nav--prev');
    this.$node.appendChild(this.$navPrev);

    this.$navNext = document.createElement('button');
    this.$navNext.classList.add('events-slider__nav');
    this.$navNext.classList.add('events-slider__nav--next');
    this.$node.appendChild(this.$navNext);

    this.$pagination = document.createElement('div');
    this.$pagination.classList.add('swiper-pagination');
    this.$node.appendChild(this.$pagination);
  }

  build() {
    if (this.$slides.length > 1) {
      this.createSliderElements();
      Swiper.use([Navigation, Pagination]);
      this.initSwiper();
    }
  }

  static init(el) {
    el && new EventsSlider(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-events-slider').forEach(item => EventsSlider.init(item));
});
