import { typedAction } from '../helpers/typedAction';
import { SET_REVIEWS } from '../actionTypes';

export const setReviews = (reviews: any) => {
  return typedAction(SET_REVIEWS, reviews);
};

export type adminAction = ReturnType<typeof setReviews>
