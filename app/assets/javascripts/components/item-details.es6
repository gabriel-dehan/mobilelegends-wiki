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

      $('.horizontal-list').perfectScrollbar({suppressScrollY: true});
    }).defer();
  },
  computed: {
    components() {
      return _.map(this.item.components, (name) => _.find(this.items, { code_name: name }));
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
