import Swiper, {Navigation} from "swiper";

class Carousel extends Widget {
  constructor(node) {
    super(node, '.js-carousel');

    this.swiper = null;

    this.$slider = this.queryElement('.slider');
    this.$slides = this.queryElements('.item');

    this.$controls = document.querySelector('.carousel__controls');
    this.$navLink = null;
    this.$navPrev = null;
    this.$navNext = null;

    this.onLayoutChange = this.onLayoutChange.bind(this);

    this.init();
  }

  build() {
    this.events();
    this.onLayoutChange();
  }

  createCarouselElements() {
    this.$navLink = document.createElement('a');
    this.$navLink.classList.add('carousel__controls-link');
    this.$navLink.href = "/html/stamps.html";
    this.$navLink.textContent = "See all";
    this.$controls.appendChild(this.$navLink);

    this.$navPrev = document.createElement('button');
    this.$navPrev.classList.add('carousel__nav');
    this.$navPrev.classList.add('carousel__nav--prev');
    this.$controls.appendChild(this.$navPrev);

    this.$navNext = document.createElement('button');
    this.$navNext.classList.add('carousel__nav');
    this.$navNext.classList.add('carousel__nav--next');
    this.$controls.appendChild(this.$navNext);

  }


  onLayoutChange() {
    if (Layout.isDesktopLayout()) {
      this.initDesktop();
    } else {
      this.initMobile();
    }
  }

  initDesktop() {
    if (this.$slides.length > 6) {
      this.createCarouselElements();
      Swiper.use([Navigation]);
      this.initSwiper();
    }
  }

  initMobile() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }

  initSwiper() {
    this.swiper = new Swiper(this.$slider, {
      slidesPerView: 6,
      grabCursor: true,
      breakpoints: {
        1259: {
          spaceBetween: 20,
        },
      },
      navigation: {
        prevEl: this.$navPrev,
        nextEl: this.$navNext,
      }
    });
  }

  events() {
    Layout.addListener(this.onLayoutChange);
  }

  static init(el) {
    el && new Carousel(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-carousel').forEach(item => Carousel.init(item));
});

