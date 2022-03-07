import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/Wallet.css';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

    return (
      <div className="wallet-container">
        <header>
          <h1>TrybeWallet</h1>
          <div>
            <p data-testid="email-field">{`Email: ${email}`}</p>
            <p data-testid="total-field">0</p>
            <p data-testid="header-currency-field">BRL</p>
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
