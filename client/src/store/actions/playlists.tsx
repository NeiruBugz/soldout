export const SET_PLAYLISTS = "SET_PLAYLISTS";
export const CHOOSE_PLAYLIST = "CHOOSE_PLAYLIST";
export function setPlaylists(playlists) {
  return {
    type: SET_PLAYLISTS,
    playlists
  };
}
export function choosePlaylist(choosedPlaylist) {
  return {
    type: CHOOSE_PLAYLIST,
    choosedPlaylist
  };
}
