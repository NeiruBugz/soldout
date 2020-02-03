import { progressAction } from "./actions";
import { SET_DOT, CLEAR_PROGRESS } from "../actionTypes";

type progressState = {
  dots: boolean[];
};

const initialState: progressState = {
  dots: [],
};

export function progressReducer(state = initialState, action: progressAction): progressState {
  switch (action.type) {
    case SET_DOT:
      const { dots } = state;
      dots.push(action.payload);
      return {
        ...state,
        dots,
      };
    case CLEAR_PROGRESS:
      return {
        dots: [],
      };
    default:
      return state;
  }
}
