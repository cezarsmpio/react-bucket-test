import React, { Fragment } from 'react'; //
import PropTypes from 'prop-types';

function Variation({ render, ...props }) {
  return <Fragment>{render({ ...props })}</Fragment>;
}

Variation.propTypes = {
  name: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  traffic: PropTypes.number
};

Variation.defaultProps = {
  traffic: 0
};

export default Variation;
