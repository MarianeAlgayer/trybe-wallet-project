import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ id, testId, label, value, name, onChange, options }) => (
  <label htmlFor={ id }>
    {' '}
    {label}
    {' '}
    <select
      id={ id }
      data-testid={ testId }
      value={ value }
      name={ name }
      onChange={ onChange }
    >
      { options.map((option) => <option key={ option }>{ option }</option>) }
    </select>
  </label>
);

Select.propTypes = {
  id: PropTypes.string,
  testId: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
}.isRequired;

export default Select;
