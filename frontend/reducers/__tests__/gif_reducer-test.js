import gifReducer from "../gif_reducer.js";
import * as GifActions from '../../actions/gif_actions';

describe('gifReducer', () => {
  test("should initialize with an empty object as the default state", () => {
    expect(gifReducer( undefined, {} )).toEqual({});
  });
});


const gif1 = { id: 1, title: "puppy smiling GIF", rating: "g" };
const gif2 = { id: 2, title: "child eating GIF", rating: "g" };

const newGif = {
  id: 3,
  title: "cat rolling around GIF",
  rating: "g"
};

const testGifs = {
  [gif1.id]: gif1,
  [gif2.id]: gif2,
};

describe("handling the RECEIVE_GIF action", () => {
  let action;

  beforeEach(() => {
    action = {
      type: GifActions.RECEIVE_GIF,
      gif: newGif
    };
  });

  test("should replace the state with the action's gif nested under the key 'gifs'", () => {
    const state = gifReducer(undefined, action);
    expect(state).toEqual({ gifs: newGif });
  });

  test("should not modify the old state", () => {
    const oldState = {b: "gif1"};

    const state = gifReducer(oldState, action);
    expect(oldState).toEqual({b: "gif1"});
  });
});

describe("handling the RECEIVE_GIFS action", () => {
  let action;

  beforeEach(() => {
    action = {
      type: GifActions.RECEIVE_GIFS,
      gifs: testGifs
    };
  });

  test("should merge the action's gif with the old state", () => {
    expect(gifReducer(newGif, action)).toEqual(
      Object.assign({}, newGif, testGifs)
    );
  });
});
