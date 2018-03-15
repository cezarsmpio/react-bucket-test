export default {
  prefix: 'react_bucket_test_',

  get: function(key) {
    return localStorage.getItem(`${this.prefix}${key}`);
  },

  set: function(key, value) {
    return localStorage.setItem(`${this.prefix}${key}`, value);
  },

  onMount: () => {},

  onUnmount: () => {},

  registerEvent: () => {},
};
