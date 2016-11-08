Vue.component('items-sidebar', {
  props: ['categories',  'current-category', 'set-category'],
  template: '#items-sidebar-component',
  methods: {
    updateCategory(category, event) {
      this.setCategory(category);
    }
  }
})
