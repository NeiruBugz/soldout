import { Dispatch, SetStateAction } from 'react';
import { Track } from '../../interfaces';

export type TracksContextType = {
  tracks: Track[];
  setTracks: Dispatch<SetStateAction<Track[]>> | (() => void);
};
