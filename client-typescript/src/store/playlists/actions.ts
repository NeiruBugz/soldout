import { typedAction } from "../helpers/typedAction";
import { SET_PLAYLISTS, CHOOSE_PLAYLIST } from "../actionTypes";

export const setPlaylists = (playlists: []) => {
  return typedAction(SET_PLAYLISTS, playlists);
};

export const choosePlaylist = (chosenPlaylist: []) => {
  return typedAction(CHOOSE_PLAYLIST, chosenPlaylist);
};

export type playlistAction = ReturnType<typeof setPlaylists | typeof choosePlaylist>;
