import { SET_REVIEWS } from '../actions/admin';

const initialState = {
  reviews: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REVIEWS: {
      return {
        ...state,
        reviews: action.reviews,
      };
    }
    default:
      return state;
  }
};
