import { config } from './config';

export const fetchNews = async (category, count) => {
  try {
    const apiKey = config.newsApi.apiKey;

    // Using NewsAPI (might need to use a different API if this has limits)
    const response = await fetch(
      `${config.newsApi.baseUrl}/top-headlines?category=${category}&pageSize=${count}&apiKey=${apiKey}`
    );
    if (!response.ok) {
      throw new Error('News data fetch failed');
    }
    const data = await response.json();
    return data.articles || [];
  } catch (err) {
    throw new Error('Failed to load news: ' + err.message);
  }
};