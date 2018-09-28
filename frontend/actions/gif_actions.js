import axios from 'axios';

// API utils:

// Giphy Search API: https://developers.giphy.com/docs/#search-endpoint
const apiFetchGifs = query => {
  return axios.get('http://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: 'nFbq0t4ecN095B5OcGU8vAlQJFPdMchw',
      q: query
    }
  });
};

// for slack index item
const apiFetchGif = gif_id => {
  return axios.get(`http://api.giphy.com/v1/gifs/${gif_id}`, {
    params: {
      api_key: 'nFbq0t4ecN095B5OcGU8vAlQJFPdMchw',
      gif_id
    }
  });
};

// actions
export const RECEIVE_GIFS = 'RECEIVE_GIFS';
export const RECEIVE_GIF = 'RECEIVE_GIF';

const receiveGifs = gifs => ({
  type: RECEIVE_GIFS,
  gifs
});

const receiveGif = gif => ({
  type: RECEIVE_GIF,
  gif
});

export const fetchGifs = query => dispatch => {
  return apiFetchGifs(query).then( response => dispatch(receiveGifs(response.data)) );
};

export const fetchGif = gif_id => dispatch => {
  return apiFetchGif(gif_id).then( response => dispatch(receiveGif(response.data)) );
};
