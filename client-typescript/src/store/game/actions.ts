import { typedAction } from "../helpers/typedAction";
import { SET_PLAYING } from "../actionTypes";

export const setPlaying = (flag: boolean) => {
  return typedAction(SET_PLAYING, flag);
};

export type gameAction = ReturnType<typeof setPlaying>;
