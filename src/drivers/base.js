const baseDriverOptions = {
  prefix: 'react_bucket_test_',

  get(key) {
    return localStorage.getItem(`${this.prefix}${key}`);
  },

  set(key, value) {
    return localStorage.setItem(`${this.prefix}${key}`, value);
  },

  onMount() {},

  onUnmount() {},

  registerEvent() {},
};

export default baseDriverOptions;
