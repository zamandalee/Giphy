import axios from 'axios';
import * as ApiUtil from '../util/api_util';

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
  return ApiUtil.apiFetchGifs(query, offset).then( response => {
    const dataObj = {};
    response.data.data.forEach( gif => dataObj[gif.id] = gif );
    return dispatch(receiveGifs(dataObj));
  });
};

export const fetchGif = gif_id => dispatch => {
  return ApiUtil.apiFetchGif(gif_id).then( response => {
    const gifObj = response.data.data;
    const dataObj = {[gifObj.id]: gifObj};
    return dispatch(receiveGif(dataObj));
  });
};
