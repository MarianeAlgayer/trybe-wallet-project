import fetchExchangeRates from '../services/API';

export const LOGIN = 'LOGIN';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';

export const login = (email) => ({
  type: LOGIN,
  email,
});

const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  expense,
});

const filterUSDT = (dataAPI) => Object.keys(dataAPI).filter((key) => key !== 'USDT');

export const fetchCurrencies = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => dispatch(getCurrencies(filterUSDT(data))));

export const saveExpenceWithExchangeRates = (expense) => async (dispatch) => {
  const exchangeRates = await fetchExchangeRates();
  const expenceWithExchangeRates = {
    ...expense,
    exchangeRates,
  };
  dispatch(saveExpense(expenceWithExchangeRates));
};
