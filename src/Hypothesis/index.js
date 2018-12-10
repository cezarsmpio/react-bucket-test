import React, { Children } from 'react';
import PropTypes from 'prop-types';
import weightedRandom from 'weighted-random';

class Hypothesis extends React.PureComponent {
  constructor(props) {
    super(props);

    // we need to set a variation before rendering
    if (!this.getVariationName()) {
      this.setRandomVariation();
    }
  }

  componentDidMount() {
    const { driver } = this.props;

    driver.onMount(this.getEventData());
  }

  componentWillUnmount() {
    const { driver } = this.props;

    driver.onUnmount(this.getEventData());
  }

  setRandomVariation() {
    const { driver, name } = this.props;

    const randomVariation = this.pickRandomVariation();

    driver.set(name, randomVariation.props.name);

    return randomVariation.props.name;
  }

  getVariationName() {
    const { driver, name } = this.props;
    const storedVariation = driver.get(name);

    return storedVariation;
  }

  getVariationElement() {
    const { children } = this.props;
    let variationName = this.getVariationName();

    if (!variationName) {
      variationName = this.setRandomVariation();
    }

    return Children.only(children.find(({ props }) => props.name === variationName));
  }

  getTraffics() {
    const { children } = this.props;
    const numberOfVariations = Children.count(children);
    const traffics = Children.map(children, child => parseFloat(child.props.traffic));

    if (traffics.length !== numberOfVariations) {
      return Array(numberOfVariations).fill(100 / numberOfVariations);
    }

    return traffics;
  }

  getEventData() {
    const { name } = this.props;
    const variation = this.getVariationElement();

    return {
      category: name,
      name: variation.props.name,
      traffic: variation.props.traffic || null,
    };
  }

  pickRandomVariation() {
    const { children } = this.props;
    const variationIndex = weightedRandom(this.getTraffics());

    return Children.only(children[variationIndex]);
  }

  render() {
    const { driver } = this.props;
    const variation = this.getVariationElement();

    const event = this.getEventData();

    return React.cloneElement(variation, {
      payload: {
        ...event,
        registerEvent: (props = {}) => driver.registerEvent({ ...event, ...props }),
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
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Hypothesis;
