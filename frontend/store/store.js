import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

import gifReducer from '../reducers/gif_reducer';

const configureStore = (preloadedState = {}) => (
  createStore(
    gifReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
);

export default configureStore;
