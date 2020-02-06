import { Dispatch, SetStateAction } from 'react';
import { Playlist } from '../../interfaces';

export type PlaylistsContextType = {
  playlists: Playlist[];
  setPlaylists: Dispatch<SetStateAction<Playlist[]>> | (() => void);
};
