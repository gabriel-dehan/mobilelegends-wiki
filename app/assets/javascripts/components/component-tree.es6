Vue.component('component-tree', {
  props: ['items', 'all-items', 'update-current-item'],
  template: '#item-component-tree',
  methods: {
    componentsFor(currentItem) {
 			return _.map(currentItem.components, (name) => _.find(this.allItems, { code_name: name }));
    }
  }
});
