import React from 'react';
import { GameContextType } from './game.context.types';

// TODO: вынести dots в отдельный контекст
export const GameContext = React.createContext({
  playlistId: undefined,
  selectedTrack: undefined,
  correctTrack: undefined,
  audioSrc: undefined,
  dots: [],
  setPlaylistId: () => {},
  setSelectedTrack: () => {},
  setCorrectTrack: () => {},
  setAudioSrc: () => {},
  setDots: () => {},
  addDot: () => {},
} as GameContextType);
