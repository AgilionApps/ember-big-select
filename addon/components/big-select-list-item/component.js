import Ember from 'ember';
import layout from './template';

const { computed, run, get, set, run: { debounce } } = Ember;

export default Ember.Component.extend({
  layout: layout,
  tagName: 'a',
  classNameBindings: ['isSelected:is-selected'],

  value: null,
  option: null,
  label: null,
  action: null,

  isSelected: computed('option', 'value', function() {
    return get(this, 'option') === get(this, 'value');
  }),

  click() {
    const option = get(this, 'option');

    // run this synchronously to flush out observers
    run(() => {
      if (get(this, 'isSelected')) {
        set(this, 'value', null);
      } else {
        set(this, 'value', option);
      }
    });

    debounce(this, this.sendAction, 300);
  }
});
