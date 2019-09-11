import { GAME_START, GAME_STOP } from "../actions/game";

const initialState = {
  isStart: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_STOP:
      return {
        ...state,
        isStart: false,
      };
    case GAME_START:
      return {
        ...state,
        isStart: true,
      };
    default:
      return state;
  }
};
