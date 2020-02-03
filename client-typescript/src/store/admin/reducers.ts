import { adminAction } from './actions';
import { SET_REVIEWS } from '../actionTypes';

type adminState = {
  reviews: [];
};

const initialState: adminState = {
  reviews: [],
};

export function adminReducer(state = initialState, action: adminAction): adminState {
  if (action.type === SET_REVIEWS) {
    return {
      ...state,
      reviews: action.payload
    }
  } else {
    return state;
  }
}
