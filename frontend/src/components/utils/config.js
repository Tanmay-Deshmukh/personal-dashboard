export const config = {
  openWeather: {
    apiKey: import.meta.env.VITE_OPENWEATHER_API_KEY,
    baseUrl: 'https://api.openweathermap.org/data/2.5'
  },
  newsApi: {
    apiKey: import.meta.env.VITE_NEWSAPI_API_KEY,
    baseUrl: 'https://newsapi.org/v2'
  },
  alphaVantage: {
    apiKey: import.meta.env.VITE_ALPHAVANTAGE_API_KEY,
    baseUrl: 'https://www.alphavantage.co/query'
  },
  isConfigured: () => {
    return import.meta.env.VITE_OPENWEATHER_API_KEY !== 'openweather_api_key_here' &&
           import.meta.env.VITE_NEWSAPI_API_KEY !== 'newsapi_key_here' &&
           import.meta.env.VITE_ALPHAVANTAGE_API_KEY !== 'alphavantage_key_here';
  }
};