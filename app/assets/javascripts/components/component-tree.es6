Vue.component('component-tree', {
  props: ['items', 'all-items'],
  template: '#item-component-tree',
  methods: {
    componentsFor(currentItem) {
      return _.filter(this.allItems, (item) => _.includes(currentItem.components, _.snakeCase(item.name)));
    }
  }
});
