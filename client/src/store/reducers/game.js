import { SET_PLAYING } from '../actions/game';

const initialState = {
  isPlaying: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYING: {
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    }
    default:
      return state;
  }
};
