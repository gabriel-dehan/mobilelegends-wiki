Vue.component('items-list', {
  props: ['items', 'current-item', 'set-item', 'current-category'],
  template: '#items-list-component',
  data() {
    return {
      tiers: [1, 2, 3],
      search: null
    };
  },
  computed: {
    filteredItems() {
      return _.filter(this.searchedItems, (item) => (this.currentCategory == "All" ? true : (item.category == this.currentCategory)) );
    },
    searchedItems() {
      return _.filter(this.items, (item) => (_.isEmpty(this.search) ? true : item.name.match(new RegExp(this.search, "i"))));
    }
  },
  methods: {
    searchItem(event) {
      this.search = event.target.value;
    },
    filteredByTier(tier) {
      return _.filter(this.filteredItems, (item) => item.tier == tier);
    },
    updateCurrentItem(item, event) {
      this.setItem(item);
      $('body').animate({ scrollTop: 0 }, 100, 'swing');
    }
  }
});
