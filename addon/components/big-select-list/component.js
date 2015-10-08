import Ember from 'ember';
import layout from './template';

const { $, on, set } = Ember;

export default Ember.Component.extend({
  layout: layout,

  value: null,
  prompt: 'Please select one',
  isShowingOptions: false,

  actions: {
    toggleOptions() {
      this.toggleProperty('isShowingOptions');
    }
  },

  // event handlers
  hideOnExternalClick(e) {
    const $target = $(e.target);
    const component = e.data.component;

    if(!$.contains(component.$()[0], $target[0])) {
      set(component, 'isShowingOptions', false);
    }
  },

  registerExternalClick: on('init', function() {
    $('body').on('click', {component: this}, this.hideOnExternalClick);
  }),

  removeExternalClick: on('willDestroyElement', function() {
    $('body').off('click', {component: this}, this.hideOnExternalClick);
  })
});
