import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, testId, label, type, value, name, onChange }) => (
  <label htmlFor={ id }>
    {' '}
    {label}
    {' '}
    <input
      id={ id }
      data-testid={ testId }
      type={ type }
      value={ value }
      name={ name }
      onChange={ onChange }
    />
  </label>
);

Input.propTypes = {
  id: PropTypes.string,
  testId: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
}.isRequired;

export default Input;
