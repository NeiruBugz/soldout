import { typedAction } from '../helpers/typedAction';
import { SET_TRACKS } from '../actionTypes';

export const setTracks = (tracks: any) => {
  return typedAction(SET_TRACKS, tracks);
};

export type tracksAction = ReturnType<typeof setTracks>;
