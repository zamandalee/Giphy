import axios from 'axios';
import apiConfig from '../../apiKeys';

// API UTILS:

// Giphy Search API: https://developers.giphy.com/docs/#search-endpoint
const apiFetchGifs = query => {
  return axios.get('http://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: `${apiConfig.giphyKey}`,
      q: query
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

export const apiUploadGif = (username, source_image_url, tags) => {
  return axios.post('http://api.giphy.com/upload.giphy.com/v1/gifs', {
    params: {
      api_key: `${apiConfig.giphyKey}`,
      username,
      source_image_url,
      tags
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

export const fetchGifs = query => dispatch => {
  // turn array of gifs in response to an obj for faster read time later
  return apiFetchGifs(query).then( response => {
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
