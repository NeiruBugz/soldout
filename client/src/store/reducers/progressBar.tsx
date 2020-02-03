import { SET_DOT, CLEAR_PROGRESS } from "../actions/progress";
const initialState = {
  dots: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DOT: {
      const { dots } = state;
      dots.push(action.dot);
      return {
        ...state,
        dots
      };
    }
    case CLEAR_PROGRESS:
      return {
        dots: []
      };
    default:
      return state;
  }
};
