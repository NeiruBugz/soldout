import React from 'react';
import { PlaylistsContextType } from './playlists.context.types';

export const PlaylistsContext = React.createContext({
  playlists: [],
  setPlaylists: () => {},
} as PlaylistsContextType);
