import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../../actions';
import Input from '../../components/Input';
import Button from '../../components/Button';

import './style.css';

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
      <div className="login-container">
        <form className="login-form">
          <h1>Trybe Wallet</h1>

          <Input
            id="email"
            data-testid="email-input"
            label="Email:"
            type="email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
          />

          <Input
            id="password"
            data-testid="password-input"
            label="Senha:"
            type="password"
            value={ password }
            name="password"
            onChange={ this.handleChange }
          />

          <Button
            label="ENTRAR"
            isBtnDisabled={ isBtnDisabled }
            onClick={ this.handleClick }
          />
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
