export const GAME_START = "GAME_START";
export const GAME_STOP = "GAME_STOP";

export function gameStart() {
  return {
    type: GAME_START,
  };
}

export function gameStop() {
  return {
    type: GAME_STOP,
  };
}
