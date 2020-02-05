import React from 'react';
import { TracksContextType } from './tracks.context.types';

export const TracksContext = React.createContext({
  tracks: [],
  setTracks: () => {},
} as TracksContextType);
