import { config } from './config';

export const fetchStocks = async (symbols) => {
  try {
    const apiKey = config.alphaVantage.apiKey;
    // Using Alpha Vantage API (free tier has rate limits)
    const responses = await Promise.all(
      symbols.split(',').map(symbol => 
        fetch(`${config.alphaVantage.baseUrl}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`)
      )
    );
    const stockData = responses.map((response, index) => {
      const symbol = symbols.split(',')[index];
      const data = response.data['Global Quote'];
      
      if (!data) {
        return {
          symbol,
          error: 'No data available'
        };
      }
      
      return {
        symbol,
        price: data['05. price'],
        change: data['09. change'],
        changePercent: data['10. change percent']
      };
    });
    return stockData;
  } catch (err) {
    throw new Error('Failed to load stocks: ' + err.message);
  }
};