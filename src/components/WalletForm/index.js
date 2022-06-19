import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveExpenceWithExchangeRates, fetchCurrencies } from '../../actions';
import { CATEGORIES_OPTIONS, PAYMENT_OPTIONS } from '../../utils/constants';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';

const initialTag = 'Alimentação';

class WalletForm extends React.Component {
  state = {
    value: 0,
    currency: 'USD',
    method: 'Dinheiro',
    tag: initialTag,
    description: '',
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { expenses, dispatch } = this.props;
    const expenseObj = {
      id: expenses.length,
      ...this.state,
    };

    dispatch(saveExpenceWithExchangeRates(expenseObj));

    this.setState({
      value: 0,
      currency: 'USD',
      method: 'Dinheiro',
      tag: initialTag,
      description: '',
    });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;

    return (
      <form className="wallet-form">
        <Input
          id="value"
          data-testid="value-input"
          label="Valor:"
          type="number"
          value={ value }
          name="value"
          onChange={ this.handleChange }
        />

        <Select
          id="currency"
          data-testid="currency-input"
          label="Moeda:"
          value={ currency }
          name="currency"
          onChange={ this.handleChange }
          options={ currencies.filter((c) => c !== 'USDT') }
        />

        <Select
          id="method"
          data-testid="method-input"
          label="Método de pagamento:"
          value={ method }
          name="method"
          onChange={ this.handleChange }
          options={ PAYMENT_OPTIONS }
        />

        <Select
          id="tag"
          data-testid="tag-input"
          label="Categoria:"
          value={ tag }
          name="tag"
          onChange={ this.handleChange }
          options={ CATEGORIES_OPTIONS }
        />

        <Input
          id="description"
          data-testid="description-input"
          label="Descrição:"
          type="text"
          value={ description }
          name="description"
          onChange={ this.handleChange }
        />

        <Button
          label="Adicionar despesa"
          onClick={ this.handleClick }
        />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  currencies: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
