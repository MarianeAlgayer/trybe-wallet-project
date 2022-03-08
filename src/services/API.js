const fetchExchangeRates = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';

  const response = await fetch(url);
  const data = await response.json();
  delete data.USDT;
  return data;
};

export default fetchExchangeRates;
