Vue.component('item-details', {
  template: '#item-details-component',
  props: ['item', 'items', 'set-item'],
  data() {
    return { relatedItemsWidth: 1000 };
  },
  updated() {
    (() => {
      const $el = $(this.$el);
      const itemsWidth = $el.find('.related-items li').map((i, el) => $(el).width() + 15);
      const totalWidth = _.sum(itemsWidth);
      this.relatedItemsWidth = totalWidth;
    }).defer();
  },
  computed: {
    components() {
      return _.filter(this.items, (item) => _.includes(this.item.components, _.snakeCase(item.name)));
    },
    totalRelatedItemsWidth() {
      return `${this.relatedItemsWidth}px`;
    },
    relatedItems() {
      if (this.item) {
        return _.filter(this.items, (item) => {
          return _.includes(item.components, _.snakeCase(this.item.name));
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    updateCurrentItem(item, event) {
      this.setItem(item);
    }
  }
});
