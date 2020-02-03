import { SET_PLAYING } from "../actionTypes";
import { gameAction } from "./actions";

type gameState = {
  isPlaying: boolean;
};

const initialState: gameState = { isPlaying: false };

export function gameReducer(state = initialState, action: gameAction): gameState {
  switch (action.type) {
    case SET_PLAYING:
      return { isPlaying: action.payload };
    default:
      return state;
  }
}
