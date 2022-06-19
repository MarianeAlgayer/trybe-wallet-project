import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteExpense } from '../../actions';
import { HEADERS } from '../../utils/constants';
import Button from '../Button';

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
            { HEADERS.map((header) => <th key={ header }>{ header }</th>) }
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
                  <Button
                    label="Excluir"
                    onClick={ () => this.handleDeleteBtn(id) }
                  />
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
  expenses: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(WalletTable);
