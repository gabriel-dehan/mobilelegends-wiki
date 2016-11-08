Vue.component('items-list', {
  props: ['items', 'current-item', 'set-item', 'current-category'],
  template: '#items-list-component',
  data() {
    return {
      tiers: [1, 2, 3]
    };
  },
  computed: {
    filteredItems() {
      return _.filter(this.items, (item) => item.category == this.currentCategory);
    }
  },
  methods: {
    filteredByTier(tier) {
      return _.filter(this.filteredItems, (item) => item.tier == tier);
    },
    updateCurrentItem(item, event) {
      this.setItem(item);
      $('body').animate({ scrollTop: 0 }, 100, 'swing');
    }
  }
});
