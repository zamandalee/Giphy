import { merge } from 'lodash';

import {RECEIVE_GIFS, RECEIVE_GIF} from '../actions/gif_actions.js';

// might later replace {} w what's in local storage
const gifReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_GIFS:
      return {gifs: action.gifs.data};
    case RECEIVE_GIF:
      return merge( {}, state, {selectedGif: action.gif.data});
    default:
      return state;
  }
};

export default gifReducer;
