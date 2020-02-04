import { tracksAction } from "./actions";
import { SET_TRACKS } from "../actionTypes";

type tracksState = {
  tracks: {
    tracks: [];
    src: string | null;
  };
};

const initialState: tracksState = {
  tracks: {
    tracks: [],
    src: ""
  }
};

export function tracksReducer(
  state = initialState,
  action: tracksAction
): tracksState {
  if (action.type === SET_TRACKS) {
    return {
      ...state,
      tracks: action.payload
    };
  } else {
    return state;
  }
}
