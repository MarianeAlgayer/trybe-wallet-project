import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletHeader from './WalletHeader';
import WalletForm from './WalletForm';
import WalletTable from './WalletTable';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <div className="wallet-container">
        <WalletHeader />
        <WalletForm />
        { expenses.length > 0 && <WalletTable />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Wallet);
