import axios from 'axios';
import apiConfig from '../../apiKeys';

// API UTILS:

// Giphy Search API: https://developers.giphy.com/docs/#search-endpoint
const apiFetchGifs = (query, offset = 0) => {
  return axios.get('http://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: `${apiConfig.giphyKey}`,
      q: query,
      offset
    }
  });
};

const apiFetchGif = gif_id => {
  return axios.get(`http://api.giphy.com/v1/gifs/${gif_id}`, {
    params: {
      api_key: `${apiConfig.giphyKey}`,
      gif_id
    }
  });
};



// ACTIONS
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

export const fetchGifs = (query, offset = 0) => dispatch => {
  // turn array of gifs in response to an obj for faster read time later
  return apiFetchGifs(query, offset).then( response => {
    const dataObj = {};
    response.data.data.forEach( gif => dataObj[gif.id] = gif );
    return dispatch(receiveGifs(dataObj));
  });
};

export const fetchGif = gif_id => dispatch => {
  return apiFetchGif(gif_id).then( response => {
    const gifObj = response.data.data;
    const dataObj = {[gifObj.id]: gifObj};
    return dispatch(receiveGif(dataObj));
  });
};
