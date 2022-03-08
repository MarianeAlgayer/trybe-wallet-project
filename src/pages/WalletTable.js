import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class WalletTable extends React.Component {
  handleDeleteBtn = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  }

  render() {
    const { expenses } = this.props;

    return (
      <table className="wallet-table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(({
            id, description, tag, method, value, currency, exchangeRates,
          }) => {
            const currencyName = exchangeRates[currency].name;
            const exchangeRate = Number(exchangeRates[currency].ask).toFixed(2);
            const convertedValue = Number(value * exchangeRates[currency].ask).toFixed(2);

            return (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{ Number(value).toFixed(2) }</td>
                <td>{ currencyName }</td>
                <td>{ exchangeRate }</td>
                <td>{ convertedValue }</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDeleteBtn(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>);
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletTable);
