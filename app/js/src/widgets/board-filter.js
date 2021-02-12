class BoardFilter extends Widget {
  constructor(nodeElement, options = {}) {
    super(nodeElement, '.js-board-filter');
    this.$toggleButtons = options.toggleElements ? options.toggleElements : this.queryElements('.toggle');

    this.setActive = this.setActive.bind(this)
    this.init();
  }

  build() {
    this.addListeners(this.$toggleButtons);
  }

  addListeners(elements) {
    elements.forEach(elementButton => {
      elementButton.addEventListener('click', this.setActive);
    });
  }

  setActive(e) {
    const buttonElement = e.target.parentElement;
    this.$toggleButtons.forEach(element => {
      element.classList.remove('active');
    });

    buttonElement.classList.add('active');
  }

  static init(nodeElement) {
    new BoardFilter(nodeElement);
  }
}

document.querySelectorAll('.js-board-filter').forEach(element => {
  BoardFilter.init(element);
});
