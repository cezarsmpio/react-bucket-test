import React, { Children } from 'react';
import PropTypes from 'prop-types';
import weightedRandom from 'weighted-random';

class Hypothesis extends React.PureComponent {
  constructor(props) {
    super(props);

    this.setVariation();
  }

  componentDidMount() {
    this.props.driver.onMount(this.generateDriverOptions());
  }

  componentWillUnmount() {
    this.props.driver.onUnmount(this.generateDriverOptions());
  }

  setVariation = () => {
    this.variationsCount = Children.count(this.props.children);
    this.variationName = this.getVariationName();
    this.variation = this.getVariationElement();
  };

  generateDriverOptions = (options = {}) => ({
    category: this.props.name,
    label: this.variation.props.label,
    revenueValue: this.variation.props.revenueValue,
    variation: this.variation,
    props: this.props,
    ...options,
  });

  getVariationName = () => {
    const name = this.props.driver.get(this.props.name);

    if (name) return name;

    const randomVariation = this.pickRandomVariation(this.variationName);

    this.props.driver.set(this.props.name, randomVariation.props.label);

    return randomVariation.props.label;
  };

  getVariationElement = () =>
    Children.only(
      this.props.children.find(
        ({ props }) => props.label === this.variationName,
      ),
    );

  getTraffics = () => {
    const propTraffics = Children.map(
      this.props.children,
      child => child.props.traffic,
    );

    if (
      !propTraffics.length ||
      propTraffics.some(traffic => typeof traffic !== 'number')
    ) {
      return Array(this.variationsCount).fill(100 / this.variationsCount);
    }

    return propTraffics;
  };

  pickRandomVariation = () => {
    const traffics = this.getTraffics();
    const variationIndex = weightedRandom(traffics);

    return Children.only(this.props.children[variationIndex]);
  };

  render() {
    const event = {
      category: this.props.name,
      label: this.variation.props.label,
      revenueValue: this.variation.props.revenueValue,
    };

    return React.cloneElement(this.variation, {
      payload: {
        ...event,
        registerEvent: (props = {}) =>
          this.props.driver.registerEvent({ ...event, ...props }),
        registerClick: (props = {}) =>
          this.props.driver.registerEvent({
            ...event,
            ...props,
            action: 'click',
          }),
      },
    });
  }
}

Hypothesis.propTypes = {
  name: PropTypes.string.isRequired,
  driver: PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    get: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired,
    registerEvent: PropTypes.func.isRequired,
  }).isRequired,
};

export default Hypothesis;
