import { SET_TRACKS } from "../actions/tracks";

const initialState = {
  tracks: {
    tracks: [],
    src: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TRACKS:
      return {
        ...state,
        tracks: action.tracks,
        src: action.src,
      };
    default:
      return state;
  }
};
