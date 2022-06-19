import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, label, isBtnDisabled }) => (
  <button
    type="button"
    disabled={ isBtnDisabled }
    onClick={ onClick }
  >
    {' '}
    {label}
    {' '}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  isBtnDisabled: PropTypes.bool,
};

Button.defaultProps = { isBtnDisabled: false };

export default Button;
