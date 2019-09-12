export const SET_PLAYING = "SET_PLAYING";

export function setPlaying(bool) {
  return {
    type: SET_PLAYING,
    isPlaying: bool,
  };
}
