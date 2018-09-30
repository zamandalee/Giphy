import axios from 'axios';
import apiConfig from '../../apiKeys';

// API UTILS:

// Giphy Search API: https://developers.giphy.com/docs/#search-endpoint
export const apiFetchGifs = (query, offset = 0) => {
  return axios.get('http://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: `${apiConfig.giphyKey}`,
      q: query,
      offset
    }
  });
};

export const apiFetchGif = gif_id => {
  return axios.get(`http://api.giphy.com/v1/gifs/${gif_id}`, {
    params: {
      api_key: `${apiConfig.giphyKey}`,
      gif_id
    }
  });
};

export const slackShareGif = options => {
  return axios.post(`${apiConfig.slackWebhook}`, JSON.stringify(options));
};
