import base from './base';

function sendEvent(props = {}) {
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: `${props.category}_${props.name}_${props.action}`,
    ...props,
  });
}

export default function GoogleTagManager(options = {}) {
  const defaultOptions = {
    prefix: 'react_bucket_test_gtm_',

    onMount(props = {}) {
      sendEvent({
        action: 'load',
        ...props,
      });
    },

    onUnmount(props = {}) {
      sendEvent({
        action: 'unmount',
        ...props,
      });
    },

    registerEvent(props = {}) {
      sendEvent({
        action: 'registerEvent',
        ...props,
      });
    },
  };

  return {
    ...base,
    ...defaultOptions,
    ...options,
  };
}
