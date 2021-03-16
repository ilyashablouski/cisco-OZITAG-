import Swiper, {Navigation} from "swiper";

class Carousel extends Widget {
  constructor(node) {
    super(node, '.js-carousel');

    this.swiper = null;

    this.$slider = this.queryElement('.slider');
    this.$slides = this.queryElements('.item');
    this.$navLink = this.queryElement('.carousel__controls-link')
    this.$navPrev = this.queryElement('.carousel__nav--prev');
    this.$navNext = this.queryElement('.carousel__nav--next');

    this.onLayoutChange = this.onLayoutChange.bind(this);

    this.init();
  }

  build() {
    this.events();
    this.onLayoutChange();
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

      Swiper.use([Navigation]);
      this.initSwiper();
    } else {
      this.$navNext.classList.add('no-swiper');
      this.$navPrev.classList.add('no-swiper');
      this.$navLink.classList.add('no-swiper');
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
