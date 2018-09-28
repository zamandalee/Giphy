import {RECEIVE_GIFS} from '../actions/gif_actions.js';

// might later replace {} w what's in local storage
const gifReducer = (store = {}, action) => {
  switch (action.type) {
    case RECEIVE_GIFS:
      return {gifs: action.gifs.data};
    default:
      return store;
  }
};

export default gifReducer;
