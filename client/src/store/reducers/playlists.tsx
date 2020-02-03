import { CHOOSE_PLAYLIST, SET_PLAYLISTS } from "../actions/playlists";
const initialState = {
  playlists: [],
  choosedPlaylist: null
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists
      };
    }
    case CHOOSE_PLAYLIST: {
      return {
        ...state,
        choosedPlaylist: action.choosedPlaylist
      };
    }
    default:
      return state;
  }
};
