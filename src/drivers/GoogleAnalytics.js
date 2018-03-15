import base from './base';

const sendEvent = (props = {}) => {
  if (!window.ga) return;

  window.ga('send', 'event', {
    eventCategory: props.category,
    eventAction: props.action,
    eventLabel: props.label,
    eventValue: props.revenueValue || 0,
    nonInteraction: props.nonInteraction,
  });
};

const defaultOptions = {
  prefix: 'react_bt_ga_',
};

export default (options = {}) => ({
  ...base,
  ...defaultOptions,
  ...options,

  onMount: props =>
    sendEvent({
      action: 'load',
      ...props,
    }),

  onUnmount: props =>
    sendEvent({
      action: 'unmount',
      ...props,
    }),

  registerEvent: props =>
    sendEvent({
      action: 'registerEvent',
      ...props,
    }),
});
