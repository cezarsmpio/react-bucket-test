import PropTypes from 'prop-types';

function Variation({ render, payload }) {
  return render({ ...payload });
}

Variation.propTypes = {
  render: PropTypes.func.isRequired,
  traffic: PropTypes.number,
  payload: PropTypes.shape({}),
};

Variation.defaultProps = {
  payload: {},
};

export default Variation;
