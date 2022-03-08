import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends React.Component {
  getTotalValue = () => {
    const { expenses } = this.props;

    if (expenses.length > 0) {
      const convertedValues = expenses
        .map((expense) => expense.value * expense.exchangeRates[expense.currency].ask);
      const totalValue = convertedValues.reduce((result, number) => result + number);
      return totalValue.toFixed(2);
    }

    return 0;
  };

  render() {
    const { email } = this.props;

    return (
      <header>
        <h1>Trybe Wallet</h1>
        <div>
          <p data-testid="email-field">{`Email: ${email}`}</p>
          <p data-testid="total-field">{`R$ ${this.getTotalValue()}`}</p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

WalletHeader.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(WalletHeader);
