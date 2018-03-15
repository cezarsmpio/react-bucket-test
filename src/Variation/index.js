import React from 'react';
import PropTypes from 'prop-types';

class Variation extends React.PureComponent {
  render() {
    return this.props.render({ ...this.props.payload });
  }
}

Variation.propTypes = {
  label: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  traffic: PropTypes.number,
  revenueValue: PropTypes.number,
};

Variation.defaultProps = {
  revenueValue: 0,
  payload: {},
};

export default Variation;
