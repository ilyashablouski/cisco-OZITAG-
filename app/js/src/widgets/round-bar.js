class RoundBar extends Widget {
  constructor(node) {
    super(node, 'js-round-bar');

    this.progressLineElement = this.$node.querySelector('.js-round-bar__line');
    this.markerElement = this.$node.querySelector('.js-round-bar__marker');
    this.textElement = this.$node.querySelector('.js-round-bar__text');

    this.init();
  }

  build() {
    const progressLineValue = this.getProgressValue();
    this.setProgressValue(progressLineValue);
  }

  getProgressValue() {
    return this.$node.dataset.value;
  }

  setProgressValue(value) {
    const fullProgressValue = 100

    this.markerElement.style.transform = 'rotate(' + (360 * value / fullProgressValue) + 'deg)';
    this.progressLineElement.style['stroke-dashoffset'] = (304.777 * (1 - value / fullProgressValue)) + 'px';
    console.log(this.textElement)
    this.textElement.innerHTML = value + "%";
  }

  static init(el) {
    el && new RoundBar(el);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-round-bar').forEach(item => RoundBar.init(item));
});
