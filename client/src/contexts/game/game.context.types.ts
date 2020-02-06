import { Dispatch, SetStateAction } from 'react';

export interface GameProps {}

export interface GameContextType extends GameProps {
  playlistId?: number;
  selectedTrack?: number;
  correctTrack?: number;
  audioSrc?: string;
  dots: boolean[];
  setPlaylistId: Dispatch<SetStateAction<number | undefined>> | (() => void);
  setSelectedTrack: Dispatch<SetStateAction<number | undefined>> | (() => void);
  setCorrectTrack: Dispatch<SetStateAction<number | undefined>> | (() => void);
  setAudioSrc: Dispatch<SetStateAction<string | undefined>> | (() => void);
  setDots: Dispatch<SetStateAction<boolean[]>> | (() => void);
  addDot: ((_: boolean) => void) | (() => void);
}
