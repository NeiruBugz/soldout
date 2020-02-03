import { typedAction } from "../helpers/typedAction";
import { SET_DOT, CLEAR_PROGRESS } from "../actionTypes";

export const clearProgress = () => {
  return typedAction(CLEAR_PROGRESS);
};

export const setDot = (flag: boolean) => {
  return typedAction(SET_DOT, flag);
};

export type progressAction = ReturnType<typeof clearProgress | typeof setDot>;
