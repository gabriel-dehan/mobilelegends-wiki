Vue.component('item', {
  props: ['item', 'selected', 'minimal', 'selectable'],
  template: '#item-component',
  data() {
    return {
      hovered: false,
      position: { top: 0, left: 0 }
    };
  },
  mounted() {
    const $el = $(this.$el);
    (() => {
      this.baseSize = $el.width() / 2;
      this.position = {...$el.position()};
    }).defer();
  },
  computed: {
    getElementPosition() {
      return this.position;
    },
    getTooltipPosition() {
      const top = this.position.top + this.baseSize - 3;
      const left = this.position.left + this.baseSize * 2 - 2;
      return { top, left };
    },
  },
  methods: {
    image_path(name) {
      return window.image_path(name);
    },
    isMobile() {
      return window.App.isMobile();
    }
  }
});
