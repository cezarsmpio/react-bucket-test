import React, { Children, useEffect } from 'react';
import PropTypes from 'prop-types';
import weightedRandomIndex from '../utils/weighted-random';

function getTraffics(children) {
  const numberOfVariations = Children.count(children);
  const traffics = Children.map(children, child =>
    parseFloat(child.props.traffic)
  );

  if (traffics.length !== numberOfVariations) {
    return Array(numberOfVariations).fill(100 / numberOfVariations);
  }

  return traffics;
}

function pickRandomVariation(children) {
  const variationIndex = weightedRandomIndex(getTraffics(children));

  return Children.only(children[variationIndex]);
}

function getVariationName(driver, name) {
  const storedVariation = driver.get(name);

  return storedVariation;
}

function setRandomVariation(children, driver, name) {
  const randomVariation = pickRandomVariation(children);

  driver.set(name, randomVariation.props.name);

  return randomVariation.props.name;
}

function getVariationElement(children, driver, name) {
  let variationName = driver.get(name);

  if (!variationName) {
    variationName = setRandomVariation(children, driver, name);
  }

  return Children.only(
    children.find(child => child.props.name === variationName)
  );
}

function getEventData(children, driver, name) {
  const variation = getVariationElement(children, driver, name);

  return {
    category: name,
    name: variation.props.name,
    traffic: variation.props.traffic || null
  };
}

function Hypothesis(props) {
  const { driver, children, name } = props;
  const eventData = getEventData(children, driver, name);

  // we need to set a variation before rendering
  if (!getVariationName(driver, name)) {
    setRandomVariation(children, driver, name);
  }

  useEffect(function() {
    driver.onMount(eventData);

    return function() {
      driver.onUnmount(eventData);
    };
  }, []);

  const variation = getVariationElement(children, driver, name);

  return React.cloneElement(variation, {
    ...eventData,
    registerEvent: (registerEventProps = {}) =>
      driver.registerEvent({ ...eventData, ...registerEventProps })
  });
}

Hypothesis.propTypes = {
  name: PropTypes.string.isRequired,
  driver: PropTypes.shape({
    prefix: PropTypes.string.isRequired,
    get: PropTypes.func.isRequired,
    set: PropTypes.func.isRequired,
    onMount: PropTypes.func.isRequired,
    onUnmount: PropTypes.func.isRequired,
    registerEvent: PropTypes.func.isRequired
  }).isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default Hypothesis;
