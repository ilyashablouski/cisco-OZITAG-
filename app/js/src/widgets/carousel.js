import Swiper, {Navigation} from "swiper";

class Carousel extends Widget {
  constructor(node) {
    super(node, '.js-carousel');

    this.swiper = null;

    this.$slider = this.queryElement('.slider');
    this.$slides = this.queryElements('.item');
    this.$navPrev = this.queryElement('.prev');
    this.$navNext = this.queryElement('.next');

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
    Swiper.use([Navigation]);
    this.initSwiper();
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

