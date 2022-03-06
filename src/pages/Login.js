import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateForm);
  }

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(login(email));
    history.push('/carteira');
  }

  // source: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
  validateForm = () => {
    const { email, password } = this.state;

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const minLength = 6;

    const validEmail = emailRegex.test(email);
    const validPassword = password.length >= minLength;

    if (validEmail && validPassword) {
      return this.setState({
        isBtnDisabled: false,
      });
    }

    return this.setState({
      isBtnDisabled: true,
    });
  }

  render() {
    const { email, password, isBtnDisabled } = this.state;

    return (
      <div>
        <h1>Trybe Wallet</h1>
        <h2>Login</h2>
        <form>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              id="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <button
            type="submit"
            disabled={ isBtnDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
