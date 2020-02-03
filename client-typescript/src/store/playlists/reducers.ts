import { playlistAction } from "./actions";
import { SET_PLAYLISTS, CHOOSE_PLAYLIST } from "../actionTypes";

type playlistState = {
  playlists: [];
  chosenPlaylist: [] | null;
};

const initialState: playlistState = {
  playlists: [],
  chosenPlaylist: null,
};

export function playlistReducer(state = initialState, action: playlistAction): playlistState {
  switch (action.type) {
    case SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };
    case CHOOSE_PLAYLIST:
      return {
        ...state,
        chosenPlaylist: action.payload,
      };
    default:
      return state;
  }
}
