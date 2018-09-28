import axios from 'axios';

// api utils

// https://developers.giphy.com/docs/#search-endpoint
const apiFetchGifs = (query) => {
  return axios.get('http://api.giphy.com/v1/gifs/search', {
    params: {
      api_key: 'nFbq0t4ecN095B5OcGU8vAlQJFPdMchw',
      q: query
    }
  });
};

// for slack index item
// const apiFetchGif = (query) => {
//   return axios.get('http://api.giphy.com/v1/gifs/search', {
//     params: {
//       // api_key: [api key here],
//       q: query
//     }
//   });
// };

// actions
export const RECEIVE_GIFS = 'RECEIVE_GIFS';

const receiveGifs = gifs => ({
  type: RECEIVE_GIFS,
  gifs
});

export const fetchGifs = query => dispatch => {
  return apiFetchGifs(query).then( response => dispatch(receiveGifs(response.data)) );
};
