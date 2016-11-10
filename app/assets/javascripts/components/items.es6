$(_ => {
  const template = '#items-app';

  if ( $(template).isRendered() ) {
 
    var Items = new Vue({
      el: template,
      data: {
        currentCategory: VueInitialState.categories[0],
        currentItem: null,
          ...VueInitialState
      },
      methods: {
        setCategory(category) { Vue.set(this, 'currentCategory', category); },
        setItem(item) { Vue.set(this, 'currentItem', item); }
      }
    });
  }
});

